# TASK-011: Drift Expiration

## Goal

Support the product rule that delivered Drifts expire after 48 hours and return to the current.

## Scope

- Add `delivered_at` and `expires_at` to Drift typing.
- Set delivery and expiration timestamps when a Drift is delivered.
- Clear timestamps when a Drift is passed back to floating.
- Clear expiration when a Drift is kept.
- Recycle expired delivered Drifts before incoming discovery.
- Keep background jobs and server-side scheduled cleanup out of scope for now.

## Supabase SQL Needed

Run this before testing expiration:

```sql
alter table public.drifts
add column if not exists delivered_at timestamptz,
add column if not exists expires_at timestamptz;

create index if not exists drifts_status_expires_at_idx
on public.drifts (status, expires_at);
```

The existing `Users can update incoming drifts` policy must allow delivered Drifts to return to `floating` with `current_receiver_id`, `delivered_at`, and `expires_at` cleared.

## Completion Checklist

- [x] Added Drift timing fields to TypeScript model.
- [x] Set 48-hour expiration when delivering a Drift.
- [x] Recycled expired delivered Drifts before discovery.
- [x] Cleared timing fields when passing a Drift.
- [x] Kept scheduled server cleanup out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
