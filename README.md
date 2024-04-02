# Productionise the code

The following steps will tidy up the code and get it ready for releasing into production.

### Step 1

Add ESlint to keep code consistent.

```
npm install --save-dev eslint typescript typescript-eslint
```

ESLint can be run manually but ideally this should be run automatically using a hook.

