import { loadSiteImageMap } from '@/lib/content/load-site-bundle'
import { KarrierePageClient } from './karriere-page-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Karriere – IMPULS Ambulanter Pflegedienst in Unna',
  description:
    'Werden Sie Teil unseres Teams: offene Stellen, faire Bedingungen und sinnstiftende Arbeit in der ambulanten Pflege in Unna.',
}

export default async function KarrierePage() {
  const siteImages = await loadSiteImageMap()
  return <KarrierePageClient siteImages={siteImages} />
}
