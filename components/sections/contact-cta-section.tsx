import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'

const contactDetails = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '02303 / 123 456',
    href: 'tel:+492303123456',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'info@impuls-pflege.de',
    href: 'mailto:info@impuls-pflege.de',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Musterstraße 1, 59423 Unna',
  },
  {
    icon: Clock,
    label: 'Bürozeiten',
    value: 'Mo – Fr: 08:00 – 16:00 Uhr',
  },
]

export function ContactCtaSection() {
  return (
    <Section className="bg-primary-50/60 py-16 sm:py-24">
      <Container size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <MotionWrapper>
              <h2 className="text-2xl font-bold leading-tight text-warm-900 sm:text-3xl lg:text-4xl">
                Wir sind für Sie da – persönlich, zuverlässig und mit Herz.
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-warm-600 sm:text-lg">
                Lassen Sie uns gemeinsam die passende Unterstützung für Ihre individuelle Situation finden. Wir freuen uns auf Ihren Anruf oder Ihre Nachricht.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-500 px-7 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Jetzt unverbindlich anfragen
                </Link>
                <a
                  href="tel:+492303123456"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-warm-300 bg-white px-7 text-base font-semibold text-warm-700 transition-colors duration-200 hover:bg-warm-50 active:bg-warm-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  02303 / 123 456
                </a>
              </div>
            </MotionWrapper>
          </div>

          <MotionWrapper delay={0.2}>
            <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-base font-semibold text-warm-900">
                Kontaktinformationen
              </h3>
              <div className="mt-6 space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <Icon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-400">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 text-sm font-medium text-warm-700 transition-colors duration-150 hover:text-primary-600"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-warm-700">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  )
}
