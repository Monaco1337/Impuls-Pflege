# Technische SEO-Checkliste

| ID | Bereich | Anforderung | Status | Nachweis |
|----|---------|-------------|--------|----------|
| T-01 | Indexierung | `robots.txt` — Disallow Admin, Allow Public | ✅ | `app/robots.ts` |
| T-02 | Indexierung | `sitemap.xml` — Programmatic, alle Public-Pages | ✅ | `app/sitemap.ts` (~210 URLs) |
| T-03 | Indexierung | `<meta name="robots" content="index, follow">` Default | ✅ | `app/layout.tsx` |
| T-04 | Indexierung | `noindex` für Admin / Auth | ✅ | `app/admin/layout.tsx` |
| T-05 | Canonical | self-canonical pro Page | ✅ | `generateMetadata()` |
| T-06 | Canonical | `metadataBase = SITE.url` (https://www.impuls-unna.de) | ✅ | `app/layout.tsx` |
| T-07 | hreflang | nicht nötig (Single-Locale `de_DE`) | n/a | dokumentiert |
| T-08 | Strukturdaten | Organization, LocalBusiness, WebSite global | ✅ | `lib/seo/jsonld.ts` |
| T-09 | Strukturdaten | Service + FAQ + Breadcrumb auf jeder Money Page | ✅ | siehe `12-SCHEMA-MARKUP.md` |
| T-10 | Mobile First | Viewport-Meta + responsives Layout | ✅ | Tailwind Mobile-First |
| T-11 | Core Web Vitals | LCP < 2.5s | ⚠️ | Test nach Deploy mit PageSpeed |
| T-12 | Core Web Vitals | INP < 200ms | ⚠️ | Test nach Deploy |
| T-13 | Core Web Vitals | CLS < 0.1 | ⚠️ | Test nach Deploy |
| T-14 | Bilder | `next/image` AVIF + WebP | ✅ | `next.config.ts` |
| T-15 | Bilder | Lazy Loading default | ✅ | `next/image` |
| T-16 | Bilder | Image-Sitemap separat | ⏳ | TODO `app/sitemap-images.ts` |
| T-17 | Server | TTFB < 600ms (Vercel Edge) | ✅ | Vercel automatisch |
| T-18 | Server | Static Generation (`force-static`) für SEO Pages | ✅ | alle SEO-Routes |
| T-19 | Server | ISR Revalidate 86400s | ✅ | per Page |
| T-20 | HTML | Semantic HTML5 (`<main>`, `<nav>`, `<article>`, `<section>`) | ✅ | SEO Components |
| T-21 | HTML | Heading-Hierarchie H1 → H2 → H3 | ✅ | strikt eingehalten |
| T-22 | HTML | 1 H1 pro Page | ✅ | enforced |
| T-23 | A11y | `lang="de"` auf `<html>` | ✅ | `app/layout.tsx` |
| T-24 | A11y | Alt-Text auf jedem Bild | ⏳ | Bild-Audit nach Foto-Upload |
| T-25 | A11y | Kontrast WCAG AA (4.5:1 Body, 3:1 Large) | ✅ | Designsystem |
| T-26 | A11y | Tastatur-Navigation | ✅ | shadcn/ui |
| T-27 | A11y | Screen-Reader-Tests (VoiceOver, NVDA) | ⏳ | manueller Test |
| T-28 | Click-Depth | jede Money Page ≤ 3 Klicks von `/` | ✅ | siehe `02-SITE-ARCHITECTURE.md` |
| T-29 | Internal Links | 5–8 Links pro Stadt-Hub auf Services | ✅ | `service-link-grid.tsx` |
| T-30 | Internal Links | Service-Hub linkt 17 Cities | ✅ | dito |
| T-31 | Internal Links | 0 dangling Links | ✅ | TypeScript-typed Routes |
| T-32 | 404 | Custom-404 mit Navigation zurück | ✅ | `app/not-found.tsx` |
| T-33 | Redirects | `/index.html`, `/home/` etc. ➔ `/` | ⚠️ | `vercel.json` prüfen |
| T-34 | Redirects | `http://impuls-unna.de` → `https://www.impuls-unna.de` | ✅ | Vercel/DNS automatisch |
| T-35 | HTTPS | TLS 1.3 / HSTS | ✅ | Vercel Default |
| T-36 | Security | CSP, X-Frame-Options, Referrer-Policy | ⏳ | `next.config.ts` Headers |
| T-37 | Cache | static assets `Cache-Control: public, max-age=31536000, immutable` | ✅ | Next.js Default |
| T-38 | Cache | HTML `Cache-Control: s-maxage` für ISR | ✅ | dito |
| T-39 | Logs | Server-Logs für 5xx via Vercel | ✅ | Dashboard |
| T-40 | Monitoring | Search Console verifiziert | ⏳ | manuell registrieren |
| T-41 | Monitoring | Bing Webmaster verifiziert | ⏳ | manuell |
| T-42 | Monitoring | Pagespeed Monitoring | ⏳ | Vercel Speed Insights aktivieren |
| T-43 | Locale | `de-DE` als HTML-Attribut | ✅ | `<html lang="de">` |
| T-44 | Open Graph | Bilder (1200×630), de_DE | ✅ | `metadataBase` + OG image |
| T-45 | Twitter Cards | summary_large_image | ✅ | layout.tsx |

**Legend:**
- ✅ = Implementiert
- ⏳ = Implementierung steht aus (Manuelle Aktion durch Inhaber)
- ⚠️ = nach Deploy verifizieren
- n/a = nicht zutreffend

## Konkrete TODOs nach Deploy

1. Search Console verifizieren (DNS-TXT-Record über Vercel)
2. Bing Webmaster Tools verifizieren
3. `vercel.json` Redirect-Block für legacy URLs anlegen, falls die alte WordPress-Site Pfade hatte
4. `next.config.ts` Security-Headers ergänzen (CSP, HSTS)
5. Pagespeed-Insights für Top-10-Pages durchlaufen, dokumentieren
