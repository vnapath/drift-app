import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  type PressableProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { getErrorMessage } from '@/lib/errors';
import { appRoutes, type AppRoutePath } from '@/navigation/routes';
import { getProfileById } from '@/services/profile-service';
import type { Profile } from '@/types/database';

type HomeCard = {
  title: string;
  body: string;
  route: AppRoutePath;
};

const homeCards: HomeCard[] = [
  {
    title: 'Send Drift',
    body: 'Write a short anonymous message.',
    route: appRoutes.sendDrift,
  },
  {
    title: 'Incoming Drift',
    body: 'Check whether something found you.',
    route: appRoutes.incomingDrift,
  },
  {
    title: 'Chats',
    body: 'Open conversations after a Drift is kept.',
    route: appRoutes.chatList,
  },
  {
    title: 'Profile',
    body: 'Review your public Drift identity.',
    route: appRoutes.profile,
  },
];

export function HomeScreen() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!user) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);

      try {
        const currentProfile = await getProfileById(user.id);

        if (isMounted) {
          setProfile(currentProfile);
          setError(null);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(getErrorMessage(loadError, 'Could not load profile.'));
        }
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const displayName = profile?.display_name || user?.email || 'there';

  async function handleSignOut() {
    setSigningOut(true);
    setError(null);

    try {
      await signOut();
    } catch (signOutError) {
      setError(getErrorMessage(signOutError, 'Could not log out.'));
      setSigningOut(false);
    }
  }

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
              Home
            </ThemedText>
            <ThemedText type="title" style={styles.title}>
              Welcome, {displayName}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.body}>
              Choose what you want to do next.
            </ThemedText>
          </View>

          {profileLoading ? (
            <ThemedView type="backgroundElement" style={styles.statusPanel}>
              <ActivityIndicator color={theme.text} />
              <ThemedText type="small" themeColor="textSecondary">
                Loading profile
              </ThemedText>
            </ThemedView>
          ) : null}

          <View style={styles.cardGrid}>
            {homeCards.map((card) => (
              <HomeActionCard
                key={card.route}
                body={card.body}
                onPress={() => router.push(card.route)}
                title={card.title}
              />
            ))}
          </View>

          <ThemedView type="backgroundElement" style={styles.settings}>
            <View style={styles.settingsCopy}>
              <ThemedText type="smallBold">Settings</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Account controls for this session.
              </ThemedText>
            </View>

            {error ? (
              <ThemedView style={styles.errorBox}>
                <ThemedText type="smallBold" style={styles.errorText}>
                  {error}
                </ThemedText>
              </ThemedView>
            ) : null}

            <Pressable
              accessibilityRole="button"
              disabled={signingOut}
              onPress={handleSignOut}
              style={({ pressed }) => [
                styles.logoutButton,
                { borderColor: theme.backgroundSelected },
                (pressed || signingOut) && styles.pressed,
              ]}>
              {signingOut ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                <ThemedText type="smallBold">Log out</ThemedText>
              )}
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

type HomeActionCardProps = {
  body: string;
  title: string;
  onPress: PressableProps['onPress'];
};

function HomeActionCard({ body, title, onPress }: HomeActionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.cardBody}>
        {body}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },
  eyebrow: {
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 40,
    lineHeight: 44,
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
  cardGrid: {
    gap: Spacing.three,
  },
  card: {
    minHeight: 136,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 28,
    lineHeight: 34,
  },
  cardBody: {
    maxWidth: 440,
  },
  settings: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  settingsCopy: {
    gap: Spacing.one,
  },
  logoutButton: {
    minHeight: 52,
    borderRadius: Spacing.two,
    borderWidth: 1,
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
  pressed: {
    opacity: 0.72,
  },
});
