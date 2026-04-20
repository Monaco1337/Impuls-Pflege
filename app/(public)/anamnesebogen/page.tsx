import Link from 'next/link'
import { Phone, Clock, Shield, FileText, Heart, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'
import { AnamnesebogenForm } from '@/components/forms/anamnesebogen-form'

export const metadata = {
  title: 'Anamnesebogen – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Füllen Sie unseren Anamnesebogen bequem online aus. Wir erfassen alle relevanten Informationen für Ihre individuelle pflegerische Versorgung.',
}

export default function AnamnesebogenPage() {
  return (
    <>
      {/* ─── Premium Light Hero ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#F7FAFA' }}>

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/3 top-0 h-[500px] w-[700px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute right-0 bottom-0 h-[320px] w-[320px]"
            style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        {/* Top mint accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }}
          aria-hidden="true" />

        <Container size="xl" className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">

            {/* Left: text */}
            <div className="mx-auto max-w-[600px] text-center lg:mx-0 lg:text-left">
              {/* Badge */}
              <FadeIn>
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center rounded-full border px-4 py-2"
                    style={{ background: 'rgba(255,255,255,0.90)', borderColor: 'rgba(24,193,163,0.22)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <span className="text-[12px] font-[580] tracking-[0.06em] uppercase" style={{ color: 'rgba(24,193,163,0.80)' }}>
                      Online ausfüllbar – jederzeit
                    </span>
                  </div>
                </div>
              </FadeIn>

              <div className="mt-7">
                <TextReveal delay={0.1}>
                  <h1 className="text-[clamp(2.4rem,5vw,3.75rem)] font-[820] leading-[1.04] tracking-[-0.044em]"
                    style={{ color: '#0F172A' }}>
                    Anamnesebogen
                  </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="mt-1 text-[clamp(1.5rem,3vw,2.4rem)] font-[480] leading-[1.15] tracking-[-0.03em]"
                    style={{ color: '#18C1A3' }}>
                    Bequem von zu Hause ausfüllen.
                  </p>
                </TextReveal>
              </div>

              {/* Accent rule */}
              <FadeIn delay={0.3}>
                <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>
              </FadeIn>

              <FadeIn delay={0.36}>
                <p className="mt-6 mx-auto max-w-[500px] text-[16px] font-[400] leading-[1.78] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#475569' }}>
                  Alle Angaben werden verschlüsselt übertragen und vertraulich
                  behandelt. Füllen Sie den Bogen in Ihrem eigenen Tempo aus –
                  wir führen Sie Schritt für Schritt.
                </p>
              </FadeIn>

              {/* Trust pills */}
              <FadeIn delay={0.44}>
                <div className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {[
                    { icon: Clock, text: '10–15 Minuten' },
                    { icon: Shield, text: 'DSGVO-konform' },
                    { icon: Heart, text: 'Vertraulich' },
                    { icon: FileText, text: '10 Schritte geführt' },
                  ].map((item) => (
                    <span key={item.text}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-[500]"
                      style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(0,0,0,0.07)', color: '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <item.icon className="h-3.5 w-3.5 shrink-0" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                      {item.text}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right: preparation card */}
            <FadeIn delay={0.5} direction="right" distance={24}>
              <div className="overflow-hidden rounded-[28px] border bg-white"
                style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 12px 40px -10px rgba(0,0,0,0.09)' }}>
                <div className="h-[3px]"
                  style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.15))' }} />
                <div className="mobile-card-prose p-7 text-center lg:text-left">
                  <div className="mb-5 mx-auto flex h-11 w-11 items-center justify-center rounded-full lg:mx-0"
                    style={{ background: 'rgba(24,193,163,0.09)' }}>
                    <FileText className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-[15.5px] font-[700] tracking-[-0.022em]" style={{ color: '#0F172A' }}>
                    Was Sie bereithalten sollten
                  </h3>
                  <ul className="icon-list-stack mt-4 space-y-3">
                    {['Versichertenkarte', 'Medikamentenplan', 'Arztberichte (falls vorhanden)', 'Pflegegrad-Bescheid'].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="icon-list-prose min-w-0 flex-1 text-[13.5px] font-[440] leading-snug" style={{ color: '#475569' }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[12.5px] font-[420] leading-[1.60]" style={{ color: '#94a3b8' }}>
                    Keine Sorge – optionale Felder können auch beim persönlichen Erstgespräch ergänzt werden.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Form Section ─── */}
      <section className="relative py-20 sm:py-28 lg:py-36" style={{ background: '#ffffff' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
        <Container size="xl">
          <AnamnesebogenForm />
        </Container>
      </section>

      {/* ─── Premium Help CTA ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#F7FAFA' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

        {/* Glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.08) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        <Container size="md" className="relative">
          <FadeIn direction="up" distance={20}>
            <div className="overflow-hidden rounded-[32px] border bg-white text-center"
              style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 16px 56px -10px rgba(0,0,0,0.09)' }}>
              <div className="h-[3px]"
                style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }} />
              <div className="px-8 py-12 sm:px-14 sm:py-14">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.18)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#18C1A3" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>

                <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.80)' }}>
                  Persönliche Unterstützung
                </p>

                <h2 className="mx-auto mt-4 max-w-[420px] text-[clamp(1.5rem,3vw,2.2rem)] font-[800] leading-[1.10] tracking-[-0.044em]"
                  style={{ color: '#0F172A' }}>
                  Brauchen Sie Unterstützung?
                </h2>

                <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>

                <p className="mx-auto mt-6 max-w-[440px] text-[15.5px] font-[420] leading-[1.75] tracking-[-0.01em]"
                  style={{ color: '#475569' }}>
                  Unser Team begleitet Sie gerne persönlich durch den Anamnesebogen –
                  telefonisch, per E-Mail oder bei Ihnen zu Hause.
                </p>

                <div className="mt-9 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
                  <a
                    href="tel:+4923032920589"
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.36)] lg:w-auto lg:max-w-none"
                    style={{
                      background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                      boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)',
                    }}
                  >
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    Jetzt anrufen
                    <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </a>
                  <Link
                    href="/kontakt"
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[15px] font-[520] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                    style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                  >
                    Rückruf anfordern
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: '#18C1A3' }} />
                  </Link>
                </div>

                {/* Trust mini-row */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                  {['DSGVO-konform', 'Vertraulich', '10–15 Minuten', 'Kostenlos'].map((t) => (
                    <span key={t} className="whitespace-nowrap px-4 py-2 text-[12px] font-[500]"
                      style={{ borderRadius: '100px', background: 'rgba(247,250,250,0.90)', border: '1px solid rgba(0,0,0,0.07)', color: '#64748b' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
