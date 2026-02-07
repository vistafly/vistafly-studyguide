import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: command === 'build' ? '/vistafly-studyguide/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
