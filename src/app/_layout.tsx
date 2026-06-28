import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="index" options={{ title: 'Drift' }} />
        <Stack.Screen name="login" options={{ title: 'Log in' }} />
        <Stack.Screen name="profile-setup" options={{ title: 'Create profile' }} />
        <Stack.Screen name="send-drift" options={{ title: 'Send Drift' }} />
        <Stack.Screen name="incoming-drift" options={{ title: 'Incoming Drift' }} />
        <Stack.Screen name="chats" options={{ title: 'Chats' }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      </Stack>
    </ThemeProvider>
  );
}
