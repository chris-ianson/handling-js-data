# Connecting to APIs (1-to-1 sync)

Example of how to connect to APIs

### Step 1

The first step contains a connection to the user backend service.

```
git checkout api-step1
npm install
npm run dev
```

Once running the app can be accessed at:
http://localhost:3000/users-typescript

The app uses the axios http library to connect to the backend API.

Tests are included using the mocha and sinon test libraries and coverage is implemented with c8.

```
npm run test:coverage
```
Check the second step to see how to implement Jest test framework
```
git checkout api-step2
```

### Step 2

Step 2 implements the Jest test framework and can be ran with the following command.

```
npm update
npm run test:jest
```

Checkout the next step to see how the tests can be refactored to make them easier to work with.

```
git checkout api-step3
```

### Step 3

Step 3 implements generators to help us build dynamic test data. To help us with mocking Axios responses we've added the `jest-mock-axios` dependency.

The next step will continue the refactor of the connector to make it easier to work with.

```
git checkout api-step4
```

### Step 4

Refactor of code and increasing test coverage to 100%
