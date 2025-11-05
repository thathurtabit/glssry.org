// @ts-checks

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import testingLibrary from "eslint-plugin-testing-library";
import unicorn from "eslint-plugin-unicorn";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  testingLibrary.configs["flat/react"],
  unicorn.configs.recommended,
  ...compat.extends(
    "eslint-config-prettier",
    "next/typescript",
  ),
  {
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        Buffer: "readonly",
      },
    },
    rules: {
      "unicorn/no-null": "off",
      "no-console": "error",
    },
    ignores: [
      "coverage",
      "node_modules",
      "dist",
      "build",
      "cypress.config.ts",
      "src/server/migrations",
    ],
  },
);
