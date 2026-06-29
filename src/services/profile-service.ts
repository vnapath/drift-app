import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Database, Profile } from '@/types/database';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

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

export async function getUsernameAvailable(username: string, currentUserId?: string): Promise<boolean> {
  assertSupabaseConfigured();

  let query = supabase.from('profiles').select('id').eq('username', username);

  if (currentUserId) {
    query = query.neq('id', currentUserId);
  }

  const { data, error } = await query.maybeSingle();

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

export async function updateProfile(userId: string, profile: ProfileUpdate): Promise<Profile> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}
