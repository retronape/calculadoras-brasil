import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://calculadoras-brasil-two.vercel.app',
  build: {
    format: 'file'
  },
  integrations: [sitemap()],
  vite: {
    optimizeDeps: {
      include: []
    },
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
})