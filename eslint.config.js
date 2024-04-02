// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    "rules": {
      // Note: you must disable the base rule as it can report incorrect errors
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "error",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
);
