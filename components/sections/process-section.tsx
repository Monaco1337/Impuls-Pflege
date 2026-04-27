import Link from 'next/link'
import { CmsImage } from '@/components/site-content/cms-image'
import { ArrowRight, Phone, Users, HeartHandshake } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

const MINT = '#18C1A3'
const PINK = '#F24B6A'

const steps = [
  {
    num: '01',
    icon: Phone,
    title: 'Kontaktaufnahme',
    description:
      'Sprechen Sie mit uns – telefonisch oder schriftlich. Wir hören zu, verstehen Ihre Situation und geben Ihnen eine erste klare Orientierung.',
  },
  {
    num: '02',
    icon: Users,
    title: 'Persönliche Beratung',
    description:
      'Gemeinsam entwickeln wir eine Lösung, die wirklich zu Ihnen passt – individuell, realistisch und auf Ihre Lebenssituation abgestimmt.',
  },
  {
    num: '03',
    icon: HeartHandshake,
    title: 'Individuelle Versorgung',
    description:
      'Wir übernehmen die Umsetzung und begleiten Sie zuverlässig im Alltag – mit einem festen Ansprechpartner und einem Team, auf das Sie sich verlassen können.',
  },
]

const DEF_NURSE = '/images/care-process-nurse.jpg'

export function ProcessSection({ nurseImageSrc = DEF_NURSE }: { nurseImageSrc?: string } = {}) {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44" style={{ background: '#ffffff' }}>

      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.055) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute -right-24 bottom-1/4 h-[320px] w-[320px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.04) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

      <Container size="xl" className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">

          {/* ── Left: headline + CTA ── */}
          <div className="flex flex-col text-center lg:col-span-5 lg:justify-center lg:text-left">

            <FadeIn>
              <p className="text-[11px] font-[680] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                So einfach beginnt gute Pflege
              </p>
            </FadeIn>

            <FadeIn delay={0.07}>
              <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-[800] leading-[1.07] tracking-[-0.046em]"
                style={{ color: '#0F172A' }}>
                Ihr Weg zu uns –
                <br />
                <span style={{ color: MINT }}>klar. persönlich.</span>
                <br />unkompliziert.
              </h2>
            </FadeIn>

            <FadeIn delay={0.13}>
              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                <div className="h-[1.5px] w-6 rounded-full"
                  style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
                <div className="h-[1.5px] w-16 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>

            <FadeIn delay={0.19}>
              <p className="mx-auto mt-7 max-w-[380px] text-[16px] font-[400] leading-[1.82] tracking-[-0.01em] lg:mx-0"
                style={{ color: '#475569' }}>
                Sie müssen nicht alles alleine klären. Wir führen Sie Schritt für Schritt durch den gesamten Prozess –
                verständlich, transparent und ohne Druck.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <Link
                href="/kontakt"
                className="group mx-auto mt-10 inline-flex h-[52px] items-center gap-3 overflow-hidden rounded-full pl-7 pr-2.5 lg:mx-0 text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)]"
                style={{
                  background: `linear-gradient(135deg, ${MINT} 0%, #20C9AA 100%)`,
                  boxShadow: '0 6px 24px rgba(24,193,163,0.30), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                Erstgespräch vereinbaren
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-white/[0.28]"
                  style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.2} />
                </span>
              </Link>
            </FadeIn>

            {/* Image below CTA */}
            <FadeIn delay={0.34}>
              <div
                className="mt-10 overflow-hidden"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                }}
              >
                <CmsImage
                  src={nurseImageSrc}
                  alt="Pflegekraft im Erstgespräch"
                  width={540}
                  height={380}
                  className="w-full object-cover"
                  style={{ objectPosition: 'center 20%', aspectRatio: '4/3' }}
                />
              </div>
            </FadeIn>

          </div>

          {/* ── Right: step cards ── */}
          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center">
            <div className="relative space-y-0">

              {/* Connecting line */}
              <div
                className="absolute left-[27px] top-[56px] hidden lg:block"
                style={{
                  width: '1px',
                  bottom: '56px',
                  background: 'linear-gradient(to bottom, rgba(24,193,163,0.25), rgba(24,193,163,0.08) 60%, transparent)',
                }}
                aria-hidden="true"
              />

              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <FadeIn key={step.num} delay={0.10 + 0.10 * i} direction="right" distance={22}>
                    <div className="group relative flex flex-col items-center gap-4 py-7 lg:flex-row lg:gap-6 lg:items-start">

                      {/* Number badge */}
                      <div
                        className="relative z-10 flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center rounded-full border-2 transition-all duration-300"
                        style={{
                          borderColor: i === 0 ? MINT : 'rgba(24,193,163,0.22)',
                          background: i === 0 ? 'rgba(24,193,163,0.08)' : '#ffffff',
                          boxShadow: i === 0 ? '0 0 0 6px rgba(24,193,163,0.07)' : 'none',
                        }}
                      >
                        <span
                          className="text-[11px] font-[740] tabular-nums leading-none tracking-[0.02em]"
                          style={{ color: MINT }}
                        >
                          {step.num}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="w-full pb-7 text-center lg:min-w-0 lg:text-left" style={i < steps.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.06)' } : {}}>
                        <div className="icon-list-stack flex items-start gap-2.5 lg:mx-0">
                          <Icon className="mt-1 h-4 w-4 shrink-0" style={{ color: MINT }} strokeWidth={1.7} />
                          <div className="icon-list-prose min-w-0">
                            <h3 className="text-[17px] font-[740] tracking-[-0.025em]"
                              style={{ color: '#0F172A' }}>
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mx-auto mt-3 text-[15px] font-[410] leading-[1.78] tracking-[-0.008em] lg:mx-0"
                          style={{ color: '#475569', maxWidth: '440px' }}>
                          {step.description}
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
