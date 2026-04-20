import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/animations/fade-in'

const jobs = [
  { title: 'Pflegefachkraft', suffix: '(m/w/d)', type: 'Vollzeit / Teilzeit', location: 'Unna', slug: 'pflegefachkraft' },
  { title: 'Pflegehilfskraft', suffix: '(m/w/d)', type: 'Teilzeit / Minijob', location: 'Unna', slug: 'pflegehilfskraft' },
  { title: 'Betreuungskraft', suffix: '(m/w/d)', type: 'Teilzeit', location: 'Unna', slug: 'betreuungskraft' },
  { title: 'Hauswirtschaftskraft', suffix: '(m/w/d)', type: 'Minijob / Teilzeit', location: 'Unna', slug: 'hauswirtschaftskraft' },
]

export function CareerSection() {
  return (
    <section className="grain relative overflow-hidden bg-warm-50/80 py-28 sm:py-36 lg:py-44">
      <Container size="xl" className="relative z-[2]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Left — headline + image */}
          <div className="text-center lg:col-span-5 lg:text-left">
            <FadeIn>
              <p className="text-[12px] font-[560] uppercase tracking-[0.2em] text-primary-600/80">
                Karriere
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.85rem,3.5vw,2.85rem)] font-[800] leading-[1.10] tracking-[-0.040em]"
                style={{ color: '#0F172A' }}>
                Machen Sie den
                <br />Unterschied.
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mx-auto mt-5 max-w-sm text-[16px] font-[420] leading-[1.80] tracking-[-0.01em] lg:mx-0"
                style={{ color: '#475569' }}>
                Werden Sie Teil eines Teams, das jeden Tag mit Leidenschaft
                und Menschlichkeit für andere da ist.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-8 flex flex-col items-center gap-3 lg:flex-row lg:items-start">
                <Link
                  href="/karriere#stellen"
                  className="group inline-flex h-[50px] w-full max-w-xs items-center justify-center gap-3 rounded-full pl-7 pr-2.5 text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-6px_rgba(24,193,163,0.36)] lg:w-auto lg:max-w-none"
                  style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 5px 18px -4px rgba(24,193,163,0.30)' }}
                >
                  Alle Stellen
                  <span className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-[1.06]"
                    style={{ background: 'rgba(255,255,255,0.20)' }}>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                  </span>
                </Link>
                <Link
                  href="/bewerbung"
                  className="inline-flex h-[50px] w-full max-w-xs items-center justify-center gap-2 rounded-full border px-6 text-[14.5px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.04)] lg:w-auto lg:max-w-none"
                  style={{ borderColor: 'rgba(0,0,0,0.10)', color: '#334155', background: 'rgba(255,255,255,0.85)' }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={1.7} />
                  Initiativbewerbung
                </Link>
              </div>
            </FadeIn>

            {/* Team image */}
            <FadeIn delay={0.26}>
              <div className="mt-10 overflow-hidden rounded-2xl">
                <Image
                  src="/images/care-team.jpg"
                  alt="Unser Pflegeteam bei IMPULS"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right — job listings */}
          <div className="lg:col-span-6 lg:col-start-7">

            {/* Section label */}
            <FadeIn direction="right" distance={16}>
              <p className="mb-5 text-[11px] font-[660] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(24,193,163,0.80)' }}>
                Offene Stellen
              </p>
            </FadeIn>

            <div className="space-y-3">
              {jobs.map((job, i) => (
                <FadeIn key={job.slug} delay={0.06 * i} direction="right" distance={20}>
                  <Link
                    href={`/karriere/${job.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-warm-200/60 bg-white p-5 transition-all duration-500 hover:border-warm-200 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] sm:p-6"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-[580] tracking-[-0.02em] text-warm-900 transition-colors duration-400 group-hover:text-primary-700">
                        {job.title}{' '}
                        <span className="font-[400] text-warm-400">{job.suffix}</span>
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[13px] font-[460] tracking-[-0.005em] text-warm-500">
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1 text-[13px] font-[460] text-warm-400">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warm-50 transition-all duration-400 group-hover:bg-primary-50">
                      <ArrowUpRight className="h-4 w-4 text-warm-400 transition-all duration-400 group-hover:text-primary-600" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* Quiz CTA */}
            <FadeIn delay={0.28} direction="right" distance={20}>
              <Link
                href="/karriere#quiz-section"
                className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border px-6 py-4 transition-all duration-300 hover:border-[rgba(24,193,163,0.35)] hover:bg-[rgba(24,193,163,0.04)] hover:shadow-[0_6px_20px_rgba(24,193,163,0.10)]"
                style={{ borderColor: 'rgba(24,193,163,0.20)', background: 'rgba(24,193,163,0.03)' }}
              >
                <div className="min-w-0">
                  <p className="text-[10.5px] font-[640] uppercase tracking-[0.18em]"
                    style={{ color: 'rgba(24,193,163,0.75)' }}>
                    Schnelle Orientierung
                  </p>
                  <p className="mt-0.5 text-[15px] font-[620] tracking-[-0.018em]"
                    style={{ color: '#0F172A' }}>
                    Welche Stelle passt wirklich zu Ihnen?
                  </p>
                  <p className="mt-0.5 text-[12.5px] font-[420]" style={{ color: '#94A3B8' }}>
                    In unter 1 Minute zur richtigen Rolle
                  </p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-[1.06]"
                  style={{ background: 'rgba(24,193,163,0.10)', border: '1px solid rgba(24,193,163,0.20)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18C1A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-12">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
              </Link>
            </FadeIn>

            {/* Quote from team */}
            <FadeIn delay={0.32} direction="right" distance={20}>
              <div className="mt-6 rounded-2xl border border-primary-100/60 bg-primary-50/40 p-6 sm:p-7">
                <p className="text-[15px] font-[440] italic leading-[1.7] tracking-[-0.01em] text-primary-800/80">
                  &bdquo;Bei IMPULS habe ich nicht nur einen Job gefunden – sondern eine Berufung.
                  Die Wertschätzung im Team und die Zeit für unsere Patienten
                  machen den Unterschied.&ldquo;
                </p>
                <p className="mt-3 text-[13px] font-[540] tracking-[-0.005em] text-primary-700/60">
                  – Pflegefachkraft bei IMPULS
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
