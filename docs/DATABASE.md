# Database

Supabase Postgres is the system of record for profiles, drifts, matches, messages, and reports. Auth users are managed by Supabase Auth, while app-specific user data lives in `profiles`.

## Core Tables

- `profiles`: one row per auth user, linked by `id`.
- `drifts`: anonymous text messages with delivery status and current receiver.
- `matches`: accepted Drift connections between two users.
- `messages`: chat messages within a match.
- `reports`: safety reports tied to users, drifts, or matches.
- `blocks`: one-way user blocks created after reports or explicit blocking.

## Profiles

Fields:

- `id`: Supabase auth user id.
- `username`: unique public handle.
- `display_name`: user-facing name.
- `bio`: short profile text.
- `age`: optional age.
- `country`: optional country.
- `avatar_url`: optional profile image URL.
- `created_at`: creation timestamp.
- `updated_at`: last update timestamp.

## Auth Relationship

`profiles.id` should match the Supabase auth user id. App queries should use the authenticated user id as the source of truth for ownership and permissions.

## Status Values

Drift status values: `floating`, `delivered`, `kept`, `passed`, `expired`.

## Data Rules

- A Drift cannot be delivered back to its sender.
- A kept Drift creates a match.
- A passed Drift becomes available again.
- Chat messages require an existing match.

## Required Drift Policies

Incoming Drift needs update access on `drifts` so a receiver can mark a floating Drift as delivered, pass it back to floating, or keep it. Without this policy, Supabase may return no updated row when the app tries to deliver a Drift.

## Future Safety And Expiration Support

- Add report-driven hiding for Drift content after misconduct reports.
- Add server-side scheduled cleanup for the 48-hour Drift expiration rule.

## Drift Expiration

- `delivered_at`: when a Drift was delivered to a receiver.
- `expires_at`: when a delivered Drift should move onward.
- Delivered Drifts expire after 48 hours and return to `floating` if not kept or passed.

## Blocks

Fields:

- `id`: block id.
- `blocker_id`: user creating the block.
- `blocked_user_id`: user being blocked.
- `reason`: optional reason, with `misconduct` used for MVP reports.
- `created_at`: creation timestamp.
