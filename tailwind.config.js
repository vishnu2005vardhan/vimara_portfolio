/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05060a',
        panel: '#0b0e17',
        line: '#1a2033',
        neon: { cyan: '#22e4ff', violet: '#a259ff', lime: '#b6ff3b', pink: '#ff3da8' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scan: 'scan 4s linear infinite',
        spinslow: 'spinslow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
