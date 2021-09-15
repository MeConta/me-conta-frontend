module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/.next/', '/node_modules/'],
  bail: 0,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/pages/*.tsx',
    '!src/styles/*.ts',
    '!src/utils/tests/helpers.tsx',
    '!src/types/*.d.ts'
  ],
  coverageReporters: ['lcov', 'text'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}
