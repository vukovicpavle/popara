# Copilot Instructions

> AI agent guidelines for the **Popara** monorepo. Read this before making any change.
> Full guidance lives in [`docs/ai/`](../docs/ai/README.md).

## Repo at a Glance

| Directory   | Purpose                                    |
| ----------- | ------------------------------------------ |
| `apps/`     | Deployable applications (web, mobile, API) |
| `packages/` | Shared libraries consumed by apps          |
| `tooling/`  | Shared lint, TS, and build configuration   |
| `docs/`     | Documentation (including AI guidance)      |

- **Package manager**: pnpm `10.30.3` — never use npm or yarn.
- **Task runner**: Turborepo — use `pnpm <script>` at the root; turbo fans out to workspaces.
- **Node**: `^20.19.0 || ^22.13.0 || >=24` (engine-strict is on).

## Non-Negotiable Rules

1. **Never force-push, reset `--hard`, or rebase shared branches** without explicit human approval.
2. **Never modify files outside the stated scope** of a task.
3. **Run the full validation suite before declaring done**: `pnpm lint && pnpm format && pnpm typecheck`.
4. **All commits must follow Conventional Commits** — see [Commit Convention](#commit-convention).
5. **Do not introduce new dependencies** without checking for known vulnerabilities first.
6. **Ask before performing any destructive or high-impact operation** (schema migrations, mass renames, API removals).

## Commit Convention

Format: `<type>(<scope>): <description>`

Valid **types**: `feat` · `fix` · `chore` · `docs` · `style` · `refactor` · `perf` · `test` · `ci` · `revert`

Valid **scopes**: `web` · `mobile` · `api` · `packages` · `tooling` · `docs` · `repo` · `config` · `deps` · `release`  
Scope is optional. Breaking changes add `!` after type/scope.

## Agent Output Contract

Every agent response **must** include:

```
### Plan
<numbered steps>

### Files Changed
<list of files with one-line reason each>

### Verification
<commands run and their outcomes>

### Risks & Assumptions
<any uncertainty or side-effects>
```

## Quick-Reference Playbooks

| Task              | Playbook                                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| Implement feature | [docs/ai/skills/implement-feature.md](../docs/ai/skills/implement-feature.md) |
| Fix a bug         | [docs/ai/skills/fix-bug.md](../docs/ai/skills/fix-bug.md)                     |
| Write tests       | [docs/ai/skills/write-tests.md](../docs/ai/skills/write-tests.md)             |
| Update docs       | [docs/ai/skills/update-docs.md](../docs/ai/skills/update-docs.md)             |
| Safe refactor     | [docs/ai/skills/safe-refactor.md](../docs/ai/skills/safe-refactor.md)         |
| Triage an issue   | [docs/ai/skills/issue-triage.md](../docs/ai/skills/issue-triage.md)           |

See [`docs/ai/README.md`](../docs/ai/README.md) for the full index.
