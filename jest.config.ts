export default {
  collectCoverageFrom: ['./src/components/**/*.{js,jsx,tsx,ts}', '!./src/components/index.ts', '!**/node_modules/**', '!**/dist/**'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist', 'public', 'env'],
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@components': '<rootDir>/src/components',
    '@plugins/(.*)': '<rootDir>/src/plugins/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts'],
  maxWorkers: 1,
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}
