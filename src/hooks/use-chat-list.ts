import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/errors';
import { getMatchesForUser, type ChatMatch } from '@/services/chat-service';

export function useChatList() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<ChatMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    if (!user) {
      setMatches([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userMatches = await getMatchesForUser(user.id);
      setMatches(userMatches);
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Could not load chats.'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return {
    error,
    loading,
    matches,
    reload: loadMatches,
  };
}
