# Web Application

> Next.js web application for Popara — built with the App Router, React 19, and TypeScript.

## Stack

| Technology | Version | Notes                             |
| ---------- | ------- | --------------------------------- |
| Next.js    | 16      | App Router                        |
| React      | 19      |                                   |
| TypeScript | 5+      | strict mode                       |
| ESLint     | 9       | flat config (`eslint.config.mjs`) |

## Getting Started

From the repo root:

```bash
pnpm --filter web dev      # Start dev server
pnpm --filter web build    # Production build
pnpm --filter web lint     # Lint
```

Or from this directory:

```bash
pnpm dev
pnpm build
pnpm lint
```

## Structure

```
apps/web/
├── src/           # Application source
├── public/        # Static assets
├── next.config.ts # Next.js configuration
└── tsconfig.json  # TypeScript config (extends root tsconfig.base.json)
```

## Further Reading

- [Architecture overview](../../docs/architecture/README.md)
- [Development guide](../../docs/development/README.md)
- [Standards](../../docs/standards/README.md)
