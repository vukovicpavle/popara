# Getting Started

Everything you need to go from zero to a running local development environment.

## Prerequisites

| Tool    | Version                        | Install                             |
| ------- | ------------------------------ | ----------------------------------- |
| Node.js | `^20.19.0 \| ^22.13.0 \| >=24` | [nodejs.org](https://nodejs.org/)   |
| pnpm    | `10.30.3`                      | `npm install -g pnpm@10.30.3`       |
| Git     | any recent version             | [git-scm.com](https://git-scm.com/) |

> **Note:** The repository enforces `engine-strict=true`, so using an unsupported Node version will fail on `pnpm install`.

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/vukovicpavle/popara.git
cd popara

# 2. Install dependencies (all workspaces)
pnpm install
```

## Environment Setup

Each app ships a `.env.example` file that documents every required variable. Copy it to `.env.local` and fill in your local values before starting any app:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env.local
```

Open each `.env.local` file and replace the placeholder values. Variables marked `# required` must be set before the app will start. Obtain any secret values from a team member or your team's shared secret manager.

> See [docs/standards/env-strategy.md](../standards/env-strategy.md) for the full environment variable policy, naming conventions, and security rules.

## Running the Project

```bash
# Start all apps in development mode
pnpm dev

# Start a specific workspace
pnpm --filter web dev
pnpm --filter mobile dev
```

## Building

```bash
# Build all workspaces
pnpm build

# Build a specific workspace
pnpm --filter web build
```

## Validation

Run the full validation suite before opening a PR:

```bash
pnpm lint        # ESLint across all workspaces
pnpm format      # Prettier format check
pnpm typecheck   # TypeScript type checking
```

## Git Hooks

After `pnpm install`, Husky activates a `commit-msg` hook that validates commit messages against the [Conventional Commits](../standards/README.md#commit-convention) format.

## Next Steps

- Read the [Development guide](../development/README.md) for branching strategy and workflow conventions.
- Read the [Standards guide](../standards/README.md) for coding and commit conventions.
- Browse the [Architecture overview](../architecture/README.md) to understand the system design.
