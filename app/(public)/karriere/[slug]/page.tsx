import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin, Clock, ArrowRight, ArrowLeft, Briefcase,
  CheckCircle2, Users, Zap, Phone,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'
import { TextReveal } from '@/components/animations/text-reveal'

const staticJobs: Record<string, {
  title: string
  slug: string
  department: string
  location: string
  employmentType: string
  workload: string
  shortIntro: string
  description: string
  requirements: string
  benefits: string
}> = {
  pflegefachkraft: {
    title: 'Pflegefachkraft (m/w/d)',
    slug: 'pflegefachkraft',
    department: 'Pflege',
    location: 'Unna',
    employmentType: 'Vollzeit / Teilzeit',
    workload: 'Vollzeit / Teilzeit',
    shortIntro: 'Werden Sie Teil unseres engagierten Pflegeteams und begleiten Sie Menschen mit Herz und Fachkompetenz in ihrem Zuhause.',
    description: 'Als Pflegefachkraft bei IMPULS übernehmen Sie die eigenverantwortliche Durchführung der Grund- und Behandlungspflege bei unseren Klientinnen und Klienten. Sie arbeiten in einem wertschätzenden Team, das Menschlichkeit und professionelle Pflege vereint.\n\nIhre Aufgaben:\n- Durchführung der Grund- und Behandlungspflege\n- Pflegedokumentation und -planung\n- Beratung von Klienten und Angehörigen\n- Zusammenarbeit mit Ärzten und Therapeuten\n- Medikamentenmanagement',
    requirements: '- Abgeschlossene Ausbildung als Pflegefachkraft, Gesundheits- und Krankenpfleger/in oder Altenpfleger/in\n- Führerschein Klasse B\n- Einfühlungsvermögen und Teamfähigkeit\n- Eigenverantwortliches Arbeiten\n- Berufserfahrung in der ambulanten Pflege von Vorteil',
    benefits: '- Überdurchschnittliche Vergütung\n- Flexible Arbeitszeitmodelle\n- Fort- und Weiterbildungsmöglichkeiten\n- Betriebliche Altersvorsorge\n- Wertschätzendes Arbeitsumfeld\n- Moderne Arbeitsmittel\n- Dienstfahrzeug',
  },
  pflegehilfskraft: {
    title: 'Pflegehilfskraft (m/w/d)',
    slug: 'pflegehilfskraft',
    department: 'Pflege',
    location: 'Unna',
    employmentType: 'Teilzeit / Minijob',
    workload: 'Teilzeit / Minijob',
    shortIntro: 'Unterstützen Sie unser Team in der täglichen Pflege und Betreuung – auch als Quereinsteiger mit Herz willkommen.',
    description: 'Als Pflegehilfskraft unterstützen Sie unser Pflegeteam bei der täglichen Versorgung unserer Klientinnen und Klienten. Sie helfen bei der Grundpflege und tragen zu einem würdevollen Alltag bei.\n\nIhre Aufgaben:\n- Unterstützung bei der Grundpflege\n- Hilfe bei der Mobilisation\n- Begleitung im Alltag\n- Dokumentation der durchgeführten Maßnahmen',
    requirements: '- Pflegebasiskurs oder Bereitschaft zur Qualifizierung\n- Führerschein Klasse B\n- Zuverlässigkeit und Einfühlungsvermögen\n- Freude am Umgang mit Menschen',
    benefits: '- Faire Vergütung\n- Einarbeitung und Schulungen\n- Flexible Einsatzzeiten\n- Familiäres Arbeitsklima\n- Entwicklungsmöglichkeiten',
  },
  betreuungskraft: {
    title: 'Betreuungskraft (m/w/d)',
    slug: 'betreuungskraft',
    department: 'Betreuung',
    location: 'Unna',
    employmentType: 'Teilzeit',
    workload: 'Teilzeit',
    shortIntro: 'Schenken Sie Menschen wertvolle Zeit – durch aktivierende Betreuung und einfühlsame Begleitung im Alltag.',
    description: 'Als Betreuungskraft gestalten Sie den Alltag unserer Klientinnen und Klienten aktiv und liebevoll mit. Sie bieten Beschäftigung, Gesellschaft und Unterstützung.\n\nIhre Aufgaben:\n- Aktivierende Betreuung und Beschäftigung\n- Begleitung bei Spaziergängen und Terminen\n- Gesellschaft und Gesprächsangebote\n- Unterstützung im häuslichen Umfeld',
    requirements: '- Qualifikation nach §43b/§53b SGB XI wünschenswert\n- Einfühlungsvermögen und Geduld\n- Freude an der Arbeit mit Menschen\n- Zuverlässigkeit',
    benefits: '- Sinnstiftende Tätigkeit\n- Wertschätzende Teamkultur\n- Fort- und Weiterbildungen\n- Flexible Arbeitszeiten',
  },
  hauswirtschaftskraft: {
    title: 'Hauswirtschaftskraft (m/w/d)',
    slug: 'hauswirtschaftskraft',
    department: 'Hauswirtschaft',
    location: 'Unna',
    employmentType: 'Minijob / Teilzeit',
    workload: 'Minijob / Teilzeit',
    shortIntro: 'Sorgen Sie für ein gepflegtes Zuhause unserer Klienten – mit Sorgfalt, Zuverlässigkeit und einem freundlichen Wesen.',
    description: 'Als Hauswirtschaftskraft unterstützen Sie unsere Klientinnen und Klienten bei der Bewältigung des Haushalts und tragen so zu einem würdevollen Leben im eigenen Zuhause bei.\n\nIhre Aufgaben:\n- Reinigung und Pflege der Wohnung\n- Wäschepflege\n- Einkäufe und Besorgungen\n- Zubereitung einfacher Mahlzeiten',
    requirements: '- Erfahrung im hauswirtschaftlichen Bereich wünschenswert\n- Führerschein Klasse B von Vorteil\n- Zuverlässigkeit und Sorgfalt\n- Freundliches Auftreten',
    benefits: '- Flexible Einsatzzeiten\n- Familiäres Arbeitsumfeld\n- Faire Vergütung\n- Kurze Kommunikationswege',
  },
}

function parseSection(text: string): { heading: string; items: string[] }[] {
  const sections: { heading: string; items: string[] }[] = []
  let current: { heading: string; items: string[] } | null = null

  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('- ') || line.startsWith('• ')) {
      if (!current) current = { heading: '', items: [] }
      current.items.push(line.slice(2))
    } else {
      if (current) sections.push(current)
      current = { heading: line.replace(':', ''), items: [] }
    }
  }
  if (current) sections.push(current)
  return sections
}

export async function generateStaticParams() {
  return Object.keys(staticJobs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = staticJobs[slug]
  if (!job) return { title: 'Stelle nicht gefunden – IMPULS' }
  return {
    title: `${job.title} – Karriere bei IMPULS`,
    description: job.shortIntro,
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = staticJobs[slug]
  if (!job) notFound()

  const descSections  = parseSection(job.description)
  const reqSections   = parseSection(job.requirements)
  const benSections   = parseSection(job.benefits)

  const MINT = '#18C1A3'

  return (
    <>
      {/* ─── Light Premium Hero ─── */}
      <section className="relative overflow-hidden" style={{ background: '#F7FAFA' }}>

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-0 top-0 h-[500px] w-[500px]"
            style={{ background: 'radial-gradient(ellipse at 15% 20%, rgba(24,193,163,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px]"
            style={{ background: 'radial-gradient(ellipse, rgba(242,75,106,0.04) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </div>

        {/* Top mint accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(24,193,163,0.50), transparent)' }}
          aria-hidden="true" />

        <Container size="xl">
          <div className="pb-16 pt-12 text-center sm:pb-22 sm:pt-18 lg:pb-24 lg:pt-22 lg:text-left">

            {/* Back link */}
            <FadeIn>
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/karriere"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-[480] tracking-[-0.01em] text-[#94a3b8] transition-colors duration-200 hover:text-[#18C1A3]"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  Alle Stellen
                </Link>
              </div>
            </FadeIn>

            <div className="mx-auto mt-7 max-w-[780px] lg:mx-0">

              {/* Department eyebrow */}
              <FadeIn delay={0.04}>
                <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(24,193,163,0.85)' }}>
                  {job.department}
                </p>
              </FadeIn>

              {/* Headline */}
              <div className="mt-3">
                <TextReveal delay={0.1}>
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.75rem)] font-[820] leading-[1.04] tracking-[-0.044em]"
                    style={{ color: '#0F172A' }}>
                    {job.title}
                  </h1>
                </TextReveal>
              </div>

              {/* Accent rule */}
              <FadeIn delay={0.20}>
                <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="h-[1.5px] w-5 rounded-full" style={{ background: 'linear-gradient(to right, #F24B6A, transparent)' }} />
                  <div className="h-[1.5px] w-14 rounded-full" style={{ background: 'linear-gradient(to right, rgba(24,193,163,0.35), transparent)' }} />
                </div>
              </FadeIn>

              {/* Meta tags */}
              <FadeIn delay={0.26}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-[560]"
                    style={{ borderColor: 'rgba(24,193,163,0.22)', background: 'rgba(24,193,163,0.06)', color: '#0d7460' }}>
                    <Briefcase className="h-3 w-3" style={{ color: MINT }} strokeWidth={2} />
                    {job.employmentType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-[500]"
                    style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.85)', color: '#475569' }}>
                    <Clock className="h-3 w-3" style={{ color: '#94a3b8' }} strokeWidth={2} />
                    {job.workload}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-[500]"
                    style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.85)', color: '#475569' }}>
                    <MapPin className="h-3 w-3" style={{ color: '#94a3b8' }} strokeWidth={2} />
                    {job.location}
                  </span>
                </div>
              </FadeIn>

              {/* Intro */}
              <FadeIn delay={0.32}>
                <p className="mt-6 max-w-[560px] text-[clamp(0.98rem,1.4vw,1.06rem)] font-[420] leading-[1.80] tracking-[-0.01em]"
                  style={{ color: '#475569' }}>
                  {job.shortIntro}
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── Content ─── */}
      <section className="relative bg-white py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">

            {/* ── Main content ── */}
            <div className="min-w-0 space-y-14 text-center lg:text-left">

              {/* Über die Position */}
              <FadeIn>
                <ContentSection
                  eyebrow="Stellenbeschreibung"
                  heading="Über die Position"
                  sections={descSections}
                />
              </FadeIn>

              {/* Anforderungen */}
              <FadeIn delay={0.06}>
                <div className="h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
                <div className="pt-14">
                  <ContentSection
                    eyebrow="Anforderungen"
                    heading="Das bringen Sie mit"
                    sections={reqSections}
                  />
                </div>
              </FadeIn>

              {/* Benefits */}
              <FadeIn delay={0.10}>
                <div className="h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
                <div className="pt-14">
                  <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(24,193,163,0.85)' }}>
                    Benefits
                  </p>
                  <h2 className="mt-3 text-[clamp(1.25rem,2.5vw,1.75rem)] font-[760] tracking-[-0.028em]"
                    style={{ color: '#0F172A' }}>
                    Das bieten wir Ihnen
                  </h2>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {benSections.flatMap(s => s.items).map((item, i) => (
                      <div key={i}
                        className="icon-list-stack-cell flex items-start gap-3 rounded-[14px] border p-4"
                        style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAFA' }}>
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: 'rgba(24,193,163,0.10)', border: '1.5px solid rgba(24,193,163,0.20)' }}>
                          <CheckCircle2 className="h-3 w-3" style={{ color: MINT }} strokeWidth={2.5} />
                        </div>
                        <span className="icon-list-prose min-w-0 flex-1 text-[13.5px] font-[450] leading-snug" style={{ color: '#334155' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <FadeIn delay={0.08} direction="right" distance={20}>

                {/* Apply card */}
                <div className="overflow-hidden rounded-[24px] border bg-white"
                  style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 8px 40px -10px rgba(0,0,0,0.10)' }}>
                  <div className="h-[3px]"
                    style={{ background: 'linear-gradient(to right, #18C1A3, rgba(24,193,163,0.20))' }} />
                  <div className="p-6 sm:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: 'rgba(24,193,163,0.09)', border: '1.5px solid rgba(24,193,163,0.18)' }}>
                      <Briefcase className="h-5 w-5" style={{ color: MINT }} strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-4 text-[18px] font-[760] tracking-[-0.025em]"
                      style={{ color: '#0F172A' }}>
                      Interesse geweckt?
                    </h3>
                    <p className="mt-2 text-[13.5px] font-[420] leading-[1.68]"
                      style={{ color: '#64748b' }}>
                      Bewerben Sie sich jetzt auf diese Stelle. Wir freuen uns
                      darauf, Sie kennenzulernen.
                    </p>

                    <Link
                      href={`/bewerbung?stelle=${job.slug}`}
                      className="group mt-5 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_14px_32px_-6px_rgba(24,193,163,0.38)]"
                      style={{
                        background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
                        boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)',
                      }}
                    >
                      Jetzt bewerben
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                    </Link>

                    <a
                      href="tel:+4923032920589"
                      className="group mt-2.5 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-full border text-[13.5px] font-[510] tracking-[-0.01em] transition-all duration-200 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.04)]"
                      style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}
                    >
                      <Phone className="h-3.5 w-3.5" style={{ color: MINT }} strokeWidth={1.8} />
                      Fragen zur Stelle?
                    </a>
                  </div>

                  {/* Trust points */}
                  <div className="border-t px-6 py-5 sm:px-7"
                    style={{ borderColor: 'rgba(0,0,0,0.06)', background: '#FAFAFA' }}>
                    <p className="mb-3.5 text-[10.5px] font-[640] uppercase tracking-[0.16em]"
                      style={{ color: '#94a3b8' }}>
                      Ihr Vorteil
                    </p>
                    <div className="icon-list-stack space-y-2.5">
                      {[
                        { icon: Zap,   text: 'Schnelle Rückmeldung' },
                        { icon: Users, text: 'Persönlicher Ansprechpartner' },
                        { icon: CheckCircle2, text: 'Wertschätzendes Team' },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: 'rgba(24,193,163,0.09)' }}>
                            <Icon className="h-2.5 w-2.5" style={{ color: MINT }} strokeWidth={2.5} />
                          </div>
                          <span className="icon-list-prose text-[12.5px] font-[450]" style={{ color: '#475569' }}>
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Job meta */}
                  <div className="border-t px-6 py-5 sm:px-7" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div className="space-y-3.5">
                      {[
                        { label: 'Beschäftigungsart', value: job.employmentType },
                        { label: 'Standort',          value: job.location       },
                        { label: 'Bereich',           value: job.department     },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                          <p className="text-[11px] font-[580] uppercase tracking-[0.12em]"
                            style={{ color: '#94a3b8' }}>
                            {label}
                          </p>
                          <p className="text-[13px] font-[560] tracking-[-0.01em]"
                            style={{ color: '#0F172A' }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back link */}
                <div className="mt-5 text-center">
                  <Link
                    href="/karriere"
                    className="group inline-flex items-center gap-1.5 text-[13px] font-[480] tracking-[-0.01em] text-[#94a3b8] transition-colors duration-200 hover:text-[#18C1A3]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    Alle Stellen ansehen
                  </Link>
                </div>
              </FadeIn>
            </aside>
          </div>
        </Container>
      </section>

      {/* ─── Mobile sticky CTA ─── */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="border-t px-4 py-3 backdrop-blur-xl"
          style={{ background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.08)' }}>
          <Link
            href={`/bewerbung?stelle=${job.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-[640] text-white transition-all active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 4px 16px rgba(24,193,163,0.30)' }}
          >
            Jetzt bewerben
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
      <div className="h-[72px] lg:hidden" />
    </>
  )
}

/* ── Content section helper ── */
function ContentSection({
  eyebrow,
  heading,
  sections,
}: {
  eyebrow: string
  heading: string
  sections: { heading: string; items: string[] }[]
}) {
  return (
    <div>
      <p className="text-[11px] font-[660] uppercase tracking-[0.22em]"
        style={{ color: 'rgba(24,193,163,0.85)' }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[clamp(1.25rem,2.5vw,1.75rem)] font-[760] tracking-[-0.028em]"
        style={{ color: '#0F172A' }}>
        {heading}
      </h2>
      <div className="mt-6 space-y-7">
        {sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <p className="mb-3 text-[13.5px] font-[640] tracking-[-0.01em]"
                style={{ color: '#334155' }}>
                {section.heading}
              </p>
            )}
            {section.items.length > 0 && (
              <ul className="icon-list-stack space-y-2.5">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#18C1A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="mt-[3px] shrink-0" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span className="icon-list-prose min-w-0 flex-1 text-[15px] font-[420] leading-[1.72]"
                      style={{ color: '#475569' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {section.items.length === 0 && section.heading && (
              <p className="text-[15px] font-[420] leading-[1.80]"
                style={{ color: '#475569' }}>
                {section.heading}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
