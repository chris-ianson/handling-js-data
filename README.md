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
