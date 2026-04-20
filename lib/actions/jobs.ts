'use server'

import { prisma } from '@/lib/db'
import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { jobPostingSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function getPublicJobs(): Promise<ActionResult> {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { active: true, publishDate: { lte: new Date() } },
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        location: true,
        employmentType: true,
        workload: true,
        shortIntro: true,
        publishDate: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { publishDate: 'desc' }],
    })

    return { success: true, data: jobs }
  } catch (error) {
    logServerError('getPublicJobs error', error)
    return { success: false, error: 'Stellenanzeigen konnten nicht geladen werden' }
  }
}

export async function getPublicJob(slug: string): Promise<ActionResult> {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { slug, active: true },
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        location: true,
        employmentType: true,
        workload: true,
        shortIntro: true,
        description: true,
        requirements: true,
        benefits: true,
        contactPerson: { select: { firstName: true, lastName: true, email: true } },
        publishDate: true,
      },
    })

    if (!job) return { success: false, error: 'Stelle nicht gefunden' }
    return { success: true, data: job }
  } catch (error) {
    logServerError('getPublicJob error', error)
    return { success: false, error: 'Stelle konnte nicht geladen werden' }
  }
}

export async function getJobs(filters?: {
  page?: number
  pageSize?: number
  search?: string
  active?: boolean
}): Promise<ActionResult> {
  try {
    await requireAccess('jobs', 'view')

    const page = filters?.page ?? 1
    const pageSize = filters?.pageSize ?? 20
    const skip = (page - 1) * pageSize

    const where: Record<string, unknown> = {}

    if (filters?.active !== undefined) where.active = filters.active
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { department: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    const [jobs, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        include: {
          contactPerson: { select: { id: true, firstName: true, lastName: true } },
          _count: { select: { applicants: true } },
        },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: pageSize,
      }),
      prisma.jobPosting.count({ where }),
    ])

    return {
      success: true,
      data: { jobs, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    }
  } catch (error) {
    logServerError('getJobs error', error)
    return { success: false, error: 'Stellen konnten nicht geladen werden' }
  }
}

export async function getJob(id: string): Promise<ActionResult> {
  try {
    await requireAccess('jobs', 'view')

    const job = await prisma.jobPosting.findUnique({
      where: { id },
      include: {
        contactPerson: { select: { id: true, firstName: true, lastName: true, email: true } },
        _count: { select: { applicants: true } },
      },
    })

    if (!job) return { success: false, error: 'Stelle nicht gefunden' }
    return { success: true, data: job }
  } catch (error) {
    logServerError('getJob error', error)
    return { success: false, error: 'Stelle konnte nicht geladen werden' }
  }
}

export async function createJob(data: unknown): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'create')

    const parsed = jobPostingSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const existing = await prisma.jobPosting.findUnique({ where: { slug: parsed.data.slug } })
    if (existing) return { success: false, error: 'Slug wird bereits verwendet' }

    const job = await prisma.jobPosting.create({
      data: {
        ...parsed.data,
        publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : new Date(),
      },
    })

    await logAudit({
      userId: user.id,
      action: 'create',
      entityType: 'job_posting',
      entityId: job.id,
      metadata: { title: job.title },
    })

    revalidatePath('/admin/jobs')
    revalidatePath('/jobs')
    return { success: true, data: job }
  } catch (error) {
    logServerError('createJob error', error)
    return { success: false, error: 'Stelle konnte nicht erstellt werden' }
  }
}

export async function updateJob(id: string, data: unknown): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'edit')

    const parsed = jobPostingSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message ?? 'Ungültige Eingabe' }
    }

    const existing = await prisma.jobPosting.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    })
    if (existing) return { success: false, error: 'Slug wird bereits verwendet' }

    const job = await prisma.jobPosting.update({
      where: { id },
      data: {
        ...parsed.data,
        publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : undefined,
      },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title: job.title },
    })

    revalidatePath('/admin/jobs')
    revalidatePath(`/admin/jobs/${id}`)
    revalidatePath(`/jobs/${job.slug}`)
    return { success: true, data: job }
  } catch (error) {
    logServerError('updateJob error', error)
    return { success: false, error: 'Stelle konnte nicht aktualisiert werden' }
  }
}

export async function toggleJobActive(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'edit')

    const current = await prisma.jobPosting.findUnique({ where: { id }, select: { active: true, title: true } })
    if (!current) return { success: false, error: 'Stelle nicht gefunden' }

    const job = await prisma.jobPosting.update({
      where: { id },
      data: { active: !current.active },
    })

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title: current.title, active: job.active },
    })

    revalidatePath('/admin/jobs')
    revalidatePath('/jobs')
    return { success: true, data: job }
  } catch (error) {
    logServerError('toggleJobActive error', error)
    return { success: false, error: 'Status konnte nicht geändert werden' }
  }
}

export async function duplicateJob(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'create')

    const original = await prisma.jobPosting.findUnique({ where: { id } })
    if (!original) return { success: false, error: 'Stelle nicht gefunden' }

    const baseSlug = `${original.slug}-kopie`
    let slug = baseSlug
    let counter = 1
    while (await prisma.jobPosting.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    const duplicate = await prisma.jobPosting.create({
      data: {
        title: `${original.title} (Kopie)`,
        slug,
        department: original.department,
        location: original.location,
        employmentType: original.employmentType,
        workload: original.workload,
        shortIntro: original.shortIntro,
        description: original.description,
        requirements: original.requirements,
        benefits: original.benefits,
        contactPersonId: original.contactPersonId,
        active: false,
        sortOrder: original.sortOrder,
      },
    })

    await logAudit({
      userId: user.id,
      action: 'create',
      entityType: 'job_posting',
      entityId: duplicate.id,
      metadata: { duplicatedFrom: id, title: duplicate.title },
    })

    revalidatePath('/admin/jobs')
    return { success: true, data: duplicate }
  } catch (error) {
    logServerError('duplicateJob error', error)
    return { success: false, error: 'Stelle konnte nicht dupliziert werden' }
  }
}

export async function deleteJob(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'delete')

    const job = await prisma.jobPosting.findUnique({ where: { id }, select: { title: true } })
    if (!job) return { success: false, error: 'Stelle nicht gefunden' }

    await prisma.jobPosting.delete({ where: { id } })

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title: job.title },
    })

    revalidatePath('/admin/jobs')
    revalidatePath('/jobs')
    return { success: true }
  } catch (error) {
    logServerError('deleteJob error', error)
    return { success: false, error: 'Stelle konnte nicht gelöscht werden' }
  }
}
