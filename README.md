# Productionize the code

The following steps will tidy up the code and get it ready for releasing into production.

### Step 1 - ESLint and Lefthook 

![Lefthook](https://raw.githubusercontent.com/evilmartians/lefthook/HEAD/logo_sign.svg)

Add ESLint to keep code consistent.
```
npm install --save-dev eslint typescript typescript-eslint
```
After installing ESLint we've updated the eslint.config.js file to include strict settings along with a couple of rule overrides.
```
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
```

**Warning**
IntelliJ can't pick up eslint.config.js so may not highlight lint issues within the IDE.

ESLint can be run manually but ideally this should be run automatically using a hook.

Add Lefthook for pre-commit checks
```
npm install --save-dev lefthook
```
Once added you need to initialise it by running:
```
lefthook install
```
The above command gives you a lefthook.yml file and allows you to add different hooks. The following runs eslint on git commit. 
```
pre-commit:
   parallel: true
   commands:
     eslint:
       glob: "*.{js,ts,jsx,tsx}"
       run: npx eslint {staged_files}
```
###Step 2 - Lint commit messages

Next step is adding commitlint to lint commit messages
```
git checkout production-step2
```


