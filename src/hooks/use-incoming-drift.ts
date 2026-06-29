import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/errors';
import {
  getRandomFloatingDriftForReceiver,
  keepDrift,
  markDriftDelivered,
  passDrift,
} from '@/services/drift-service';
import type { Drift, Match } from '@/types/database';

export function useIncomingDrift() {
  const { user, profileExists } = useAuth();
  const [drift, setDrift] = useState<Drift | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadIncomingDrift = useCallback(async () => {
    if (!user || !profileExists) {
      setDrift(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setMatch(null);
    setError(null);

    try {
      const floatingDrift = await getRandomFloatingDriftForReceiver(user.id);

      if (!floatingDrift) {
        setDrift(null);
        return;
      }

      const deliveredDrift = await markDriftDelivered(floatingDrift.id, user.id);
      setDrift(deliveredDrift);
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Could not find an incoming Drift.'));
      setDrift(null);
    } finally {
      setLoading(false);
    }
  }, [profileExists, user]);

  useEffect(() => {
    loadIncomingDrift();
  }, [loadIncomingDrift]);

  async function passCurrentDrift() {
    if (!user || !drift) {
      return;
    }

    setActing(true);
    setError(null);

    try {
      await passDrift(drift.id, user.id);
      await loadIncomingDrift();
    } catch (passError) {
      setError(getErrorMessage(passError, 'Could not pass this Drift.'));
    } finally {
      setActing(false);
    }
  }

  async function keepCurrentDrift() {
    if (!user || !drift) {
      return;
    }

    setActing(true);
    setError(null);

    try {
      const createdMatch = await keepDrift(drift, user.id);
      setMatch(createdMatch);
    } catch (keepError) {
      setError(getErrorMessage(keepError, 'Could not keep this Drift.'));
    } finally {
      setActing(false);
    }
  }

  return {
    acting,
    drift,
    error,
    hasMatch: Boolean(match),
    loading,
    keepCurrentDrift,
    loadIncomingDrift,
    passCurrentDrift,
  };
}
