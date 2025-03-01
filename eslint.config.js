const globals = require("globals");
const pluginJs = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");

// Convert existing `.eslintrc` rules
const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended,
});

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Extend recommended ESLint rules
    },
  },
  // Convert `.eslintrc` rules
  ...compat.extends("eslint:recommended"),
];
