# Standards

Coding conventions, commit rules, review criteria, and quality expectations across the monorepo.

## TypeScript

- Enable `strict: true` — no implicit `any`.
- Prefer explicit return types on exported functions.
- Use `type` for pure type aliases; use `interface` for object shapes that may be extended.
- Do not use `// @ts-ignore` — fix the underlying issue instead.

## Imports

- Use absolute package imports (`@popara/ui`) over deep relative paths.
- Group imports: **external → internal packages → relative files**. Separate groups with a blank line.

## Naming Conventions

| Entity                 | Convention         | Example                       |
| ---------------------- | ------------------ | ----------------------------- |
| Source files           | `kebab-case`       | `user-service.ts`             |
| React components       | `PascalCase`       | `UserCard.tsx`                |
| Variables / functions  | `camelCase`        | `getUserById`                 |
| Module-level constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`             |
| Types / Interfaces     | `PascalCase`       | `UserProfile`, `IUserService` |

## Formatting

Prettier is the single source of formatting truth — never hand-format code.

```bash
pnpm format          # Check formatting (Prettier --check)
pnpm exec prettier --write .   # Auto-fix formatting
```

The Prettier config lives at `tooling/config/.prettierrc`.

## Commit Convention

Format: `<type>(<scope>): <description>`

### Types

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `feat`     | New user-visible feature                 |
| `fix`      | Bug fix                                  |
| `chore`    | Maintenance (deps, build, scripts)       |
| `docs`     | Documentation only                       |
| `style`    | Formatting/whitespace — no logic change  |
| `refactor` | Code restructure — no new feature or fix |
| `perf`     | Performance improvement                  |
| `test`     | Tests only                               |
| `ci`       | CI/CD config                             |
| `revert`   | Revert a previous commit                 |

### Scopes

`web` · `mobile` · `api` · `packages` · `tooling` · `docs` · `repo` · `config` · `deps` · `release`

Scope is optional. Add `!` after type/scope for breaking changes.

### Examples

```bash
git commit -m "feat(web): add dark mode toggle"
git commit -m "fix(api): handle missing auth header"
git commit -m "docs(repo): add architecture overview"
git commit -m "feat(api)!: remove deprecated v1 endpoints"
```

Commit messages are validated locally via the Husky `commit-msg` hook and in CI via the `Pre-commit` workflow.

## Test Expectations

| Change Type         | Required Tests                                                |
| ------------------- | ------------------------------------------------------------- |
| New feature         | Unit tests for logic; integration test for public API surface |
| Bug fix             | Regression test that would have caught the bug                |
| Refactor            | Existing tests must continue to pass; add tests where missing |
| Performance change  | Benchmark or measurable metric showing improvement            |
| Docs / style only   | No new tests required                                         |
| CI / tooling change | Manual verification that CI passes                            |

## Code Review Criteria

- [ ] CI passes (lint, format, typecheck).
- [ ] Commit messages follow [Conventional Commits](#commit-convention).
- [ ] New features include tests.
- [ ] No `// @ts-ignore`, `console.log`, or hardcoded secrets.
- [ ] PR is focused — one concern per PR.
- [ ] Docs updated if behaviour or API surface changed.

## Further Reading

- [Development guide](../development/README.md)
- [Architecture](../architecture/README.md)
