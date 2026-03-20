import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    global: true,
    environtment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
  server: {
    proxy: {
      '/api-n8n': {
        target: 'https://n8n.paginaweb.pro',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-n8n/, '')
      },
      "/sheets": {
        target: 'https://api.sheetbest.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sheets/, '')
      }
    }
  }
})
