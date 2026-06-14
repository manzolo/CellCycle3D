import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is configurable so the same build works on a custom domain ("/")
// and on GitHub Pages ("/<repo>/"). The Pages workflow sets VITE_BASE.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
