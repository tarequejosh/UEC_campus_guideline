import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/UEC_campus_guideline/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        living: resolve(__dirname, 'living.html'),
        campus: resolve(__dirname, 'campus-life.html'),
        emergency: resolve(__dirname, 'emergency.html'),
      }
    }
  }
});
