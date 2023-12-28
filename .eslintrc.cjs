/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
  },
  env: {
    es2024: true,
  },
  plugins: ["@typescript-eslint", "unicorn"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "xo",
    "xo-react",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "error",
    semi: "error",
    indent: "off",
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "linebreak-style": "off",
    "jsx-quotes": ["error", "prefer-double"],
    complexity: ["error", 40],
    "operator-linebreak": "off",
    "react/jsx-curly-newline": "off",
    "no-extra-parens": "off",
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "react/jsx-fragments": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "react/function-component-definition": "off",
    "unicorn/no-null": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/prefer-at": ["error", { checkAllIndexAccess: true }],
  },
};

module.exports = config;
