/** @type {import('jest').Config} */
module.exports = {
  displayName: 'Accessibility Tests',
  testEnvironment: 'jsdom',
  
  // Test file patterns for accessibility tests
  testMatch: [
    '<rootDir>/tests/a11y/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/*.a11y.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.a11y.test.{js,jsx,ts,tsx}',
  ],
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
    '<rootDir>/tests/a11y/setup.js',
  ],
  
  // Module resolution
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
  
  // Coverage configuration (focused on accessibility-critical components)
  collectCoverage: true,
  coverageDirectory: 'coverage/a11y',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary',
  ],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/layouts/**/*.{js,jsx,ts,tsx}',
    'src/pages/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.config.{js,ts}',
    '!src/types/**/*',
    '!src/assets/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 95,
      statements: 95,
    },
  },
  
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
    '<rootDir>/tests/integration/',
    '<rootDir>/tests/e2e/',
  ],
  
  // Longer timeout for accessibility tests
  testTimeout: 15000,
  
  // Verbose output for accessibility issues
  verbose: true,
  
  // Performance optimizations
  maxWorkers: process.env.CI ? 2 : '50%',
  
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
  
  // Custom reporters for accessibility metrics
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'a11y-test-results.xml',
    }],
    ['<rootDir>/tests/reporters/accessibilityReporter.js', {
      outputFile: './test-results/accessibility-report.json',
    }],
  ],
  
  // Accessibility-specific test environment
  testEnvironment: 'jsdom',
  
  // Run tests serially for consistent accessibility testing
  runInBand: true,
};