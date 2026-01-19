


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          vendor: ["axios", "lucide-react"]
        }
      }
    },

    chunkSizeWarningLimit: 800
  },

  server: {
    port: 5173,
    open: true
  },

  preview: {
    port: 4173
  }
});
