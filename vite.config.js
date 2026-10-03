import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    proxy: {
      "/api-n8n": {
        target: "https://n8n.paginaweb.pro",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-n8n/, ""),
      },
      "/sheets": {
        target: "https://api.sheetbest.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sheets/, ""),
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@supabase/")) {
            return "supabase";
          }
        },
      },
    },
  },
});
