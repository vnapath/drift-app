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

type AuthMode = 'sign-in' | 'sign-up';

export function LoginScreen() {
  const theme = useTheme();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignIn = mode === 'sign-in';
  const title = isSignIn ? 'Log in' : 'Create account';
  const submitLabel = isSignIn ? 'Log in' : 'Sign up';

  async function handleSubmit() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Enter an email and password.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (isSignIn) {
        await signIn(trimmedEmail, password);
      } else {
        await signUp(trimmedEmail, password);
      }
    } catch (submitError) {
      setError(getErrorMessage(submitError, 'Authentication failed.'));
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
                Supabase Auth
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                {title}
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.body}>
                Use your email and password to continue into Drift.
              </ThemedText>
            </View>

            <ThemedView type="backgroundElement" style={styles.form}>
              <View style={styles.modeRow}>
                <Pressable
                  accessibilityRole="button"
                  disabled={submitting}
                  onPress={() => setMode('sign-in')}
                  style={[
                    styles.modeButton,
                    { backgroundColor: isSignIn ? theme.text : theme.backgroundSelected },
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={{ color: isSignIn ? theme.background : theme.text }}>
                    Log in
                  </ThemedText>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={submitting}
                  onPress={() => setMode('sign-up')}
                  style={[
                    styles.modeButton,
                    { backgroundColor: !isSignIn ? theme.text : theme.backgroundSelected },
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={{ color: !isSignIn ? theme.background : theme.text }}>
                    Sign up
                  </ThemedText>
                </Pressable>
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="smallBold">Email</ThemedText>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  editable={!submitting}
                  inputMode="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={theme.textSecondary}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.backgroundSelected,
                      color: theme.text,
                    },
                  ]}
                  textContentType="emailAddress"
                  value={email}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText type="smallBold">Password</ThemedText>
                <TextInput
                  autoCapitalize="none"
                  editable={!submitting}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={theme.textSecondary}
                  secureTextEntry
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.backgroundSelected,
                      color: theme.text,
                    },
                  ]}
                  textContentType={isSignIn ? 'password' : 'newPassword'}
                  value={password}
                />
              </View>

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
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.submitButton,
                  { backgroundColor: theme.text },
                  (pressed || submitting) && styles.pressed,
                ]}>
                {submitting ? (
                  <ActivityIndicator color={theme.background} />
                ) : (
                  <ThemedText type="smallBold" style={{ color: theme.background }}>
                    {submitLabel}
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
  modeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  modeButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
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
