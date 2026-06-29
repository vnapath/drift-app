import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/errors';
import { getProfileById, getUsernameAvailable, updateProfile } from '@/services/profile-service';
import type { Profile } from '@/types/database';

const usernamePattern = /^[a-z0-9_]+$/;

export type ProfileFormState = {
  username: string;
  displayName: string;
  age: string;
  country: string;
  bio: string;
};

export function useProfile() {
  const { user, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<ProfileFormState>({
    username: '',
    displayName: '',
    age: '',
    country: '',
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentProfile = await getProfileById(user.id);
      setProfile(currentProfile);

      if (currentProfile) {
        setForm({
          username: currentProfile.username,
          displayName: currentProfile.display_name,
          age: currentProfile.age?.toString() ?? '',
          country: currentProfile.country ?? '',
          bio: currentProfile.bio ?? '',
        });
      }
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Could not load profile.'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  function updateField<Key extends keyof ProfileFormState>(field: Key, value: ProfileFormState[Key]) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setSaved(false);

    if (error) {
      setError(null);
    }
  }

  async function saveProfile() {
    if (!user || !profile) {
      setError('Profile is not ready yet.');
      return;
    }

    const username = form.username.trim();
    const displayName = form.displayName.trim();
    const age = form.age.trim();
    const country = form.country.trim();
    const bio = form.bio.trim();

    if (!username) {
      setError('Username is required.');
      return;
    }

    if (username !== username.toLowerCase()) {
      setError('Username must be lowercase.');
      return;
    }

    if (username.includes(' ')) {
      setError('Username cannot include spaces.');
      return;
    }

    if (!usernamePattern.test(username)) {
      setError('Username can only use letters, numbers, and underscore.');
      return;
    }

    if (!displayName) {
      setError('Display name is required.');
      return;
    }

    const parsedAge = age ? Number(age) : null;

    if (parsedAge !== null && (!Number.isInteger(parsedAge) || parsedAge < 16 || parsedAge > 120)) {
      setError('Age must be a whole number between 16 and 120.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const usernameAvailable = await getUsernameAvailable(username, user.id);

      if (!usernameAvailable) {
        setError('That username is already taken.');
        return;
      }

      const updatedProfile = await updateProfile(user.id, {
        username,
        display_name: displayName,
        age: parsedAge,
        country: country || null,
        bio: bio || null,
      });

      setProfile(updatedProfile);
      setSaved(true);
      await refreshProfile();
    } catch (saveError) {
      setError(getErrorMessage(saveError, 'Could not save profile.'));
    } finally {
      setSaving(false);
    }
  }

  return {
    error,
    form,
    loading,
    profile,
    saved,
    saving,
    reload: loadProfile,
    saveProfile,
    updateField,
  };
}
