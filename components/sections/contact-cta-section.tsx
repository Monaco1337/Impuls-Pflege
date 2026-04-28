import Link from 'next/link'
import Image from 'next/image'
import { Phone, Printer, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

export function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44" style={{ background: '#F7FAFA' }}>

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.07) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute -right-24 bottom-1/4 h-[360px] w-[360px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <Container size="xl" className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28">

          {/* ── Left: text + CTAs ── */}
          <div className="flex flex-col text-center lg:text-left">
            <FadeIn direction="up" distance={14}>
              <p className="text-[11px] font-[660] uppercase tracking-[0.24em]"
                style={{ color: 'rgba(24,193,163,0.82)' }}>
                Kontakt
              </p>
            </FadeIn>

            <FadeIn direction="up" distance={20} delay={0.07}>
              <h2
                className="mt-5 mx-auto max-w-[520px] text-[clamp(1.9rem,3.8vw,3.2rem)] font-[800] leading-[1.07] tracking-[-0.046em] lg:mx-0"
                style={{ color: '#0F172A' }}
              >
                Wir sind für
                <br />Sie da.
              </h2>
            </FadeIn>

            <FadeIn direction="up" distance={10} delay={0.12}>
              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                <div className="h-[1.5px] w-6 rounded-full"
                  style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-16 rounded-full"
                  style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={16} delay={0.16}>
              <p
                className="mt-8 mx-auto max-w-[460px] text-[16.5px] font-[400] leading-[1.80] tracking-[-0.01em] lg:mx-0"
                style={{ color: '#475569' }}
              >
                Lassen Sie uns gemeinsam die passende Unterstützung finden.
                Ihr Anruf oder Ihre Nachricht – unverbindlich und vertraulich.
              </p>
            </FadeIn>

            <FadeIn direction="up" distance={14} delay={0.22}>
              <div className="mt-10 flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:justify-start">
                <Link
                  href="/kontakt"
                  className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.36)] lg:w-auto lg:max-w-none"
                  style={{
                    background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                    boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)',
                  }}
                >
                  Jetzt anfragen
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ background: 'rgba(255,255,255,0.22)' }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                  </span>
                </Link>
                <a
                  href="tel:+4923032920589"
                  className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 text-[15px] font-[520] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                  style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                >
                  <Phone className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                  02303 2920589
                </a>
              </div>
            </FadeIn>
          </div>

          {/* ── Right: contact info card ── */}
          <FadeIn direction="right" distance={28} delay={0.14}>
            <div
              className="mobile-card-prose rounded-[28px] border bg-white p-8 sm:p-10"
              style={{
                borderColor: 'rgba(0,0,0,0.06)',
                boxShadow: '0 16px 56px -10px rgba(0,0,0,0.09)',
              }}
            >
              {/* Top mint accent line */}
              <div
                className="mb-8 h-[2px] w-10 rounded-full"
                style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.20))' }}
              />

              <div className="icon-list-stack space-y-6">
                {[
                  { icon: Phone, label: 'Telefon', value: '02303 2920589', href: 'tel:+4923032920589' },
                  { icon: Printer, label: 'Fax', value: '02303 2920587', href: 'fax:+4923032920587' },
                  { icon: Mail, label: 'E-Mail', value: 'info@impuls-pflege.de', href: 'mailto:info@impuls-pflege.de' },
                  { icon: MapPin, label: 'Adresse', value: 'Massener Str. 147, 59423 Unna', href: undefined },
                  { icon: Clock, label: 'Bürozeiten', value: 'Mo–Fr: 08:00–16:00 Uhr', href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.09)' }}
                    >
                      <Icon className="h-[17px] w-[17px]" style={{ color: '#18C1A3' }} strokeWidth={1.6} />
                    </div>
                    <div className="icon-list-prose min-w-0 flex-1">
                      <p className="text-[10.5px] font-[620] uppercase tracking-[0.14em]"
                        style={{ color: 'rgba(24,193,163,0.75)' }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href}
                          className="mt-1 block text-[15px] font-[480] tracking-[-0.01em] transition-colors duration-200 hover:text-[#18C1A3]"
                          style={{ color: '#0F172A' }}>
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-[15px] font-[480] tracking-[-0.01em]"
                          style={{ color: '#0F172A' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 rounded-[14px] p-4"
                style={{ background: 'rgba(24,193,163,0.05)', border: '1px solid rgba(24,193,163,0.12)' }}
              >
                <p className="text-[13px] font-[420] leading-[1.65] tracking-[-0.005em]"
                  style={{ color: '#475569' }}>
                  Ihre Anfrage wird vertraulich behandelt. Wir melden uns
                  in der Regel innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  )
}
