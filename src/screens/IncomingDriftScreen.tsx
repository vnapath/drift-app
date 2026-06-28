import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function IncomingDriftScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Keep or pass"
      title="Incoming Drift"
      body="Show one random Drift that was not sent by the current user."
      actions={[{ label: 'Open matched chat', route: appRoutes.chat }]}
    />
  );
}
