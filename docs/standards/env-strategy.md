# Environment Variable Strategy

> Defines how environment variables are named, stored, validated, shared, and consumed across the Popara monorepo. Follow this guide for all workspaces: web, mobile, API, and tooling.

## Overview

This document establishes a single, consistent workflow for environment variables so that:

- Secrets are never committed to source control.
- Configuration is explicit and discoverable.
- Local, CI, and production environments each have a clear source of truth.
- New contributors can get up and running from the root `.env.example` file alone.

## Variable Classification

Every environment variable is classified as either **Public** or **Server**, and some server variables are additionally marked as **Secret**:

| Class      | Description                                                                         | Examples                                         |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Public** | Safe to expose to the client/browser or mobile bundle.                              | `NEXT_PUBLIC_API_URL`, `EXPO_PUBLIC_APP_NAME`    |
| **Server** | Used only by server-side code; never sent to the client.                            | `DATABASE_URL`, `JWT_SECRET`, `SMTP_HOST`        |
| **Secret** | Server-only and sensitive credentials that must never appear in logs or plain text. | `STRIPE_SECRET_KEY`, `OPENAI_API_KEY`, `DB_PASS` |

Rules:

1. **Public variables** must use the runtime-required prefix (`NEXT_PUBLIC_` for Next.js, `EXPO_PUBLIC_` for Expo).
2. **Server variables** must not carry a public prefix.
3. **Secret variables** are server variables — apply the same prefix rules and additionally restrict access in CI/CD using secret stores (not plain variables).

## Naming Conventions

| Rule                               | Example                                             |
| ---------------------------------- | --------------------------------------------------- |
| `UPPER_SNAKE_CASE`                 | `API_BASE_URL`                                      |
| Runtime prefix where required      | `NEXT_PUBLIC_API_URL`                               |
| Scope prefix for workspace clarity | `WEB_FEATURE_FLAGS`, `API_PORT`                     |
| Shared cross-workspace variables   | `APP_ENV` — no scope prefix; used by all workspaces |
| No abbreviations without context   | `DATABASE_URL` not `DB_U`                           |
| Boolean flags use `true` / `false` | `FEATURE_DARK_MODE=true`                            |

Avoid generic names like `SECRET`, `KEY`, or `TOKEN` without context — always qualify them (e.g., `STRIPE_SECRET_KEY`).

> **`APP_ENV` vs `NODE_ENV`:** `NODE_ENV` is the Node.js/runtime mode (`development`, `test`, `production`) and controls which `.env.<NODE_ENV>` files are loaded by Next.js and Expo. `APP_ENV` represents the deployment stage (`local`, `staging`, `production`) and is shared across workspaces for runtime branching and logging — do not rely on it for framework-specific file-loading behaviour tied to `NODE_ENV`.

## File Conventions

### File Naming and Purpose

| File              | Committed | Purpose                                                              |
| ----------------- | --------- | -------------------------------------------------------------------- |
| `.env.example`    | ✅ Yes    | Documents all variables with placeholder values. Required.           |
| `.env.local`      | ❌ No     | Developer-local overrides. Never committed.                          |
| `.env.staging`    | ❌ No     | Staging values. Platform-managed; never committed.                   |
| `.env.production` | ❌ No     | Production values. Platform-managed; never committed.                |
| `.env`            | ❌ No     | Fallback defaults. Avoid for apps; may be used by scripts if needed. |

> **Rule**: If a variable is needed to run the project, it must appear in `.env.example`. No exceptions.

### File Locations

A single `.env.example` lives at the **repository root** and documents all variables for all workspaces, organised into clearly labelled sections:

```
.env.example            # ← single committed template for the entire monorepo
apps/web/.env.local     # ← developer-local overrides for Next.js (git-ignored)
apps/mobile/.env.local  # ← developer-local overrides for Expo (git-ignored)
```

Per-workspace section headers inside `.env.example` make it easy to know which variables belong to which app:

```
# apps/web — Next.js
NEXT_PUBLIC_API_URL=http://localhost:4000
DATABASE_URL=postgresql://...

# apps/mobile — Expo / React Native
EXPO_PUBLIC_API_URL=http://localhost:4000
```

> **Important:** Next.js reads `.env*` files from the `apps/web/` directory, and Expo reads from `apps/mobile/`. The monorepo root is **not** in their search path. Copy the root template into each workspace directory before starting development (see [Onboarding](#onboarding-local-environment-setup)).

### Load Precedence

Variables are loaded in order — later files take precedence:

**Next.js (apps/web)**

Next.js loads the following files from the workspace directory (highest precedence first):

1. `.env.<NODE_ENV>.local`
2. `.env.local` (not applied in the `test` environment)
3. `.env.<NODE_ENV>`
4. `.env`

See [Next.js docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) for full details.

**Expo (apps/mobile)**

Expo SDK 49+ loads the following files from the workspace directory (highest precedence first):

1. `.env.<NODE_ENV>.local`
2. `.env.local`
3. `.env.<NODE_ENV>`
4. `.env`

Only `EXPO_PUBLIC_*` variables are bundled into the client. Use [expo-constants](https://docs.expo.dev/versions/latest/sdk/constants/) or a custom `config/env.ts` module to access them.

**API / Node services**

Variables are loaded explicitly via `dotenv` or the hosting platform's environment injection. No automatic file merging unless you configure it.

## Per-Runtime Rules

### Next.js (`apps/web`)

- Client-side variables **must** be prefixed with `NEXT_PUBLIC_`.
- Server-side variables must not have the `NEXT_PUBLIC_` prefix.
- Never pass server-only variables as props to client components.
- Use `process.env.NEXT_PUBLIC_*` for public access and `process.env.*` only in Server Components or Route Handlers.

### Expo / React Native (`apps/mobile`)

- Client-bundled variables **must** be prefixed with `EXPO_PUBLIC_`.
- Variables without the `EXPO_PUBLIC_` prefix are not available in the JS bundle.
- Do not store secrets in the mobile app — there is no server boundary.
- Access public variables via `process.env.EXPO_PUBLIC_*` or wrap them in a typed `config/env.ts` module.

### API / Node (`apps/api`)

- All variables are server-side; no public prefix needed.
- Validate required variables at startup using a schema (e.g., `zod`) — fail fast if any are missing.
- Never log raw environment variable values.

### Tooling / Scripts

- Use `.env` files only for non-sensitive configuration (e.g., registry URL).
- Secrets needed by scripts must come from the CI environment or a local secret tool; never commit them.

## Source of Truth per Environment

| Environment | Source of truth                                          | Who manages it       |
| ----------- | -------------------------------------------------------- | -------------------- |
| Local dev   | Developer's `.env.local`, copied from `.env.example`     | Developer            |
| CI          | Provider-injected secrets and variables (GitHub Actions) | Repo maintainers     |
| Staging     | Platform secret store / hosting provider config          | DevOps / maintainers |
| Production  | Platform secret store / hosting provider config          | DevOps / maintainers |

## Security Guardrails

1. **No secrets in source control.** The root `.gitignore` ignores environment files including `.env`, `.env.local`, `.env.staging`, `.env.production`, and `.env.*.local`. If you introduce new `.env*` files, ensure they are added to `.gitignore` (only `.env.example` is intentionally committed). Never override these rules.
2. **`.env.example` contains only placeholder values** — never real credentials, even for development.
3. **Least privilege.** CI jobs receive only the secrets they need. Do not define all secrets in every workflow.
4. **Secrets are not echoed.** CI pipelines must not `echo` or print secret variables. GitHub Actions masks secrets automatically, but avoid logging `process.env` objects.
5. **Rotate on exposure.** If a secret is accidentally committed, treat it as compromised immediately — revoke and rotate it, then purge it from git history using `git filter-repo` or GitHub's secret-scanning remediation.
6. **Secret scanning.** GitHub secret scanning is enabled on this repository. Push protection will block commits containing known secret patterns.

## CI/CD Integration

### GitHub Actions

- Store secrets under **Settings → Secrets and variables → Actions**.
- Reference secrets in workflows as `${{ secrets.MY_SECRET }}`.
- Reference non-sensitive CI variables as `${{ vars.MY_VAR }}`.
- Do not hardcode URLs, feature flags, or other configuration in workflow YAML files — use variables.

Example workflow snippet:

```yaml
- name: Build web app
  env:
    NEXT_PUBLIC_API_URL: ${{ vars.NEXT_PUBLIC_API_URL }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: pnpm --filter web build
```

### Environment Promotion

Staging and production values are managed entirely in the hosting platform (e.g., Vercel, Render, Fly.io). The CI pipeline does not write `.env` files to the deployed environment.

## `.env.example` Policy

- The repository has a **single `.env.example` at the root** that documents all variables for all workspaces.
- Every new variable added to the codebase **must** be added to `.env.example` before the PR is merged.
- `.env.example` values must be safe placeholders (e.g., `http://localhost:3000`, `change_me`, `your_key_here`).
- `.env.example` is kept in sync with actual usage — stale entries must be removed.
- Variables are organised into clearly labelled workspace sections within the single file.
- PR reviewers must verify that any new `process.env.*` access has a corresponding entry in `.env.example`.

## Onboarding: Local Environment Setup

> Follow these steps when setting up a fresh local environment.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/vukovicpavle/popara.git
   cd popara
   pnpm install
   ```

2. Copy the root template into each workspace you intend to run:

   ```bash
   # Web: copy the full template
   cp .env.example apps/web/.env.local

   # Mobile: copy ONLY the EXPO_PUBLIC_* variables — server secrets must not
   # be present in the mobile workspace env file (no server boundary in mobile)
   grep '^EXPO_PUBLIC_' .env.example > apps/mobile/.env.local

   # API: cp .env.example apps/api/.env.local  (when API workspace is added)
   ```

3. Open each workspace's `.env.local` and replace placeholder values with real ones for your local environment. Variables marked `# required` are needed for full functionality and should be set before running the app.

4. Obtain any secret values from a trusted team member or your team's shared secret manager. **Do not ask for secrets over unencrypted channels.**

5. Start the app(s):

   ```bash
   pnpm --filter web dev
   pnpm --filter mobile dev
   ```

> **Never commit your `.env.local` files.** Git will ignore them automatically (they are in `.gitignore`), but double-check with `git status` before committing.

## Checklist for Adding a New Variable

- [ ] Classify the variable (public / server / secret).
- [ ] Choose a name following the naming conventions above.
- [ ] Add it to the root `.env.example` with a safe placeholder value and a comment in the appropriate workspace section.
- [ ] Add it to the CI environment (GitHub Actions secrets or variables).
- [ ] Add it to staging and production environments in the hosting platform.
- [ ] Document any non-obvious behaviour in a comment in `.env.example`.
- [ ] Include it in the env validation schema (when validation is implemented).

## Troubleshooting

| Symptom                                     | Likely Cause                                      | Fix                                                       |
| ------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| `undefined` for a `NEXT_PUBLIC_*` var       | Variable not set in `apps/web/.env.local`         | Copy from root `.env.example` to `apps/web/.env.local`    |
| Variable available in server but not client | Missing `NEXT_PUBLIC_` / `EXPO_PUBLIC_` prefix    | Rename the variable with the correct prefix               |
| Build fails on CI with missing var          | Variable not added to GitHub Actions secrets/vars | Add it under repository Settings → Secrets and variables  |
| App crashes at startup with env error       | Required variable missing                         | Check root `.env.example` for required vars and set them  |
| Secret accidentally committed               | `.gitignore` entry missing or bypassed            | Revoke the secret immediately, rotate, then purge history |

## Further Reading

- [Operations — Environment Configuration](../operations/README.md#environment-configuration)
- [Getting Started — Local Setup](../getting-started/README.md)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
