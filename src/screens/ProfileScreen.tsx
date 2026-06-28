import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function ProfileScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Account"
      title="Profile"
      body="Display profile details and provide a future logout action."
      actions={[{ label: 'Log in screen', route: appRoutes.login }]}
    />
  );
}
