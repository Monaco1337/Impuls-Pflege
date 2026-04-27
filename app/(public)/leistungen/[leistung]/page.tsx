import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES, getService } from '@/lib/seo/services'
import { LOCATIONS, PRIMARY_LOCATIONS } from '@/lib/seo/locations'
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
import { ServiceMethodBlock, NapBlock } from '@/components/seo/seo-content-blocks'
import { ServiceLinkGrid, buildCityLinksForService } from '@/components/seo/service-link-grid'
import { LocalFaq } from '@/components/seo/local-faq'
import { StickyContact } from '@/components/seo/sticky-contact'

/**
 * /leistungen/[leistung]/ — Leistungs-Hub.
 *
 * Statisch, listet die Leistung mit allen Cross-Links zu den Städten und
 * verwandten Leistungen.
 */

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ leistung: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ leistung: string }>
}): Promise<Metadata> {
  const { leistung } = await params
  const svc = getService(leistung)
  if (!svc) return {}
  const url = ABSOLUTE_URL(`/leistungen/${svc.slug}/`)
  return {
    title: `${svc.metaTitleBase} im Kreis Unna`,
    description: `${svc.metaDescBase}. Versorgungsvertrag § 72 SGB XI in Unna, Lünen, Kamen, Bergkamen, Schwerte, Holzwickede.`.slice(0, 160),
    alternates: { canonical: `/leistungen/${svc.slug}/` },
    openGraph: {
      url,
      title: `${svc.title} | ${SITE.shortName}`,
      description: svc.short,
      type: 'website',
      locale: 'de_DE',
      siteName: SITE.name,
    },
  }
}

export default async function LeistungHubPage({
  params,
}: {
  params: Promise<{ leistung: string }>
}) {
  const { leistung } = await params
  const svc = getService(leistung)
  if (!svc) notFound()

  const pageUrl = ABSOLUTE_URL(`/leistungen/${svc.slug}/`)
  const breadcrumb = [
    { label: 'Leistungen', href: '/leistungen/' },
    { label: svc.title, href: `/leistungen/${svc.slug}/`, current: true },
  ]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: svc.h1,
      description: svc.short,
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        ...breadcrumb.map((b) => ({ name: b.label, url: ABSOLUTE_URL(b.href) })),
      ]),
    }),
    faqJsonLd(pageUrl, svc.faqs),
    serviceJsonLd(svc),
  )

  const cityLinks = buildCityLinksForService(svc.slug, LOCATIONS)
  const relatedLinks = svc.relatedSlugs
    .map((slug) => getService(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((s) => ({
      href: `/leistungen/${s.slug}/`,
      title: s.title,
      subtitle: s.short,
    }))

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow={`Leistung · ${svc.name}`}
        h1={svc.h1}
        intro={svc.short}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
        trustChips={['Versorgungsvertrag § 72 SGB XI', 'Examinierte Fachkräfte', 'Erstgespräch kostenfrei']}
      />

      <ServiceMethodBlock service={svc} />

      <ServiceLinkGrid
        title={`${svc.title} in Ihrer Stadt`}
        intro={`Wir versorgen ${PRIMARY_LOCATIONS.length} Städte im Kreis Unna sowie angrenzende Randgebiete. Wählen Sie Ihren Ort:`}
        links={cityLinks}
      />

      {relatedLinks.length > 0 && (
        <ServiceLinkGrid
          title="Verwandte Leistungen"
          intro="Diese Leistungen werden häufig kombiniert. Bei Bedarf koordinieren wir alles aus einer Hand."
          links={relatedLinks}
          columns={3}
        />
      )}

      <LocalFaq items={svc.faqs} title={`Häufige Fragen zu ${svc.title}`} />

      <NapBlock />

      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
