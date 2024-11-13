import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "warn",
    },
  },
  {
    ignores: [
      "node_modules",
      "babel.config.js",
      "jest.config.js",
      "package.json",
      "yarn.lock",
      "tsconfig.json",
      "tslint.json",
      "yarn.lock",
    ],
  },
];
