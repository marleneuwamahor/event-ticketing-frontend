/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandPink: '#E84C88',
        brandPinkHot: '#FF0A7B',
        brandPurple: '#9B4FD6',
        ink: '#0B0F1A',
        surfaceDark: '#070B17',
        cardDark: '#141926',
        borderDark: 'rgba(255,255,255,0.08)',
        muted: '#64748B',
        mutedDark: '#94A3B8',
        bgFrom: '#FCEAF5',
        bgTo: '#ECE8FB',
        success: '#34D399',
      },
      fontFamily: {
        plus: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}