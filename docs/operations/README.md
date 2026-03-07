# Operations

Deployment, environment configuration, monitoring, and incident response.

> This section is a placeholder. Detailed operational runbooks will be added as the project matures.

## Environment Configuration

Environment variables are managed per-workspace using `.env` files (never committed to source control) for local development. See [docs/standards/env-strategy.md](../standards/env-strategy.md) for the complete policy.

### File Conventions

| File              | Committed | Purpose                                             |
| ----------------- | --------- | --------------------------------------------------- |
| `.env.example`    | ✅ Yes    | Documented template — every workspace must have one |
| `.env.local`      | ❌ No     | Developer-local overrides                           |
| `.env.staging`    | ❌ No     | Staging values — platform-managed                   |
| `.env.production` | ❌ No     | Production values — platform-managed                |

### Local Development

Copy `.env.example` to `.env.local` at the repository root, then fill in real values:

```bash
cp .env.example .env.local
```

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
