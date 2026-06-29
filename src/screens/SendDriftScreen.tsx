import { router } from 'expo-router';
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
import { useReleaseDrift } from '@/hooks/use-release-drift';
import { useTheme } from '@/hooks/use-theme';
import { appRoutes } from '@/navigation/routes';

export function SendDriftScreen() {
  const theme = useTheme();
  const {
    content,
    canSubmit,
    error,
    isOverLimit,
    isReleased,
    isSubmitting,
    remainingCharacters,
    composeAnother,
    releaseDrift,
    updateContent,
  } = useReleaseDrift();

  if (isReleased) {
    return <ReleasedConfirmation onComposeAnother={composeAnother} />;
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
                Release Drift
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                Send something into the current
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.body}>
                Write one short anonymous thought. No audience, no performance, just a signal for
                someone to discover later.
              </ThemedText>
            </View>

            <ThemedView type="backgroundElement" style={styles.form}>
              <View style={styles.formHeader}>
                <ThemedText type="smallBold">Your Drift</ThemedText>
                <ThemedText
                  type="smallBold"
                  themeColor={isOverLimit ? undefined : 'textSecondary'}
                  style={isOverLimit ? styles.limitWarning : undefined}>
                  {remainingCharacters}
                </ThemedText>
              </View>

              <TextInput
                editable={!isSubmitting}
                multiline
                onChangeText={updateContent}
                placeholder="Say the thing that might find the right stranger."
                placeholderTextColor={theme.textSecondary}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    borderColor: isOverLimit ? '#991B1B' : theme.backgroundSelected,
                    color: theme.text,
                  },
                ]}
                textAlignVertical="top"
                value={content}
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
                disabled={!canSubmit}
                onPress={releaseDrift}
                style={({ pressed }) => [
                  styles.submitButton,
                  { backgroundColor: canSubmit ? theme.text : theme.backgroundSelected },
                  (pressed || isSubmitting) && styles.pressed,
                ]}>
                {isSubmitting ? (
                  <ActivityIndicator color={theme.background} />
                ) : (
                  <ThemedText
                    type="smallBold"
                    style={{ color: canSubmit ? theme.background : theme.textSecondary }}>
                    Release Drift
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

type ReleasedConfirmationProps = {
  onComposeAnother: () => void;
};

function ReleasedConfirmation({ onComposeAnother }: ReleasedConfirmationProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.confirmationContent}>
          <ThemedView type="backgroundElement" style={styles.confirmationPanel}>
            <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
              Released
            </ThemedText>
            <ThemedText type="title" style={styles.title}>
              Your Drift has entered the current.
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.body}>
              Someone out there may discover it soon.
            </ThemedText>

            <View style={styles.confirmationActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace(appRoutes.home)}
                style={({ pressed }) => [
                  styles.submitButton,
                  { backgroundColor: theme.text },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold" style={{ color: theme.background }}>
                  Return Home
                </ThemedText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={onComposeAnother}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: theme.backgroundSelected },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold">Release another</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
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
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  input: {
    minHeight: 180,
    borderRadius: Spacing.two,
    borderWidth: 1,
    fontSize: 18,
    lineHeight: 26,
    padding: Spacing.three,
  },
  limitWarning: {
    color: '#991B1B',
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
    minHeight: 52,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  secondaryButton: {
    minHeight: 52,
    borderRadius: Spacing.two,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.72,
  },
  confirmationContent: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    justifyContent: 'center',
  },
  confirmationPanel: {
    borderRadius: Spacing.two,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  confirmationActions: {
    gap: Spacing.two,
  },
});
