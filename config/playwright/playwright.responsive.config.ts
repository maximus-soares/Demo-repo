import { defineConfig, devices } from '@playwright/test';

/**
 * Responsive Design Testing Configuration
 * Tests layouts and functionality across different screen sizes and orientations
 */
export default defineConfig({
  testDir: './tests/responsive',
  
  /* Run responsive tests in parallel */
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  
  /* Comprehensive responsive testing reporter */
  reporter: [
    ['html', { outputFolder: 'playwright-report/responsive' }],
    ['json', { outputFile: 'test-results/responsive-results.json' }],
    ['junit', { outputFile: 'test-results/responsive-results.xml' }],
    ['list'],
  ],
  
  /* Base settings for responsive testing */
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    /* Context options for responsive testing */
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  
  /* Comprehensive device and viewport testing */
  projects: [
    /* Mobile Devices - Portrait */
    {
      name: 'iPhone SE - Portrait',
      use: { 
        ...devices['iPhone SE'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'iPhone 12 - Portrait',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'iPhone 12 Pro Max - Portrait',
      use: { 
        ...devices['iPhone 12 Pro Max'],
        viewport: { width: 428, height: 926 },
      },
    },
    {
      name: 'Pixel 5 - Portrait',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
      },
    },
    {
      name: 'Samsung Galaxy S21 - Portrait',
      use: { 
        ...devices['Galaxy S21'],
        viewport: { width: 384, height: 854 },
      },
    },
    
    /* Mobile Devices - Landscape */
    {
      name: 'iPhone 12 - Landscape',
      use: { 
        ...devices['iPhone 12 landscape'],
        viewport: { width: 844, height: 390 },
      },
    },
    {
      name: 'Pixel 5 - Landscape',
      use: { 
        ...devices['Pixel 5 landscape'],
        viewport: { width: 851, height: 393 },
      },
    },
    
    /* Tablets - Portrait */
    {
      name: 'iPad - Portrait',
      use: { 
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'iPad Pro - Portrait',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 },
      },
    },
    {
      name: 'iPad Mini - Portrait',
      use: { 
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
      },
    },
    
    /* Tablets - Landscape */
    {
      name: 'iPad - Landscape',
      use: { 
        ...devices['iPad landscape'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'iPad Pro - Landscape',
      use: { 
        ...devices['iPad Pro landscape'],
        viewport: { width: 1366, height: 1024 },
      },
    },
    
    /* Desktop Viewports */
    {
      name: 'Small Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'Medium Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Large Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'XL Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: '4K Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 },
      },
    },
    
    /* Ultrawide Desktop */
    {
      name: 'Ultrawide Desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 3440, height: 1440 },
      },
    },
    
    /* Custom Breakpoints for Marketing Site */
    {
      name: 'Mobile Small (320px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
        userAgent: devices['iPhone SE'].userAgent,
      },
    },
    {
      name: 'Mobile Medium (375px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
        userAgent: devices['iPhone 12'].userAgent,
      },
    },
    {
      name: 'Mobile Large (414px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 414, height: 896 },
        userAgent: devices['iPhone 12 Pro Max'].userAgent,
      },
    },
    {
      name: 'Tablet Small (768px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
        userAgent: devices['iPad'].userAgent,
      },
    },
    {
      name: 'Desktop Small (1024px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'Desktop Medium (1280px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Desktop Large (1440px)',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  
  /* Web server configuration */
  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  /* Global setup for responsive testing */
  globalSetup: './tests/responsive/global-setup.ts',
  
  /* Timeout settings */
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
    
    /* Visual comparison for responsive layouts */
    toHaveScreenshot: {
      threshold: 0.3, // Allow more variance for responsive layouts
      animations: 'disabled',
      fullPage: true,
    },
  },
  
  /* Output directory */
  outputDir: 'test-results/responsive',
  
  /* Responsive testing configuration */
  responsiveConfig: {
    /* Breakpoints to test (from CLAUDE.md marketing site focus) */
    breakpoints: {
      'mobile-sm': 320,
      'mobile-md': 375,
      'mobile-lg': 414,
      'tablet-sm': 768,
      'tablet-lg': 1024,
      'desktop-sm': 1280,
      'desktop-md': 1440,
      'desktop-lg': 1920,
      'desktop-xl': 2560,
    },
    
    /* Elements to test for responsive behavior */
    testElements: [
      'header',
      'navigation',
      'hero-section',
      'cta-buttons',
      'contact-form',
      'testimonials',
      'pricing-table',
      'footer',
    ],
    
    /* Critical responsive features */
    features: [
      'mobile-menu-toggle',
      'responsive-images',
      'touch-friendly-buttons',
      'readable-text-size',
      'proper-spacing',
      'horizontal-scrolling',
      'form-usability',
    ],
    
    /* Performance thresholds by device type */
    performanceThresholds: {
      mobile: {
        lcp: 3000, // 3s for mobile
        fid: 100,
        cls: 0.1,
      },
      tablet: {
        lcp: 2500, // 2.5s for tablet
        fid: 100,
        cls: 0.1,
      },
      desktop: {
        lcp: 2000, // 2s for desktop
        fid: 100,
        cls: 0.1,
      },
    },
  },
  
  /* Metadata */
  metadata: {
    project: 'NextWork Marketing Website',
    testType: 'Responsive Design',
    environment: process.env.NODE_ENV || 'test',
    breakpoints: '320px-2560px',
  },
};