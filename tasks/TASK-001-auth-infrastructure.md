# TASK-001: Auth Infrastructure

## Goal

Create the shared authentication foundation for Drift without placing Supabase auth calls directly inside screens.

## Scope

- Add `AuthProvider` and `AuthContext`.
- Persist Supabase sessions across app restarts.
- Expose `user`, `session`, and `loading` state.
- Expose `signIn`, `signUp`, and `signOut` functions.
- Add route guard logic for unauthenticated users, authenticated users without profiles, and onboarded users.

## Acceptance Criteria

- App root is wrapped in `AuthProvider`.
- Auth state initializes from the current Supabase session.
- Auth state updates when Supabase emits auth changes.
- Consumers can access auth state and actions through a typed hook.
- Unauthenticated users are routed to login.
- Authenticated users without a profile are routed to profile setup.
- Authenticated users with a profile can reach Home.
- No screen calls Supabase auth directly.

## Test Checklist

- Run `npx tsc --noEmit`.
- Launch Expo and verify the app does not crash on startup.
- Start logged out and confirm login route is shown.
- Sign in and confirm auth state updates.
- Sign out and confirm auth state clears.
- Restart the app and confirm session persistence.
