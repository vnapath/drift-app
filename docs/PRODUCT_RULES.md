# Product Rules

These decisions are source-of-truth product rules for current MVP work.

## Drift Discovery

- Users can receive unlimited Drifts.
- Users can have multiple active incoming Drifts.
- Incoming Drift may show one or more available Drifts over time.
- A user must never receive their own Drift.
- Opening an incoming Drift marks it as `delivered`.
- Passing a Drift returns it to `floating`.
- A passed Drift may return to the same user later.
- Keeping a Drift immediately creates a match.
- Drift distribution, scoring, and advanced routing are not part of the current milestone.

## Expiration

- Drifts should expire after 48 hours in a receiver state.
- Expired or timed-out Drifts should move onward and become available for someone else.
- Database support should add `expires_at` or delivery timestamps before implementing expiration automation.

## Conversation

- Chats start anonymous.
- Identity reveal is not part of the current MVP.

## Safety

- Minimum age is 16.
- Report reason for MVP: misconduct.
- Reported users should be blocked automatically.
- Reported Drift content should disappear immediately.
- Future database support should add `blocks` and report-driven hiding/blocking behavior.
- MVP reporting uses a fixed `misconduct` reason.
- Admin moderation remains manual in Supabase until a later milestone.

## Tone And Brand

- Tone should be mysterious and playful.
- Visual direction should lean blue.
- Brand motif: flying saucer.
