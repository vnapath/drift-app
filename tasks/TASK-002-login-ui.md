# TASK-002: Login UI

## Goal

Build the login and signup screen UI that connects to the auth infrastructure.

## Scope

- Add email and password fields.
- Provide sign in and sign up actions through a toggle or separate buttons.
- Show loading state during auth requests.
- Display useful error messages.
- Prevent duplicate submissions while loading.

## Acceptance Criteria

- User can enter email and password.
- User can sign in from the login screen.
- User can sign up from the login screen.
- Loading state is visible while submitting.
- Errors are visible and readable.
- Successful auth transitions into the guarded app flow.

## Test Checklist

- Run `npx tsc --noEmit`.
- Verify empty or invalid fields show an error.
- Verify failed sign in shows an error.
- Verify sign up can create a Supabase auth user.
- Verify successful sign in leaves the login screen.
- Verify buttons are disabled while loading.

## Completion Checklist

- [x] Added email and password fields.
- [x] Added sign in and sign up mode controls.
- [x] Connected form submission to auth infrastructure.
- [x] Added loading state during auth requests.
- [x] Added local validation and readable error handling.
- [x] Disabled duplicate submissions while loading.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
