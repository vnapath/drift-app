import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useIncomingDrift } from '@/hooks/use-incoming-drift';
import { useTheme } from '@/hooks/use-theme';

export function IncomingDriftScreen() {
  const theme = useTheme();
  const {
    acting,
    drift,
    error,
    hasMatch,
    loading,
    keepCurrentDrift,
    loadIncomingDrift,
    passCurrentDrift,
  } = useIncomingDrift();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
              Incoming Drift
            </ThemedText>
            <ThemedText type="title" style={styles.title}>
              Something found you
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.body}>
              Keep it and a quiet match begins. Pass it and let the current carry it onward.
            </ThemedText>
          </View>

          {loading ? (
            <ThemedView type="backgroundElement" style={styles.statusPanel}>
              <ActivityIndicator color={theme.text} />
              <ThemedText type="small" themeColor="textSecondary">
                Searching the current
              </ThemedText>
            </ThemedView>
          ) : null}

          {!loading && !drift ? (
            <ThemedView type="backgroundElement" style={styles.emptyPanel}>
              <ThemedText type="subtitle" style={styles.panelTitle}>
                The current is quiet.
              </ThemedText>
              <ThemedText themeColor="textSecondary">
                No floating Drifts are waiting right now. Check again after someone releases one.
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                disabled={acting}
                onPress={loadIncomingDrift}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: theme.text },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold" style={{ color: theme.background }}>
                  Search again
                </ThemedText>
              </Pressable>
            </ThemedView>
          ) : null}

          {!loading && drift ? (
            <ThemedView type="backgroundElement" style={styles.driftPanel}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                Anonymous Drift
              </ThemedText>
              <ThemedText style={styles.driftContent}>{drift.content}</ThemedText>

              {hasMatch ? (
                <ThemedView style={styles.matchPanel}>
                  <ThemedText type="smallBold" style={styles.matchText}>
                    Kept. A match has quietly opened.
                  </ThemedText>
                  <ThemedText type="small" style={styles.matchText}>
                    Chat comes next, but not in this milestone.
                  </ThemedText>
                </ThemedView>
              ) : (
                <View style={styles.actions}>
                  <Pressable
                    accessibilityRole="button"
                    disabled={acting}
                    onPress={passCurrentDrift}
                    style={({ pressed }) => [
                      styles.secondaryButton,
                      { borderColor: theme.backgroundSelected },
                      (pressed || acting) && styles.pressed,
                    ]}>
                    {acting ? (
                      <ActivityIndicator color={theme.text} />
                    ) : (
                      <ThemedText type="smallBold">Pass</ThemedText>
                    )}
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    disabled={acting}
                    onPress={keepCurrentDrift}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      { backgroundColor: theme.text },
                      (pressed || acting) && styles.pressed,
                    ]}>
                    {acting ? (
                      <ActivityIndicator color={theme.background} />
                    ) : (
                      <ThemedText type="smallBold" style={{ color: theme.background }}>
                        Keep
                      </ThemedText>
                    )}
                  </Pressable>
                </View>
              )}
            </ThemedView>
          ) : null}

          {error ? (
            <ThemedView style={styles.errorBox}>
              <ThemedText type="smallBold" style={styles.errorText}>
                {error}
              </ThemedText>
            </ThemedView>
          ) : null}
        </ScrollView>
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
  emptyPanel: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  driftPanel: {
    minHeight: 320,
    borderRadius: Spacing.two,
    padding: Spacing.four,
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontSize: 28,
    lineHeight: 34,
  },
  driftContent: {
    fontSize: 28,
    lineHeight: 38,
  },
  actions: {
    gap: Spacing.two,
  },
  primaryButton: {
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
  matchPanel: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
    backgroundColor: '#DBEAFE',
  },
  matchText: {
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
