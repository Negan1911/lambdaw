module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  testMatch: ['**/src/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js', 'index.js'],
  testEnvironment: 'node'
}
