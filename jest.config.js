module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  testMatch: ['**/src/**/*.spec.js', '*.spec.js'],
  collectCoverageFrom: ['src/**/*.js', 'index.js'],
  testEnvironment: 'node'
}
