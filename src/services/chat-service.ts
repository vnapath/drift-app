import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Database, Match, Message } from '@/types/database';

type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export type ChatMatch = Match & {
  drift_content: string | null;
};

export async function getMatchesForUser(userId: string): Promise<ChatMatch[]> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .or(`user_one.eq.${userId},user_two.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  const driftIds = data.map((match) => match.drift_id);
  const driftContentById = await getDriftContentById(driftIds);

  return data.map((match) => ({
    ...match,
    drift_content: driftContentById.get(match.drift_id) ?? null,
  }));
}

export async function getMatchForUser(matchId: string, userId: string): Promise<ChatMatch | null> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .or(`user_one.eq.${userId},user_two.eq.${userId}`)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    drift_content: (await getDriftContentById([data.drift_id])).get(data.drift_id) ?? null,
  };
}

async function getDriftContentById(driftIds: string[]): Promise<Map<string, string>> {
  if (driftIds.length === 0) {
    return new Map();
  }

  const { data, error } = await supabase.from('drifts').select('id, content').in('id', driftIds);

  if (error) {
    throw error;
  }

  return new Map(data.map((drift) => [drift.id, drift.content]));
}

export async function getMessagesForMatch(matchId: string): Promise<Message[]> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createMessage(matchId: string, senderId: string, content: string): Promise<Message> {
  assertSupabaseConfigured();

  const message: MessageInsert = {
    match_id: matchId,
    sender_id: senderId,
    content,
  };

  const { data, error } = await supabase.from('messages').insert(message).select('*').single();

  if (error) {
    throw error;
  }

  return data;
}

export function subscribeToMatchMessages(
  matchId: string,
  onMessage: (message: Message) => void,
): () => void {
  assertSupabaseConfigured();

  const channel = supabase
    .channel(`match-messages:${matchId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `match_id=eq.${matchId}`,
      },
      (payload) => {
        onMessage(payload.new as Message);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
