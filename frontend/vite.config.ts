import { defineConfig, loadEnv } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  const siteUrl = environment.SITE_URL ?? 'http://localhost:5173'

  return {
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    server: environment.API_PROXY_TARGET
      ? { proxy: { '/api': { target: environment.API_PROXY_TARGET, changeOrigin: true } } }
      : undefined,
    plugins: [tailwindcss(), reactRouter()],
  }
})
