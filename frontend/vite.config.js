// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//   base: '/',
//   plugins: [react(), svgr()],
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   }
// });

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@validation': path.resolve(__dirname, '../validation')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});

