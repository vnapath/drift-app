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
import { useProfile, type ProfileFormState } from '@/hooks/use-profile';
import { useTheme } from '@/hooks/use-theme';

export function ProfileScreen() {
  const theme = useTheme();
  const { error, form, loading, saved, saving, saveProfile, updateField } = useProfile();

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
                Profile
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                Your signal
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.body}>
                Keep your public Drift identity simple, human, and a little mysterious.
              </ThemedText>
            </View>

            {loading ? (
              <ThemedView type="backgroundElement" style={styles.statusPanel}>
                <ActivityIndicator color={theme.text} />
                <ThemedText type="small" themeColor="textSecondary">
                  Loading profile
                </ThemedText>
              </ThemedView>
            ) : (
              <ThemedView type="backgroundElement" style={styles.form}>
                <ProfileField
                  editable={!saving}
                  label="Username"
                  onChangeText={(value) => updateField('username', value)}
                  placeholder="quiet_signal"
                  value={form.username}
                />
                <ProfileField
                  editable={!saving}
                  label="Display name"
                  onChangeText={(value) => updateField('displayName', value)}
                  placeholder="Your name"
                  value={form.displayName}
                />
                <ProfileField
                  editable={!saving}
                  inputMode="numeric"
                  keyboardType="number-pad"
                  label="Age"
                  onChangeText={(value) => updateField('age', value)}
                  placeholder="25"
                  value={form.age}
                />
                <ProfileField
                  editable={!saving}
                  label="Country"
                  onChangeText={(value) => updateField('country', value)}
                  placeholder="United States"
                  value={form.country}
                />
                <ProfileField
                  editable={!saving}
                  label="Bio"
                  multiline
                  onChangeText={(value) => updateField('bio', value)}
                  placeholder="A small clue, not the whole map."
                  style={styles.bioInput}
                  value={form.bio}
                />

                {saved ? (
                  <ThemedView style={styles.successBox}>
                    <ThemedText type="smallBold" style={styles.successText}>
                      Profile saved.
                    </ThemedText>
                  </ThemedView>
                ) : null}

                {error ? (
                  <ThemedView style={styles.errorBox}>
                    <ThemedText type="smallBold" style={styles.errorText}>
                      {error}
                    </ThemedText>
                  </ThemedView>
                ) : null}

                <Pressable
                  accessibilityRole="button"
                  disabled={saving}
                  onPress={saveProfile}
                  style={({ pressed }) => [
                    styles.submitButton,
                    { backgroundColor: theme.text },
                    (pressed || saving) && styles.pressed,
                  ]}>
                  {saving ? (
                    <ActivityIndicator color={theme.background} />
                  ) : (
                    <ThemedText type="smallBold" style={{ color: theme.background }}>
                      Save profile
                    </ThemedText>
                  )}
                </Pressable>
              </ThemedView>
            )}
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
  statusPanel: {
    minHeight: 64,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
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
  submitButton: {
    minHeight: 48,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  successBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    backgroundColor: '#DBEAFE',
  },
  successText: {
    color: '#1E3A8A',
  },
  errorBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    color: '#991B1B',
  },
  pressed: {
    opacity: 0.72,
  },
});
