import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join('; ')

// Injected only into the built HTML: the dev server needs inline scripts and a
// websocket connection for HMR.
const contentSecurityPolicy = (): Plugin => ({
  name: 'inject-content-security-policy',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: () => [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: CONTENT_SECURITY_POLICY,
        },
        injectTo: 'head-prepend',
      },
    ],
  },
})

export default defineConfig({
  plugins: [react(), contentSecurityPolicy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
