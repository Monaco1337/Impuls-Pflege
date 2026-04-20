import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  Stethoscope,
  Smile,
  Home,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  Sparkles,
  MapPin,
} from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { PremiumCta } from '@/components/sections/premium-cta'
import { LeistungenHeroSection } from '@/components/sections/leistungen-hero-section'

export const metadata = {
  title: 'Leistungen – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Umfassende ambulante Pflege und Betreuung in Unna: Grundpflege, Behandlungspflege, Betreuungsangebote, hauswirtschaftliche Unterstützung und individuelle Beratung.',
}

const services = [
  {
    id: 'grundpflege',
    icon: Heart,
    title: 'Grundpflege',
    image: '/images/care-grundpflege.jpg',
    imageAlt: 'Pflegekraft bei der einfühlsamen Grundpflege',
    imageRatio: '3/4',
    imagePosition: 'center 30%',
    description:
      'Körperpflege, Mobilität und Ernährung sind zentrale Grundlagen für Lebensqualität und Selbstständigkeit. Wenn alltägliche Aufgaben schwerer fallen, stehen wir Ihnen zuverlässig und respektvoll zur Seite — individuell abgestimmt auf Ihre Gewohnheiten, Bedürfnisse und Ihren persönlichen Alltag.\n\nUnsere Grundpflege bedeutet nicht nur Unterstützung, sondern echte Entlastung. Mit festen Ansprechpartnern, vertrauter Betreuung und einem einfühlsamen Blick für Ihre Situation schaffen wir Sicherheit, Struktur und mehr Lebensqualität in Ihrem Zuhause.',
    items: [
      'Unterstützung bei Körperpflege (Waschen, Duschen, Baden)',
      'Hilfe bei der Nahrungsaufnahme',
      'Unterstützung beim Toilettengang',
      'Unterstützung beim An- und Auskleiden',
      'Lagerung und Mobilisation',
      'Hautpflege und Prophylaxen',
    ],
  },
  {
    id: 'behandlungspflege',
    icon: Stethoscope,
    title: 'Behandlungspflege',
    image: '/images/care-behandlungspflege.jpg',
    imageAlt: 'Medizinische Versorgung und Behandlungspflege',
    imagePosition: 'center 18%',
    imageRatio: '3/4',
    description:
      'Medizinische Behandlungspflege erfordert Fachkompetenz, Erfahrung und höchste Sorgfalt. Unsere examinierten Pflegekräfte übernehmen verordnete Maßnahmen zuverlässig und professionell — stets in enger Abstimmung mit Ihrem behandelnden Arzt.\n\nDabei verbinden wir medizinische Qualität mit persönlicher Betreuung. Wir achten auf Veränderungen, reagieren frühzeitig und sorgen dafür, dass Sie sich auch bei komplexeren gesundheitlichen Situationen sicher und gut versorgt fühlen — in Ihrer vertrauten Umgebung.',
    items: [
      'Medikamentengabe und Überwachung',
      'Injektionen (z. B. Insulin)',
      'Kompressionstherapie',
      'Wundversorgung und Verbandswechsel',
      'Blutdruck- und Blutzuckermessung',
      'Katheter- und Stomapflege',
    ],
  },
  {
    id: 'betreuung',
    icon: Smile,
    title: 'Betreuungsangebote',
    image: '/images/care-betreuung.jpg',
    imageAlt: 'Aktivierende Betreuung und gemeinsame Zeit',
    imageRatio: '3/4',
    imagePosition: 'center 20%',
    description:
      'Gute Pflege bedeutet mehr als medizinische Versorgung. Zuwendung, Aktivierung und persönliche Begleitung sind entscheidend für Lebensqualität und Wohlbefinden im Alltag.\n\nUnsere Betreuungsangebote schaffen Struktur, fördern Selbstständigkeit und ermöglichen soziale Teilhabe. Wir gestalten gemeinsame Momente, unterstützen bei Aktivitäten und sorgen dafür, dass sich der Alltag wieder leichter und erfüllter anfühlt — individuell abgestimmt auf Ihre Wünsche und Bedürfnisse.',
    items: [
      'Spaziergänge und Begleitung im Freien',
      'Gespräche und Gesellschaft',
      'Gedächtnistraining und Denkspiele',
      'Kreative Beschäftigung und Vorlesen',
      'Unterstützung bei Hobbys',
      'Begleitung zu Terminen und Veranstaltungen',
    ],
  },
  {
    id: 'hauswirtschaft',
    icon: Home,
    title: 'Hauswirtschaftliche Unterstützung',
    image: '/images/care-hauswirtschaft.jpg',
    imageAlt: 'Hauswirtschaftliche Hilfe im vertrauten Zuhause',
    imageRatio: '3/4',
    imagePosition: 'center 10%',
    description:
      'Ein gepflegtes Zuhause bedeutet Sicherheit, Wohlbefinden und Lebensqualität. Wenn alltägliche Aufgaben zur Herausforderung werden, unterstützen wir Sie zuverlässig und diskret — damit Sie sich weiterhin in Ihrer vertrauten Umgebung wohlfühlen können.\n\nUnsere hauswirtschaftliche Unterstützung entlastet Sie im Alltag, schafft Struktur und sorgt dafür, dass Ihr Zuhause ein Ort der Ruhe und Geborgenheit bleibt — individuell abgestimmt auf Ihre persönlichen Bedürfnisse.',
    items: [
      'Reinigung der Wohnung',
      'Einkäufe und Besorgungen',
      'Müllentsorgung und Hausordnung',
      'Wäschepflege und Bügeln',
      'Zubereitung von Mahlzeiten',
      'Beheizen und Lüften der Räume',
    ],
  },
  {
    id: 'beratung',
    icon: MessageCircle,
    title: 'Individuelle Beratung',
    image: '/images/care-beratung.jpg',
    imageAlt: 'Pflegekraft berät ältere Dame und Angehörigen persönlich am Tisch',
    imageRatio: '3/4',
    imagePosition: 'center 20%',
    description:
      'Die Pflegesituation bringt viele Fragen mit sich. Leistungen, Pflegegrade und Anträge können schnell unübersichtlich werden. Wir stehen Ihnen als kompetente Ansprechpartner zur Seite und unterstützen Sie dabei, die passende Versorgung für Ihre persönliche Situation zu finden.\n\nGemeinsam schaffen wir Klarheit, begleiten Sie durch organisatorische Schritte und sorgen dafür, dass Sie alle Möglichkeiten optimal nutzen können — verständlich, persönlich und auf Augenhöhe.',
    items: [
      'Beratung zu Pflegeleistungen und Pflegegraden',
      'Unterstützung bei Anträgen an die Pflegekasse',
      'Information über Entlastungsleistungen (§ 45b SGB XI)',
      'Beratung zu Verhinderungs- und Kurzzeitpflege',
      'Klärung der Kostenübernahme',
      'Individuelle Versorgungsplanung',
    ],
  },
  {
    id: 'zuhause',
    icon: ShieldCheck,
    title: 'Pflege in vertrauter Umgebung',
    image: '/images/care-zuhause.jpg',
    imageAlt: 'Pflegekraft hilft älterem Herrn beim Kochen im eigenen Zuhause',
    imageRatio: '3/4',
    imagePosition: 'center 15%',
    description:
      'Das eigene Zuhause bedeutet Sicherheit, Erinnerungen und Vertrautheit. Gerade in herausfordernden Lebenssituationen ist diese Umgebung besonders wichtig. Deshalb gestalten wir unsere Pflege so, dass Sie weiterhin in Ihrer gewohnten Umgebung leben können — mit Unterstützung, die sich Ihrem Alltag anpasst.\n\nWir fördern Selbstständigkeit, schaffen Kontinuität und begleiten Sie einfühlsam. So entsteht eine Betreuung, die Vertrauen schafft und Lebensqualität erhält — persönlich, respektvoll und auf Augenhöhe.',
    items: [
      'Pflege und Betreuung in Ihrem Zuhause',
      'Wahrung von Selbstständigkeit und Eigenständigkeit',
      'Feste Bezugspflegekräfte für Kontinuität',
      'Flexible Einsatzzeiten nach Ihrem Rhythmus',
      'Enge Einbindung von Angehörigen',
      'Respektvoller Umgang in vertrauter Atmosphäre',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <>
      <LeistungenHeroSection />

      {/* ── Trust Strip ── */}
      <section className="relative py-14 sm:py-16" style={{ background: '#ffffff' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { icon: UserCheck, title: 'Persönliche Ansprechpartner', sub: 'Immer ein vertrautes Gesicht an Ihrer Seite.' },
              { icon: Sparkles, title: 'Individuelle Betreuung', sub: 'Jeder Mensch ist einzigartig – unsere Pflege auch.' },
              { icon: Heart, title: 'Feste Bezugspflege', sub: 'Kontinuität und Verlässlichkeit in jeder Situation.' },
              { icon: MapPin, title: 'Regionale Nähe', sub: 'Lokal verwurzelt – schnell und persönlich erreichbar.' },
            ].map((item, i) => (
              <FadeIn key={item.title} direction="up" distance={14} delay={0.05 * i}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'rgba(24,193,163,0.09)' }}>
                    <item.icon className="h-[18px] w-[18px]" style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                  </div>
                  <p className="mt-3.5 text-[14px] font-[680] leading-tight tracking-[-0.016em]"
                    style={{ color: '#0F172A' }}>{item.title}</p>
                  <p className="mt-1.5 text-[12.5px] font-[400] leading-[1.6]"
                    style={{ color: '#64748b' }}>{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service sections ── */}
      {services.map((service, index) => {
        const Icon = service.icon
        const isReversed = index % 2 !== 0
        const bg = index % 2 === 0 ? '#ffffff' : '#F7FAFA'

        return (
          <section
            key={service.id}
            id={service.id}
            className="relative scroll-mt-24 py-28 sm:py-36 lg:py-44"
            style={{ background: bg }}
          >
            {/* Subtle top hairline between sections */}
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.05)' }} />

            <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">
              <div className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28`}>

                {/* Image */}
                <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                  <FadeIn direction={isReversed ? 'right' : 'left'} distance={28}>
                    <div className="relative">
                      <div className="overflow-hidden"
                        style={{
                          borderRadius: '28px',
                          boxShadow: '0 24px 64px -12px rgba(0,0,0,0.11)',
                        }}>
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          width={700}
                          height={520}
                          className={`w-full object-cover ${(service as typeof service & { imageRatio?: string }).imageRatio ? 'aspect-[4/3] lg:aspect-[3/4]' : 'aspect-[4/3]'}`}
                          style={{
                            objectPosition: (service as typeof service & { imagePosition?: string }).imagePosition ?? 'center center',
                          }}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                      {/* Floating icon badge */}
                      <div
                        className={`absolute -bottom-4 ${isReversed ? '-left-4 sm:-left-5' : '-right-4 sm:-right-5'} flex h-14 w-14 items-center justify-center rounded-[16px] border bg-white`}
                        style={{
                          borderColor: 'rgba(0,0,0,0.07)',
                          boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
                        }}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full"
                          style={{ background: 'rgba(24,193,163,0.10)' }}>
                          <Icon className="h-[18px] w-[18px]" style={{ color: '#18C1A3' }} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Content */}
                <div className={`text-center lg:text-left ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <FadeIn direction="up" distance={14} delay={0.08}>
                    <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                      style={{ color: 'rgba(24,193,163,0.80)' }}>
                      {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </p>
                  </FadeIn>

                  <FadeIn direction="up" distance={18} delay={0.12}>
                    <h2
                      className="mt-4 mx-auto max-w-[560px] text-[clamp(2rem,4vw,3.2rem)] font-[800] leading-[1.06] tracking-[-0.048em] lg:mx-0"
                      style={{ color: '#0F172A' }}
                    >
                      {service.title}
                    </h2>
                  </FadeIn>

                  <FadeIn direction="up" distance={12} delay={0.14}>
                    <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                      <div className="h-[1.5px] w-5 rounded-full"
                        style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                      <div className="h-[1.5px] w-12 rounded-full"
                        style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.28), transparent)' }} />
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" distance={16} delay={0.18}>
                    <div
                      className="mt-6 mx-auto max-w-[500px] space-y-4 text-[16px] font-[400] leading-[1.82] tracking-[-0.01em] lg:mx-0"
                      style={{ color: '#475569' }}
                    >
                      {service.description.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" distance={14} delay={0.24}>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <div key={item} className="icon-list-stack-cell flex items-start gap-3">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          <span className="icon-list-prose min-w-0 flex-1 text-[14px] font-[460] leading-[1.55] tracking-[-0.005em]"
                            style={{ color: '#334155' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ── */}
      <PremiumCta
        headline="Haben Sie Fragen zu unseren Leistungen?"
        subtext="Wir beraten Sie gerne persönlich und unverbindlich. Gemeinsam finden wir die passende Unterstützung für Ihre Situation."
      />

    </>
  )
}
