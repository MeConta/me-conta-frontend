module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 0,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx'],
  coverageReporters: ['lcov', 'text'],
  modulePaths: ['<rootDir>/src', '<rootDir>/.jest']
}
