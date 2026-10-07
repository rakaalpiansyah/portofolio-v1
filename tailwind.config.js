/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Owner-pinned palette. Change these three to re-theme the whole site.
        ink: {
          DEFAULT: '#0a0a0a',
          900: '#0f0f0f',
          800: '#151515',
          700: '#1d1d1c',
        },
        bone: {
          DEFAULT: '#f5f5f0',
          2: '#a3a39f', // secondary text, 7.9:1 on ink
          3: '#8a8a85', // tertiary text, 5.6:1 on ink
        },
        signal: '#c6ff3d',
        line: 'rgba(245, 245, 240, 0.12)',
      },
      fontFamily: {
        display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        display: '-0.03em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.65, 0, 0.35, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
