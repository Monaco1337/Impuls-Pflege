import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeStrip } from '@/components/sections/marquee-strip'
import { IntroSection } from '@/components/sections/intro-section'
import { TrustSection } from '@/components/sections/trust-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ProcessSection } from '@/components/sections/process-section'
import { QualitySection } from '@/components/sections/quality-section'
import { CareerSection } from '@/components/sections/career-section'
import { PremiumCta } from '@/components/sections/premium-cta'
import { loadContactInfo, loadHomepageCopy, loadSiteImageMap } from '@/lib/content/load-site-bundle'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'IMPULS Ambulanter Pflegedienst in Unna – Pflege mit Herz und Kompetenz',
  description:
    'Ihr vertrauensvoller Partner für ambulante Pflege, Betreuung und hauswirtschaftliche Unterstützung in Unna. Erfahrenes Team, individuelle Versorgung, echte Menschlichkeit.',
}

export default async function HomePage() {
  const [img, copy, contact] = await Promise.all([
    loadSiteImageMap(),
    loadHomepageCopy(),
    loadContactInfo(),
  ])

  return (
    <>
      <HeroSection
        imageDesktop={img.heroDesktop}
        imageMobile={img.heroMobile}
        headline={copy.hero.headline}
        subheadline={copy.hero.subheadline}
        body={copy.hero.body}
      />
      <MarqueeStrip />
      <IntroSection
        imageSrc={img.introEditorial}
        eyebrow={copy.intro.eyebrow}
        headline={copy.intro.headline}
        body={copy.intro.body}
        quote={copy.intro.quote}
        quoteBy={copy.intro.quoteBy}
      />
      <TrustSection featureImageSrc={img.trustFeature} />
      <ServicesSection heroImageSrc={img.servicesHero} />
      <ProcessSection nurseImageSrc={img.processNurse} />
      <QualitySection supportImageSrc={img.qualitySupport} />
      <CareerSection teamImageSrc={img.careerTeam} />
      <PremiumCta phone={contact.phone} />
    </>
  )
}
