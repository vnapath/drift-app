import { appRoutes } from '@/navigation/routes';
import { PlaceholderScreen } from '@/screens/PlaceholderScreen';

export function LoginScreen() {
  return (
    <PlaceholderScreen
      eyebrow="Supabase Auth"
      title="Log in"
      body="Entry point for sign up and log in flows."
      actions={[{ label: 'Continue to profile setup', route: appRoutes.profileSetup }]}
    />
  );
}
