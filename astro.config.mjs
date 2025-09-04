import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nextworkmarketing.com',
  
  // 2024 Performance Optimizations
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport' // Prefetch when links enter viewport - ideal for marketing sites
  },
  
  // View Transitions for smooth SPA-like navigation
  transitions: true,
  
  
  
  // Marketing Site Integrations
  integrations: [
    // SEO-optimized sitemap
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Marketing site specific pages
      customPages: [
        'https://nextworkmarketing.com/landing/special-offer',
        'https://nextworkmarketing.com/demo',
      ],
      // Custom priorities for different page types
      serialize(item) {
        if (item.url.includes('/projects/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url === 'https://nextworkmarketing.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/about') || item.url.includes('/careers')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy') || item.url.includes('/terms')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }
        return item;
      },
      // Exclude admin/internal pages
      filter: (page) => !page.includes('/admin/') && !page.includes('/internal/')
    }),
  ],
  
  // Core Web Vitals Optimization
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize bundle for marketing sites
      rollupOptions: {
        output: {
          // Separate chunks for better caching
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'utils': ['./src/lib/utils', './src/lib/analytics'],
            'components': ['./src/components/ui']
          }
        }
      },
      // Performance budgets enforcement
      chunkSizeWarningLimit: 500, // 500kb limit
      assetsInlineLimit: 4096, // 4kb inline limit
    },
    // Development optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'astro-seo'],
    },
    // Marketing site specific optimizations
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __SITE_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    }
  },
  
  // Build optimizations for marketing sites
  build: {
    // Inline critical CSS for faster LCP
    inlineStylesheets: 'auto',
    // Generate source maps for debugging
    sourcemap: process.env.NODE_ENV === 'development',
  },
  
  // Image optimization for marketing assets
  image: {
    // Enable modern formats
    domains: ['images.unsplash.com', 'cdn.nextworkmarketing.com'],
    formats: ['avif', 'webp', 'svg'],
    // Performance-first defaults
    quality: 80,
    widths: [320, 640, 768, 1024, 1280, 1600],
    // Marketing-specific image handling
    densities: [1, 2], // Support retina displays
  },
  
  // Advanced routing for marketing campaigns
  redirects: {
    '/signup': '/projects?source=signup',
    '/demo': '/projects?source=demo',
    '/trial': '/projects?source=trial',
    '/learn': '/projects',
    '/courses': '/projects',
    '/start': '/projects',
    '/get-started': '/projects',
    // Blog redirects
    '/articles': '/blog',
    '/news': '/blog',
    // Legal redirects
    '/privacy-policy': '/privacy',
    '/tos': '/terms',
    '/terms-of-service': '/terms',
  },
  
  // Server configuration for hosting
  server: {
    port: 4321,
    host: true // Allow external connections for testing
  },
  
  // Marketing site output configuration
  output: 'static', // Static generation for best SEO and performance
  
  // Security headers for marketing sites
  security: {
    checkOrigin: true,
  },
  
  // Development enhancements
  devToolbar: {
    enabled: process.env.NODE_ENV === 'development'
  },
  
  // Markdown configuration for content marketing
  markdown: {
    // Enable syntax highlighting for code examples
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    },
    // Marketing content optimizations
    gfm: true, // GitHub flavored markdown
    smartypants: true, // Smart quotes and dashes
  }
});