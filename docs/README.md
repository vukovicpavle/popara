# Popara Documentation

Welcome to the Popara monorepo documentation hub. This is the starting point for all project documentation — technical, product, and process knowledge.

## Sections

| Section                                        | Description                                          |
| ---------------------------------------------- | ---------------------------------------------------- |
| [Getting Started](./getting-started/README.md) | Prerequisites, installation, and first-run guide     |
| [Architecture](./architecture/README.md)       | System design, ADRs, and workspace overviews         |
| [Development](./development/README.md)         | Workflows, debugging, branching strategy             |
| [Standards](./standards/README.md)             | Coding conventions, commit rules, review criteria    |
| [Operations](./operations/README.md)           | Deployment, environment config, monitoring           |
| [AI Guidance](./ai/README.md)                  | Agent conventions and playbooks for AI-assisted work |

## Workspace Docs

Each major workspace has its own landing page:

| Workspace | Path                                                | Description                               |
| --------- | --------------------------------------------------- | ----------------------------------------- |
| Web       | [`apps/web/README.md`](../apps/web/README.md)       | Next.js web application                   |
| Mobile    | [`apps/mobile/README.md`](../apps/mobile/README.md) | Expo / React Native mobile app            |
| API       | `apps/api/README.md`                                | Backend API service _(planned)_           |
| Packages  | [`packages/README.md`](../packages/README.md)       | Shared libraries                          |
| Tooling   | [`tooling/README.md`](../tooling/README.md)         | Shared lint, TypeScript, and build config |

## Contributing to Docs

See [contributing.md](./contributing.md) for guidelines on when and how to update documentation.

Use [templates/new-doc.md](./templates/new-doc.md) as a starting point when adding a new docs page.

## Quick Links

- [Root README](../README.md)
- [Commit convention](./standards/README.md#commit-convention)
- [Pre-merge checklist](./ai/README.md#pre-merge-checklist)
