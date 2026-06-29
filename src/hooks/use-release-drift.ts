import { useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/errors';
import { createFloatingDrift } from '@/services/drift-service';

export const MAX_DRIFT_LENGTH = 280;

export function useReleaseDrift() {
  const { user, profileExists } = useAuth();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReleased, setIsReleased] = useState(false);

  const remainingCharacters = MAX_DRIFT_LENGTH - content.length;
  const trimmedContent = content.trim();
  const isOverLimit = remainingCharacters < 0;
  const canSubmit = Boolean(trimmedContent) && !isOverLimit && !isSubmitting;

  function updateContent(nextContent: string) {
    setContent(nextContent);

    if (error) {
      setError(null);
    }
  }

  async function releaseDrift() {
    if (!user) {
      setError('You need to be logged in to release a Drift.');
      return;
    }

    if (!profileExists) {
      setError('Complete your profile before releasing a Drift.');
      return;
    }

    if (!trimmedContent) {
      setError('Write a message before releasing your Drift.');
      return;
    }

    if (trimmedContent.length > MAX_DRIFT_LENGTH) {
      setError(`Keep your Drift under ${MAX_DRIFT_LENGTH} characters.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createFloatingDrift({
        senderId: user.id,
        content: trimmedContent,
      });

      setContent('');
      setIsReleased(true);
    } catch (releaseError) {
      setError(getErrorMessage(releaseError, 'Could not release your Drift.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  function composeAnother() {
    setContent('');
    setError(null);
    setIsReleased(false);
  }

  return {
    content,
    canSubmit,
    error,
    isOverLimit,
    isReleased,
    isSubmitting,
    maxLength: MAX_DRIFT_LENGTH,
    remainingCharacters,
    composeAnother,
    releaseDrift,
    updateContent,
  };
}
