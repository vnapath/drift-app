import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/hooks/use-auth';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <GuardedStack />
      </AuthProvider>
    </ThemeProvider>
  );
}

function GuardedStack() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { loading, session, profileExists } = useAuth();
  const colors = Colors[colorScheme === 'unspecified' ? 'light' : colorScheme];

  useEffect(() => {
    if (loading) {
      return;
    }

    const rootSegment = segments[0];
    const isLoginRoute = rootSegment === 'login';
    const isProfileSetupRoute = rootSegment === 'profile-setup';

    if (!session && !isLoginRoute) {
      router.replace('/login');
      return;
    }

    if (session && profileExists === false && !isProfileSetupRoute) {
      router.replace('/profile-setup');
      return;
    }

    if (session && profileExists === true && (isLoginRoute || isProfileSetupRoute)) {
      router.replace('/');
    }
  }, [loading, profileExists, router, segments, session]);

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
