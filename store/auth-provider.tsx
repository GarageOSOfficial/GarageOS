import { Session, User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import {
  isSupabaseConfigured,
  supabase,
} from '@/services/auth';
import {
  AuthActionResult,
  AuthCredentials,
  PasswordResetPayload,
} from '@/types';

const SUPABASE_CONFIGURATION_ERROR =
  'Supabase configuration is missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.';

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  configurationError: string | null;
  signIn: (credentials: AuthCredentials) => Promise<AuthActionResult>;
  register: (credentials: AuthCredentials) => Promise<AuthActionResult>;
  resetPassword: (payload: PasswordResetPayload) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }

        setSession(data.session ?? null);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const configurationError = isSupabaseConfigured ? null : SUPABASE_CONFIGURATION_ERROR;

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isLoading,
      isConfigured: isSupabaseConfigured,
      configurationError,
      async signIn(credentials) {
        if (!isSupabaseConfigured) {
          return { error: SUPABASE_CONFIGURATION_ERROR };
        }

        const { error } = await supabase.auth.signInWithPassword(credentials);
        return { error: error?.message ?? null };
      },
      async register(credentials) {
        if (!isSupabaseConfigured) {
          return { error: SUPABASE_CONFIGURATION_ERROR };
        }

        const { error } = await supabase.auth.signUp(credentials);
        return { error: error?.message ?? null };
      },
      async resetPassword(payload) {
        if (!isSupabaseConfigured) {
          return { error: SUPABASE_CONFIGURATION_ERROR };
        }

        const { error } = await supabase.auth.resetPasswordForEmail(payload.email);
        return { error: error?.message ?? null };
      },
      async signOut() {
        if (!isSupabaseConfigured) {
          return { error: SUPABASE_CONFIGURATION_ERROR };
        }

        const { error } = await supabase.auth.signOut();
        return { error: error?.message ?? null };
      },
    }),
    [configurationError, isLoading, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
