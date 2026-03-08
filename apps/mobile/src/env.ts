import { z, createEnv, baseEnvSchema } from "@popara/env";

/**
 * Validated environment for apps/mobile (Expo / React Native).
 *
 * Only `EXPO_PUBLIC_*` variables are bundled into the app binary.
 * Do NOT add secrets here — there is no server boundary in the mobile app.
 *
 * Validation runs at app startup (imported in index.ts); missing or invalid
 * variables throw immediately with a descriptive error.
 *
 * To add a new variable:
 * 1. Add the field to the schema below (must use the `EXPO_PUBLIC_` prefix).
 * 2. Add a safe placeholder to the root `.env.example`.
 * 3. Set the real value in `apps/mobile/.env.local`.
 */
export const env = createEnv(
  baseEnvSchema.extend({
    /** Base URL of the backend API. */
    EXPO_PUBLIC_API_URL: z.string().url(),

    /** Human-readable app name. */
    EXPO_PUBLIC_APP_NAME: z.string().default("Popara"),
  }),
);
