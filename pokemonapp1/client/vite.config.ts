import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      "/auth/login": {
        target: "http://localhost:5000"
      },
       "/api/pokemons": {
        target: "http://localhost:5000"
      }
    }
  }
});
