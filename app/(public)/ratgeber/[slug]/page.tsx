import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { RATGEBER, RATGEBER_BY_SLUG } from '@/lib/seo/ratgeber'
import { SITE, ABSOLUTE_URL } from '@/lib/seo/site'
import {
  ldGraph,
  webPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { BreadcrumbTrail } from '@/components/seo/breadcrumb-trail'
import { SeoHero } from '@/components/seo/seo-hero'
import { NapBlock } from '@/components/seo/seo-content-blocks'
import { LocalFaq } from '@/components/seo/local-faq'
import { StickyContact } from '@/components/seo/sticky-contact'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateStaticParams() {
  return RATGEBER.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const r = RATGEBER_BY_SLUG.get(slug)
  if (!r) return {}
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/ratgeber/${r.slug}/` },
    openGraph: {
      type: 'article',
      title: r.metaTitle,
      description: r.metaDescription,
      url: ABSOLUTE_URL(`/ratgeber/${r.slug}/`),
    },
  }
}

export default async function RatgeberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const r = RATGEBER_BY_SLUG.get(slug)
  if (!r) notFound()

  const pageUrl = ABSOLUTE_URL(`/ratgeber/${r.slug}/`)
  const breadcrumb = [
    { label: 'Ratgeber', href: '/ratgeber/' },
    { label: r.title, href: `/ratgeber/${r.slug}/`, current: true },
  ]

  const ld = ldGraph(
    webPageJsonLd({
      url: pageUrl,
      name: r.title,
      description: r.metaDescription,
      breadcrumb: breadcrumbJsonLd([
        { name: 'Startseite', url: SITE.url },
        ...breadcrumb.map((b) => ({ name: b.label, url: ABSOLUTE_URL(b.href) })),
      ]),
    }),
    articleJsonLd({
      url: pageUrl,
      headline: r.title,
      description: r.metaDescription,
      image: SITE.defaultOgImage,
      datePublished: r.updatedAt,
    }),
    faqJsonLd(pageUrl, r.faqs),
  )

  return (
    <>
      <JsonLd data={ld} />
      <BreadcrumbTrail items={breadcrumb} />

      <SeoHero
        eyebrow="Ratgeber für Angehörige"
        h1={r.title}
        intro={r.intro}
        phoneE164={SITE.phoneE164}
        phoneDisplay={SITE.phoneDisplay}
        trustChips={['Aktualisiert ' + r.updatedAt, 'Pflegefachlich geprüft', 'Erstberatung kostenfrei']}
      />

      <article className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          {r.sections.map((s, idx) => (
            <section key={idx} className="mb-14 last:mb-0">
              <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-[800] leading-[1.15] tracking-[-0.035em] text-warm-900">
                {s.heading}
              </h2>
              {s.body && (
                <p className="mt-4 whitespace-pre-line text-[15.5px] leading-[1.85] text-warm-700">
                  {s.body}
                </p>
              )}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.7] text-warm-700">
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#18C1A3' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {r.links.length > 0 && (
            <div className="mt-12 rounded-2xl border border-warm-150 bg-warm-50/40 p-6 sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
                Vertiefende Themen
              </p>
              <ul className="mt-4 space-y-2.5">
                {r.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-[14.5px] font-[600] text-warm-800 hover:text-warm-900"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-warm-400 transition-colors group-hover:text-warm-700" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <LocalFaq items={r.faqs} title="Häufige Fragen" />

      <NapBlock />
      <StickyContact phoneE164={SITE.phoneE164} phoneDisplay={SITE.phoneDisplay} />
    </>
  )
}
