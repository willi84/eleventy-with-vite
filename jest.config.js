/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          // solve ts-jest[config] (WARN) message TS151001
          tsconfig: 'tsconfig.json',
        //   tsconfig: 'src/app/tsconfig.json',
          esModuleInterop: true,
        },
      ],
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
    //   'src/app/**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/_site/**',
      '!**/coverage/**',
      '!**/vendor/**',
    ],
    coverageReporters: ['json', 'json-summary', 'lcov', 'text'],
  };
  