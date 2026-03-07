# Tooling

> Shared tooling configuration for the Popara monorepo — ESLint, Prettier, and TypeScript base configs.

## Workspace Package

**`tooling/config`** is provided as the `@popara/config` workspace package. All apps and packages extend their config from here.

## Contents

```
tooling/config/
├── .eslintrc.json      # Shared ESLint rules (ESLint 8 / legacy format)
├── .prettierrc         # Shared Prettier options
├── tsconfig.base.json  # Base TypeScript compiler options
└── tsconfig.json       # TypeScript config for this package itself
```

## ESLint

The shared ESLint config (`@popara/config`) extends:

- `eslint:recommended`
- `plugin:@typescript-eslint/recommended`
- `prettier` (disables formatting rules handled by Prettier)

Individual workspaces extend this config and may add workspace-specific rules.

> **Note:** `apps/web` and `apps/mobile` use ESLint 9 flat config (`eslint.config.mjs`), while `tooling/config` still uses ESLint 8 legacy format (`.eslintrc.json`).

## Prettier

Prettier options are defined in `tooling/config/.prettierrc`. Run `pnpm format` from the repo root to check formatting across all files.

## TypeScript

`tsconfig.base.json` sets the common compiler options used by all workspaces:

- `strict: true`
- `incremental: true`
- `moduleResolution: node`

Web and mobile apps (e.g. `apps/web` and `apps/mobile`) may override `moduleResolution` to `bundler` in their own `tsconfig.json` files as needed.

Each workspace has its own `tsconfig.json` that extends either `tsconfig.base.json` (root) or `tooling/config/tsconfig.base.json`.

## Further Reading

- [Standards](../docs/standards/README.md)
- [Architecture overview](../docs/architecture/README.md)
