import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    // Check active session
    authService?.getSession()?.then((session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session?.user?.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes (MUST be synchronous)
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session?.user?.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

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