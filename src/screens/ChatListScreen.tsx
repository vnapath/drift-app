import { router } from 'expo-router';
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
import { useChatList } from '@/hooks/use-chat-list';
import { useTheme } from '@/hooks/use-theme';

export function ChatListScreen() {
  const theme = useTheme();
  const { error, loading, matches, reload } = useChatList();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
              Anonymous matches
            </ThemedText>
            <ThemedText type="title" style={styles.title}>
              Chats
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.body}>
              Conversations begin only after someone keeps a Drift.
            </ThemedText>
          </View>

          {loading ? (
            <ThemedView type="backgroundElement" style={styles.statusPanel}>
              <ActivityIndicator color={theme.text} />
              <ThemedText type="small" themeColor="textSecondary">
                Finding quiet matches
              </ThemedText>
            </ThemedView>
          ) : null}

          {!loading && matches.length === 0 ? (
            <ThemedView type="backgroundElement" style={styles.emptyPanel}>
              <ThemedText type="subtitle" style={styles.panelTitle}>
                No chats yet.
              </ThemedText>
              <ThemedText themeColor="textSecondary">
                Keep a Drift, or wait for someone to keep yours.
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                onPress={reload}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: theme.text },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold" style={{ color: theme.background }}>
                  Refresh
                </ThemedText>
              </Pressable>
            </ThemedView>
          ) : null}

          {!loading && matches.length > 0 ? (
            <View style={styles.matchList}>
              {matches.map((match, index) => (
                <Pressable
                  accessibilityRole="button"
                  key={match.id}
                  onPress={() =>
                    router.push({
                      pathname: '/chat',
                      params: { matchId: match.id },
                    })
                  }
                  style={({ pressed }) => [
                    styles.matchCard,
                    { backgroundColor: theme.backgroundElement },
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText type="smallBold">Anonymous match {index + 1}</ThemedText>
                  <ThemedText themeColor="textSecondary" numberOfLines={2}>
                    {match.drift_content ?? 'A kept Drift opened this conversation.'}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
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
  panelTitle: {
    fontSize: 28,
    lineHeight: 34,
  },
  matchList: {
    gap: Spacing.three,
  },
  matchCard: {
    minHeight: 112,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
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
  pressed: {
    opacity: 0.72,
  },
});
