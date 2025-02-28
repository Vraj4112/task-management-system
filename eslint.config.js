const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  files: ["**/*.js"], // Lint all JavaScript files
  languageOptions: {
    sourceType: "commonjs", // Use CommonJS module system
    globals: {
      ...globals.browser, // Add browser globals
    },
  },
  ...pluginJs.configs.recommended, // Extend recommended ESLint rules
};
