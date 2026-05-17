/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00e5ff',
          light: '#33eaff',
          dark: '#0099cc',
        },
        bg: {
          primary: '#050505',
          secondary: '#0a0a0a',
          card: '#111111',
          input: '#181818',
        },
        border: {
          subtle: '#1f1f1f',
          glow: '#2a2a2a',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'loading': 'loading 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        loading: {
          '0%': { width: '0%', backgroundPosition: '0% 50%' },
          '50%': { width: '70%', backgroundPosition: '100% 50%' },
          '100%': { width: '100%', backgroundPosition: '0% 50%' },
        },
      }
    },
  },
  plugins: [],
}
