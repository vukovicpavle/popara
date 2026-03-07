# Shared Packages

> Shared TypeScript libraries consumed by `apps/*` workspaces.

This directory contains reusable packages that are internal to the monorepo. Each package is published as a workspace package (e.g., `@popara/<name>`) and referenced via `"workspace:*"` in consuming workspaces.

## Available Packages

> No shared packages yet. This directory is a placeholder for future shared libraries.

## Adding a New Package

1. Create a directory: `packages/<name>/`.
2. Add a `package.json`:
   ```json
   {
     "name": "@popara/<name>",
     "version": "0.0.0",
     "private": true,
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts"
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
