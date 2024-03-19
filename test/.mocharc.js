module.exports = {
  require: 'test/test-setup.js',
  recursive: true,
  extension: ['js', 'ts'],
  exclude: ["**/test/**/*.test.ts"],
  timeout: 20000,
};
