import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function ChatListScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Matches"
      title="Chats"
      body="List accepted Drift connections after a user keeps a Drift."
      actions={[{ label: 'Open chat', route: appRoutes.chat }]}
    />
  );
}
