import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths work anywhere including InfinityFree htdocs subdirectories
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['gsap', '@gsap/react', 'lenis'],
          'vendor-three': ['three', '@react-three/fiber'],
        },
      },
    },
  },
});
