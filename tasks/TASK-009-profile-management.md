# TASK-009: Profile Management

## Goal

Let onboarded users view and edit their public Drift profile.

## Scope

- Replace Profile placeholder screen.
- Load the authenticated user's profile.
- Edit username, display name, age, country, and bio.
- Validate username with the same rules as setup.
- Enforce minimum age of 16.
- Check username availability excluding the current user.
- Save changes through `profile-service`.

## Acceptance Criteria

- Profile screen loads existing user profile values.
- User can update profile fields.
- Invalid username and age values show readable errors.
- Saving updates Supabase and shows confirmation.
- Profile Supabase logic stays inside services.
- Profile business logic stays inside hooks.

## Completion Checklist

- [x] Added update profile service helper.
- [x] Added profile management hook.
- [x] Replaced Profile placeholder screen.
- [x] Aligned age validation to 16+.
- [x] Kept backend calls out of the screen.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
