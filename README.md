# Popara

> Opinionated full-stack TypeScript monorepo template for building web, mobile, and API applications with modern tooling, shared packages, and production-ready standards.

## Structure

```
├── apps/        # Applications (web, mobile, API)
├── packages/    # Shared packages and libraries
├── tooling/     # Shared tooling configuration (lint, TypeScript, etc.)
└── docs/        # Documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) v20.19+ (or v22.13+, or v24+)
- [pnpm](https://pnpm.io/) v10+

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run dev across all workspaces:

```bash
pnpm dev
```

Build all workspaces:

```bash
pnpm build
```

Lint all workspaces:

```bash
pnpm lint
```

Type-check all workspaces:

```bash
pnpm typecheck
```

## Commit Convention

This repository enforces [Conventional Commits](https://www.conventionalcommits.org/) via [commitlint](https://commitlint.js.org/) and [Husky](https://typicode.github.io/husky/).

### Format

```
<type>(<scope>): <description>
```

### Types

| Type       | Description                                       |
| ---------- | ------------------------------------------------- |
| `feat`     | A new feature                                     |
| `fix`      | A bug fix                                         |
| `chore`    | Maintenance tasks (deps, build scripts, etc.)     |
| `docs`     | Documentation-only changes                        |
| `style`    | Code style changes (formatting, whitespace)       |
| `refactor` | Code changes that are neither a fix nor a feature |
| `perf`     | Performance improvements                          |
| `test`     | Adding or updating tests                          |
| `ci`       | CI/CD configuration changes                       |
| `revert`   | Reverts a previous commit                         |

### Scopes

| Scope      | Area of the repository         |
| ---------- | ------------------------------ |
| `web`      | Web application (`apps/web`)   |
| `mobile`   | Mobile application             |
| `api`      | API service (`apps/api`)       |
| `packages` | Shared packages (`packages/`)  |
| `tooling`  | Tooling config (`tooling/`)    |
| `docs`     | Documentation (`docs/`)        |
| `repo`     | Repository-level configuration |
| `config`   | Shared configuration package   |
| `deps`     | Dependency updates             |
| `release`  | Release-related changes        |

Scope is optional. Commits without a scope are allowed.

### Examples

```bash
# Feature with scope
git commit -m "feat(web): add dark mode toggle"

# Bug fix with scope
git commit -m "fix(api): handle missing auth header"

# Chore without scope
git commit -m "chore: update dependencies"

# Documentation update
git commit -m "docs(repo): add commit convention guide"

# Breaking change (add ! after type/scope)
git commit -m "feat(api)!: remove deprecated v1 endpoints"
```

### Validation

Commit messages are validated:

- **Locally** via the `commit-msg` Git hook (runs automatically after `pnpm install`)
- **In CI** via the `Pre-commit` GitHub Actions workflow on every push and pull request

## AI-Assisted Development

This repository includes agent guidelines for AI-assisted development.
See [`docs/ai/README.md`](./docs/ai/README.md) for the full index, or jump straight to a playbook:

- [Implement a feature](./.github/skills/implement-feature.md)
- [Fix a bug](./.github/skills/fix-bug.md)
- [Write tests](./.github/skills/write-tests.md)
- [Update docs](./.github/skills/update-docs.md)
- [Safe refactor](./.github/skills/safe-refactor.md)
- [Triage an issue](./.github/skills/issue-triage.md)

## Tech Stack

- **Workspace manager**: [pnpm](https://pnpm.io/)
- **Task orchestration**: [Turborepo](https://turbo.build/)
