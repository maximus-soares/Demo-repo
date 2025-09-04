/** @type {import('jest').Config} */
module.exports = {
  displayName: 'Integration Tests',
  testEnvironment: 'jsdom',
  
  // Test file patterns
  testMatch: [
    '<rootDir>/tests/integration/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/tests/integration/**/*.integration.test.{js,jsx,ts,tsx}',
  ],
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
    '<rootDir>/tests/integration/setup.js',
  ],
  
  // Module resolution (inherited from main config)
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    
    // Mock static assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    }],
    '^.+\\.astro$': '<rootDir>/tests/transforms/astroTransform.js',
  },
  
  // Coverage configuration (disabled for integration tests)
  collectCoverage: false,
  
  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.astro/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/tests/unit/',
    '<rootDir>/tests/e2e/',
  ],
  
  // Longer timeout for integration tests
  testTimeout: 30000,
  
  // Verbose output
  verbose: true,
  
  // Performance optimizations for integration tests
  maxWorkers: process.env.CI ? 1 : 2,
  
  // Globals
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
  
  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,
  
  // Custom reporters
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'integration-test-results.xml',
    }],
  ],
  
  // Integration test specific settings
  testSequencer: '<rootDir>/tests/integration/sequencer.js',
  
  // Global setup and teardown for integration tests
  globalSetup: '<rootDir>/tests/integration/globalSetup.js',
  globalTeardown: '<rootDir>/tests/integration/globalTeardown.js',
};