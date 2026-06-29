import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Database, Drift } from '@/types/database';

type DriftInsert = Database['public']['Tables']['drifts']['Insert'];

type CreateDriftInput = {
  senderId: string;
  content: string;
};

export async function createFloatingDrift({ senderId, content }: CreateDriftInput): Promise<Drift> {
  assertSupabaseConfigured();

  const drift: DriftInsert = {
    sender_id: senderId,
    content,
    status: 'floating',
    current_receiver_id: null,
  };

  const { data, error } = await supabase.from('drifts').insert(drift).select('*').single();

  if (error) {
    throw error;
  }

  return data;
}
