# Database

Supabase Postgres is the system of record for profiles, drifts, matches, messages, and reports. Auth users are managed by Supabase Auth, while app-specific user data lives in `profiles`.

## Core Tables

- `profiles`: one row per auth user, linked by `id`.
- `drifts`: anonymous text messages with delivery status and current receiver.
- `matches`: accepted Drift connections between two users.
- `messages`: chat messages within a match.
- `reports`: safety reports tied to users, drifts, or matches.

## Auth Relationship

`profiles.id` should match the Supabase auth user id. App queries should use the authenticated user id as the source of truth for ownership and permissions.

## Status Values

Drift status values: `floating`, `delivered`, `kept`, `passed`, `expired`.

## Data Rules

- A Drift cannot be delivered back to its sender.
- A kept Drift creates a match.
- A passed Drift becomes available again.
- Chat messages require an existing match.
