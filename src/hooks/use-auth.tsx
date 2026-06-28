import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';

import { assertSupabaseConfigured, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getProfileExists } from '@/services/profile-service';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profileExists: boolean | null;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);

  const user = session?.user ?? null;

  const loadProfileState = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setProfileExists(null);
      return;
    }

    const exists = await getProfileExists(currentUser.id);
    setProfileExists(exists);
  }, []);

  const applySession = useCallback(
    async (nextSession: Session | null) => {
      setSession(nextSession);
      await loadProfileState(nextSession?.user ?? null);
    },
    [loadProfileState],
  );

  useEffect(() => {
    let isMounted = true;

    async function initializeSession() {
      if (!isSupabaseConfigured) {
        setSession(null);
        setProfileExists(null);
        setLoading(false);
        return;
      }

      const {
        data: { session: initialSession },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        setSession(null);
        setProfileExists(null);
      } else {
        await applySession(initialSession);
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      applySession(nextSession)
        .catch(() => {
          setProfileExists(null);
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const refreshProfile = useCallback(async () => {
    await loadProfileState(user);
  }, [loadProfileState, user]);

  const signIn = useCallback(async (email: string, password: string) => {
    assertSupabaseConfigured();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    assertSupabaseConfigured();

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
    setProfileExists(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      profileExists,
      refreshProfile,
      signIn,
      signUp,
      signOut,
    }),
    [loading, profileExists, refreshProfile, session, signIn, signOut, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
