module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  testMatch: ['**/**/*.spec.js', '*.spec.js'],
  collectCoverageFrom: ['**/*.js', 'index.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    'jest.config.js'
  ],
  testEnvironment: 'node'
}
