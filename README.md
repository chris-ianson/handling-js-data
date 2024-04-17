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
Install commitlint/config-conventional and commitlint/cli and add the config file.
```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```
Once installed you can add the hook in lefthook.yml file
```
...
commit-msg:
   commands:
     "lint commit message":
       run: npx --no -- commitlint --edit "$1"
...       
```
Next up we'll refine run commands
```
git checkout production-step3
```
###Step 3 - Update TypeScript Config

It's good to enforce quality checks within TypeScript. We've also removed unused commands no longer needed and set the build config.

```
git checkout production-step4
```
###Step 4 - Remove vulnerabilities and add Helmut
- Jade templating has been replaced with Pug to remove critical vulnerabilities highlighted by npm audit.
- Express and Nodemon have been updated to remove high vulnerabilities.
- Added git hook to run `npm audit` and check there are zero vulnerabilities.
- Added Helmet to update header information.

```
git checkout production-step5
```
#Step 5 - Set env properties
Next step is to update connector values so they can be changed across environments. These are set with environment properties. In order to allow typechecking and capture environment errors at runtime we'll use the Zog library to validate env values against a schema.
```
npm install zog
```
Next step is to install a logging library.
```
npm install production-step6
```

#Step 6 - Add some Logging

We've installed winston log library so and added some logging to the connector (note: we should consider where other logs may be useful and we'll come back to this in the future)

The main logger setup is in logger.ts and you can see how we've configured it to produce multiple log files and different formats. Log rotation will be setup in the future when we deploy the app.


