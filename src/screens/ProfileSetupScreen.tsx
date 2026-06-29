import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { getErrorMessage } from '@/lib/errors';
import { appRoutes } from '@/navigation/routes';
import { createProfile, getUsernameAvailable } from '@/services/profile-service';

const usernamePattern = /^[a-z0-9_]+$/;

export function ProfileSetupScreen() {
  const theme = useTheme();
  const { user, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSave() {
    const normalizedUsername = username.trim();
    const trimmedDisplayName = displayName.trim();
    const trimmedAge = age.trim();
    const trimmedCountry = country.trim();
    const trimmedBio = bio.trim();

    if (!user) {
      setError('You need to be logged in to create a profile.');
      return;
    }

    if (!normalizedUsername) {
      setError('Username is required.');
      return;
    }

    if (normalizedUsername !== normalizedUsername.toLowerCase()) {
      setError('Username must be lowercase.');
      return;
    }

    if (normalizedUsername.includes(' ')) {
      setError('Username cannot include spaces.');
      return;
    }

    if (!usernamePattern.test(normalizedUsername)) {
      setError('Username can only use letters, numbers, and underscore.');
      return;
    }

    if (!trimmedDisplayName) {
      setError('Display name is required.');
      return;
    }

    const parsedAge = trimmedAge ? Number(trimmedAge) : null;

    if (parsedAge !== null && (!Number.isInteger(parsedAge) || parsedAge < 16 || parsedAge > 120)) {
      setError('Age must be a whole number between 16 and 120.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const usernameAvailable = await getUsernameAvailable(normalizedUsername);

      if (!usernameAvailable) {
        setError('That username is already taken.');
        return;
      }

      await createProfile({
        id: user.id,
        username: normalizedUsername,
        display_name: trimmedDisplayName,
        age: parsedAge,
        country: trimmedCountry || null,
        bio: trimmedBio || null,
        avatar_url: null,
      });

      await refreshProfile();
      router.replace(appRoutes.home);
    } catch (saveError) {
      setError(getErrorMessage(saveError, 'Could not save your profile.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
                Required profile
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                Create profile
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.body}>
                Choose a public username and add the basics before entering Drift.
              </ThemedText>
            </View>

            <ThemedView type="backgroundElement" style={styles.form}>
              <ProfileField
                editable={!submitting}
                label="Username"
                onChangeText={setUsername}
                placeholder="quiet_signal"
                value={username}
              />
              <ProfileField
                editable={!submitting}
                label="Display name"
                onChangeText={setDisplayName}
                placeholder="Your name"
                value={displayName}
              />
              <ProfileField
                editable={!submitting}
                inputMode="numeric"
                keyboardType="number-pad"
                label="Age"
                onChangeText={setAge}
                placeholder="25"
                value={age}
              />
              <ProfileField
                editable={!submitting}
                label="Country"
                onChangeText={setCountry}
                placeholder="United States"
                value={country}
              />
              <ProfileField
                editable={!submitting}
                label="Bio"
                multiline
                onChangeText={setBio}
                placeholder="A little context, not a whole autobiography."
                style={styles.bioInput}
                value={bio}
              />

              {error ? (
                <ThemedView style={styles.errorBox}>
                  <ThemedText type="smallBold" style={styles.errorText}>
                    {error}
                  </ThemedText>
                </ThemedView>
              ) : null}

              <Pressable
                accessibilityRole="button"
                disabled={submitting}
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.submitButton,
                  { backgroundColor: theme.text },
                  (pressed || submitting) && styles.pressed,
                ]}>
                {submitting ? (
                  <ActivityIndicator color={theme.background} />
                ) : (
                  <ThemedText type="smallBold" style={{ color: theme.background }}>
                    Save profile
                  </ThemedText>
                )}
              </Pressable>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

type ProfileFieldProps = {
  editable: boolean;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
} & Pick<
  React.ComponentProps<typeof TextInput>,
  'inputMode' | 'keyboardType' | 'multiline' | 'style'
>;

function ProfileField({
  editable,
  label,
  onChangeText,
  placeholder,
  value,
  style,
  ...inputProps
}: ProfileFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.fieldGroup}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        autoCapitalize="none"
        editable={editable}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: theme.background,
            borderColor: theme.backgroundSelected,
            color: theme.text,
          },
          style,
        ]}
        value={value}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    gap: Spacing.four,
    justifyContent: 'center',
  },
  header: {
    gap: Spacing.two,
  },
  eyebrow: {
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 40,
    lineHeight: 44,
  },
  body: {
    maxWidth: 560,
  },
  form: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  fieldGroup: {
    gap: Spacing.one,
  },
  input: {
    minHeight: 48,
    borderRadius: Spacing.two,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: Spacing.three,
  },
  bioInput: {
    minHeight: 96,
    paddingTop: Spacing.three,
    textAlignVertical: 'top',
  },
  errorBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    color: '#991B1B',
  },
  submitButton: {
    minHeight: 48,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.72,
  },
});
