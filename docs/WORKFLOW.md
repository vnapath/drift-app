# Workflow

## Development

- Work from a feature branch.
- Keep implementation scoped to one task when possible.
- Prefer small, reviewable pull requests.
- Keep Supabase logic in service files.
- Keep screens focused on UI and user interaction.

## Quality Checks

Before opening a pull request, run:

```bash
npx tsc --noEmit
```

Run Expo locally for manual checks:

```bash
npx expo start
```

## Pull Requests

Every pull request should include:

- What changed.
- How it was tested.
- Any known gaps or follow-up tasks.
