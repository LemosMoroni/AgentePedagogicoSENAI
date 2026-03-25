/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        senai: {
          blue:      '#003087',
          'blue-mid':'#0050a0',
          'blue-lt': '#e8f0fb',
          'blue-dk': '#001f5c',
          orange:    '#E8450A',
          'orange-lt':'#fff0eb',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn .25s ease both',
        'slide-up':   'slideUp .3s ease both',
        'spin-slow':  'spin .8s linear infinite',
        'pulse-dot':  'pulseDot 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { opacity: .4 }, '50%': { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
