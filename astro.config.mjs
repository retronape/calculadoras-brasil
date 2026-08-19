import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  site: 'https://brasilcalcula.vercel.app',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    build: { target: 'es2017', cssTarget: 'safari10' },
    plugins: [legacy({ targets: ['ie 11', 'last 2 versions'], modernPolyfills: true })]
  }
})
