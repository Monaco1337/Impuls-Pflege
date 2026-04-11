import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
import { ContactForm } from '@/components/forms/contact-form'

export const metadata = {
  title: 'Kontakt – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Nehmen Sie Kontakt mit IMPULS auf – für Pflegeberatung, Leistungsanfragen oder allgemeine Fragen. Wir sind telefonisch rund um die Uhr erreichbar.',
}

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
]

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-white pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-[0.08]"
          style={{
            background:
              'radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-24 h-64 w-64 rounded-full opacity-[0.06]"
          style={{
            background:
              'radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center">
            <MotionWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Kontakt
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Kontakt
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
                Wir sind für Sie da – sprechen Sie uns an.
              </p>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Contact form + info */}
      <Section className="bg-white py-16 sm:py-24">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <MotionWrapper>
                <h2 className="text-2xl font-bold text-warm-900">
                  Schreiben Sie uns
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-500">
                  Füllen Sie das Formular aus und wir melden uns zeitnah bei
                  Ihnen.
                </p>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </MotionWrapper>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2">
              <MotionWrapper delay={0.15}>
                <div className="rounded-2xl border border-warm-200 bg-warm-50/60 p-6 sm:p-8">
                  <h2 className="text-lg font-semibold text-warm-900">
                    Kontaktinformationen
                  </h2>
                  <p className="mt-1 text-sm text-warm-500">
                    IMPULS Ambulanter Pflegedienst
                  </p>

                  <div className="mt-8 space-y-6">
                    {contactDetails.map((item) => {
                      const Icon = item.icon
                      const content = (
                        <div className="flex items-start gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                            <Icon
                              className="h-5 w-5 text-primary-600"
                              aria-hidden="true"
                            />
                          </span>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-warm-400">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-warm-900">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      )

                      if (item.href) {
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block rounded-lg transition-colors duration-150 hover:bg-warm-100/60 -mx-2 px-2 py-1"
                          >
                            {content}
                          </a>
                        )
                      }

                      return <div key={item.label}>{content}</div>
                    })}
                  </div>

                  {/* Hours */}
                  <div className="mt-8 border-t border-warm-200 pt-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                        <Clock
                          className="h-5 w-5 text-primary-600"
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-warm-400">
                          Bürozeiten
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-warm-900">
                          Mo–Fr: 08:00–16:30 Uhr
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-warm-500">
                          Telefonische Erreichbarkeit: Rund um die Uhr
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="mt-8 border-t border-warm-200 pt-6">
                    <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-warm-100/80 ring-1 ring-warm-200/60">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <MapPin
                          className="h-6 w-6 text-warm-400"
                          aria-hidden="true"
                        />
                        <p className="text-xs text-warm-400">
                          Musterstraße 1, 59423 Unna
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
