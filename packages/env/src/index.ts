import { ZodError, ZodObject, ZodRawShape, z } from "zod";

export { z };

/**
 * Shared base schema for environment variables used across all workspaces.
 * Extend this with app-specific variables using `.extend()`.
 */
export const baseEnvSchema = z.object({
  /** Deployment stage: local | staging | production. Defaults to "local". */
  APP_ENV: z.enum(["local", "staging", "production"]).default("local"),
});

export type BaseEnv = z.infer<typeof baseEnvSchema>;

function formatEnvErrors(error: ZodError): string {
  const fieldErrors = error.flatten().fieldErrors;
  const formErrors = error.flatten().formErrors;

  const lines: string[] = ["❌ Invalid environment variables:"];

  for (const [key, errors] of Object.entries(fieldErrors)) {
    if (errors && errors.length > 0) {
      lines.push(`  ${key}: ${errors.join(", ")}`);
    }
  }

  if (formErrors.length > 0) {
    for (const err of formErrors) {
      lines.push(`  ${err}`);
    }
  }

  return lines.join("\n");
}

/**
 * Parses and validates environment variables against a Zod schema.
 * Throws with a descriptive error message if validation fails.
 *
 * @param schema  A `z.object(...)` schema describing expected env vars.
 * @param runtimeEnv  The environment record to validate (defaults to `process.env`).
 * @returns A fully-typed, validated environment object.
 *
 * @example
 * ```ts
 * import { z, createEnv, baseEnvSchema } from "@popara/env";
 *
 * export const env = createEnv(
 *   baseEnvSchema.extend({
 *     DATABASE_URL: z.string().min(1),
 *   }),
 * );
 * ```
 */
export function createEnv<T extends ZodRawShape>(
  schema: ZodObject<T>,
  runtimeEnv: Record<string, string | undefined> = process.env,
): z.infer<ZodObject<T>> {
  const result = schema.safeParse(runtimeEnv);

  if (!result.success) {
    const message = formatEnvErrors(result.error);
    console.error(message);
    throw new Error(message);
  }

  return result.data;
}
