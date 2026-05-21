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
  '/equipe/arike',
  '/blog',
])

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), imagetools()],
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths) {
      // Normalize each discovered path to a leading slash form, then filter
      // against the whitelist + dynamic blog slugs. Skip parametric paths
      // (anything containing ':' that isn't filled in by getStaticPaths).
      return paths.filter((raw) => {
        const p = raw.startsWith('/') ? raw : `/${raw}`
        if (p.includes(':')) return false
        if (PRERENDER_PATHS.has(p)) return true
        if (p.startsWith('/blog/')) return true
        return false
      })
    },
  },
  optimizeDeps: {
    exclude: ['unicornstudio-react'],
  },
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
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
      // React Router v7 dropped the `react-router-dom/server` subpath; the
      // equivalent APIs (StaticRouterProvider, createStaticHandler,
      // createStaticRouter) now live on the main `react-router` package.
      // vite-react-ssg still imports the old subpath, so we redirect both
      // bare `react-router-dom` and `react-router-dom/server[.js]` to v7's
      // `react-router`.
      { find: /^react-router-dom\/server(?:\.js)?$/, replacement: 'react-router' },
      // Bare `import ... from 'leaflet'` only. Subpaths like
      // 'leaflet/dist/leaflet.css' must pass through unchanged.
      // During SSR build, redirect to a no-op stub so leaflet's window access
      // never runs.
      {
        find: /^leaflet$/,
        replacement: isSsrBuild
          ? path.resolve(__dirname, 'src/shims/leaflet-ssr.ts')
          : path.resolve(__dirname, 'src/shims/leaflet.ts'),
      },
      // Also redirect the subpath used by react-leaflet -> leaflet/dist/leaflet-src.js
      // and stub react-leaflet itself so MapContainer & co. render nothing.
      ...(isSsrBuild
        ? [
            { find: /^leaflet\/dist\/leaflet-src\.js$/, replacement: path.resolve(__dirname, 'src/shims/leaflet-ssr.ts') },
            { find: /^react-leaflet$/, replacement: path.resolve(__dirname, 'src/shims/react-leaflet-ssr.tsx') },
          ]
        : []),
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
  ssr: {
    // Browser-only modules that must NOT execute during prerender. They are
    // only referenced from routes that we never prerender, but Vite's SSR
    // module graph still walks lazy() chunks for non-included routes.
    // CJS modules with default-export issues under SSR externalization are
    // forced through Vite's bundler (esbuild interop) instead. Modules that
    // touch `window` at module load belong in `external` (leaflet, etc.).
    noExternal: ['lottie-react', 'react-cookie-consent', 'react-google-recaptcha'],
    external: [
      'leaflet',
      'react-leaflet',
      'unicornstudio-react',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'gsap',
      '@stripe/react-stripe-js',
      '@stripe/stripe-js',
    ],
  },
}))
