import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: '/', // For root domain deployment (Netlify, Vercel). Change to '/repo-name/' for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
