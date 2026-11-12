import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  /* The site is served from https://vivohizkia.github.io/porto/ */
  base: '/porto/',
  plugins: [react()],
})
