import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// Whitelist of routes that should be statically prerendered. Everything else
// will be served via the SPA fallback at runtime. Dynamic blog/:slug paths are
// added by getStaticPaths() inside src/routes.tsx.
const PRERENDER_PATHS = new Set<string>([
  '/',
  '/a-propos',
  '/services',
  '/tarifs',
  '/contact',
  '/ressources',
  '/privacypolicy',
  '/cgu',
  '/maintenance',
  '/location',
  '/conduite',
  '/actualisation',
  '/fabrication-permis',
  '/passerelle',
  '/code-en-ligne',
  '/accompagnement',
  '/post-permis',
  '/blog',
])

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths) {
      return paths.filter((p) => PRERENDER_PATHS.has(p) || p.startsWith('/blog/'))
    },
  },
  optimizeDeps: {
    exclude: ['unicornstudio-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
          ],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
        },
      },
    },
  },
  resolve: {
    alias: [
      // Bare `import ... from 'leaflet'` only. Subpaths like
      // 'leaflet/dist/leaflet.css' must pass through unchanged.
      { find: /^leaflet$/, replacement: path.resolve(__dirname, "src/shims/leaflet.ts") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@features", replacement: path.resolve(__dirname, "src/features") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@mytypes", replacement: path.resolve(__dirname, "src/types") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      { find: /^@\//, replacement: path.resolve(__dirname, "src") + "/" },
    ]
  },
  server: {
    host: true,
    allowedHosts: true,
    proxy :{
       '/storage': {
        target: 'https://smoni.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storage/, '/storage'),
      }
    }
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
