import { HeroSection } from '@/components/sections/hero-section'
import { IntroSection } from '@/components/sections/intro-section'
import { TrustSection } from '@/components/sections/trust-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ProcessSection } from '@/components/sections/process-section'
import { QualitySection } from '@/components/sections/quality-section'
import { CareerSection } from '@/components/sections/career-section'
import { ContactCtaSection } from '@/components/sections/contact-cta-section'

export const metadata = {
  title: 'IMPULS Ambulanter Pflegedienst in Unna – Pflege mit Herz und Kompetenz',
  description:
    'Ihr vertrauensvoller Partner für ambulante Pflege, Betreuung und hauswirtschaftliche Unterstützung in Unna. Erfahrenes Team, individuelle Versorgung, echte Menschlichkeit.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <QualitySection />
      <CareerSection />
      <ContactCtaSection />
    </>
  )
}
