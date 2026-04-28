import {
  Heart, Stethoscope, Smile, Home as HomeIcon, MessageCircle, ShieldCheck, Brain, Pill,
  Bandage, HandHeart, MapPin, Phone, Printer, Mail, Clock,
} from 'lucide-react'
import { SITE } from '@/lib/seo/site'
import type { PflegeService } from '@/lib/seo/services'
import type { LocationData } from '@/lib/seo/locations'

const ICONS = {
  Heart, Stethoscope, Smile, Home: HomeIcon, MessageCircle, ShieldCheck, Brain, Pill, Bandage, HandHeart,
}

/** Liste der konkreten Leistungs-Items mit Häkchen — saubere E-A-T-Demonstration. */
export function ServiceItemList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`mt-6 grid gap-3 ${columns === 1 ? '' : 'sm:grid-cols-2'}`}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-[14.5px] font-[460] leading-[1.65] text-warm-700">{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** Block „Was wir konkret leisten" — nutzt PflegeService.items + Trigger. */
export function ServiceMethodBlock({ service }: { service: PflegeService }) {
  const Icon = ICONS[service.icon] ?? Heart
  return (
    <section className="border-t border-warm-100 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] xl:px-14">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(24,193,163,0.12)' }}>
              <Icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
            </span>
            <p className="text-[11px] font-[660] uppercase tracking-[0.22em] text-warm-500">
              Leistungs­umfang
            </p>
          </div>
          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-[800] leading-[1.1] tracking-[-0.035em] text-warm-900">
            Was wir konkret leisten
          </h2>
          <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.78] text-warm-600">
            {service.long}
          </p>
          <ServiceItemList items={service.items} columns={1} />
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-warm-150 bg-warm-50/40 p-6 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
              Wann sinnvoll
            </p>
            <ul className="mt-4 space-y-2.5">
              {service.triggers.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[14px] leading-[1.6] text-warm-700">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#18C1A3' }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-warm-150 bg-white p-6 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
              Hinweise für Angehörige
            </p>
            <ul className="mt-4 space-y-3">
              {service.forRelatives.map((t) => (
                <li key={t} className="text-[14px] leading-[1.7] text-warm-700">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-warm-900 p-6 text-warm-50 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-200">
              Rechtsgrundlage & Kostenträger
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px] leading-[1.7] text-warm-100">
              {service.legalBasis.map((l) => <li key={l}>· {l}</li>)}
            </ul>
            <p className="mt-4 text-[12.5px] uppercase tracking-[0.16em] text-warm-300">Kostenträger</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] leading-[1.7] text-warm-100">
              {service.fundedBy.map((l) => <li key={l}>· {l}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Lokaler Trust-Kontext (Stadtseiten). */
export function LocalTrustBlock({ location }: { location: LocationData }) {
  return (
    <section className="border-t border-warm-100 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] xl:px-14">
        <div>
          <p className="text-[11px] font-[660] uppercase tracking-[0.22em]" style={{ color: 'rgba(24,193,163,0.85)' }}>
            Vor Ort in {location.name}
          </p>
          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-[800] leading-[1.1] tracking-[-0.035em] text-warm-900">
            Echte lokale Verankerung — keine Versprechen, sondern Praxis
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.8] text-warm-600">{location.context}</p>

          {location.districts.length > 0 && (
            <>
              <p className="mt-8 text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
                Stadtteile, die wir versorgen
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {location.districts.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-warm-200 bg-warm-50 px-3 py-1.5 text-[12.5px] font-[500] text-warm-700"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="space-y-6">
          {location.landmarks.hospitals && location.landmarks.hospitals.length > 0 && (
            <div className="rounded-2xl border border-warm-150 bg-warm-50/40 p-6 sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
                Klinik-Anbindung
              </p>
              <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.6] text-warm-700">
                {location.landmarks.hospitals.map((h) => <li key={h}>· {h}</li>)}
              </ul>
            </div>
          )}
          {location.transport.length > 0 && (
            <div className="rounded-2xl border border-warm-150 bg-white p-6 sm:p-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-500">
                Erreichbarkeit
              </p>
              <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.6] text-warm-700">
                {location.transport.map((t) => <li key={t}>· {t}</li>)}
              </ul>
            </div>
          )}
          <div className="rounded-2xl bg-warm-900 p-6 text-warm-50 sm:p-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.18em] text-warm-200">
              Postleitzahlen
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-warm-100">
              {location.postalCodes.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Sichtbarer NAP-Block am Seitenende — wichtig für Local SEO. */
export function NapBlock() {
  return (
    <section aria-label="Kontaktdaten" className="border-t border-warm-100 bg-warm-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 xl:px-14">
        <h2 className="text-center text-[clamp(1.4rem,2.4vw,2rem)] font-[800] leading-tight tracking-[-0.035em] text-warm-900">
          So erreichen Sie uns
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <NapItem icon={Phone} label="Telefon" value={SITE.phoneDisplay} href={`tel:${SITE.phoneE164}`} />
          <NapItem icon={Printer} label="Fax" value={SITE.faxDisplay} href={`fax:${SITE.faxE164}`} />
          <NapItem icon={Mail} label="E-Mail" value={SITE.email} href={`mailto:${SITE.email}`} />
          <NapItem icon={MapPin} label="Adresse" value={`${SITE.street}, ${SITE.postalCode} ${SITE.city}`} />
          <NapItem icon={Clock} label="Erreichbarkeit" value={SITE.openingHoursDisplay} />
        </div>
      </div>
    </section>
  )
}

function NapItem({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const Inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-warm-150 bg-white p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(24,193,163,0.12)' }}>
        <Icon className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-warm-500">{label}</p>
        <p className="mt-1 text-[14px] font-[500] leading-[1.5] text-warm-800">{value}</p>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block transition-transform hover:-translate-y-[1px]">
      {Inner}
    </a>
  ) : (
    Inner
  )
}
