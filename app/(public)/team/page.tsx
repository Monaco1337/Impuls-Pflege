import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Phone, Users } from 'lucide-react'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'

export const metadata = {
  title: 'Unser Team – IMPULS Ambulanter Pflegedienst',
  description:
    'Lernen Sie die Menschen hinter IMPULS kennen – engagierte Pflegefachkräfte mit Herz, Kompetenz und langjähriger Erfahrung in der ambulanten Pflege.',
}

const MINT = '#18C1A3'
const PINK = '#F24B6A'

// ─── Team data ──────────────────────────────────────────────────────────────
// Fügen Sie hier neue Teammitglieder ein.
// Felder: name, position, description, image (Pfad zu /public/images/...)
// Wenn noch kein Foto vorhanden: image auf null setzen → Placeholder-Karte erscheint automatisch

const teamMembers: {
  name: string
  position: string
  description: string
  image: string | null
}[] = [
  {
    name: 'Natalia Tschupina',
    position: 'Pflegedienstleiterin',
    description:
      'Mit Herz, Fachwissen und einem offenen Ohr koordiniert Natalia den täglichen Pflegeeinsatz und sorgt dafür, dass jeder Klient die Betreuung bekommt, die er verdient.',
    image: '/images/care-smile.jpg',
  },
  {
    name: 'Teammitglied',
    position: 'Pflegefachkraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Pflegehilfskraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Betreuungsassistenz',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
  {
    name: 'Teammitglied',
    position: 'Pflegefachkraft',
    description: 'Bald stellen wir Ihnen hier ein weiteres Mitglied unseres engagierten Teams vor.',
    image: null,
  },
]

// ─── Placeholder card ────────────────────────────────────────────────────────
function PlaceholderCard({ name, position, description }: { name: string; position: string; description: string }) {
  return (
    <div
      className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-[4px]"
      style={{
        borderRadius: '26px',
        background: '#ffffff',
        border: '1.5px dashed rgba(24,193,163,0.22)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Photo placeholder */}
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: '4/5', background: 'linear-gradient(145deg, rgba(24,193,163,0.06) 0%, rgba(24,193,163,0.03) 100%)' }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(24,193,163,0.10)', border: '1.5px solid rgba(24,193,163,0.20)' }}
        >
          <Users className="h-7 w-7" style={{ color: 'rgba(24,193,163,0.50)' }} strokeWidth={1.5} />
        </div>
        {/* "Bald verfügbar" label */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', border: '1px solid rgba(24,193,163,0.15)' }}
        >
          <span className="text-[11px] font-[580] uppercase tracking-[0.14em]" style={{ color: 'rgba(24,193,163,0.70)' }}>
            Bald verfügbar
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pb-6 pt-5">
        <p className="text-[15.5px] font-[720] tracking-[-0.020em]" style={{ color: '#0F172A' }}>
          {name}
        </p>
        <p className="mt-0.5 text-[11px] font-[600] uppercase tracking-[0.11em]" style={{ color: 'rgba(24,193,163,0.72)' }}>
          {position}
        </p>
        <p className="mt-3 text-[13.5px] font-[400] leading-[1.70]" style={{ color: '#94A3B8' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

// ─── Team member card ────────────────────────────────────────────────────────
function TeamCard({
  name,
  position,
  description,
  image,
  delay = 0,
}: {
  name: string
  position: string
  description: string
  image: string
  delay?: number
}) {
  return (
    <FadeIn direction="up" distance={22} delay={delay}>
      <div
        className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-[5px]"
        style={{
          borderRadius: '26px',
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.055)',
          boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
        }}
      >
        {/* Photo */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <Image
            src={image}
            alt={`${name} – ${position}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          />
          {/* Subtle bottom vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.18) 0%, transparent 44%)' }}
          />
          {/* Mint accent top bar on hover */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.30))` }}
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col px-6 pb-6 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[16px] font-[740] leading-tight tracking-[-0.022em]" style={{ color: '#0F172A' }}>
                {name}
              </h3>
              <p className="mt-0.5 text-[11px] font-[620] uppercase tracking-[0.11em]" style={{ color: MINT }}>
                {position}
              </p>
            </div>
            {/* Mint heart badge */}
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'rgba(24,193,163,0.10)', border: '1px solid rgba(24,193,163,0.18)' }}
            >
              <Heart className="h-3.5 w-3.5" style={{ color: MINT }} fill={MINT} strokeWidth={0} />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />

          <p className="text-[13.5px] font-[400] leading-[1.72]" style={{ color: '#64748b' }}>
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48"
        style={{ background: '#F7FAFA' }}
      >
        {/* Top hairline */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.45), transparent)' }}
        />

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute left-1/2 top-0 h-[560px] w-[700px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }}
          />
          <div
            className="absolute -right-32 top-1/3 h-[400px] w-[400px]"
            style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }}
          />
        </div>

        <div className="relative mx-auto max-w-[860px] px-6 text-center sm:px-10">

          {/* Eyebrow */}
          <FadeIn direction="up" distance={16}>
            <div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
              style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: `1px solid rgba(24,193,163,0.22)`, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            >
              <Heart className="h-3.5 w-3.5 shrink-0" style={{ color: MINT }} fill={MINT} strokeWidth={0} />
              <span className="text-[11.5px] font-[620] uppercase tracking-[0.18em]" style={{ color: 'rgba(24,193,163,0.88)' }}>
                Unser Team
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <TextReveal delay={0.08}>
            <h1
              className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-[820] leading-[1.05] tracking-[-0.048em]"
              style={{ color: '#0F172A' }}
            >
              Menschen, die Pflege
            </h1>
          </TextReveal>
          <TextReveal delay={0.16}>
            <h1
              className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-[820] leading-[1.05] tracking-[-0.048em]"
              style={{ color: MINT }}
            >
              persönlich machen.
            </h1>
          </TextReveal>

          {/* Accent rule */}
          <FadeIn direction="up" distance={10} delay={0.22}>
            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <div className="h-[1.5px] w-6 rounded-full" style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
              <div className="h-[1.5px] w-16 rounded-full" style={{ background: `linear-gradient(to right, rgba(24,193,163,0.30), transparent)` }} />
            </div>
          </FadeIn>

          {/* Subtext */}
          <FadeIn direction="up" distance={14} delay={0.27}>
            <p
              className="mx-auto mt-7 max-w-[500px] text-[17px] font-[410] leading-[1.78] tracking-[-0.012em]"
              style={{ color: '#475569' }}
            >
              Hinter IMPULS stehen Menschen, die täglich mit Überzeugung, Fachkompetenz
              und echter Wärme für unsere Klientinnen und Klienten da sind.
            </p>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn direction="up" distance={12} delay={0.33}>
            <div className="mx-auto mt-12 flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
              {[
                { value: '15+', label: 'Jahre Erfahrung', sub: 'In der ambulanten Pflege' },
                { value: '24/7', label: 'Erreichbar', sub: 'Für Sie und Ihre Familie' },
                { value: '100%', label: 'Herzblut', sub: 'In jedem Pflegeeinsatz' },
              ].map((s, i) => (
                <div
                  key={s.value}
                  className="flex w-full max-w-xs flex-col items-center rounded-[22px] px-8 py-6 text-center lg:w-[200px] lg:max-w-none"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.95)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Mint top accent bar */}
                  <div
                    className="mb-4 h-[3px] w-10 rounded-full"
                    style={{ background: i === 1
                      ? `linear-gradient(to right, ${PINK}, rgba(242,75,106,0.30))`
                      : `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.30))` }}
                  />
                  <p
                    className="text-[clamp(2rem,5vw,2.6rem)] font-[860] leading-none tracking-[-0.06em]"
                    style={{ color: i === 1 ? PINK : MINT }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-2 text-[13px] font-[680] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                    {s.label}
                  </p>
                  <p className="mt-1 text-[11.5px] font-[420] leading-snug" style={{ color: '#94a3b8' }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
      </section>

      {/* ── Elena Tschupina – Featured Leadership Card ── */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 xl:px-14">

          <FadeIn direction="up" distance={14} delay={0.05}>
            <p className="mb-8 text-center text-[11px] font-[660] uppercase tracking-[0.24em] lg:text-left" style={{ color: 'rgba(24,193,163,0.80)' }}>
              Geschäftsführung
            </p>
          </FadeIn>

          <FadeIn direction="up" distance={24} delay={0.10}>
            <div
              className="group relative grid overflow-hidden lg:grid-cols-[420px_1fr]"
              style={{
                borderRadius: '32px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 24px 80px -16px rgba(0,0,0,0.12)',
              }}
            >
              {/* Mint top accent */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.30), transparent)` }}
              />

              {/* Photo */}
              <div className="relative overflow-hidden lg:rounded-l-[32px]" style={{ minHeight: '480px' }}>
                <Image
                  src="/images/team-elena-tschupina.jpg"
                  alt="Elena Tschupina – Geschäftsführerin IMPULS"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                />
                {/* Bottom gradient overlay (only visible on mobile where info is below) */}
                <div
                  className="pointer-events-none absolute inset-0 lg:hidden"
                  style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 50%)' }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center p-9 text-center sm:p-12 lg:p-14 lg:text-left">

                {/* Role pill */}
                <span
                  className="mx-auto mb-6 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-[11px] font-[660] uppercase tracking-[0.16em] lg:mx-0"
                  style={{ background: 'rgba(24,193,163,0.10)', color: MINT, border: `1px solid rgba(24,193,163,0.22)` }}
                >
                  Geschäftsführerin
                </span>

                <h2
                  className="mx-auto max-w-xl text-[clamp(2rem,3.5vw,2.9rem)] font-[800] leading-[1.07] tracking-[-0.044em] lg:mx-0"
                  style={{ color: '#0F172A' }}
                >
                  Elena Tschupina
                </h2>

                {/* Mint divider */}
                <div className="my-6 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-8 rounded-full" style={{ background: MINT }} />
                  <div className="h-[1.5px] w-20 rounded-full" style={{ background: 'rgba(24,193,163,0.20)' }} />
                </div>

                {/* Quote */}
                <blockquote
                  className="mx-auto max-w-xl text-[17px] font-[440] italic leading-[1.72] tracking-[-0.012em] lg:mx-0"
                  style={{ color: '#334155', borderLeft: `3px solid rgba(24,193,163,0.35)`, paddingLeft: '1.2rem' }}
                >
                  „Pflege bedeutet für mich, Menschen in ihrer schwersten Zeit mit Würde
                  und echter Fürsorge zu begleiten."
                </blockquote>

                {/* Bio text */}
                <p
                  className="mx-auto mt-6 max-w-xl text-[15px] font-[400] leading-[1.80] tracking-[-0.01em] lg:mx-0"
                  style={{ color: '#64748B' }}
                >
                  Als Gründerin und Geschäftsführerin von IMPULS trägt Elena die Verantwortung
                  für die Qualität jedes einzelnen Pflegeeinsatzes. Ihre Überzeugung: Gute
                  Pflege beginnt mit Zuhören und wird getragen von Menschen, die ihren Beruf
                  wirklich lieben.
                </p>

                {/* Trust items */}
                <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {['Examinierte Pflegefachkraft', 'Langjährige Führungserfahrung', 'Regionaler Pflegedienst'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-[520]"
                      style={{ background: '#F7FAFA', border: '1px solid rgba(0,0,0,0.07)', color: '#475569' }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: MINT }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section className="pb-24 sm:pb-32 lg:pb-44" style={{ background: '#F7FAFA' }}>
        <div className="pointer-events-none h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />

        <div className="mx-auto max-w-[1280px] px-6 pt-20 sm:px-10 xl:px-14">

          {/* Section header */}
          <div className="mb-12 text-center lg:text-left">
            <FadeIn direction="up" distance={14}>
              <p className="text-[11px] font-[660] uppercase tracking-[0.24em]" style={{ color: 'rgba(24,193,163,0.80)' }}>
                Das gesamte Team
              </p>
            </FadeIn>
            <FadeIn direction="up" distance={18} delay={0.06}>
              <h2
                className="mx-auto mt-4 max-w-2xl text-[clamp(1.7rem,3.2vw,2.5rem)] font-[800] leading-[1.08] tracking-[-0.044em] lg:mx-0"
                style={{ color: '#0F172A' }}
              >
                Jedes Gesicht dahinter
                <span style={{ color: MINT }}> trägt Pflege</span> nach vorne.
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, i) =>
              member.image ? (
                <TeamCard
                  key={`${member.name}-${i}`}
                  name={member.name}
                  position={member.position}
                  description={member.description}
                  image={member.image}
                  delay={0.04 + 0.05 * i}
                />
              ) : (
                <FadeIn key={`placeholder-${i}`} direction="up" distance={20} delay={0.04 + 0.05 * i}>
                  <PlaceholderCard
                    name={member.name}
                    position={member.position}
                    description={member.description}
                  />
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[860px] px-6 sm:px-10">
          <FadeIn direction="up" distance={18}>
            <div
              className="relative overflow-hidden rounded-[32px] p-10 sm:p-14 text-center"
              style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 16px 56px -10px rgba(0,0,0,0.09)' }}
            >
              {/* Glow effects */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(24,193,163,0.09) 0%, transparent 65%)', filter: 'blur(40px)' }} aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-[240px] w-[240px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(242,75,106,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} aria-hidden="true" />

              <div className="relative flex flex-col items-center">
                {/* Icon */}
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.18)' }}
                >
                  <Heart className="h-6 w-6" style={{ color: MINT }} fill={MINT} strokeWidth={0} />
                </div>

                <h2
                  className="text-[clamp(1.55rem,3vw,2.2rem)] font-[800] leading-[1.08] tracking-[-0.042em]"
                  style={{ color: '#0F172A' }}
                >
                  Werden Sie Teil dieses Teams.
                </h2>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: `linear-gradient(to right, ${PINK}, transparent)` }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: `linear-gradient(to right, rgba(24,193,163,0.30), transparent)` }} />
                </div>

                <p
                  className="mx-auto mt-5 max-w-[420px] text-[15.5px] font-[400] leading-[1.72]"
                  style={{ color: '#64748b' }}
                >
                  Wir suchen Menschen mit Herz, Kompetenz und echtem Interesse an guter Pflege.
                  Verstärken Sie unser Team – wir freuen uns auf Sie.
                </p>

                <div className="mt-9 flex flex-col items-center gap-3 lg:flex-row lg:justify-center">
                  <Link
                    href="/karriere"
                    className="group inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[14.5px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.36)] lg:w-auto lg:max-w-none"
                    style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)' }}
                  >
                    Offene Stellen ansehen
                    <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                    </span>
                  </Link>
                  <Link
                    href="/kontakt"
                    className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[14px] font-[540] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.25)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                    style={{ color: '#475569', borderColor: 'rgba(0,0,0,0.09)' }}
                  >
                    <Phone className="h-4 w-4 shrink-0" style={{ color: MINT }} strokeWidth={1.8} />
                    Persönlich kontaktieren
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
