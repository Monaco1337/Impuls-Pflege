import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LOCATIONS, getLocation } from '@/lib/seo/locations'
import { SERVICES } from '@/lib/seo/services'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import {
  ldGraph,
  webPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import { LocalTrustBlock, NapBlock } from '@/components/seo/seo-content-blocks'
import { ServiceLinkGrid, buildServiceLinksForCity, buildCityHubLinks } from '@/components/seo/service-link-grid'
import { LocalFaq } from '@/components/seo/local-faq'
import { StickyContact } from '@/components/seo/sticky-contact'

/**
 * /pflegedienst-[stadt]/ — Stadt-Hub.
 *
 * Statisch generiert für alle 17 Orte. Inhalt zieht sich aus
 * `lib/seo/locations.ts` (echte Stadtteile, Krankenhäuser, FAQs) und
 * verlinkt auf alle 10 Service-×-Stadt-Pages.
 *
 * Export `dynamic = 'force-static'`: Stadtseiten sind crawl-relevant und
 * dürfen nicht pro Request gerendert werden.
 */

export const dynamic = 'force-static'
export const revalidate = 86400 // täglich

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) return {}
  const url = ABSOLUTE_URL(`/pflegedienst-${loc.slug}/`)
  return {
    title: `Pflegedienst ${loc.name} – Ambulante Pflege vor Ort`,
    description: `Ambulanter Pflegedienst in ${loc.name}: Grundpflege, Behandlungspflege, Demenzbetreuung, Pflegeberatung — feste Bezugspflege, Versorgungsvertrag § 72 SGB XI. Erstgespräch kostenfrei.`,
    alternates: { canonical: `/pflegedienst-${loc.slug}/` },
    openGraph: {
      url,
      title: `Pflegedienst ${loc.name} | ${SITE.shortName}`,
      description: `Ambulante Pflege in ${loc.name} und Umgebung — durch examinierte Pflegekräfte mit festen Bezugspflege-Strukturen.`,
      type: 'website',
      locale: 'de_DE',
      siteName: SITE.name,
    },
  }
}

export default async function PflegedienstStadtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) notFound()

  const pageUrl = ABSOLUTE_URL(`/pflegedienst-${loc.slug}/`)
  const breadcrumb = [
    { label: 'Kreis Unna', href: '/pflege-kreis-unna/' },
    { label: loc.name, href: `/pflegedienst-${loc.slug}/`, current: true },
  ]

  // Schema-Graph: WebPage + Breadcrumb + lokale FAQs + alle Services als Service-Schema mit Stadt
  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: `Pflegedienst ${loc.name}`,
      description: `Ambulanter Pflegedienst in ${loc.name} — Grundpflege, Behandlungspflege, Demenzpflege, Pflegeberatung.`,
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        ...breadcrumb.map((b) => ({ name: b.label, url: ABSOLUTE_URL(b.href) })),
      ]),
      about: [{ name: loc.name }],
    }),
    faqJsonLd(pageUrl, loc.localFaq),
    ...SERVICES.slice(0, 5).map((s) => serviceJsonLd(s, loc)),
  )

  const serviceLinks = buildServiceLinksForCity(SERVICES, loc.slug)

  // Cross-Link auf Nachbarstädte (echte lokale Relevanz, kein Tag-Spam)
  const neighborLinks = buildCityHubLinks(
    loc.neighbors.map((n) => getLocation(n)).filter((x): x is NonNullable<typeof x> => Boolean(x)),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow={`Ambulante Pflege · ${loc.name}`}
        h1={`Ambulanter Pflegedienst in ${loc.name}`}
        intro={loc.intro}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
      />

      <LocalTrustBlock location={loc} />

      <ServiceLinkGrid
        title={`Unsere Pflegeleistungen in ${loc.name}`}
        intro={`Was wir konkret leisten — von Grundpflege über Behandlungspflege bis zur Demenzbetreuung. Jede Leistung ist auf ${loc.name} und Stadtteile wie ${loc.districts.slice(0, 3).join(', ')} abgestimmt.`}
        links={serviceLinks}
      />

      {neighborLinks.length > 0 && (
        <ServiceLinkGrid
          title="Pflege in Nachbarstädten"
          intro={`Wir versorgen über ${loc.name} hinaus auch die direkt angrenzenden Orte — kurze Wege, gleiche Qualität.`}
          links={neighborLinks}
          columns={3}
        />
      )}

      <LocalFaq items={loc.localFaq} title={`Häufige Fragen rund um Pflege in ${loc.name}`} />

      <NapBlock />

      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
