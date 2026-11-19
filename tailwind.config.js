/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        mist: '#F5F4F0',
        obsidian: {
          DEFAULT: '#080A12',
          elevated: '#111524',
        },
        ink: {
          DEFAULT: '#0B0E1A',
          muted: '#4A5068',
          light: '#F8F9FC',
          'light-muted': '#A3AAC2',
        },
        vermilion: {
          DEFAULT: '#C92A1D',
          bright: '#FF5B4D',
          tint: '#FFD8D2',
          dark: '#9E1F14',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', '"Inter Tight"', 'sans-serif'],
        body: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
