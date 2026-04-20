import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { ApplicationForm } from '@/components/forms/application-form'

export const metadata: Metadata = {
  title: 'Bewerbung – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Bewerben Sie sich jetzt beim IMPULS Ambulanten Pflegedienst in Unna. Füllen Sie das Bewerbungsformular aus und starten Sie Ihre Karriere in der Pflege.',
}

export default async function BewerbungPage({
  searchParams,
}: {
  searchParams: Promise<{ stelle?: string }>
}) {
  const { stelle } = await searchParams

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFA' }}>

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">

        {/* Brand glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-[360px] w-[360px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">

            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,193,163,0.25)] bg-white/80 px-4 py-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: '#18C1A3' }}
              />
              <span className="text-[11px] font-[640] uppercase tracking-[0.18em]" style={{ color: '#18C1A3' }}>
                Bewerbung
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mt-6 text-[clamp(2rem,5vw,3.2rem)] font-[800] leading-[1.08] tracking-[-0.04em]"
              style={{ color: '#0F172A' }}
            >
              Ihre Bewerbung
              <br />
              <span style={{ color: '#18C1A3' }}>bei IMPULS.</span>
            </h1>

            {/* Accent rule */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="h-[1.5px] w-8 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
              <div className="h-[1.5px] w-20 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.4), transparent)' }} />
            </div>

            {/* Subline */}
            <p
              className="mt-6 text-[1.05rem] font-[420] leading-[1.78] tracking-[-0.01em]"
              style={{ color: '#475569' }}
            >
              Wir freuen uns auf Sie. Füllen Sie das Formular aus und
              wir melden uns zeitnah bei Ihnen.
            </p>

          </div>
        </Container>
      </div>

      {/* ── Form ── */}
      <div className="pb-24">
        <Container size="md">
          <ApplicationForm preselectedPosition={stelle} />
        </Container>
      </div>

    </div>
  )
}
