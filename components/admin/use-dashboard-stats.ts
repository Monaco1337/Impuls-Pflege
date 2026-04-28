'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const POLL_MS = 10_000

export type DashboardStatsLive = {
  newInquiries: number
  openInquiries: number
  newApplicants: number
  newAnamnese: number
  inReview: number
  interviewsPlanned: number
  totalApplicants: number
  activeJobs: number
  applicantPipeline: Record<string, number>
  inquiryPipeline: Record<string, number>
  anamnesePipeline: Record<string, number>
}

/**
 * Polling-Hook für die Dashboard-Kennzahlen. Startet mit serverseitig
 * gerenderten Initialwerten (kein Layout-Shift, kein Skeleton-Flash) und
 * synchronisiert anschließend alle 10 s gegen /api/admin/dashboard-stats.
 *
 * Spart die Quotas/Latenzen, indem nur gepollt wird, wenn das Tab sichtbar
 * ist (visibilityState === 'visible'). Beim erneuten Fokussieren des
 * Fensters wird sofort einmal aktualisiert.
 */
export function useDashboardStatsLive(initial: DashboardStatsLive) {
  const [stats, setStats] = useState<DashboardStatsLive>(initial)
  const lastFetchRef = useRef<number>(0)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dashboard-stats', {
        cache: 'no-store',
      })
      if (!res.ok) return
      const data = (await res.json()) as DashboardStatsLive
      if (data && typeof data === 'object') {
        setStats(data)
        lastFetchRef.current = Date.now()
      }
    } catch {
      // Network error → next poll will retry; UI stays on last known values.
    }
  }, [])

  useEffect(() => {
    // Sofort einmal frisch holen, damit der angezeigte Stand höchstens so
    // alt ist wie der Server-Render.
    void fetchStats()
  }, [fetchStats])

  useEffect(() => {
    const tick = () => {
      if (typeof document === 'undefined') return
      if (document.visibilityState !== 'visible') return
      void fetchStats()
    }
    const id = window.setInterval(tick, POLL_MS)
    const onVis = () => {
      if (document.visibilityState === 'visible') void fetchStats()
    }
    const onWinFocus = () => {
      void fetchStats()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onWinFocus)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onWinFocus)
    }
  }, [fetchStats])

  return { stats, refresh: fetchStats }
}
