import { hasPermission } from '@/lib/rbac/permissions'
import { repoLoadApplicants, repoLoadInquiries } from '@/lib/data/json-repository'
import { ApplicantStatus, InquiryStatus } from '@/lib/types/enums'
import type { RoleName } from '@/lib/types/enums'

export type InboxCounts = {
  newInquiries: number
  newApplicants: number
}

/**
 * Liefert die Anzahl offener Eingänge: neue Anfragen (Status NEU) bzw. neue Bewerbungen (NEU_EINGEGANGEN).
 * Nur Ressourcen, für die die Rolle view hat, werden gezählt.
 */
export async function getInboxCountsForRole(role: RoleName): Promise<InboxCounts> {
  const canInquiries = hasPermission(role, 'inquiries', 'view')
  const canApplicants = hasPermission(role, 'applicants', 'view')

  const [inquiries, applicantsBundle] = await Promise.all([
    canInquiries ? repoLoadInquiries() : null,
    canApplicants ? repoLoadApplicants() : null,
  ])

  const newInquiries = inquiries
    ? inquiries.inquiries.filter((i) => i.status === InquiryStatus.NEU).length
    : 0

  const newApplicants = applicantsBundle
    ? applicantsBundle.applicants.filter(
        (a) => a.status === ApplicantStatus.NEU_EINGEGANGEN,
      ).length
    : 0

  return { newInquiries, newApplicants }
}
