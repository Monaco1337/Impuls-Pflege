import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo/site'

/**
 * /robots.txt — Next 16 Conventions API.
 *
 * Wir blocken /admin/, /api/admin und sonstige interne Routen, lassen aber
 * /api/og/ explizit zu (für OG-Image-Rendering, falls später ergänzt).
 * Sitemap-URL ist absolut, weil einige Crawler relativ ungern crawlen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin',
          '/api/admin/',
          '/api/applicants/',
          '/api/anamnese/',
          '/_next/',
          '/private/',
          '/login',
          '/bewerbung/danke/',
        ],
      },
      {
        // Pflege-spezifische AI-Bots respektvoll handhaben (Industry-State of 2026):
        // Wir erlauben Lesen, weil unsere Antworten auch in AI-Overviews relevant sind.
        userAgent: ['GPTBot', 'Google-Extended', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
