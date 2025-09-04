import { defineConfig, devices } from '@playwright/test';

/**
 * Conversion Funnel Performance Testing Configuration
 * Tests critical user journeys and conversion paths with performance metrics
 */
export default defineConfig({
  testDir: './tests/conversion',
  
  /* Run conversion tests sequentially for accurate metrics */
  fullyParallel: false,
  
  /* Strict about conversion test failures */
  forbidOnly: !!process.env.CI,
  
  /* Retry conversion tests for reliability */
  retries: process.env.CI ? 2 : 1,
  
  /* Single worker for consistent performance measurement */
  workers: 1,
  
  /* Comprehensive reporting for conversion analysis */
  reporter: [
    ['html', { outputFolder: 'playwright-report/conversion' }],
    ['json', { outputFile: 'test-results/conversion-results.json' }],
    ['junit', { outputFile: 'test-results/conversion-results.xml' }],
    ['list'],
    ['<rootDir>/tests/reporters/conversionReporter.js'],
  ],
  
  /* Performance-focused settings */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Always trace conversion paths */
    trace: 'on',
    
    /* Always record videos for conversion analysis */
    video: 'on',
    
    /* Screenshots for conversion steps */
    screenshot: 'on',
    
    /* Standard desktop viewport for conversion testing */
    viewport: { width: 1280, height: 720 },
    
    /* Extended timeouts for performance measurement */
    navigationTimeout: 30 * 1000,
    actionTimeout: 15 * 1000,
    
    /* Performance context options */
    contextOptions: {
      // Record performance metrics
      recordHar: true,
      recordVideo: true,
      
      // Realistic network conditions
      offline: false,
      
      // Enable performance timeline
      recordTrace: true,
    },
    
    /* User agent for conversion tracking */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 NextWorkBot/1.0',
  },
  
  /* Test against multiple devices for conversion optimization */
  projects: [
    {
      name: 'Desktop Conversion',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'Mobile Conversion',
      use: { 
        ...devices['iPhone 12'],
        // Mobile-specific conversion settings
        contextOptions: {
          // Simulate mobile network conditions
          networkConditions: '3G',
        },
      },
    },
    
    {
      name: 'Tablet Conversion',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 768 },
      },
    },
    
    /* Different browser conversion testing */
    {
      name: 'Firefox Conversion',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'Safari Conversion',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  
  /* Run your local dev server */
  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  /* Global setup for conversion testing */
  globalSetup: './tests/conversion/global-setup.ts',
  globalTeardown: './tests/conversion/global-teardown.ts',
  
  /* Extended timeout for conversion path testing */
  timeout: 60 * 1000,
  
  /* Conversion-specific expect timeout */
  expect: {
    timeout: 20 * 1000,
  },
  
  /* Output directory for conversion artifacts */
  outputDir: 'test-results/conversion',
  
  /* Performance budgets for conversion paths */
  performanceBudgets: {
    // Landing page performance
    landingPage: {
      lcp: 2500, // Largest Contentful Paint < 2.5s
      fid: 100,  // First Input Delay < 100ms
      cls: 0.1,  // Cumulative Layout Shift < 0.1
    },
    
    // Form submission performance
    formSubmission: {
      responseTime: 1000, // Form submission < 1s
      validationTime: 200, // Form validation < 200ms
    },
    
    // Conversion funnel performance
    conversionFunnel: {
      stepLoadTime: 2000, // Each step < 2s
      totalFunnelTime: 10000, // Complete funnel < 10s
    },
  },
  
  /* Conversion tracking configuration */
  conversionConfig: {
    // Primary conversion goals
    primaryGoals: [
      'contact-form-submission',
      'demo-request',
      'newsletter-signup',
    ],
    
    // Secondary conversion goals
    secondaryGoals: [
      'whitepaper-download',
      'pricing-page-visit',
      'about-page-visit',
    ],
    
    // Conversion tracking selectors
    selectors: {
      contactForm: '[data-testid="contact-form"]',
      demoRequest: '[data-testid="demo-request-form"]',
      newsletter: '[data-testid="newsletter-signup"]',
      ctaButtons: '[data-testid*="cta-"]',
    },
    
    // Analytics validation
    analytics: {
      googleAnalytics: true,
      facebookPixel: true,
      linkedInInsight: true,
    },
  },
  
  /* A/B testing configuration */
  abTestConfig: {
    enabled: process.env.AB_TESTING === 'true',
    variants: ['control', 'variant-a', 'variant-b'],
    trafficSplit: [40, 30, 30], // Percentage split
  },
  
  /* Metadata */
  metadata: {
    project: 'NextWork Marketing Website',
    testType: 'Conversion Performance',
    environment: process.env.NODE_ENV || 'test',
    conversionGoals: 'contact-form,demo-request,newsletter',
  },
};