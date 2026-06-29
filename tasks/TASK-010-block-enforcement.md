# TASK-010: Block Enforcement

## Goal

Apply existing block records so blocked users disappear from discovery and chat surfaces.

## Scope

- Read block records for the current user.
- Exclude blocked senders from Incoming Drift.
- Exclude blocked matches from Chat List.
- Prevent opening a blocked match directly.
- Keep admin moderation out of scope.

## Acceptance Criteria

- Incoming Drift does not deliver Drifts sent by users the current user blocked.
- Chat list hides matches with blocked users.
- Direct chat access for a blocked match returns no match.
- Existing report/block creation still works.

## Completion Checklist

- [x] Added block list service helper.
- [x] Filtered Incoming Drift candidates.
- [x] Filtered Chat List matches.
- [x] Blocked direct chat loading for blocked matches.
- [x] Kept admin moderation out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
