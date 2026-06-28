import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function HomeScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Drift"
      title="Home"
      body="A calm launch point for sending a Drift, checking incoming messages, opening chats, and managing profile."
      actions={[
        { label: 'Send a Drift', route: appRoutes.sendDrift },
        { label: 'Incoming Drift', route: appRoutes.incomingDrift },
        { label: 'Chats', route: appRoutes.chatList },
        { label: 'Profile', route: appRoutes.profile },
        { label: 'Log in', route: appRoutes.login },
      ]}
    />
  );
}
