import { assertSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Block, Database, Report } from '@/types/database';

type ReportInsert = Database['public']['Tables']['reports']['Insert'];
type BlockInsert = Database['public']['Tables']['blocks']['Insert'];

type ReportMisconductInput = {
  reporterId: string;
  reportedUserId: string;
  matchId: string;
  driftId: string;
};

export async function reportMisconductAndBlock({
  reporterId,
  reportedUserId,
  matchId,
  driftId,
}: ReportMisconductInput): Promise<{ report: Report; block: Block }> {
  assertSupabaseConfigured();

  const reportInsert: ReportInsert = {
    reporter_id: reporterId,
    reported_user_id: reportedUserId,
    drift_id: driftId,
    match_id: matchId,
    reason: 'misconduct',
  };

  const { data: report, error: reportError } = await supabase
    .from('reports')
    .insert(reportInsert)
    .select('*')
    .single();

  if (reportError) {
    throw reportError;
  }

  const blockInsert: BlockInsert = {
    blocker_id: reporterId,
    blocked_user_id: reportedUserId,
    reason: 'misconduct',
  };

  const { data: block, error: blockError } = await supabase
    .from('blocks')
    .upsert(blockInsert, { onConflict: 'blocker_id,blocked_user_id' })
    .select('*')
    .single();

  if (blockError) {
    throw blockError;
  }

  return { report, block };
}

export async function getBlockedUserIds(userId: string): Promise<string[]> {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from('blocks')
    .select('blocked_user_id')
    .eq('blocker_id', userId);

  if (error) {
    throw error;
  }

  return data.map((block) => block.blocked_user_id);
}
