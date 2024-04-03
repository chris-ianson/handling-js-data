/*eslint no-undef: "off"*/
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    "rules": {
      // Note: you must disable the base rule as it can report incorrect errors
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "error",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
);
