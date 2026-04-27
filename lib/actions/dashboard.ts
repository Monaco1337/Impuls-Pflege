'use server'

import { getCurrentUser } from '@/lib/auth/session'
import { checkAccess, requireAccess } from '@/lib/rbac/check'
import { hasPermission } from '@/lib/rbac/permissions'
import { logServerError } from '@/lib/error-handling'
import {
  repoJoinUserBriefNoEmail,
  repoLoadAnamnese,
  repoLoadApplicants,
  repoLoadAuditLogs,
  repoLoadHiddenUserIds,
  repoLoadInquiries,
  repoLoadJobs,
} from '@/lib/data/json-repository'
import { AnamneseStatus } from '@/lib/types/enums'
import type { RoleName } from '@/lib/types/enums'
import { filterAuditLogsForViewer } from '@/lib/rbac/visibility'

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

    const sessionUser = await getCurrentUser()
    const role = sessionUser?.role as RoleName | undefined
    let newAnamnese = 0
    if (role && hasPermission(role, 'anamnese', 'view')) {
      const an = await repoLoadAnamnese()
      newAnamnese = an.submissions.filter(
        (s) => s.status === AnamneseStatus.NEU_EINGEGANGEN,
      ).length
    }

    return {
      success: true,
      data: {
        newInquiries,
        openInquiries,
        newApplicants,
        newAnamnese,
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
    const viewer = await requireAccess('dashboard', 'view')

    const logsRaw = await repoLoadAuditLogs()
    const hiddenIds = await repoLoadHiddenUserIds()
    const visibleLogs = filterAuditLogsForViewer(logsRaw, viewer, hiddenIds)
    const logs = await Promise.all(
      [...visibleLogs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map(async (log) => ({
          ...log,
          createdAt: new Date(log.createdAt),
          user: await repoJoinUserBriefNoEmail(log.userId, viewer.role),
        })),
    )

    return { success: true, data: logs }
  } catch (error) {
    logServerError('getRecentActivity error', error)
    return { success: false, error: 'Letzte Aktivitäten konnten nicht geladen werden' }
  }
}

export async function getRecentAnamnese(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')
    if (!(await checkAccess('anamnese', 'view'))) {
      return { success: true, data: [] }
    }
    const bundle = await repoLoadAnamnese()
    const list = [...bundle.submissions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((s) => ({
        id: s.id,
        patientFirstName: s.patientFirstName,
        patientLastName: s.patientLastName,
        status: s.status,
        createdAt: new Date(s.createdAt),
      }))

    return { success: true, data: list }
  } catch (error) {
    logServerError('getRecentAnamnese error', error)
    return { success: false, error: 'Anamnese-Liste konnte nicht geladen werden' }
  }
}

export async function getAnamnesePipelineSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')
    if (!(await checkAccess('anamnese', 'view'))) {
      return { success: true, data: {} }
    }
    const bundle = await repoLoadAnamnese()
    const pipeline = bundle.submissions.reduce(
      (acc, s) => {
        acc[s.status] = (acc[s.status] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return { success: true, data: pipeline }
  } catch (error) {
    logServerError('getAnamnesePipelineSummary error', error)
    return { success: false, error: 'Anamnese-Pipeline konnte nicht geladen werden' }
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
