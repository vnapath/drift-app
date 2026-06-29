import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/errors';
import {
  createMessage,
  getMatchForUser,
  getMessagesForMatch,
  subscribeToMatchMessages,
  type ChatMatch,
} from '@/services/chat-service';
import type { Message } from '@/types/database';

export function useChat(matchId: string | null) {
  const { user } = useAuth();
  const [match, setMatch] = useState<ChatMatch | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChat = useCallback(async () => {
    if (!user || !matchId) {
      setMatch(null);
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentMatch = await getMatchForUser(matchId, user.id);

      if (!currentMatch) {
        setMatch(null);
        setMessages([]);
        setError('This anonymous match could not be found.');
        return;
      }

      const matchMessages = await getMessagesForMatch(matchId);
      setMatch(currentMatch);
      setMessages(matchMessages);
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Could not load chat.'));
    } finally {
      setLoading(false);
    }
  }, [matchId, user]);

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  useEffect(() => {
    if (!matchId || !match) {
      return undefined;
    }

    return subscribeToMatchMessages(matchId, (message) => {
      setMessages((currentMessages) => appendUniqueMessage(currentMessages, message));
    });
  }, [match, matchId]);

  function updateContent(nextContent: string) {
    setContent(nextContent);

    if (error) {
      setError(null);
    }
  }

  async function sendMessage() {
    if (!user || !matchId) {
      return;
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError('Write a message before sending.');
      return;
    }

    setSending(true);
    setError(null);

    try {
      const message = await createMessage(matchId, user.id, trimmedContent);
      setMessages((currentMessages) => appendUniqueMessage(currentMessages, message));
      setContent('');
    } catch (sendError) {
      setError(getErrorMessage(sendError, 'Could not send message.'));
    } finally {
      setSending(false);
    }
  }

  return {
    content,
    error,
    loading,
    match,
    messages,
    sending,
    currentUserId: user?.id ?? null,
    reload: loadChat,
    sendMessage,
    updateContent,
  };
}

function appendUniqueMessage(messages: Message[], message: Message): Message[] {
  if (messages.some((currentMessage) => currentMessage.id === message.id)) {
    return messages;
  }

  return [...messages, message].sort(
    (firstMessage, secondMessage) =>
      new Date(firstMessage.created_at).getTime() - new Date(secondMessage.created_at).getTime(),
  );
}
