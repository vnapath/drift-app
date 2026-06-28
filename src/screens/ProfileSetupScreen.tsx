import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function ProfileSetupScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Required profile"
      title="Create profile"
      body="Collect display name, age, country, and bio before the user enters the app."
      actions={[{ label: 'Go to Home', route: appRoutes.home }]}
    />
  );
}
