# Architecture

Drift is an Expo SDK 56 React Native app using Expo Router, TypeScript, and Supabase. Route files live in `src/app`, screen-level UI lives in `src/screens`, and shared building blocks live under `src/components`, `src/hooks`, `src/lib`, `src/services`, and `src/types`.

## Layers

- `src/app`: Expo Router route entry points and layout.
- `src/screens`: focused screen components for product flows.
- `src/components`: reusable UI components.
- `src/lib`: external clients and low-level setup, including Supabase.
- `src/services`: Supabase-facing business operations.
- `src/types`: shared TypeScript and database types.

## Auth Direction

Auth should be centralized behind an `AuthProvider` and `AuthContext`. Screens should consume auth state and actions through a hook rather than calling Supabase auth directly.

Route guard logic should live close to the app layout so unauthenticated users are sent to login, authenticated users without a profile are sent to profile setup, and fully onboarded users reach Home.
