import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Define your proxy rules here
      '/yandex-gpt-api': {
        // This is the path prefix your frontend will use for API requests
        target: 'https://llm.api.cloud.yandex.net', // The URL of your backend API server
        changeOrigin: true, // Ensures the request appears to originate from the target domain
        secure: false, // Allows HTTPS requests even with self-signed certificates (use with caution in production)
        rewrite: (path) => path.replace(/^\/yandex-gpt-api/, ''), // Optional: if you want to remove the '/api' prefix before forwarding
      },
    },
  },
})
