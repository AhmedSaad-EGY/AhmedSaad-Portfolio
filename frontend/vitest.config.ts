import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    __SITE_URL__: JSON.stringify(process.env.SITE_URL ?? 'http://localhost:5173'),
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
