# TASK-008: Safety Report And Block

## Goal

Let a user report misconduct from an anonymous chat and automatically block the reported user.

## Scope

- Add report/block data types.
- Add report service logic.
- Add reporting hook.
- Add chat safety UI.
- Use fixed MVP report reason: `misconduct`.
- Disable the local chat composer after a report succeeds.
- Keep admin moderation dashboard out of scope.

## Acceptance Criteria

- User can report a matched chat for misconduct.
- Report creates a row in `reports`.
- Report also creates or updates a row in `blocks`.
- Successful report shows a calm confirmation.
- Failed report shows a readable error.
- Reported chat stops accepting new local messages.

## Supabase SQL Needed

Add `blocks` before testing this task:

```sql
create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_user_id uuid not null references public.profiles(id) on delete cascade,
  reason text,
  created_at timestamptz not null default now(),
  unique (blocker_id, blocked_user_id)
);

alter table public.blocks enable row level security;

drop policy if exists "Users can create their own blocks" on public.blocks;
drop policy if exists "Users can read their own blocks" on public.blocks;

create policy "Users can create their own blocks"
on public.blocks
for insert
to authenticated
with check (blocker_id = auth.uid());

create policy "Users can read their own blocks"
on public.blocks
for select
to authenticated
using (blocker_id = auth.uid());
```

## Completion Checklist

- [x] Added `blocks` database type.
- [x] Added report/block service.
- [x] Added report hook.
- [x] Added chat report UI.
- [x] Kept admin moderation out of scope.
- [x] Ran `npx tsc --noEmit`.
- [x] Ran `npx expo export --platform web`.
