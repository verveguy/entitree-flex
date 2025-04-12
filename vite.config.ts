import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  build: {
    sourcemap: true
  },
  optimizeDeps: {
    entries: [
      'source.ts'
    ]
  },
  server: {
    watch: {
      usePolling: true,
      ignored: ['!**/*']
    }
  }
}); 