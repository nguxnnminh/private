import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/private/',
  plugins: [react()],
  server: {
    headers: {
      // Allow eval in dev mode (needed by Vite HMR / source maps)
      // This header only applies in dev, not in the production build
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com; connect-src 'self' https://docs.google.com; form-action 'self' https://docs.google.com; frame-src 'self' https://docs.google.com",
    },
  },
})
