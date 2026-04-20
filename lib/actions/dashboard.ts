'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logServerError } from '@/lib/error-handling'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getDashboardStats(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const [
      newInquiries,
      openInquiries,
      newApplicants,
      inReview,
      interviewsPlanned,
      totalApplicants,
      activeJobs,
    ] = await Promise.all([
      prisma.inquiry.count({ where: { status: 'NEU' } }),
      prisma.inquiry.count({ where: { status: { notIn: ['ERLEDIGT', 'ARCHIVIERT'] } } }),
      prisma.applicant.count({ where: { status: 'NEU_EINGEGANGEN' } }),
      prisma.applicant.count({ where: { status: 'IN_PRUEFUNG' } }),
      prisma.applicant.count({ where: { status: 'GESPRAECH_GEPLANT' } }),
      prisma.applicant.count(),
      prisma.jobPosting.count({ where: { active: true } }),
    ])

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

    const inquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        inquiryType: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    })

    return { success: true, data: inquiries }
  } catch (error) {
    logServerError('getRecentInquiries error', error)
    return { success: false, error: 'Letzte Anfragen konnten nicht geladen werden' }
  }
}

export async function getRecentApplicants(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const applicants = await prisma.applicant.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        positionApplied: true,
        status: true,
        createdAt: true,
      },
    })

    return { success: true, data: applicants }
  } catch (error) {
    logServerError('getRecentApplicants error', error)
    return { success: false, error: 'Letzte Bewerber konnten nicht geladen werden' }
  }
}

export async function getRecentActivity(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const logs = await prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    })

    return { success: true, data: logs }
  } catch (error) {
    logServerError('getRecentActivity error', error)
    return { success: false, error: 'Letzte Aktivitäten konnten nicht geladen werden' }
  }
}

export async function getPipelineSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const counts = await prisma.applicant.groupBy({
      by: ['status'],
      _count: { _all: true },
    })

    const pipeline = counts.reduce(
      (acc, item) => {
        acc[item.status] = item._count._all
        return acc
      },
      {} as Record<string, number>
    )

    return { success: true, data: pipeline }
  } catch (error) {
    logServerError('getPipelineSummary error', error)
    return { success: false, error: 'Pipeline-Übersicht konnte nicht geladen werden' }
  }
}

export async function getJobStatusSummary(): Promise<ActionResult> {
  try {
    await requireAccess('dashboard', 'view')

    const [active, inactive] = await Promise.all([
      prisma.jobPosting.count({ where: { active: true } }),
      prisma.jobPosting.count({ where: { active: false } }),
    ])

    return { success: true, data: { active, inactive, total: active + inactive } }
  } catch (error) {
    logServerError('getJobStatusSummary error', error)
    return { success: false, error: 'Stellen-Übersicht konnte nicht geladen werden' }
  }
}
