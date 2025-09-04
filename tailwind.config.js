/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // NextWork Brand Colors
      colors: {
        // Custom NextWork colors
        'nw-paper': '#f8f5f1',    // NextWork Paper
        'nw-leather': '#1b1918',  // NextWork Leather
        'nw-blue': '#2563eb',     // NextWork Blue (accent)
        
        // NextWork Surface Colors
        'nw-surface-1': '#fefcfa', // Lightest surface
        'nw-surface-2': '#f4f1ed', // Secondary surface
        'nw-surface-3': '#eae5df', // Tertiary surface
        
        // NextWork Text Colors
        'nw-foreground': '#1b1918',      // Primary text (leather)
        'nw-foreground-light': '#666463', // Secondary text
        'nw-foreground-dark': '#2c2a29',  // Dark text
        
        // Primary: NextWork Paper (#F8F5F1)
        primary: {
          50: '#fefcfa',   // Lightest tint
          100: '#fdf9f5',  // Very light
          200: '#fcf4ed',  // Light
          300: '#faefe5',  // Medium light
          400: '#f9eadd',  // Base lighter
          500: '#f8f5f1',  // Brand Primary - NextWork Paper
          600: '#e6ddd4',  // Slightly darker
          700: '#d3c5b7',  // Medium dark
          800: '#c1ad9a',  // Dark
          900: '#ae957d',  // Darker
          950: '#9c7d60',  // Darkest
        },
        // Secondary: NextWork Leather (#1B1918)
        secondary: {
          50: '#f7f6f6',   // Very light grey
          100: '#eeeded',  // Light grey
          200: '#dddcdb',  // Medium light grey
          300: '#cbcac9',  // Medium grey
          400: '#bab8b7',  // Darker grey
          500: '#a8a6a5',  // Medium dark grey
          600: '#878584',  // Dark grey
          700: '#666463',  // Darker grey
          800: '#454342',  // Very dark grey
          900: '#2c2a29',  // Almost black
          950: '#1b1918',  // Brand Secondary - NextWork Leather
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      
      // Brand typography - NextWork
      fontFamily: {
        sans: ['Suisse Neue', 'system-ui', 'sans-serif'], // Primary font for all text
        display: ['Suisse Neue', 'system-ui', 'sans-serif'], // Display text
        mono: ['JetBrains Mono', 'Consolas', 'monospace'], // Code blocks
        // Simplified font stack
        body: ['Suisse Neue', 'system-ui', 'sans-serif'],
        heading: ['Suisse Neue', 'system-ui', 'sans-serif'],
      },
      
      // Conversion-optimized spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Marketing site specific breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // Animation and transitions for marketing
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      
      // Marketing-focused shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      
      // Gradient utilities for marketing
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'cta-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      
      // Marketing-specific border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    // Add forms plugin for better form styling
    // require('@tailwindcss/forms'),
    // Add typography plugin for content
    // require('@tailwindcss/typography'),
    // Add aspect ratio plugin
    // require('@tailwindcss/aspect-ratio'),
  ],
  
  // Optimize for production
  corePlugins: {
    // Disable unused features for better performance
    container: false,
  },
  
  // Content optimization
  safelist: [
    // Always include these classes for dynamic content
    'animate-fade-in',
    'animate-slide-up',
    'text-primary-600',
    'bg-primary-600',
    'hover:bg-primary-700',
    // NextWork specific classes
    'text-nw-surface-1',
    'text-nw-leather',
    'text-nw-foreground-light',
    'bg-nw-surface-1',
    'bg-nw-surface-2',
    'bg-nw-surface-3',
    'hover:bg-nw-surface-1',
    'hover:bg-nw-surface-3',
    'border-nw-surface-3',
    'hover:opacity-80',
    'text-nw-paper',
    'bg-nw-paper',
    'bg-nw-leather',
    'placeholder-nw-paper/60',
  ],
};