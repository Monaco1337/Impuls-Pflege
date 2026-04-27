import { cache } from 'react'
import { getPublicContent } from '@/lib/actions/content'
import { mergeContactContent } from '@/lib/content/contact-cms'
import { mergeHeroContent } from '@/lib/content/hero-cms'
import { mergeIntroContent } from '@/lib/content/intro-cms'
import {
  entriesToHashMap,
  mergeSiteImageEntries,
  type SiteImageEntry,
} from '@/lib/content/site-image-slots'
import { parseTeamBlock } from '@/lib/content/team-cms'

/**
 * Karten aller steuerbaren Website-Bilder (Startseite, Unterseiten).
 *
 * Liefert URLs mit eingebetteter `#focus=x,y`-Information. `CmsImage`
 * dekodiert das automatisch und setzt `object-position` entsprechend –
 * dadurch wirkt die im Admin gewählte Zentrierung überall, ohne dass die
 * Sektions-Komponenten Fokus-Props kennen müssen.
 */
export async function loadSiteImageMap(): Promise<Record<string, string>> {
  const res = await getPublicContent(['site-images'])
  if (!res.success || !res.data) return entriesToHashMap(mergeSiteImageEntries(null))
  const row = (res.data as Record<string, { content?: unknown }>)['site-images']
  return entriesToHashMap(mergeSiteImageEntries(row?.content))
}

/**
 * Wie {@link loadSiteImageMap}, liefert aber pro Slot zusätzlich den
 * Fokuspunkt (focusX/focusY). Wird auf den öffentlichen Seiten verwendet,
 * um `object-position` exakt zu setzen.
 */
export async function loadSiteImageEntries(): Promise<Record<string, SiteImageEntry>> {
  const res = await getPublicContent(['site-images'])
  if (!res.success || !res.data) return mergeSiteImageEntries(null)
  const row = (res.data as Record<string, { content?: unknown }>)['site-images']
  return mergeSiteImageEntries(row?.content)
}

/** @deprecated Verwenden Sie loadSiteImageMap. */
export const loadHomepageSiteImages = loadSiteImageMap

export async function loadTeamCmsBundle() {
  const res = await getPublicContent(['team'])
  if (!res.success || !res.data) return parseTeamBlock(null)
  const row = (res.data as Record<string, { content?: unknown }>)['team']
  return parseTeamBlock(row?.content)
}

export const loadContactInfo = cache(async () => {
  const res = await getPublicContent(['contact-info'])
  if (!res.success || !res.data) return mergeContactContent(null)
  const row = (res.data as Record<string, { content?: unknown }>)['contact-info']
  return mergeContactContent(row?.content)
})

export const loadHomepageCopy = cache(async () => {
  const res = await getPublicContent(['hero', 'intro'])
  if (!res.success || !res.data) {
    return { hero: mergeHeroContent(null), intro: mergeIntroContent(null) }
  }
  const data = res.data as Record<string, { content?: unknown }>
  return {
    hero: mergeHeroContent(data.hero?.content),
    intro: mergeIntroContent(data.intro?.content),
  }
})
