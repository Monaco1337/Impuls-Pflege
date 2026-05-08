'use client'

import { useEffect } from 'react'
import { useAdminInboxRefresh } from '@/components/admin/admin-inbox-refresh-context'

/** Nach Server-Render (acknowledgeApplicantOnOpen) Zähler neu laden, damit Glocke/Sidebar sofort passen. */
export function ApplicantInboxRefreshOnMount() {
  const refresh = useAdminInboxRefresh()
  useEffect(() => {
    refresh?.()
  }, [refresh])
  return null
}
