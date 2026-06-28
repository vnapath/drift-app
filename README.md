# Drift

Drift is an Expo + React Native social app for sending short anonymous messages. A user can send a Drift, another user can receive it, and the receiver can keep it to start a chat or pass it forward.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   copy .env.example .env
   ```

3. Fill in Supabase project values in `.env`.

## Branch Workflow

- Use feature branches for implementation work.
- Current auth planning branch: `feature/auth`.
- Keep changes small and tied to a task in `tasks/`.
- Open a pull request with a short summary, test notes, and any follow-up work.

## Typecheck

Run TypeScript without emitting files:

```bash
npx tsc --noEmit
```

## Run Expo

Start the Expo development server:

```bash
npx expo start
```

Run directly for a target when needed:

```bash
npm run ios
npm run android
npm run web
```

## Project Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Database](docs/DATABASE.md)
- [Roadmap](docs/ROADMAP.md)
- [Workflow](docs/WORKFLOW.md)
