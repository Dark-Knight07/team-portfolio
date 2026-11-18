# Contributing to TetraNex projects

The full beginner guide is in [`docs/GITHUB_WORKFLOW.md`](docs/GITHUB_WORKFLOW.md).
This page is the short checklist.

## Rules

1. **Never push to `main` or `develop`.** Both are protected. Use a branch and a Pull Request.
2. **One branch per task.** Name it `feature/<short-name>`, `bugfix/<short-name>` or `hotfix/<short-name>`.
3. **Pull `develop` before you start** and before you open a PR.
4. **Run `npm run check` locally** before pushing. CI runs the same checks.
5. **Every PR needs one approval** from another team member and green CI.
6. **Never commit secrets** (`.env*`, API keys, tokens, passwords).

## Commit messages (Conventional Commits)

```
<type>(<scope>): <short summary in the imperative>

feat(team): add Asadullah profile photo
fix(nav): close mobile menu after clicking a link
docs(readme): document environment variables
chore(deps): bump next to 16.4.7
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.

## Pull request checklist

- [ ] Branch is up to date with `develop`
- [ ] `npm run check` passes
- [ ] PR template is filled in
- [ ] No secrets or `.env` files included
