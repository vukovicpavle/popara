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

## Tech Stack

- **Workspace manager**: [pnpm](https://pnpm.io/)
- **Task orchestration**: [Turborepo](https://turbo.build/)
