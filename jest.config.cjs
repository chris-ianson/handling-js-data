/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFiles: ["<rootDir>/test/env-vars.js"],
  testEnvironment: 'node',
  testMatch: ["**/test/**/*.test.ts"],
  coveragePathIgnorePatterns: [
    "./test/generators/*",
    "./app.ts",
    "./connectors/user-connector.js",
    "./routes/users.js",
    "./routes/index.js",
    "./services/user-service.js"
  ],
  testTimeout: 30000,
  verbose: true,
  notify: true,
};
