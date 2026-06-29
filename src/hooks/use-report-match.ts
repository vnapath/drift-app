import { useState } from 'react';

import { getErrorMessage } from '@/lib/errors';
import { reportMisconductAndBlock } from '@/services/report-service';
import type { Match } from '@/types/database';

export function useReportMatch(currentUserId: string | null, match: Match | null) {
  const [reported, setReported] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const reportedUserId = getOtherUserId(currentUserId, match);

  async function reportMatch() {
    if (!currentUserId || !match || !reportedUserId) {
      setReportError('This match cannot be reported right now.');
      return;
    }

    setReporting(true);
    setReportError(null);

    try {
      await reportMisconductAndBlock({
        reporterId: currentUserId,
        reportedUserId,
        matchId: match.id,
        driftId: match.drift_id,
      });
      setReported(true);
    } catch (error) {
      setReportError(getErrorMessage(error, 'Could not send report.'));
    } finally {
      setReporting(false);
    }
  }

  return {
    reported,
    reporting,
    reportError,
    reportMatch,
  };
}

function getOtherUserId(currentUserId: string | null, match: Match | null): string | null {
  if (!currentUserId || !match) {
    return null;
  }

  return match.user_one === currentUserId ? match.user_two : match.user_one;
}
