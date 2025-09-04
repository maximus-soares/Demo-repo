import { defineConfig, devices } from '@playwright/test';

/**
 * Visual Regression Testing Configuration
 * Focuses on pixel-perfect UI consistency across browsers and viewports
 */
export default defineConfig({
  testDir: './tests/visual',
  
  /* Run tests in files in parallel */
  fullyParallel: false, // Sequential for consistent visual testing
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* No retries for visual tests to avoid flaky results */
  retries: 0,
  
  /* Single worker for consistent visual testing */
  workers: 1,
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report/visual' }],
    ['json', { outputFile: 'test-results/visual-results.json' }],
    ['list'],
  ],
  
  /* Shared settings for visual testing */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Always trace for visual debugging */
    trace: 'on',
    
    /* Always take screenshots for visual comparison */
    screenshot: 'only-on-failure',
    
    /* Fixed viewport for consistent visual testing */
    viewport: { width: 1280, height: 720 },
    
    /* Font rendering consistency */
    fontFamily: 'Arial, sans-serif',
    
    /* Disable animations for consistent screenshots */
    contextOptions: {
      reducedMotion: 'reduce',
    },
    
    /* Visual comparison settings */
    testOptions: {
      // Pixel difference threshold (0-1)
      threshold: 0.2,
      
      // Maximum allowed pixel difference
      maxDiffPixels: 100,
      
      // Animation handling
      animations: 'disabled',
      
      // Font loading
      fonts: 'ready',
    },
  },
  
  /* Configure projects for visual testing */
  projects: [
    {
      name: 'Desktop Chrome - Visual',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'Desktop Firefox - Visual',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'Desktop Safari - Visual',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    /* Mobile visual testing */
    {
      name: 'Mobile Chrome - Visual',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },
    
    {
      name: 'Mobile Safari - Visual',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 },
      },
    },
    
    /* Tablet visual testing */
    {
      name: 'iPad - Visual',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 768 },
      },
    },
  ],
  
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  /* Global setup for visual testing */
  globalSetup: './tests/visual/global-setup.ts',
  
  /* Extended timeout for visual processing */
  timeout: 60 * 1000,
  
  /* Expect timeout for image comparison */
  expect: {
    timeout: 30 * 1000,
    
    // Visual comparison settings
    toHaveScreenshot: {
      // Pixel difference threshold
      threshold: 0.2,
      
      // Animation handling
      animations: 'disabled',
      
      // Caret handling for text inputs
      caret: 'hide',
      
      // CSS media settings
      mode: 'css',
      
      // Full page screenshots
      fullPage: true,
    },
    
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixels: 100,
    },
  },
  
  /* Output directory for visual diff artifacts */
  outputDir: 'test-results/visual',
  
  /* Metadata */
  metadata: {
    project: 'NextWork Marketing Website',
    testType: 'Visual Regression',
    environment: process.env.NODE_ENV || 'test',
  },
};