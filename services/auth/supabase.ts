import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const isBrowser = typeof window !== 'undefined';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: isBrowser
      ? {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          storage: AsyncStorage,
        }
      : {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
  }
);
