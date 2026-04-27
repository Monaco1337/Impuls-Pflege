import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PFLEGEGRADE, PFLEGEGRAD_BY_SLUG } from '@/lib/seo/pflegegrade'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import { ldGraph, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import { NapBlock } from '@/components/seo/seo-content-blocks'
import { LocalFaq } from '@/components/seo/local-faq'
import { StickyContact } from '@/components/seo/sticky-contact'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateStaticParams() {
  return PFLEGEGRADE.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pg = PFLEGEGRAD_BY_SLUG.get(slug)
  if (!pg) return {}
  return {
    title: `${pg.title} – ${pg.subtitle}`,
    description: pg.profile.slice(0, 158),
    alternates: { canonical: `/pflegegrad/${pg.slug}/` },
  }
}

const BENEFIT_LABELS: Record<string, string> = {
  pflegegeld: 'Pflegegeld',
  pflegesachleistung: 'Pflegesachleistung',
  entlastungsbetrag: 'Entlastungsbetrag',
  verhinderungspflege: 'Verhinderungspflege',
  kurzzeitpflege: 'Kurzzeitpflege',
  tagespflege: 'Tagespflege',
  wohnumfeld: 'Wohnumfeld-Anpassung',
  pflegehilfsmittel: 'Pflegehilfsmittel',
}

export default async function PflegegradDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pg = PFLEGEGRAD_BY_SLUG.get(slug)
  if (!pg) notFound()

  const pageUrl = ABSOLUTE_URL(`/pflegegrad/${pg.slug}/`)
  const breadcrumb = [
    { label: 'Pflegegrad', href: '/pflegegrad/' },
    { label: pg.title, href: `/pflegegrad/${pg.slug}/`, current: true },
  ]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: pg.title,
      description: pg.profile.slice(0, 200),
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        ...breadcrumb.map((b) => ({ name: b.label, url: ABSOLUTE_URL(b.href) })),
      ]),
    }),
    faqJsonLd(pageUrl, pg.faqs),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow={pg.points ? `${pg.title} · ${pg.points}` : pg.title}
        h1={pg.title}
        intro={pg.profile}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
        trustChips={['Pflegegrad-Beratung kostenfrei', 'Hilfe beim MD-Termin', 'Widerspruch unterstützt']}
      />

      {pg.benefits && (
        <section className="border-t border-warm-100 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-10 xl:px-14">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-[800] leading-[1.1] tracking-[-0.035em] text-warm-900">
              Leistungen der Pflegekasse (Stand 2025)
            </h2>
            <p className="mt-3 max-w-[640px] text-[15.5px] leading-[1.78] text-warm-600">
              Diese Beträge bestätigt die Pflegekasse mit dem Bescheid — Sie können sie kombinieren, ansparen oder gegeneinander tauschen (Verhinderungs- ↔ Kurzzeitpflege, Sachleistung ↔ Tagespflege).
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(pg.benefits).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-warm-150 bg-warm-50/40 p-5">
                  <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-warm-500">
                    {BENEFIT_LABELS[key] ?? key}
                  </p>
                  <p className="mt-2 text-[17px] font-[800] tracking-[-0.02em] text-warm-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-warm-100 bg-warm-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-[1080px] px-6 sm:px-10 xl:px-14">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-[800] leading-[1.1] tracking-[-0.035em] text-warm-900">
            Was IMPULS bei {pg.title.toLowerCase().startsWith('pflegegrad') ? pg.title : `„${pg.title}"`} konkret leistet
          </h2>
          <ul className="mt-8 space-y-3.5">
            {pg.whatWeDo.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-2xl border border-warm-150 bg-white p-4 text-[14.5px] leading-[1.65] text-warm-700"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#18C1A3' }} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocalFaq items={pg.faqs} title="Häufige Fragen zum Pflegegrad" />

      <NapBlock />
      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
