# How We Work — Popara Monorepo

Practical reference for every contributor (human and AI). Keep it short; prefer checklists over prose.

---

## Repository Structure

```
popara/
├── apps/          # Deployable apps — each is an independent workspace
│   ├── web/       # Next.js / React web app
│   ├── mobile/    # React Native / Expo mobile app
│   └── api/       # Backend API service
├── packages/      # Shared libraries imported by apps and other packages
├── tooling/       # Shared tooling config (ESLint, TypeScript, Prettier, …)
│   └── config/    # @popara/config workspace package
└── docs/          # Project documentation
    └── ai/        # AI agent guidance (you are here)
```

**Rules:**

- Code in `apps/` must never import directly from another `apps/*` package.
- Shared logic belongs in `packages/`, not duplicated in each app.
- Tooling config belongs in `tooling/config`; keep root config files thin.

---

## Toolchain

| Tool       | Version / Command               | Notes                                                                 |
| ---------- | ------------------------------- | --------------------------------------------------------------------- |
| Node.js    | `^20.19.0                       |                                  | ^22.13.0 |     | >=24` | `engine-strict=true` in `.npmrc` |
| pnpm       | `10.30.3`                       | Use pnpm; never npm or yarn                                           |
| Turborepo  | root `turbo.json`               | Fan-out for lint/build/typecheck                                      |
| TypeScript | per-workspace `tsconfig.json`   | Extends `tsconfig.base.json`                                          |
| ESLint     | per-workspace `.eslintrc`       | Extends `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `prettier` via `tooling/config/.eslintrc.json` |
| Prettier   | root `.prettierrc` (if present) | `pnpm format` at root                                                 |
| Commitlint | `commitlint.config.mjs`         | Conventional Commits enforced                                         |

---

## Coding Conventions

### TypeScript

- Enable `strict: true` — no implicit `any`.
- Prefer explicit return types on exported functions.
- Use `type` for pure type aliases; use `interface` for object shapes that may be extended.
- Do not use `// @ts-ignore` — fix the underlying issue instead.

### Imports

- Use absolute package imports (`@popara/ui`) over deep relative paths.
- Group imports: external → internal packages → relative files. Separate groups with a blank line.

### Naming

- **Files**: `kebab-case` for all source files (e.g., `user-service.ts`).
- **Components**: `PascalCase` (e.g., `UserCard.tsx`).
- **Variables / functions**: `camelCase`.
- **Constants**: `UPPER_SNAKE_CASE` for module-level constants.
- **Types / Interfaces**: `PascalCase` (e.g., `UserProfile`, `IUserService`).

### Formatting

- Prettier is the single source of formatting truth — never hand-format code.
- Run `pnpm format` to check; use `pnpm exec prettier --write .` to fix.

---

## Validation Flow

Always run in this order before opening a PR:

```bash
pnpm lint        # 1. ESLint — catches logic & style errors
pnpm format      # 2. Prettier — catches formatting drift
pnpm typecheck   # 3. TypeScript — catches type errors
```

CI runs the same three jobs in parallel (see `.github/workflows/ci.yml`).  
Commit messages are validated by `commitlint` locally (Husky `commit-msg` hook) and in CI.

---

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

---

## Test Expectations by Change Type

| Change Type         | Required Tests                                                |
| ------------------- | ------------------------------------------------------------- |
| New feature         | Unit tests for logic; integration test for public API surface |
| Bug fix             | Regression test that would have caught the bug                |
| Refactor            | Existing tests must continue to pass; add tests where missing |
| Performance change  | Benchmark or measurable metric showing improvement            |
| Docs / style only   | No new tests required                                         |
| CI / tooling change | Manual verification that CI passes                            |

---

## Agent Output Contract

Every AI-generated PR or response **must** include all four sections:

```markdown
### Plan

1. <step>
2. <step>

### Files Changed

- `path/to/file.ts` — reason

### Verification

- `pnpm lint` → passed
- `pnpm format` → passed
- `pnpm typecheck` → passed

### Risks & Assumptions

- <anything uncertain, skipped, or potentially impactful>
```

---

## Safety Rules

| Rule                                                             | Severity   |
| ---------------------------------------------------------------- | ---------- |
| Never force-push or reset `--hard` on a shared branch            | 🚫 Block   |
| Never modify files outside the task scope                        | 🚫 Block   |
| Never revert unrelated changes to get a clean diff               | 🚫 Block   |
| Never introduce a new dependency with a known high/critical CVE  | 🚫 Block   |
| Require explicit human confirmation for schema migrations        | ⚠️ Confirm |
| Require explicit human confirmation for mass renames (>10 files) | ⚠️ Confirm |
| Require explicit human confirmation for removing public APIs     | ⚠️ Confirm |
| Prefer small, focused PRs over large sweeping changes            | ✅ Follow  |

**Escalation path**: If uncertain about scope or safety, stop and leave a comment in the PR or issue describing the ambiguity before proceeding.
