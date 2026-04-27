import Link from 'next/link'
import { Phone, MapPin, ShieldCheck, Clock } from 'lucide-react'

/**
 * Hero für SEO-Landingpages (Stadt, Leistung, Stadt × Leistung).
 *
 * Bewusst zurückgenommen, kein riesiges Bild — die Money Pages müssen
 * Conversion und Klarheit liefern, nicht Editorial. H1 wird hier gerendert
 * (`<h1>`), darüber Eyebrow als sichtbares Kontextual-Signal, darunter
 * Trust-Chips und Primary CTA.
 */

interface SeoHeroProps {
  eyebrow: string
  h1: string
  intro: string
  phoneE164: string
  phoneDisplay: string
  trustChips?: string[]
}

export function SeoHero({ eyebrow, h1, intro, phoneE164, phoneDisplay, trustChips }: SeoHeroProps) {
  const chips = trustChips ?? [
    'Versorgungsvertrag § 72 SGB XI',
    'Erstberatung kostenfrei',
    'Feste Bezugspflege',
  ]
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFA] to-white">
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-24 xl:px-14">
        <p className="text-[11px] font-[660] uppercase tracking-[0.22em]" style={{ color: 'rgba(24,193,163,0.85)' }}>
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-[820px] text-[clamp(2rem,5vw,3.6rem)] font-[800] leading-[1.04] tracking-[-0.045em] text-warm-900">
          {h1}
        </h1>
        <p className="mt-6 max-w-[700px] text-[16px] leading-[1.78] text-warm-600">{intro}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={`tel:${phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-[700] text-white transition-transform hover:-translate-y-[1px]"
            style={{ background: '#18C1A3' }}
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            {phoneDisplay}
          </a>
          <Link
            href="/kontakt/"
            className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-5 py-3 text-[14px] font-[600] text-warm-800 transition-colors hover:bg-warm-50"
          >
            Rückruf vereinbaren
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[12.5px] text-warm-500">
          {chips.map((c, i) => {
            const Icon = i === 0 ? ShieldCheck : i === 1 ? Clock : MapPin
            return (
              <li key={c} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={2} />
                <span>{c}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
