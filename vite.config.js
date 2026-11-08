import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function agenticAndSeoStaticPlugin() {
  const attachMiddleware = (middlewares) => {
    middlewares.use((req, res, next) => {
      const urlPath = (req.url || '').split('?')[0];

      // Add CORS headers for agentic & SEO discovery files
      if (/\.(json|txt|xml)$/i.test(urlPath) || urlPath.startsWith('/.well-known/')) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const publicFile = path.join(process.cwd(), 'public', urlPath);
        if (!fs.existsSync(publicFile)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Not Found');
          return;
        }
      }

      next();
    });
  };

  return {
    name: 'agentic-and-seo-static-plugin',
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), agenticAndSeoStaticPlugin()],
  base: './', // Ensures relative asset paths work anywhere including InfinityFree htdocs
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap'],
        },
      },
    },
  },
});
