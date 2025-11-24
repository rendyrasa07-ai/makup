/*  */import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId) => {
    try {
      const profileData = await authService?.getUserProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Check active session
    authService?.getSession()?.then((session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session?.user?.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes - hanya untuk SIGNED_IN, SIGNED_OUT, dan TOKEN_REFRESHED
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      // Hanya handle event penting, abaikan yang lain untuk mencegah reload berlebihan
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
        if (session?.user && event !== 'TOKEN_REFRESHED') {
          loadProfile(session?.user?.id);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    signUp: authService?.signUp,
    signIn: authService?.signIn,
    signOut: authService?.signOut,
    updateProfile: authService?.updateProfile,
    resetPassword: authService?.resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};