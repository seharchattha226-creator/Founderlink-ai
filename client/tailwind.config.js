/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0B0F',
          surface: '#141419',
          elevated: '#1A1A21',
        },
        border: {
          DEFAULT: '#2A2A33',
          subtle: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255,255,255,0.12)',
        },
        primary: '#00D4FF',
        secondary: '#00E5A8',
        success: '#22C55E',
        warning: '#FACC15',
        error: '#EF4444',
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          muted: '#52525B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h3': ['28px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h4': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['16px', { lineHeight: '1.6' }],
        'body': ['14px', { lineHeight: '1.6' }],
        'small': ['12px', { lineHeight: '1.5' }],
        'caption': ['11px', { lineHeight: '1.4', letterSpacing: '0.03em' }],
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.10)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'focus': '0 0 0 3px rgba(0, 212, 255, 0.1)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
      },
      maxWidth: {
        'container': '1280px',
      }
    },
  },
  plugins: [],
}
