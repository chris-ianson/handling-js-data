/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/test/**/*.test.ts"],
  coveragePathIgnorePatterns: [
    "./app.ts",
    "./connectors/user-connector.js",
    "./routes/users.js",
    "./routes/index.js",
    "./services/user-service.js"
  ],
  testTimeout: 30000,
};
