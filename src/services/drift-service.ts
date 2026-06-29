import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import { getBlockedUserIds } from '@/services/report-service';
import type { Database, Drift, Match } from '@/types/database';

type DriftInsert = Database['public']['Tables']['drifts']['Insert'];
type DriftUpdate = Database['public']['Tables']['drifts']['Update'];
type MatchInsert = Database['public']['Tables']['matches']['Insert'];

type CreateDriftInput = {
  senderId: string;
  content: string;
};

const DRIFT_EXPIRATION_HOURS = 48;

export async function createFloatingDrift({ senderId, content }: CreateDriftInput): Promise<Drift> {
  assertSupabaseConfigured();

  const drift: DriftInsert = {
    sender_id: senderId,
    content,
    status: 'floating',
    current_receiver_id: null,
    delivered_at: null,
    expires_at: null,
  };

  const { data, error } = await supabase.from('drifts').insert(drift).select('*').single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getRandomFloatingDriftForReceiver(receiverId: string): Promise<Drift | null> {
  assertSupabaseConfigured();

  await recycleExpiredDeliveredDrifts();

  const blockedUserIds = await getBlockedUserIds(receiverId);

  const { data, error } = await supabase
    .from('drifts')
    .select('*')
    .eq('status', 'floating')
    .neq('sender_id', receiverId)
    .limit(20);

  if (error) {
    throw error;
  }

  const availableDrifts = data.filter((drift) => !blockedUserIds.includes(drift.sender_id));

  if (availableDrifts.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableDrifts.length);

  return availableDrifts[randomIndex];
}

export async function markDriftDelivered(driftId: string, receiverId: string): Promise<Drift> {
  const deliveredAt = new Date();
  const expiresAt = new Date(deliveredAt.getTime() + DRIFT_EXPIRATION_HOURS * 60 * 60 * 1000);
  const update: DriftUpdate = {
    status: 'delivered',
    current_receiver_id: receiverId,
    delivered_at: deliveredAt.toISOString(),
    expires_at: expiresAt.toISOString(),
  };

  const { data, error } = await supabase
    .from('drifts')
    .update(update)
    .eq('id', driftId)
    .eq('status', 'floating')
    .select('*')
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('This Drift could not be delivered. It may already be claimed, or the database update policy is missing.');
  }

  return data;
}

export async function passDrift(driftId: string, receiverId: string): Promise<void> {
  const update: DriftUpdate = {
    status: 'floating',
    current_receiver_id: null,
    delivered_at: null,
    expires_at: null,
  };

  const { error } = await supabase
    .from('drifts')
    .update(update)
    .eq('id', driftId)
    .eq('current_receiver_id', receiverId);

  if (error) {
    throw error;
  }
}

export async function keepDrift(drift: Drift, receiverId: string): Promise<Match> {
  const driftUpdate: DriftUpdate = {
    status: 'kept',
    current_receiver_id: receiverId,
    expires_at: null,
  };

  const { error: driftError } = await supabase
    .from('drifts')
    .update(driftUpdate)
    .eq('id', drift.id)
    .eq('current_receiver_id', receiverId);

  if (driftError) {
    throw driftError;
  }

  const match: MatchInsert = {
    drift_id: drift.id,
    user_one: drift.sender_id,
    user_two: receiverId,
  };

  const { data, error } = await supabase.from('matches').insert(match).select('*').single();

  if (error) {
    throw error;
  }

  return data;
}

export async function recycleExpiredDeliveredDrifts(): Promise<void> {
  assertSupabaseConfigured();

  const now = new Date().toISOString();
  const update: DriftUpdate = {
    status: 'floating',
    current_receiver_id: null,
    delivered_at: null,
    expires_at: null,
  };

  const { error } = await supabase
    .from('drifts')
    .update(update)
    .eq('status', 'delivered')
    .lt('expires_at', now);

  if (error) {
    throw error;
  }
}
