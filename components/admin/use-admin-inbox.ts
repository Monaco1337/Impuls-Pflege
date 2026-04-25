'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import type { InboxCounts } from '@/lib/admin/inbox-counts'
import { acknowledgeAllNewInquiries } from '@/lib/actions/inquiries'
import { acknowledgeAllNewApplicants } from '@/lib/actions/applicants'

const POLL_MS = 10_000

const empty: InboxCounts = { newInquiries: 0, newApplicants: 0 }

export function useAdminInbox() {
  const pathname = usePathname()
  const [counts, setCounts] = useState<InboxCounts>(empty)
  const [ready, setReady] = useState(false)

  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/inbox-counts', { cache: 'no-store' })
      if (res.status === 401) return
      if (!res.ok) return
      const data = (await res.json()) as InboxCounts
      if (
        typeof data?.newInquiries === 'number' &&
        typeof data?.newApplicants === 'number'
      ) {
        setCounts({
          newInquiries: data.newInquiries,
          newApplicants: data.newApplicants,
        })
      }
    } finally {
      setReady(true)
    }
  }, [])

  /** Quittiert sofort alle „neuen Anfragen“ – optimistisch im UI auf 0,
   *  schreibt im Hintergrund am Server. Bei Fehler wird neu geladen. */
  const acknowledgeInquiries = useCallback(async () => {
    setCounts((c) => ({ ...c, newInquiries: 0 }))
    try {
      const r = await acknowledgeAllNewInquiries()
      if (!r.success) {
        await fetchCounts()
      }
    } catch {
      await fetchCounts()
    }
  }, [fetchCounts])

  /** Wie acknowledgeInquiries, aber für Bewerbungen. */
  const acknowledgeApplicants = useCallback(async () => {
    setCounts((c) => ({ ...c, newApplicants: 0 }))
    try {
      const r = await acknowledgeAllNewApplicants()
      if (!r.success) {
        await fetchCounts()
      }
    } catch {
      await fetchCounts()
    }
  }, [fetchCounts])

  useEffect(() => {
    void fetchCounts()
  }, [fetchCounts, pathname])

  useEffect(() => {
    const tick = () => {
      if (typeof document === 'undefined') return
      if (document.visibilityState !== 'visible') return
      void fetchCounts()
    }

    const id = window.setInterval(tick, POLL_MS)
    const onVis = () => {
      if (document.visibilityState === 'visible') void fetchCounts()
    }
    const onWinFocus = () => {
      void fetchCounts()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onWinFocus)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onWinFocus)
    }
  }, [fetchCounts])

  return {
    counts,
    ready,
    refresh: fetchCounts,
    acknowledgeInquiries,
    acknowledgeApplicants,
  }
}
