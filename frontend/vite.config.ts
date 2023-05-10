// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    manifest: true,
    outDir: 'public/assets',
    rollupOptions: {
      input: 'resources/js/app.tsx',
    },
  },
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    proxy: {
      '*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  assetsInclude: ['**/*.md', '**/*.mdx'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js'),
      '@lesson': resolve(__dirname, 'src/lessons'),
    },
  },
});
