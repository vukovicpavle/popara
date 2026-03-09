# Shared Packages

> Shared TypeScript libraries consumed by `apps/*` workspaces.

This directory contains reusable packages that are internal to the monorepo. Each package is provided as a workspace package (e.g., `@popara/<name>`) and referenced via `"workspace:*"` in consuming workspaces.

## Available Packages

| Package                | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| [`@popara/env`](./env) | Zod-based environment variable validation; exports `createEnv`, `baseEnvSchema`, and `z` |

## Adding a New Package

> **Convention:** packages ship TypeScript source directly — no `dist/` build step.
> Consuming workspaces import the source via the `"main"`/`"exports"` fields pointing
> to `./src/index.ts`. TypeScript is resolved at dev-time through workspace symlinks.

1. Create a directory: `packages/<name>/`.
2. Add a `package.json`:
   ```json
   {
     "name": "@popara/<name>",
     "version": "0.0.0",
     "private": true,
     "description": "Short description",
     "main": "./src/index.ts",
     "types": "./src/index.ts",
     "exports": {
       ".": "./src/index.ts"
     },
     "scripts": {
       "lint": "eslint .",
       "typecheck": "tsc --noEmit"
     },
     "engines": {
       "node": "^20.19.0 || ^22.13.0 || >=24"
     }
   }
   ```
3. Add a `tsconfig.json` that extends the root `tsconfig.base.json`.
4. Export public API from `src/index.ts`.
5. Reference it in a consuming workspace: `"@popara/<name>": "workspace:*"`.
6. Run `pnpm install` from the repo root to link it.

## Rules

- Packages in `packages/` **must not** import from `apps/*`.
- Packages may import other `packages/*` packages.
- Keep each package focused on a single responsibility.

## Further Reading

- [Architecture overview](../docs/architecture/README.md)
- [Development guide](../docs/development/README.md)
