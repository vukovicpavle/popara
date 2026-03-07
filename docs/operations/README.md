# Operations

Deployment, environment configuration, monitoring, and incident response.

> This section is a placeholder. Detailed operational runbooks will be added as the project matures.

## Environment Configuration

Environment variables are managed per-workspace using `.env` files (never committed to source control) for local and development environments.

| File           | Purpose                                 |
| -------------- | --------------------------------------- |
| `.env.local`   | Local developer overrides (git-ignored) |
| `.env.example` | Documented template — commit this       |

Production environment variables are configured in the hosting/CI platform's secret store, not in `.env` files.

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
