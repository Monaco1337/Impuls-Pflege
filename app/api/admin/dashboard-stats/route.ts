import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { hasPermission } from '@/lib/rbac/permissions'
import {
  repoLoadAnamnese,
  repoLoadApplicants,
  repoLoadInquiries,
  repoLoadJobs,
} from '@/lib/data/json-repository'
import { AnamneseStatus, ApplicantStatus, InquiryStatus } from '@/lib/types/enums'
import type { RoleName } from '@/lib/types/enums'

export const dynamic = 'force-dynamic'

/**
 * Live-Endpoint für die „Kennzahlen heute"-Kacheln im Admin-Dashboard.
 *
 * Liefert ausschließlich Zähler — keine PII —, deshalb auch frei für jede
 * angemeldete Admin-Rolle. Felder, für die die Rolle keine view-Permission
 * hat, werden auf 0 gesetzt (kein Datenleck).
 *
 * Polling-Frequenz: clientseitig 10 s. JSON-Repos werden ohnehin pro Request
 * frisch geladen (kein In-Memory-Cache), daher reicht no-store.
 */
type DashboardStats = {
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

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const role = session.user.role as RoleName
  const canInquiries = hasPermission(role, 'inquiries', 'view')
  const canApplicants = hasPermission(role, 'applicants', 'view')
  const canAnamnese = hasPermission(role, 'anamnese', 'view')
  const canJobs = hasPermission(role, 'jobs', 'view')

  const [inquiriesBundle, applicantsBundle, anamneseBundle, jobs] =
    await Promise.all([
      canInquiries ? repoLoadInquiries() : null,
      canApplicants ? repoLoadApplicants() : null,
      canAnamnese ? repoLoadAnamnese() : null,
      canJobs ? repoLoadJobs() : null,
    ])

  const inquiries = inquiriesBundle?.inquiries ?? []
  const applicants = applicantsBundle?.applicants ?? []
  const anamnese = anamneseBundle?.submissions ?? []

  const newInquiries = inquiries.filter((i) => i.status === InquiryStatus.NEU).length
  const openInquiries = inquiries.filter(
    (i) =>
      i.status !== InquiryStatus.ERLEDIGT &&
      i.status !== InquiryStatus.ARCHIVIERT,
  ).length
  const newApplicants = applicants.filter(
    (a) => a.status === ApplicantStatus.NEU_EINGEGANGEN,
  ).length
  const inReview = applicants.filter(
    (a) => a.status === ApplicantStatus.IN_PRUEFUNG,
  ).length
  const interviewsPlanned = applicants.filter(
    (a) => a.status === ApplicantStatus.GESPRAECH_GEPLANT,
  ).length
  const totalApplicants = applicants.length
  const activeJobs = jobs ? jobs.filter((j) => j.active).length : 0
  const newAnamnese = anamnese.filter(
    (s) => s.status === AnamneseStatus.NEU_EINGEGANGEN,
  ).length

  const inquiryPipeline = inquiries.reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1
    return acc
  }, {})
  const applicantPipeline = applicants.reduce<Record<string, number>>(
    (acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1
      return acc
    },
    {},
  )
  const anamnesePipeline = anamnese.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1
    return acc
  }, {})

  const payload: DashboardStats = {
    newInquiries,
    openInquiries,
    newApplicants,
    newAnamnese,
    inReview,
    interviewsPlanned,
    totalApplicants,
    activeJobs,
    applicantPipeline,
    inquiryPipeline,
    anamnesePipeline,
  }

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  })
}
