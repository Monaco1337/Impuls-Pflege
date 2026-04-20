import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Stethoscope, HeartPulse, Smile, Home, MessageCircle, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

const services = [
  {
    icon: HeartPulse,
    title: 'Grundpflege',
    description: 'Professionelle Unterstützung bei der täglichen Körperpflege, Ernährung und Mobilität – respektvoll und mit Würde.',
  },
  {
    icon: Stethoscope,
    title: 'Behandlungspflege',
    description: 'Medizinische Pflege nach ärztlicher Verordnung: Medikamentengabe, Wundversorgung, Injektionen und mehr.',
  },
  {
    icon: Smile,
    title: 'Betreuungsangebote',
    description: 'Aktivierende Betreuung, Gesellschaft und Beschäftigung für mehr Lebensfreude im Alltag.',
  },
  {
    icon: Home,
    title: 'Hauswirtschaft',
    description: 'Hilfe im Haushalt – von der Reinigung über Einkäufe bis zur Wäschepflege und Mahlzeitenversorgung.',
  },
  {
    icon: MessageCircle,
    title: 'Individuelle Beratung',
    description: 'Persönliche Beratung zu Pflegeleistungen, Kostenübernahme und individuellen Versorgungsmöglichkeiten.',
  },
  {
    icon: ShieldCheck,
    title: 'Rundum-Versorgung',
    description: 'Koordinierte Pflege aus einer Hand – für Sicherheit, Geborgenheit und Selbstbestimmung zuhause.',
  },
]

export function ServicesSection() {
  return (
    <section className="relative bg-white py-28 sm:py-36 lg:py-44">
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — sticky headline + image */}
          <div className="flex flex-col text-center lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:text-left">
            <FadeIn>
              <p className="text-[11.5px] font-[640] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                Leistungen
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.6rem)] font-[800] leading-[1.08] tracking-[-0.044em]"
                style={{ color: '#0F172A' }}>
                Alles geregelt.
                <br />
                <span style={{ color: '#18C1A3' }}>Für Sie. Für Ihre Familie.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.10}>
              <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                <div className="h-[1.5px] w-5 rounded-full"
                  style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-12 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="mx-auto mt-5 max-w-sm text-[15.5px] font-[420] leading-[1.78] tracking-[-0.01em] lg:mx-0"
                style={{ color: '#475569' }}>
                Von der ersten Beratung bis zur laufenden Betreuung –
                wir koordinieren alle Pflegeleistungen nahtlos und zuverlässig.
              </p>
            </FadeIn>
            <FadeIn delay={0.20}>
              <Link
                href="/leistungen"
                className="group mx-auto mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-[580] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-6px_rgba(24,193,163,0.36)] lg:mx-0"
                style={{
                  background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                  boxShadow: '0 5px 18px -4px rgba(24,193,163,0.28)',
                }}
              >
                Alle Leistungen im Detail
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
              </Link>
            </FadeIn>

            {/* Image — fills remaining height down to bottom of cards */}
            <FadeIn delay={0.24} className="mt-10 flex-1">
              <div
                className="relative w-full overflow-hidden rounded-[24px]"
                style={{
                  minHeight: '320px',
                  height: '100%',
                  boxShadow: '0 20px 56px -12px rgba(0,0,0,0.12)',
                }}
              >
                <Image
                  src="/images/care-services-hero.jpg"
                  alt="Pflegerin bespricht Pflegeplan mit älterem Herrn und Angehöriger am Tisch"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 28%' }}
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right — service cards */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service, i) => {
                const Icon = service.icon
                return (
                  <FadeIn key={service.title} delay={0.06 * i}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-warm-100 bg-white p-6 transition-all duration-600 hover:border-warm-200/80 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] sm:p-7">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
                      <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warm-50 transition-all duration-500 group-hover:bg-primary-50">
                          <Icon className="h-5 w-5 text-warm-400 transition-colors duration-500 group-hover:text-primary-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="mt-4 text-[15.5px] font-[620] tracking-[-0.02em] text-warm-900">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-[14px] font-[390] leading-[1.7] tracking-[-0.005em] text-warm-500">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
