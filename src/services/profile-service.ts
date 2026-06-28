import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Database, Profile } from '@/types/database';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export async function getProfileExists(userId: string): Promise<boolean> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function getProfileById(userId: string): Promise<Profile | null> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUsernameAvailable(username: string): Promise<boolean> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !data;
}

export async function createProfile(profile: ProfileInsert): Promise<void> {
  assertSupabaseConfigured();

  const { error } = await supabase.from('profiles').insert(profile);

  if (error) {
    throw error;
  }
}
