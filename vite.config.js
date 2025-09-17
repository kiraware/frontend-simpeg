import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import { createProxy } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
server: {
  /*   proxy: {
      // Proxy configuration
      '/api': {
        target: 'https://emsifa.github.io/api-wilayah-indonesia/api', // Replace with your API server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }, */
  },
})
