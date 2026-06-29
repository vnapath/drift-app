# TASK-005: Incoming Drift

## Goal

Let authenticated users discover Drifts released by other users, then pass or keep them.

## Scope

- Fetch a random `floating` Drift.
- Exclude Drifts sent by the current user.
- Mark the Drift as `delivered` when opened.
- Pass returns the Drift to `floating`.
- Keep sets the Drift to `kept` and creates a match.
- Keep chat implementation out of scope.
- Keep Supabase logic in `drift-service.ts`.
- Keep business logic in hooks.
- Keep screen code focused on presentation.

## Acceptance Criteria

- Incoming Drift screen loads a Drift not sent by the authenticated user.
- Empty state appears when no Drifts are available.
- Loading state appears while fetching or submitting.
- Pass action returns the Drift to the floating pool.
- Keep action creates a match for sender and receiver.
- Keep action does not open chat logic yet.
- Errors are visible and readable.

## Test Checklist

- Run `npx tsc --noEmit`.
- Run `npx expo export --platform web`.
- Release a Drift from one user.
- Log in as another user and confirm Incoming Drift can receive it.
- Confirm opening marks the Drift delivered.
- Confirm Pass returns the Drift to floating.
- Confirm Keep creates a match.

## Completion Checklist

- [x] Added incoming Drift service functions.
- [x] Added incoming Drift hook.
- [x] Replaced Incoming Drift placeholder screen.
- [x] Excluded current user's own Drifts.
- [x] Marked opened Drifts as delivered.
- [x] Implemented Pass.
- [x] Implemented Keep and match creation.
- [x] Kept chat implementation out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
