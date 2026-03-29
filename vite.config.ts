import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    proxy: {
      // 🔥 MAIN FIX: connect frontend → backend
      "/detect": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },

      // (optional) keep if you still use HuggingFace somewhere
      "/api": {
        target: "https://api-inference.huggingface.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})