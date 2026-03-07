# Development

Day-to-day development workflows, branching strategy, debugging tips, and tooling reference.

## Branching Strategy

| Branch                             | Purpose                          |
| ---------------------------------- | -------------------------------- |
| `main`                             | Production-ready code; protected |
| `feat/<scope>-<short-description>` | Feature branches                 |
| `fix/<scope>-<short-description>`  | Bug fix branches                 |
| `chore/<description>`              | Maintenance branches             |

Open a pull request against `main` for all changes. Keep PRs focused and small.

## Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feat/web-dark-mode

# 2. Install deps if needed
pnpm install

# 3. Start the relevant app(s) in dev mode
pnpm --filter web dev

# 4. Make changes, then validate
pnpm lint
pnpm format
pnpm typecheck

# 5. Commit following Conventional Commits
git commit -m "feat(web): add dark mode toggle"

# 6. Push and open a PR
git push origin feat/web-dark-mode
```

## Running Individual Workspaces

```bash
# Web
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint

# Mobile
pnpm --filter mobile start

# All workspaces via Turborepo
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

## Adding a New Package

1. Create the package directory under `packages/<name>/`.
2. Add a `package.json` with `"name": "@popara/<name>"`.
3. Reference it in other workspaces with `"@popara/<name>": "workspace:*"`.
4. Run `pnpm install` to link it.

## Debugging

- Web: use browser DevTools and the Next.js dev server (`pnpm --filter web dev`).
- Mobile: use Expo Go or a simulator (`pnpm --filter mobile start`).
- TypeScript errors: `pnpm typecheck` reports all type errors across workspaces.

## CI/CD

GitHub Actions workflows live in `.github/workflows/`.

| Workflow         | Trigger   | Jobs                    |
| ---------------- | --------- | ----------------------- |
| `ci.yml`         | Push / PR | lint, format, typecheck |
| `pre-commit.yml` | Push / PR | commitlint              |

## Further Reading

- [Getting Started](../getting-started/README.md)
- [Standards](../standards/README.md)
- [Operations](../operations/README.md)
