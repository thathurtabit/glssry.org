import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintTailwind from "eslint-plugin-tailwindcss";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores for all configs (use with flat config instead of .eslintignore)
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.vercel/**",
      "**/.parcel-cache/**",
      "**/.cache/**",
      "src/**/*.css"
    ]
  },
  {
    // Only lint source code under `src/`
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js, tailwindcss: eslintTailwind as unknown as Plugin }, extends: ["js/recommended"],
    // Do not lint generated/build files. Use the flat-config "ignores" property because
    // .eslintignore is deprecated when using flat config.
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.vercel/**",
      "**/.parcel-cache/**",
      "**/.cache/**",
      "src/**/*.css"
    ],
    // Ensure eslint-plugin-react knows which React version to use. "detect" lets the plugin
    // automatically pick the installed React version (or fallback) and removes the warning.
    settings: { react: { version: "detect" } },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      }, globals: { ...globals.browser, ...globals.node }
    }
  },
  tseslint.configs.recommended,
  // Scope plugin-react's recommended config to JS/TS files so it doesn't run against JSON or
  // other non-JS file types (which was causing rules to run on `.next` and `.vscode` JSON files).
  // React rules limited to source files
  { files: ["src/**/*.{mjs,cjs,ts,mts,cts,jsx,tsx}"], ...pluginReact.configs.flat.recommended },
  // Scope unicorn plugin to JS/TS files
  {
    // unicorn rules limited to source files
    files: ["src/**/*.{mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: {
      unicorn: eslintPluginUnicorn
    },
    rules: {
      'unicorn/no-null': 'off',
    },
  },
  // Scope jsx-a11y to JSX/TSX files only
  { files: ["src/**/*.{jsx,tsx}"], ...jsxA11y.flatConfigs.recommended },
  // Turn off rule requiring React in scope for JSX — not needed with React 17+ automatic runtime
  // Turn off rule requiring React in scope for JSX — not needed with React 17+ automatic runtime
  // Also turn off prop-types rule because this project uses TypeScript for prop typing.
  { files: ["src/**/*.{jsx,tsx}"], rules: { "react/react-in-jsx-scope": "off", "react/prop-types": "off" } },
  { files: ["src/**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["src/**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["src/**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["src/**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  {
    files: ["src/**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"], settings: {
      tailwindcss: {
        // Attributes/props that could contain Tailwind CSS classes...
        // Optional, default values: ["class", "className", "ngClass", "@apply"]
        attributes: ["class"],
        // The absolute path pointing to you main Tailwind CSS v4 config file.
        // It must be a `.css` file (v4), not a `.js` file (v3)
        // REQUIRED, default value will not help
        cssConfigPath: "src/styles/globals.css",
        // Functions/tagFunctions that will be parsed by the plugin.
        // Optional, default values: ["classnames", "clsx", "ctl", "cva", "tv", "tw"]
        functions: ["twClasses"]
      },
    }
  },
]);
