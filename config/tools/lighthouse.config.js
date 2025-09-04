/**
 * Lighthouse CI Configuration
 * Performance and quality auditing for marketing website
 */

module.exports = {
  ci: {
    collect: {
      // URLs to audit
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
        'http://localhost:3000/pricing',
        'http://localhost:3000/demo',
      ],
      
      // Collection settings
      numberOfRuns: 3,
      startServerCommand: 'pnpm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      
      // Lighthouse settings
      settings: {
        // Emulate mobile device for primary testing
        emulatedFormFactor: 'mobile',
        
        // Throttling settings for realistic conditions
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        
        // Skip certain audits that aren't relevant for marketing sites
        skipAudits: [
          'uses-http2', // May not be available in all environments
          'redirects-http', // Handled at server level
        ],
        
        // Additional configuration
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        
        // Marketing site specific settings
        additionalTraceCategories: 'devtools.timeline,blink.user_timing',
        auditMode: false,
        gatherMode: false,
        disableDeviceEmulation: false,
        disableStorageReset: false,
      },
    },
    
    assert: {
      // Performance budgets (aligned with CLAUDE.md)
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-meaningful-paint': ['error', { maxNumericValue: 2000 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 4000 }],
        'max-potential-fid': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Resource budgets
        'total-byte-weight': ['error', { maxNumericValue: 2048000 }], // 2MB
        'dom-size': ['error', { maxNumericValue: 1500 }],
        'bootup-time': ['error', { maxNumericValue: 2000 }],
        'mainthread-work-breakdown': ['error', { maxNumericValue: 2000 }],
        
        // Marketing site specific audits
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'efficient-animated-content': 'error',
        'unused-css-rules': 'error',
        'unused-javascript': ['warn', { maxNumericValue: 20000 }],
        'modern-image-formats': 'error',
        'uses-optimized-images': 'error',
        'uses-rel-preconnect': 'error',
        'uses-rel-preload': 'error',
        
        // Accessibility requirements
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'meta-viewport': 'error',
        
        // SEO requirements
        'is-crawlable': 'error',
        'robots-txt': 'error',
        'hreflang': 'off', // Only if using multiple languages
        'canonical': 'error',
        'structured-data': 'warn',
      },
    },
    
    upload: {
      // Upload results to Lighthouse CI server or GitHub
      target: process.env.LHCI_UPLOAD_TARGET || 'temporary-public-storage',
      
      // GitHub integration
      githubToken: process.env.LHCI_GITHUB_TOKEN,
      githubApiHost: 'https://api.github.com',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
      
      // Optional: Custom server
      serverBaseUrl: process.env.LHCI_SERVER_BASE_URL,
      token: process.env.LHCI_SERVER_TOKEN,
    },
    
    server: {
      // Optional: Local LHCI server configuration
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lighthouse-ci.db',
      },
    },
    
    wizard: {
      // Wizard configuration for setup
      chromeFlags: ['--no-sandbox', '--headless'],
    },
  },
  
  // Custom audit configurations
  customAudits: [
    // Marketing conversion tracking audit
    {
      id: 'conversion-tracking',
      title: 'Conversion tracking implemented',
      description: 'Ensures conversion tracking is properly implemented',
      requiredArtifacts: ['Script'],
    },
    
    // Form accessibility audit
    {
      id: 'form-accessibility',
      title: 'Forms are accessible',
      description: 'Ensures all forms have proper labels and error handling',
      requiredArtifacts: ['Accessibility'],
    },
    
    // Marketing analytics audit
    {
      id: 'marketing-analytics',
      title: 'Marketing analytics configured',
      description: 'Ensures marketing analytics tools are properly configured',
      requiredArtifacts: ['Script'],
    },
  ],
  
  // Environment-specific configurations
  environments: {
    development: {
      collect: {
        numberOfRuns: 1,
        settings: {
          emulatedFormFactor: 'desktop',
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
          },
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: 0.8 }],
          'categories:accessibility': ['error', { minScore: 0.9 }],
        },
      },
    },
    
    staging: {
      collect: {
        numberOfRuns: 2,
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.85 }],
          'categories:accessibility': ['error', { minScore: 0.9 }],
        },
      },
    },
    
    production: {
      collect: {
        numberOfRuns: 5, // More runs for production accuracy
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.9 }],
          'categories:accessibility': ['error', { minScore: 0.95 }],
          'categories:best-practices': ['error', { minScore: 0.9 }],
          'categories:seo': ['error', { minScore: 0.95 }],
        },
      },
    },
  },
};