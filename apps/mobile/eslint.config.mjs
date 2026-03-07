import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = tseslint.config(
  { ignores: ["metro.config.js", "babel.config.js"] },
  ...tseslint.configs.recommended,
);

export default config;
