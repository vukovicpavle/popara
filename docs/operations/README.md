# Operations

Deployment, environment configuration, monitoring, and incident response.

> This section is a placeholder. Detailed operational runbooks will be added as the project matures.

## Environment Configuration

Environment variables are managed using `.env` files (never committed to source control) for local development. A single root `.env.example` serves as the committed template for all workspaces. See [docs/standards/env-strategy.md](../standards/env-strategy.md) for the complete policy.

### File Conventions

| File                     | Committed | Purpose                                                                 |
| ------------------------ | --------- | ----------------------------------------------------------------------- |
| `.env.example`           | ✅ Yes    | Single root-level template documenting all variables for all workspaces |
| `<workspace>/.env.local` | ❌ No     | Developer-local overrides, copied from root `.env.example`              |
| `.env.staging`           | ❌ No     | Staging values — platform-managed                                       |
| `.env.production`        | ❌ No     | Production values — platform-managed                                    |

### Local Development

Copy the root `.env.example` template into each workspace you intend to run, then fill in real values. For mobile, copy only the `EXPO_PUBLIC_*` variables to keep server secrets out of the mobile workspace:

```bash
# Web: copy the full template
cp .env.example apps/web/.env.local

# Mobile: only copy public Expo vars — server secrets must not be in mobile
grep '^EXPO_PUBLIC_' .env.example > apps/mobile/.env.local
```

> Next.js reads `.env*` files from `apps/web/` and Expo reads from `apps/mobile/`. A root-level `.env.local` is not automatically picked up by either runtime.

### CI

Secrets and variables are injected by GitHub Actions at workflow runtime. They are stored under **Settings → Secrets and variables → Actions** in the repository. Workflows reference them as `${{ secrets.NAME }}` (sensitive) or `${{ vars.NAME }}` (non-sensitive).

### Production / Staging

Production and staging environment variables are configured in the hosting platform's secret store (e.g., Vercel, Render, Fly.io). They are never stored in `.env` files or committed to source control.

## Deployment

> Deployment pipelines are planned. This section will document:
>
> - Build → deploy steps for each app.
> - Environment promotion strategy (dev → staging → production).
> - Rollback procedures.

## Monitoring & Observability

> To be defined. This section will document:
>
> - Logging standards and tooling.
> - Error tracking setup.
> - Performance monitoring.

## Incident Response

> To be defined. This section will document:
>
> - On-call rotation.
> - Incident severity levels.
> - Post-mortem process.

## Further Reading

- [Architecture](../architecture/README.md)
- [Development](../development/README.md)
