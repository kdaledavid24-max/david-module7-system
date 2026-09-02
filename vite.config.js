import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/david-module7-system/',
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'jsdom',
    include: ['src/tests/**/*.test.js']
  }
})