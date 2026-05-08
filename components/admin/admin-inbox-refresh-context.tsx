'use client'

import { createContext, useContext } from 'react'

/**
 * Wird vom AdminShell gesetzt, damit Unterseiten (z. B. Bewerber-Detail)
 * die Glocke/Sidebar-Zähler nach Server-Mutationen sofort neu laden können.
 */
export const AdminInboxRefreshContext = createContext<(() => void) | null>(null)

export function useAdminInboxRefresh() {
  return useContext(AdminInboxRefreshContext)
}
