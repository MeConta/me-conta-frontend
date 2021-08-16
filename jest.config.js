module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/.next/', '/node_modules/'],
  bail: 0,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/pages/_document.tsx',
    '!src/pages/_app.tsx'
  ],
  coverageReporters: ['lcov', 'text'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}
