import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { seoPlugin } from './Scripts/seo'

// base './' keeps asset URLs relative, so the same build works under
// https://<user>.github.io/Portfolio/ and on a custom domain.
export default defineConfig({
  base: './',
  plugins: [react(), seoPlugin(process.env.SITE_URL)],
  build: { outDir: 'dist', sourcemap: false },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./Tests/setup.ts'],
    include: ['Tests/unit/**/*.test.{ts,tsx}'],
  },
})
