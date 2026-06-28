import { assertSupabaseConfigured, supabase } from '@/lib/supabase';

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
