import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // ✅ Ensures assets are referenced correctly
  plugins: [react()],
  build: {
    outDir: "dist"  // ✅ Ensures the correct output directory
  }
});
