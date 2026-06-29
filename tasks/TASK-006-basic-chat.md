# TASK-006: Basic Anonymous Chat

## Goal

Let matched users view their anonymous matches, open a conversation, and send text messages.

## Scope

- List matches for the authenticated user.
- Open a chat by match id.
- Load text messages for the match.
- Send text messages.
- Keep chats anonymous.
- Keep realtime updates out of scope for this task.
- Keep Supabase logic in service files.
- Keep business logic in hooks.
- Keep screens focused on presentation.

## Acceptance Criteria

- Chat list shows matches for the current user.
- Empty state appears when there are no matches.
- Chat screen requires a match id.
- Chat screen lists messages oldest to newest.
- Current user messages align right.
- Other user messages align left.
- Empty message submissions are prevented.
- Message save uses the authenticated user id.

## Test Checklist

- Run `npx tsc --noEmit`.
- Run `npx expo export --platform web`.
- Create or keep a Drift to create a match.
- Open Chats and confirm the match appears.
- Open chat and send a message.
- Log in as the other matched user and confirm the message appears.

## Completion Checklist

- [x] Added chat service functions.
- [x] Added chat list hook.
- [x] Added chat detail hook.
- [x] Replaced Chat List placeholder.
- [x] Replaced Chat placeholder.
- [x] Kept realtime out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
