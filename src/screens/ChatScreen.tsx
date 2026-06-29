import { useLocalSearchParams } from 'expo-router';
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
import { useChat } from '@/hooks/use-chat';
import { useReportMatch } from '@/hooks/use-report-match';
import { useTheme } from '@/hooks/use-theme';

export function ChatScreen() {
  const theme = useTheme();
  const { matchId } = useLocalSearchParams<{ matchId?: string }>();
  const {
    content,
    currentUserId,
    error,
    loading,
    match,
    messages,
    sending,
    sendMessage,
    updateContent,
  } = useChat(matchId ?? null);
  const { reported, reporting, reportError, reportMatch } = useReportMatch(currentUserId, match);

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <View style={styles.content}>
            <View style={styles.header}>
              <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
                Anonymous chat
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                Quiet signal
              </ThemedText>
              {match?.drift_content ? (
                <ThemedText themeColor="textSecondary" numberOfLines={2} style={styles.body}>
                  Started from: {match.drift_content}
                </ThemedText>
              ) : null}
            </View>

            {loading ? (
              <ThemedView type="backgroundElement" style={styles.statusPanel}>
                <ActivityIndicator color={theme.text} />
                <ThemedText type="small" themeColor="textSecondary">
                  Opening the channel
                </ThemedText>
              </ThemedView>
            ) : null}

            {!loading && !match ? (
              <ThemedView type="backgroundElement" style={styles.emptyPanel}>
                <ThemedText type="subtitle" style={styles.panelTitle}>
                  No match selected.
                </ThemedText>
                <ThemedText themeColor="textSecondary">
                  Open a chat from your matches list.
                </ThemedText>
              </ThemedView>
            ) : null}

            {!loading && match ? (
              <>
                <ScrollView
                  contentContainerStyle={styles.messages}
                  showsVerticalScrollIndicator={false}>
                  {messages.length === 0 ? (
                    <ThemedView type="backgroundElement" style={styles.emptyPanel}>
                      <ThemedText type="smallBold">No messages yet.</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        Say hello without revealing too much too fast.
                      </ThemedText>
                    </ThemedView>
                  ) : null}

                  {messages.map((message) => {
                    const isMine = message.sender_id === currentUserId;

                    return (
                      <View
                        key={message.id}
                        style={[
                          styles.messageRow,
                          isMine ? styles.myMessageRow : styles.theirMessageRow,
                        ]}>
                        <ThemedView
                          style={[
                            styles.messageBubble,
                            {
                              backgroundColor: isMine ? theme.text : theme.backgroundElement,
                            },
                          ]}>
                          <ThemedText style={{ color: isMine ? theme.background : theme.text }}>
                            {message.content}
                          </ThemedText>
                        </ThemedView>
                      </View>
                    );
                  })}
                </ScrollView>

                {reported ? (
                  <ThemedView style={styles.safetyBox}>
                    <ThemedText type="smallBold" style={styles.safetyText}>
                      Report sent. This signal is now blocked from your current.
                    </ThemedText>
                  </ThemedView>
                ) : null}

                {error || reportError ? (
                  <ThemedView style={styles.errorBox}>
                    <ThemedText type="smallBold" style={styles.errorText}>
                      {error ?? reportError}
                    </ThemedText>
                  </ThemedView>
                ) : null}

                <View style={styles.composer}>
                  <TextInput
                    editable={!sending && !reported}
                    onChangeText={updateContent}
                    placeholder={reported ? 'This chat has been blocked' : 'Send a quiet note'}
                    placeholderTextColor={theme.textSecondary}
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.backgroundElement,
                        borderColor: theme.backgroundSelected,
                        color: theme.text,
                      },
                    ]}
                    value={content}
                  />
                  <Pressable
                    accessibilityRole="button"
                    disabled={sending || reported}
                    onPress={sendMessage}
                    style={({ pressed }) => [
                      styles.sendButton,
                      { backgroundColor: theme.text },
                      (pressed || sending) && styles.pressed,
                    ]}>
                    {sending ? (
                      <ActivityIndicator color={theme.background} />
                    ) : (
                      <ThemedText type="smallBold" style={{ color: theme.background }}>
                        Send
                      </ThemedText>
                    )}
                  </Pressable>
                </View>

                <ThemedView type="backgroundElement" style={styles.safetyPanel}>
                  <View style={styles.safetyCopy}>
                    <ThemedText type="smallBold">Safety</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      Report misconduct and block this anonymous match.
                    </ThemedText>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    disabled={reporting || reported}
                    onPress={reportMatch}
                    style={({ pressed }) => [
                      styles.reportButton,
                      { borderColor: theme.backgroundSelected },
                      (pressed || reporting || reported) && styles.pressed,
                    ]}>
                    {reporting ? (
                      <ActivityIndicator color={theme.text} />
                    ) : (
                      <ThemedText type="smallBold">
                        {reported ? 'Reported' : 'Report misconduct'}
                      </ThemedText>
                    )}
                  </Pressable>
                </ThemedView>
              </>
            ) : null}
          </View>
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
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.one,
  },
  eyebrow: {
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
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
    gap: Spacing.one,
  },
  panelTitle: {
    fontSize: 28,
    lineHeight: 34,
  },
  messages: {
    flexGrow: 1,
    gap: Spacing.two,
    justifyContent: 'flex-end',
    paddingVertical: Spacing.two,
  },
  messageRow: {
    flexDirection: 'row',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '82%',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  composer: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    minHeight: 52,
    borderRadius: Spacing.two,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: Spacing.three,
  },
  sendButton: {
    minHeight: 52,
    minWidth: 88,
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
  safetyPanel: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  safetyCopy: {
    gap: Spacing.one,
  },
  reportButton: {
    minHeight: 48,
    borderRadius: Spacing.two,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  safetyBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    backgroundColor: '#DBEAFE',
  },
  safetyText: {
    color: '#1E3A8A',
  },
  pressed: {
    opacity: 0.72,
  },
});
