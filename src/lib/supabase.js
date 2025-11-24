import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

const useMockData = !supabaseUrl || !supabaseAnonKey;

if (useMockData) {
  console.log('Running in mock mode - Supabase not configured');
}

const mockClient = {
  auth: {
    signUp: async () => ({ data: { user: null }, error: new Error('Mock mode') }),
    signIn: async () => ({ data: { user: null }, error: new Error('Mock mode') }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
};

export const supabase = useMockData ? mockClient : createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web'
    }
  }
});

export const isMockMode = useMockData;
