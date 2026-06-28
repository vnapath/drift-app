# TASK-003: Profile Setup

## Goal

Let authenticated users create their required app profile before entering the main app.

## Scope

- Build a profile setup form.
- Collect `display_name`, `age`, `country`, and `bio`.
- Save the profile linked to the current auth user id.
- Redirect to Home after a successful save.
- Keep Supabase profile writes in a service file.

## Acceptance Criteria

- Authenticated user without a profile sees profile setup.
- Form includes `display_name`, `age`, `country`, and `bio`.
- Required fields are validated before save.
- Saved profile uses the authenticated user's id.
- Successful save redirects to Home.
- Save errors are shown to the user.

## Test Checklist

- Run `npx tsc --noEmit`.
- Sign in as a new user and confirm profile setup appears.
- Try saving invalid data and confirm validation.
- Save a valid profile and confirm a row appears in Supabase.
- Confirm the app redirects to Home after save.
- Restart the app and confirm profile setup is skipped.
