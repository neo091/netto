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
        target: 'http://n8n-n8n-58fc88-194-26-100-153.traefik.me',
        changeOrigin: true,
        secure: false, // <--- AÑADE ESTO para evitar errores de certificado SSL en local
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
