'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logServerError } from '@/lib/error-handling'
import {
  repoJoinUserBriefNoEmail,
  repoLoadApplicants,
  repoLoadAuditLogs,
  repoLoadInquiries,
  repoLoadJobs,
} from '@/lib/data/json-repository'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getDashboardStats(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const inquiries = await repoLoadInquiries()
    const applicants = await repoLoadApplicants()
    const jobs = await repoLoadJobs()

    const newInquiries = inquiries.inquiries.filter((i) => i.status === 'NEU').length
    const openInquiries = inquiries.inquiries.filter((i) => !['ERLEDIGT', 'ARCHIVIERT'].includes(i.status)).length
    const newApplicants = applicants.applicants.filter((a) => a.status === 'NEU_EINGEGANGEN').length
    const inReview = applicants.applicants.filter((a) => a.status === 'IN_PRUEFUNG').length
    const interviewsPlanned = applicants.applicants.filter((a) => a.status === 'GESPRAECH_GEPLANT').length
    const totalApplicants = applicants.applicants.length
    const activeJobs = jobs.filter((j) => j.active).length

    return {
      success: true,
      data: {
        newInquiries,
        openInquiries,
        newApplicants,
        inReview,
        interviewsPlanned,
        totalApplicants,
        activeJobs,
      },
    }
  } catch (error) {
    logServerError('getDashboardStats error', error)
    return { success: false, error: 'Dashboard-Daten konnten nicht geladen werden' }
  }
}

export async function getRecentInquiries(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const bundle = await repoLoadInquiries()
    const inquiries = [...bundle.inquiries]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((i) => ({
        id: i.id,
        fullName: i.fullName,
        inquiryType: i.inquiryType,
        status: i.status,
        priority: i.priority,
        createdAt: new Date(i.createdAt),
      }))

    return { success: true, data: inquiries }
  } catch (error) {
    logServerError('getRecentInquiries error', error)
    return { success: false, error: 'Letzte Anfragen konnten nicht geladen werden' }
  }
}

export async function getRecentApplicants(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const bundle = await repoLoadApplicants()
    const applicants = [...bundle.applicants]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((a) => ({
        id: a.id,
        firstName: a.firstName,
        lastName: a.lastName,
        positionApplied: a.positionApplied,
        status: a.status,
        createdAt: new Date(a.createdAt),
      }))

    return { success: true, data: applicants }
  } catch (error) {
    logServerError('getRecentApplicants error', error)
    return { success: false, error: 'Letzte Bewerber konnten nicht geladen werden' }
  }
}

export async function getRecentActivity(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const logsRaw = await repoLoadAuditLogs()
    const logs = await Promise.all(
      [...logsRaw]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map(async (log) => ({
          ...log,
          createdAt: new Date(log.createdAt),
          user: await repoJoinUserBriefNoEmail(log.userId),
        })),
    )

    return { success: true, data: logs }
  } catch (error) {
    logServerError('getRecentActivity error', error)
    return { success: false, error: 'Letzte Aktivitäten konnten nicht geladen werden' }
  }
}

export async function getPipelineSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const bundle = await repoLoadApplicants()
    const pipeline = bundle.applicants.reduce(
      (acc, a) => {
        acc[a.status] = (acc[a.status] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return { success: true, data: pipeline }
  } catch (error) {
    logServerError('getPipelineSummary error', error)
    return { success: false, error: 'Pipeline-Übersicht konnte nicht geladen werden' }
  }
}

/** Zähler je Anfragestatus (für Dashboard-Pipeline) */
export async function getInquiryPipelineSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')
    const bundle = await repoLoadInquiries()
    const pipeline = bundle.inquiries.reduce(
      (acc, i) => {
        acc[i.status] = (acc[i.status] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return { success: true, data: pipeline }
  } catch (error) {
    logServerError('getInquiryPipelineSummary error', error)
    return { success: false, error: 'Anfragen-Pipeline konnte nicht geladen werden' }
  }
}

export async function getJobStatusSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const jobs = await repoLoadJobs()
    const active = jobs.filter((j) => j.active).length
    const inactive = jobs.filter((j) => !j.active).length

    return { success: true, data: { active, inactive, total: active + inactive } }
  } catch (error) {
    logServerError('getJobStatusSummary error', error)
    return { success: false, error: 'Stellen-Übersicht konnte nicht geladen werden' }
  }
}
