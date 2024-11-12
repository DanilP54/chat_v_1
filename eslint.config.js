import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      // parserOptions: {
      //   project: ["tsconfig.json", "tsconfig.node.json"],
      // },
    },
  },
  { ignores: ["node_modules", "eslint.config.js", "dist"] },
  {settings: { react: { version: "18.2.0" } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
);
