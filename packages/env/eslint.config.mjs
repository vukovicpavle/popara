import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = tseslint.config(...tseslint.configs.recommended);

export default config;
