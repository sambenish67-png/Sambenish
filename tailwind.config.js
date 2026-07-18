/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        neon: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          pink: '#ec4899',
          teal: '#22d3ee',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backgroundImage: {
        'gradient-aurora': 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 25%, #3B82F6 50%, #06B6D4 75%, #22D3EE 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)',
        'gradient-hero': 'linear-gradient(145deg, #0f172a 0%, #111827 40%, #0f172a 100%)',
        'gradient-rays': 'linear-gradient(180deg, rgba(124,58,237,0.12), transparent 35%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'typewriter': 'typewriter 3s steps(40, end) infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.5)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
      },
      backdropFilter: {
        'blur': 'blur(10px)',
        'heavy': 'blur(24px)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-lg': '0 0 40px rgba(16, 185, 129, 0.3)',
        'neon': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
        'neon-lg': '0 0 20px rgba(6, 182, 212, 0.7), 0 0 40px rgba(14, 165, 233, 0.5)',
        'aurora': '0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)',
      },
      transitionDuration: {
        '0': '0ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
