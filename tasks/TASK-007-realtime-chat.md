# TASK-007: Realtime Chat

## Goal

Make anonymous chat update live when either matched user sends a message.

## Scope

- Subscribe to new messages for the active match.
- Append incoming messages without duplicating locally sent messages.
- Keep message ordering stable.
- Clean up subscriptions when leaving the chat.
- Keep push notifications out of scope.
- Keep presence, typing indicators, read receipts, and edit/delete out of scope.

## Acceptance Criteria

- Chat screen still loads existing messages.
- New messages appear without manually refreshing when Supabase Realtime is enabled.
- Locally sent messages do not duplicate.
- Subscription is removed when the chat screen unmounts or match changes.
- Realtime logic remains behind service/hook boundaries.

## Test Checklist

- Run `npx tsc --noEmit`.
- Run `npx expo export --platform web`.
- Open the same match as both users.
- Send from User A and confirm User B sees it live.
- Send from User B and confirm User A sees it live.

## Completion Checklist

- [x] Added message subscription service helper.
- [x] Wired realtime subscription into chat hook.
- [x] Added duplicate prevention.
- [x] Kept push notifications out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
