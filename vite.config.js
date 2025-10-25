import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Optimize for production using default minifier (esbuild)
    minify: 'esbuild',
  },
  // Ensure proper static generation
  appType: 'spa',
});

