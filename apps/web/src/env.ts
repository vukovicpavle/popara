import { z, createEnv, baseEnvSchema } from "@popara/env";

/**
 * Validated environment for apps/web (Next.js).
 *
 * This module is server-only — do not import it in client components.
 * Validation runs at startup; missing or invalid variables throw immediately
 * with a descriptive error.
 *
 * To add a new variable:
 * 1. Add the field to the schema below.
 * 2. Add a safe placeholder to the root `.env.example`.
 * 3. Set the real value in `apps/web/.env.local` (or the CI/platform secret store).
 */
export const env = createEnv(
  baseEnvSchema.extend({
    // -------------------------------------------------------------------------
    // Public (NEXT_PUBLIC_*): bundled into the browser, visible to end-users.
    // -------------------------------------------------------------------------

    /** Base URL of the backend API consumed by client-side fetch calls. */
    NEXT_PUBLIC_API_URL: z.string().url(),

    // -------------------------------------------------------------------------
    // Server-only: must NOT be sent to the browser.
    // -------------------------------------------------------------------------

    /** Full connection string for the primary database. */
    DATABASE_URL: z.string().regex(/^[a-z][a-z+\-.]*:\/\//, {
      message:
        "Must be a valid connection string (e.g. postgresql://user:pass@host/db)",
    }),

    /** Secret used to sign and verify session/JWT tokens. Min 32 chars. */
    AUTH_SECRET: z.string().min(32, {
      message: "Must be at least 32 characters to ensure sufficient entropy",
    }),

    /** Sentry DSN for server-side error tracking. */
    SENTRY_DSN: z.string().url().optional(),

    /** SMTP host for transactional email. */
    SMTP_HOST: z.string().optional(),

    /** SMTP port for transactional email. */
    SMTP_PORT: z.coerce.number().int().positive().optional(),

    /** SMTP username for transactional email. */
    SMTP_USER: z.string().optional(),

    /** SMTP password for transactional email. */
    SMTP_PASS: z.string().optional(),
  }),
);
