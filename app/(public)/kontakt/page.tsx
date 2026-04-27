import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Phone, Mail, MapPin, Clock, Heart, Shield, ArrowRight, FileText, Navigation } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'
import { ContactForm } from '@/components/forms/contact-form'
import { PremiumCta } from '@/components/sections/premium-cta'
import { LocationMapClient } from '@/components/sections/location-map-client'
import { loadContactInfo } from '@/lib/content/load-site-bundle'
import { mapsHrefFromAddress } from '@/lib/content/contact-cms'
import { telHrefFromDisplay } from '@/lib/content/tel-href'

export const metadata = {
  title: 'Kontakt – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Nehmen Sie Kontakt mit IMPULS auf – für Pflegeberatung, Leistungsanfragen oder allgemeine Fragen. Wir sind telefonisch rund um die Uhr erreichbar.',
}

export const dynamic = 'force-dynamic'

export default async function KontaktPage() {
  const c = await loadContactInfo()
  const tel = telHrefFromDisplay(c.phone)
  const mapsUrl = mapsHrefFromAddress(c.address)
  const addrParts = c.address.split(',').map((s) => s.trim()).filter(Boolean)
  const addrLine1 = addrParts[0] ?? c.address
  const addrLine2 = addrParts.slice(1).join(', ')
  const hourLines = c.hours.split('\n').map((s) => s.trim()).filter(Boolean)
  const hoursLine1 = hourLines[0] ?? c.hours
  const hoursLine2 = hourLines.slice(1).join(' · ') || 'Telefonisch: 24/7'

  const contactCards = [
    {
      icon: Phone,
      label: 'Telefon',
      value: c.phone,
      sub: 'Rund um die Uhr erreichbar',
      href: tel,
      accent: true,
    },
    {
      icon: Mail,
      label: 'E-Mail',
      value: c.email,
      sub: 'Antwort innerhalb von 24 Stunden',
      href: `mailto:${c.email}`,
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: addrLine1,
      sub: addrLine2 || ' ',
    },
    {
      icon: Clock,
      label: 'Bürozeiten',
      value: hoursLine1,
      sub: hoursLine2,
    },
  ]

  const locationInfoRows: { icon: LucideIcon; label: string; href?: string }[] = [
    { icon: MapPin, label: c.address },
    { icon: Phone, label: c.phone, href: tel },
    { icon: Mail, label: c.email, href: `mailto:${c.email}` },
    { icon: Clock, label: hoursLine1 },
  ]

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: '#F7FAFA' }}>

        {/* Glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute right-0 top-1/2 h-[360px] w-[360px]"
            style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        {/* Top mint line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }}
          aria-hidden="true" />

        <Container size="xl" className="relative">
          <div className="mx-auto max-w-[640px] text-center">
            {/* Badge */}
            <FadeIn>
              <div className="inline-flex items-center rounded-full border px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.90)', borderColor: 'rgba(24,193,163,0.22)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <span className="text-[12px] font-[580] tracking-[0.06em] uppercase" style={{ color: 'rgba(24,193,163,0.80)' }}>
                  Wir sind für Sie da
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <div className="mt-7">
              <TextReveal delay={0.1}>
                <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-[820] leading-[1.04] tracking-[-0.044em]"
                  style={{ color: '#0F172A' }}>
                  Sprechen Sie uns
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="mt-1 text-[clamp(2.4rem,5vw,3.8rem)] font-[820] leading-[1.04] tracking-[-0.044em]"
                  style={{ color: '#18C1A3' }}>
                  einfach an.
                </p>
              </TextReveal>
            </div>

            {/* Accent rule */}
            <FadeIn delay={0.3}>
              <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
              </div>
            </FadeIn>

            <FadeIn delay={0.38}>
              <p className="mx-auto mt-7 max-w-[480px] text-[16px] font-[400] leading-[1.78] tracking-[-0.01em]"
                style={{ color: '#475569' }}>
                Ob Pflegeberatung, Leistungsanfrage oder erste Orientierung –
                wir nehmen uns Zeit für Ihr Anliegen. Persönlich, verständlich und unverbindlich.
              </p>
            </FadeIn>

            {/* Trust pills */}
            <FadeIn delay={0.48}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: Heart, text: 'Persönliche Beratung' },
                  { icon: Shield, text: 'Vertraulich & kostenlos' },
                  { icon: Clock, text: '24/7 erreichbar' },
                ].map((item) => (
                  <span key={item.text}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-[500] tracking-[-0.005em]"
                    style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(0,0,0,0.07)', color: '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <item.icon className="h-3.5 w-3.5 shrink-0" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                    {item.text}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Contact Cards Strip ─── */}
      <section className="relative py-12" style={{ background: '#ffffff' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
        <Container size="xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              const inner = (
                <FadeIn key={card.label} delay={0.05 * i} direction="up" distance={16}>
                  <div
                    className="group relative flex flex-col overflow-hidden rounded-[22px] border p-7 transition-all duration-300 hover:-translate-y-[2px]"
                    style={card.accent ? {
                      background: 'linear-gradient(145deg, rgba(24,193,163,0.07) 0%, rgba(255,255,255,1) 100%)',
                      borderColor: 'rgba(24,193,163,0.28)',
                      boxShadow: '0 8px 32px -8px rgba(24,193,163,0.16)',
                    } : {
                      background: '#ffffff',
                      borderColor: 'rgba(0,0,0,0.08)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Thin mint top bar on accent card */}
                    {card.accent && (
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[22px]"
                        style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.25))' }}
                        aria-hidden="true" />
                    )}

                    {/* Icon */}
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full"
                      style={{
                        background: card.accent ? 'rgba(24,193,163,0.13)' : 'rgba(24,193,163,0.08)',
                        border: card.accent ? '1.5px solid rgba(24,193,163,0.22)' : '1.5px solid rgba(24,193,163,0.12)',
                      }}>
                      <Icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                    </div>

                    {/* Label */}
                    <p className="text-[11px] font-[680] uppercase tracking-[0.18em]"
                      style={{ color: '#18C1A3' }}>
                      {card.label}
                    </p>

                    {/* Value — primary info, dominant */}
                    <p className="mt-2 text-[17px] font-[720] leading-tight tracking-[-0.025em]"
                      style={{ color: '#0F172A' }}>
                      {card.value}
                    </p>

                    {/* Sub */}
                    <p className="mt-1.5 text-[13px] font-[450] leading-snug"
                      style={{ color: '#64748b' }}>
                      {card.sub}
                    </p>
                  </div>
                </FadeIn>
              )
              if (card.href) {
                return <a key={card.label} href={card.href} className="block">{inner}</a>
              }
              return <div key={card.label}>{inner}</div>
            })}
          </div>
        </Container>
      </section>

      {/* ─── Form + Sidebar ─── */}
      <section className="relative py-24 sm:py-32 lg:py-40" style={{ background: '#F7FAFA' }}>
        <Container size="xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_400px] lg:gap-16 xl:gap-20">

            {/* ── Form area ── */}
            <div className="min-w-0">
              <FadeIn>
                <div className="mb-10 text-center lg:text-left">
                  <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(24,193,163,0.80)' }}>
                    Kontaktformular
                  </p>
                  <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-[800] leading-[1.08] tracking-[-0.044em]"
                    style={{ color: '#0F172A' }}>
                    Schreiben Sie uns.
                  </h2>
                  <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                    <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                    <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                  </div>
                  <p className="mt-4 mx-auto max-w-[440px] text-[15px] font-[420] leading-[1.75] lg:mx-0" style={{ color: '#64748b' }}>
                    Wir melden uns innerhalb von 1–2 Werktagen persönlich bei Ihnen.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="rounded-[28px] border bg-white p-8 sm:p-10"
                  style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 12px 48px -10px rgba(0,0,0,0.08)' }}>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-5">

              {/* Personal consultation card */}
              <FadeIn delay={0.12} direction="right" distance={20}>
                <div className="overflow-hidden rounded-[28px] border bg-white"
                  style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08)' }}>
                  {/* Mint top bar */}
                  <div className="h-[3px] w-full"
                    style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.20))' }} />

                  <div className="mobile-card-prose p-7 text-center lg:text-left">
                    {/* Badge */}
                    <div className="mb-5 mx-auto flex h-12 w-12 items-center justify-center rounded-full lg:mx-0"
                      style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.18)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#18C1A3" aria-hidden="true">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>

                    <h3 className="text-[17px] font-[720] leading-tight tracking-[-0.022em]"
                      style={{ color: '#0F172A' }}>
                      Persönliche Beratung
                    </h3>
                    <p className="mt-2.5 text-[13.5px] font-[400] leading-[1.70]" style={{ color: '#64748b' }}>
                      Sie möchten lieber persönlich mit uns sprechen? Rufen Sie uns an oder vereinbaren Sie einen Beratungstermin – gerne auch bei Ihnen zu Hause.
                    </p>

                    <a
                      href={tel}
                      className="group mt-6 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full text-[14px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_14px_28px_-6px_rgba(24,193,163,0.36)]"
                      style={{
                        background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                        boxShadow: '0 6px 18px -4px rgba(24,193,163,0.28)',
                      }}
                    >
                      <Phone className="h-4 w-4" strokeWidth={2} />
                      Jetzt anrufen
                    </a>

                    {/* Trust items — centered column, icons one vertical line (<lg) */}
                    <div className="mt-6 space-y-3.5 border-t pt-6" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <div className="icon-list-stack space-y-3.5">
                        {[
                          { icon: Heart, title: 'Kostenlose Erstberatung', sub: 'Unverbindlich & persönlich' },
                          { icon: MapPin, title: 'Hausbesuche möglich', sub: 'In Unna & Umgebung' },
                          { icon: Clock, title: 'Schnelle Rückmeldung', sub: 'Innerhalb von 1–2 Werktagen' },
                        ].map((item) => (
                          <div key={item.title} className="flex items-start gap-3.5">
                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                              style={{ background: 'rgba(24,193,163,0.09)' }}>
                              <item.icon className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                            </div>
                            <div className="icon-list-prose min-w-0 flex-1">
                              <p className="text-[13px] font-[580] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-[12px] font-[420]" style={{ color: '#94a3b8' }}>
                                {item.sub}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Anamnesebogen card */}
              <FadeIn delay={0.20} direction="right" distance={20}>
                <div className="rounded-[24px] border p-6"
                  style={{
                    background: 'rgba(24,193,163,0.04)',
                    borderColor: 'rgba(24,193,163,0.16)',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                  }}>
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.12)' }}>
                      <FileText className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-[680] tracking-[-0.02em]" style={{ color: '#0F172A' }}>
                        Anamnesebogen online
                      </h4>
                      <p className="mt-1.5 text-[13px] font-[420] leading-[1.60]" style={{ color: '#64748b' }}>
                        Füllen Sie den Anamnesebogen bequem vor dem Erstgespräch aus.
                      </p>
                      <Link
                        href="/anamnesebogen"
                        className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-[580] tracking-[-0.01em] transition-colors duration-200 hover:opacity-70"
                        style={{ color: '#18C1A3' }}
                      >
                        Zum Anamnesebogen
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </Container>
      </section>

      {/* ─── Map / Location Section ─── */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40" style={{ background: '#ffffff' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

        <Container size="xl">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">

            {/* Left: Location text */}
            <div className="text-center lg:text-left">
              <FadeIn>
                <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.80)' }}>
                  Standort
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.8rem)] font-[800] leading-[1.08] tracking-[-0.044em]"
                  style={{ color: '#0F172A' }}>
                  So finden Sie uns
                  <br />
                  <span style={{ color: '#18C1A3' }}>in Unna.</span>
                </h2>
                <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.30), transparent)' }} />
                </div>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="mt-6 mx-auto max-w-[420px] text-[15.5px] font-[420] leading-[1.78] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#475569' }}>
                  Unser Standort liegt zentral in Unna. Für persönliche Gespräche sind wir gerne für Sie da – und wenn es besser zu Ihrer Situation passt, kommen wir auch zu Ihnen nach Hause.
                </p>
              </FadeIn>

              {/* Info rows */}
              <FadeIn delay={0.18}>
                <div className="icon-list-stack mt-8 space-y-3.5">
                  {locationInfoRows.map((item) => {
                    const inner = (
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.12)' }}>
                          <item.icon className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                        </div>
                        <span className="icon-list-prose min-w-0 flex-1 text-[14px] font-[460] tracking-[-0.01em]" style={{ color: '#334155' }}>
                          {item.label}
                        </span>
                      </div>
                    )
                    return item.href ? (
                      <a key={item.label} href={item.href} className="group block transition-opacity hover:opacity-75">
                        {inner}
                      </a>
                    ) : (
                      <div key={item.label}>{inner}</div>
                    )
                  })}
                </div>
              </FadeIn>

              {/* CTAs */}
              <FadeIn delay={0.24}>
                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_24px_-4px_rgba(24,193,163,0.34)] sm:w-auto sm:max-w-none"
                    style={{
                      background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                      boxShadow: '0 5px 16px -4px rgba(24,193,163,0.26)',
                    }}
                  >
                    <Navigation className="h-4 w-4" strokeWidth={2} />
                    Route planen
                  </a>
                  <a
                    href={tel}
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border px-6 py-3 text-[14px] font-[540] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-[1px] hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] sm:w-auto sm:max-w-none"
                    style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                  >
                    <Phone className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                    Anrufen
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right: Leaflet interactive map */}
            <FadeIn delay={0.1} direction="right" distance={28}>
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '28px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 24px 64px -16px rgba(0,0,0,0.13)',
                }}
              >
                {/* Map — desktop 480px, mobile 320px */}
                <div className="h-[320px] sm:h-[420px] lg:h-[480px]">
                  <LocationMapClient />
                </div>

                {/* Floating address badge */}
                <div className="absolute bottom-4 left-4 right-4 z-[999]">
                  <div
                    className="flex items-center justify-between gap-3 rounded-[16px] px-5 py-3.5"
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                        style={{ background: 'rgba(24,193,163,0.12)' }}>
                        <MapPin className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-[640] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                          IMPULS Ambulante Pflege
                        </p>
                        <p className="text-[11.5px] font-[420]" style={{ color: '#64748b' }}>
                          {c.address}
                        </p>
                      </div>
                    </div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-[600] tracking-[-0.005em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_rgba(24,193,163,0.42)]"
                      style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)' }}
                    >
                      Route planen
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </Container>
      </section>

      <PremiumCta
        eyebrow="Noch Fragen?"
        headline="Lassen Sie uns gemeinsam die passende Unterstützung finden."
        subtext="Wir nehmen uns Zeit für Ihre Situation und beraten Sie persönlich, verständlich und unverbindlich."
        primaryLabel="Jetzt unverbindlich anfragen"
        phone={c.phone}
        background="#F7FAFA"
      />
    </>
  )
}
