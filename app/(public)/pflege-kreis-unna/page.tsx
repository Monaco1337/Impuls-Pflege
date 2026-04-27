import type { Metadata } from 'next'
import { PRIMARY_LOCATIONS, SECONDARY_LOCATIONS } from '@/lib/seo/locations'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import { ldGraph, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import { NapBlock } from '@/components/seo/seo-content-blocks'
import { ServiceLinkGrid, buildCityHubLinks } from '@/components/seo/service-link-grid'
import { StickyContact } from '@/components/seo/sticky-contact'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Pflege im Kreis Unna – alle Städte im Überblick',
  description:
    'Ambulante Pflege im gesamten Kreis Unna: Unna, Lünen, Kamen, Bergkamen, Schwerte, Fröndenberg, Holzwickede, Bönen, Selm, Werne — und ergänzend in Randgebieten.',
  alternates: { canonical: '/pflege-kreis-unna/' },
}

export default function KreisUnnaHubPage() {
  const pageUrl = ABSOLUTE_URL('/pflege-kreis-unna/')
  const breadcrumb = [{ label: 'Kreis Unna', href: '/pflege-kreis-unna/', current: true }]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: 'Pflege im Kreis Unna',
      description: 'Übersicht aller Städte, in denen IMPULS Pflege anbietet.',
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        { name: 'Kreis Unna', url: pageUrl },
      ]),
    }),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow="Versorgungsgebiet"
        h1="Pflege im gesamten Kreis Unna"
        intro={`Wir versorgen 10 Städte im Kreis Unna mit festen Bezugs­pflegekräften und sind in ${SECONDARY_LOCATIONS.length} angrenzenden Orten ergänzend tätig. Wählen Sie Ihre Stadt:`}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
      />

      <ServiceLinkGrid
        title="Kerngebiet — Kreis Unna"
        intro="Hier sind wir täglich unterwegs, mit eigenen Touren und festen Pflegekräften."
        links={buildCityHubLinks(PRIMARY_LOCATIONS)}
      />

      <ServiceLinkGrid
        title="Ergänzendes Versorgungsgebiet"
        intro="In diesen direkt angrenzenden Orten pflegen wir, wenn die Tour-Logik passt — kurz, klar, ohne falsche Versprechungen."
        links={buildCityHubLinks(SECONDARY_LOCATIONS)}
      />

      <NapBlock />
      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
