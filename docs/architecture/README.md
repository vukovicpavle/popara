# Architecture

High-level system design, workspace responsibilities, and architectural decision records (ADRs).

## Monorepo Layout

```
popara/
├── apps/          # Deployable applications — each is an independent workspace
│   ├── web/       # Next.js web application (App Router, React 19)
│   ├── mobile/    # Expo / React Native mobile application
│   └── api/       # Backend API service (planned)
├── packages/      # Shared libraries imported by apps and other packages
├── tooling/       # Shared tooling configuration
│   └── config/    # @popara/config — ESLint, Prettier, TypeScript base configs
└── docs/          # Project documentation
```

### Workspace Dependency Rules

- `apps/*` workspaces **must not** import from other `apps/*` workspaces.
- Shared logic belongs in `packages/` — never duplicated across apps.
- Tooling config belongs in `tooling/config`; root config files should stay thin.

## Tech Stack Summary

| Layer           | Technology                                                      |
| --------------- | --------------------------------------------------------------- |
| Web frontend    | Next.js 16, React 19, TypeScript                                |
| Mobile          | Expo SDK 55+, React Native, TypeScript                          |
| API             | _(planned)_                                                     |
| Shared packages | TypeScript                                                      |
| Task runner     | Turborepo                                                       |
| Package manager | pnpm 10                                                         |
| Linting         | ESLint (9 flat config in apps; legacy config in tooling/config) |
| Formatting      | Prettier                                                        |
| Type checking   | TypeScript (strict)                                             |

## Workspace Docs

- [Web app](../../apps/web/README.md)
- [Mobile app](../../apps/mobile/README.md)
- [Shared packages](../../packages/README.md)
- [Tooling config](../../tooling/README.md)

## Architectural Decision Records

ADRs are stored in this directory as `adr-NNN-<short-title>.md`.

> No ADRs recorded yet. When a significant architectural decision is made, document it here using the [new doc template](../templates/new-doc.md).

## Further Reading

- [Development guide](../development/README.md)
- [Standards](../standards/README.md)
