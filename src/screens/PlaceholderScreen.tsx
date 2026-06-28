import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { appRoutes, type AppRoutePath } from '@/navigation/routes';

type PlaceholderAction = {
  label: string;
  route: AppRoutePath;
};

type PlaceholderScreenProps = {
  title: string;
  eyebrow: string;
  body: string;
  actions?: PlaceholderAction[];
};

export function PlaceholderScreen({ title, eyebrow, body, actions = [] }: PlaceholderScreenProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="code" themeColor="textSecondary" style={styles.eyebrow}>
              {eyebrow}
            </ThemedText>
            <ThemedText type="title" style={styles.title}>
              {title}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.body}>
              {body}
            </ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.panel}>
            <ThemedText type="smallBold">Foundation placeholder</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Business logic, data loading, validation, and realtime behavior will be added in later
              milestones.
            </ThemedText>
          </ThemedView>

          <View style={styles.actions}>
            {actions.map((action) => (
              <Pressable
                key={action.route}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: theme.text },
                  pressed && styles.pressed,
                ]}
                onPress={() => router.push(action.route)}>
                <ThemedText style={[styles.buttonText, { color: theme.background }]}>
                  {action.label}
                </ThemedText>
              </Pressable>
            ))}

            {title !== 'Home' && (
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: theme.backgroundSelected },
                  pressed && styles.pressed,
                ]}
                onPress={() => router.push(appRoutes.home)}>
                <ThemedText>Home</ThemedText>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    gap: Spacing.four,
    justifyContent: 'center',
  },
  header: {
    gap: Spacing.two,
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
  panel: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  actions: {
    gap: Spacing.two,
  },
  button: {
    minHeight: 48,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: Spacing.two,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  buttonText: {
    fontWeight: 700,
  },
  pressed: {
    opacity: 0.75,
  },
});
