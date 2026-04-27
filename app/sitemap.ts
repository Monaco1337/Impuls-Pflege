import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo/site'
import { LOCATIONS } from '@/lib/seo/locations'
import { SERVICES } from '@/lib/seo/services'
import { PFLEGEGRADE } from '@/lib/seo/pflegegrade'

/**
 * Programmatic Sitemap für Next 16.
 *
 * Wir bauen die Sitemap aus drei Quellen:
 *  1. Statische Top-Level-Seiten (Home, Über uns, Kontakt, …)
 *  2. SEO-Datenbank (Stadt-Hub × Leistung × Service-Stadt × Pflegegrad ×
 *     Angehörigen-Hub)
 *  3. Karriere-Seiten dynamisch über vorhandene jobs.json (optional)
 *
 * Priorität & changeFreq werden bewusst differenziert:
 *  - Money Pages (Stadt × Leistung) hoch (0.9 / weekly)
 *  - Hubs mittel (0.7 / weekly)
 *  - Footer-Seiten niedrig (0.3 / yearly)
 */

type SitemapEntry = MetadataRoute.Sitemap[number]

const TODAY = new Date()

function entry(path: string, priority: number, changeFrequency: SitemapEntry['changeFrequency']): SitemapEntry {
  const url = path.startsWith('http') ? path : `${SITE.url}${path}`
  return { url, lastModified: TODAY, changeFrequency, priority }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = []

  // ── Statische Top-Level ────────────────────────────────────────────
  entries.push(entry('/', 1.0, 'weekly'))
  entries.push(entry('/leistungen/', 0.85, 'weekly'))
  entries.push(entry('/ueber-uns/', 0.6, 'monthly'))
  entries.push(entry('/team/', 0.5, 'monthly'))
  entries.push(entry('/kontakt/', 0.7, 'monthly'))
  entries.push(entry('/karriere/', 0.6, 'weekly'))
  entries.push(entry('/anamnesebogen/', 0.5, 'monthly'))
  entries.push(entry('/impressum/', 0.2, 'yearly'))
  entries.push(entry('/datenschutz/', 0.2, 'yearly'))

  // ── Stadt-Hubs: /pflegedienst-[slug]/ ──────────────────────────────
  for (const loc of LOCATIONS) {
    const prio = loc.tier === 'primary' ? 0.9 : 0.7
    entries.push(entry(`/pflegedienst-${loc.slug}/`, prio, 'weekly'))
  }

  // ── Leistungs-Hubs: /leistungen/[slug]/ ────────────────────────────
  for (const svc of SERVICES) {
    entries.push(entry(`/leistungen/${svc.slug}/`, 0.85, 'weekly'))
  }

  // ── Service × Stadt: /leistungen/[slug]/[stadt]/ ───────────────────
  // Das sind die programmatic Long-Tail-Money-Pages — höchste Priorität,
  // weil sie 1:1 auf konkrete Suchanfragen ranken („Wundversorgung Lünen").
  for (const svc of SERVICES) {
    for (const loc of LOCATIONS) {
      const prio = loc.tier === 'primary' ? 0.9 : 0.65
      entries.push(entry(`/leistungen/${svc.slug}/${loc.slug}/`, prio, 'weekly'))
    }
  }

  // ── Pflegegrad-Hub: /pflegegrad + /pflegegrad/[slug]/ ──────────────
  entries.push(entry('/pflegegrad/', 0.85, 'monthly'))
  for (const pg of PFLEGEGRADE) {
    entries.push(entry(`/pflegegrad/${pg.slug}/`, 0.8, 'monthly'))
  }

  // ── Angehörigen-Hub ────────────────────────────────────────────────
  const relatives = [
    'pflege-fuer-angehoerige',
    'erste-schritte-pflegefall',
    'checkliste-angehoerige',
    'pflegekosten',
    'pflege-zuhause-organisieren',
    'pflege-nach-krankenhaus-angehoerige',
  ]
  for (const slug of relatives) {
    entries.push(entry(`/ratgeber/${slug}/`, 0.75, 'monthly'))
  }

  return entries
}
