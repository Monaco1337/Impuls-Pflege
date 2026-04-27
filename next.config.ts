import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // Pinnt Turbopack auf diesen Projekt-Root, damit ein fremdes
  // package-lock.json im Home-Verzeichnis nicht als Workspace-Root erkannt wird.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Pflicht ab Next.js 16: alle in <Image quality={...}/> verwendeten Werte vorab deklarieren.
    qualities: [75, 88, 100],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // SAMEORIGIN statt DENY, damit das Admin-Panel Bewerber-PDFs in einem
          // eigenen <iframe> als Vorschau einbetten kann.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "media-src 'self'",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              // Eigene PDFs dürfen in eigenen Iframes/Objects geladen werden:
              "frame-src 'self' blob:",
              "object-src 'self' blob:",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
