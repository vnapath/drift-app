# TASK-004: Home Auth State

## Goal

Show a useful authenticated Home screen that confirms the current user state and provides MVP navigation placeholders.

## Scope

- Show a welcome message for the authenticated user.
- Add logout action.
- Add placeholder navigation buttons for Send Drift, Incoming Drift, Chats, and Profile.
- Keep UI connected to auth context rather than direct Supabase calls.

## Acceptance Criteria

- Home only appears for authenticated, onboarded users.
- Welcome message reflects available profile or user information.
- Logout signs the user out and returns to login.
- Placeholder navigation buttons are visible.
- Navigation buttons route to existing placeholder screens when available.

## Test Checklist

- Run `npx tsc --noEmit`.
- Sign in with a completed profile and confirm Home appears.
- Confirm the welcome message renders.
- Tap each navigation button and confirm routing.
- Tap logout and confirm the login screen appears.
- Restart the app and confirm the correct auth state route is shown.

## Completion Checklist

- [x] Added authenticated welcome greeting.
- [x] Loaded and displayed the user's profile display name.
- [x] Added Send Drift, Incoming Drift, Chats, and Profile cards.
- [x] Added Settings section.
- [x] Added logout button using `useAuth().signOut`.
- [x] Wired cards to existing screens.
- [x] Kept Drift logic out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
