import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      // Added to the recommended config in eslint-plugin-svelte 3; not yet adopted here
      "svelte/no-navigation-without-resolve": "off",
      "svelte/require-each-key": "off",
    },
  },
  {
    ignores: [
      "build/",
      ".svelte-kit/",
      "dist/",
      "coverage/",
      ".wrangler/",
      "src/worker-configuration.d.ts",
    ],
  },
];
