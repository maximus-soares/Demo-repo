import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke Testing Configuration
 * Quick validation of critical functionality after deployments
 */
export default defineConfig({
  testDir: './tests/smoke',
  
  /* Run smoke tests in parallel for speed */
  fullyParallel: true,
  
  /* Fail fast on smoke test failures */
  forbidOnly: !!process.env.CI,
  
  /* Retry smoke tests to ensure reliability */
  retries: process.env.CI ? 3 : 1,
  
  /* Use more workers for faster smoke testing */
  workers: process.env.CI ? 2 : undefined,
  
  /* Minimal reporting for smoke tests */
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/smoke-results.json' }],
    ['junit', { outputFile: 'test-results/smoke-results.xml' }],
  ],
  
  /* Optimized settings for smoke tests */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Minimal tracing for smoke tests */
    trace: 'retain-on-failure',
    
    /* Screenshots only on failure */
    screenshot: 'only-on-failure',
    
    /* No video for smoke tests to save time */
    video: 'off',
    
    /* Standard viewport */
    viewport: { width: 1280, height: 720 },
    
    /* Faster navigation */
    navigationTimeout: 15 * 1000,
    actionTimeout: 10 * 1000,
    
    /* Ignore HTTPS errors in staging */
    ignoreHTTPSErrors: true,
  },
  
  /* Essential browser coverage for smoke tests */
  projects: [
    {
      name: 'Chrome Smoke',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'Mobile Smoke',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  /* Run against staging/production server for smoke tests */
  webServer: process.env.SMOKE_TEST_URL ? undefined : {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // Faster startup for smoke tests
  },
  
  /* Shorter timeout for smoke tests */
  timeout: 15 * 1000,
  
  /* Quick expect timeout */
  expect: {
    timeout: 5 * 1000,
  },
  
  /* Output directory */
  outputDir: 'test-results/smoke',
  
  /* Test configuration for smoke tests */
  testOptions: {
    // Skip slow operations
    skipSlowTests: true,
    
    // Essential checks only
    checkCriticalPaths: true,
    
    // Performance thresholds for smoke tests
    performanceThresholds: {
      pageLoad: 3000, // 3 seconds max
      firstContentfulPaint: 1500, // 1.5 seconds max
    },
  },
  
  /* Metadata */
  metadata: {
    project: 'NextWork Marketing Website',
    testType: 'Smoke Tests',
    environment: process.env.NODE_ENV || 'production',
    url: process.env.SMOKE_TEST_URL || 'http://localhost:3000',
  },
};