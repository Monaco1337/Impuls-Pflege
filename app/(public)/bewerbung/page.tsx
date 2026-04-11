import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
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

        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <MotionWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Bewerbung
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Ihre Bewerbung bei IMPULS
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-warm-600 sm:text-xl">
                Wir freuen uns auf Sie. Füllen Sie das Formular aus und wir
                melden uns zeitnah bei Ihnen.
              </p>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section className="bg-white py-12 sm:py-20">
        <Container size="md">
          <ApplicationForm preselectedPosition={stelle} />
        </Container>
      </Section>
    </>
  )
}
