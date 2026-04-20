'use server'

import { requireAccess } from '@/lib/rbac/check'
import { logAudit } from '@/lib/audit/logger'
import { jobPostingSchema } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'
import { logServerError } from '@/lib/error-handling'
import {
  newId,
  nowIso,
  repoJoinUserBrief,
  repoLoadApplicants,
  repoLoadJobs,
} from '@/lib/data/json-repository'
import type { JsonJobPosting } from '@/lib/data/schema'
import { DATA_FILES } from '@/lib/data/schema'
import { writeJsonFile } from '@/lib/storage/json-data-layer'

type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

function mapJobPublic(j: JsonJobPosting) {
  return {
    id: j.id,
    title: j.title,
    slug: j.slug,
    department: j.department,
    location: j.location,
    employmentType: j.employmentType,
    workload: j.workload,
    shortIntro: j.shortIntro,
    publishDate: new Date(j.publishDate),
  }
}

async function mapJobWithContact(j: JsonJobPosting) {
  const contactPerson = await repoJoinUserBrief(j.contactPersonId)
  const applicants = await repoLoadApplicants()
  const applicantCount = applicants.applicants.filter((a) => a.jobPostingId === j.id).length
  return {
    ...j,
    publishDate: new Date(j.publishDate),
    createdAt: new Date(j.createdAt),
    updatedAt: new Date(j.updatedAt),
    contactPerson,
    _count: { applicants: applicantCount },
  }
}

export async function getPublicJobs(): Promise<ActionResult> {
  try {
    const jobs = await repoLoadJobs()
    const now = Date.now()
    const list = jobs
      .filter((j) => j.active && new Date(j.publishDate).getTime() <= now)
      .sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .map(mapJobPublic)

    return { success: true, data: list }
  } catch (error) {
    logServerError('getPublicJobs error', error)
    return { success: false, error: 'Stellenanzeigen konnten nicht geladen werden' }
  }
}

export async function getPublicJob(slug: string): Promise<ActionResult> {
  try {
    const jobs = await repoLoadJobs()
    const j = jobs.find((x) => x.slug === slug && x.active)
    if (!j) return { success: false, error: 'Stelle nicht gefunden' }

    const contactPerson = await repoJoinUserBrief(j.contactPersonId)
    return {
      success: true,
      data: {
        id: j.id,
        title: j.title,
        slug: j.slug,
        department: j.department,
        location: j.location,
        employmentType: j.employmentType,
        workload: j.workload,
        shortIntro: j.shortIntro,
        description: j.description,
        requirements: j.requirements,
        benefits: j.benefits,
        contactPerson,
        publishDate: new Date(j.publishDate),
      },
    }
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

    let list = await repoLoadJobs()

    if (filters?.active !== undefined) {
      list = list.filter((j) => j.active === filters.active)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          (j.department?.toLowerCase().includes(q) ?? false) ||
          j.location.toLowerCase().includes(q),
      )
    }

    list.sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const total = list.length
    const pageRows = list.slice(skip, skip + pageSize)
    const jobs = await Promise.all(pageRows.map((j) => mapJobWithContact(j)))

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

    const jobs = await repoLoadJobs()
    const j = jobs.find((x) => x.id === id)
    if (!j) return { success: false, error: 'Stelle nicht gefunden' }

    const data = await mapJobWithContact(j)
    return { success: true, data }
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

    const jobs = await repoLoadJobs()
    if (jobs.some((j) => j.slug === parsed.data.slug)) {
      return { success: false, error: 'Slug wird bereits verwendet' }
    }

    const t = nowIso()
    const job: JsonJobPosting = {
      id: newId(),
      title: parsed.data.title,
      slug: parsed.data.slug,
      department: parsed.data.department ?? null,
      location: parsed.data.location,
      employmentType: parsed.data.employmentType,
      workload: parsed.data.workload ?? null,
      shortIntro: parsed.data.shortIntro,
      description: parsed.data.description,
      requirements: parsed.data.requirements ?? null,
      benefits: parsed.data.benefits ?? null,
      contactPersonId: parsed.data.contactPersonId?.trim() || null,
      active: parsed.data.active,
      publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate).toISOString() : t,
      sortOrder: parsed.data.sortOrder,
      createdAt: t,
      updatedAt: t,
    }
    jobs.push(job)

    await writeJsonFile(DATA_FILES.jobs, jobs, `Data update jobs create: ${t}`)

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

    const jobs = await repoLoadJobs()
    const idx = jobs.findIndex((j) => j.id === id)
    if (idx === -1) return { success: false, error: 'Stelle nicht gefunden' }

    if (jobs.some((j) => j.slug === parsed.data.slug && j.id !== id)) {
      return { success: false, error: 'Slug wird bereits verwendet' }
    }

    const t = nowIso()
    jobs[idx] = {
      ...jobs[idx],
      title: parsed.data.title,
      slug: parsed.data.slug,
      department: parsed.data.department ?? null,
      location: parsed.data.location,
      employmentType: parsed.data.employmentType,
      workload: parsed.data.workload ?? null,
      shortIntro: parsed.data.shortIntro,
      description: parsed.data.description,
      requirements: parsed.data.requirements ?? null,
      benefits: parsed.data.benefits ?? null,
      contactPersonId: parsed.data.contactPersonId?.trim() || null,
      active: parsed.data.active,
      publishDate: parsed.data.publishDate
        ? new Date(parsed.data.publishDate).toISOString()
        : jobs[idx].publishDate,
      sortOrder: parsed.data.sortOrder,
      updatedAt: t,
    }

    await writeJsonFile(DATA_FILES.jobs, jobs, `Data update jobs ${id}: ${t}`)

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title: jobs[idx].title },
    })

    revalidatePath('/admin/jobs')
    revalidatePath(`/admin/jobs/${id}`)
    revalidatePath(`/jobs/${jobs[idx].slug}`)
    return { success: true, data: jobs[idx] }
  } catch (error) {
    logServerError('updateJob error', error)
    return { success: false, error: 'Stelle konnte nicht aktualisiert werden' }
  }
}

export async function toggleJobActive(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'edit')

    const jobs = await repoLoadJobs()
    const idx = jobs.findIndex((j) => j.id === id)
    if (idx === -1) return { success: false, error: 'Stelle nicht gefunden' }

    const t = nowIso()
    jobs[idx] = { ...jobs[idx], active: !jobs[idx].active, updatedAt: t }

    await writeJsonFile(DATA_FILES.jobs, jobs, `Data update jobs toggle ${id}: ${t}`)

    await logAudit({
      userId: user.id,
      action: 'update',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title: jobs[idx].title, active: jobs[idx].active },
    })

    revalidatePath('/admin/jobs')
    revalidatePath('/jobs')
    return { success: true, data: jobs[idx] }
  } catch (error) {
    logServerError('toggleJobActive error', error)
    return { success: false, error: 'Status konnte nicht geändert werden' }
  }
}

export async function duplicateJob(id: string): Promise<ActionResult> {
  try {
    const user = await requireAccess('jobs', 'create')

    const jobs = await repoLoadJobs()
    const original = jobs.find((j) => j.id === id)
    if (!original) return { success: false, error: 'Stelle nicht gefunden' }

    const baseSlug = `${original.slug}-kopie`
    let slug = baseSlug
    let counter = 1
    while (jobs.some((j) => j.slug === slug)) {
      slug = `${baseSlug}-${counter++}`
    }

    const t = nowIso()
    const duplicate: JsonJobPosting = {
      id: newId(),
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
      publishDate: original.publishDate,
      createdAt: t,
      updatedAt: t,
    }
    jobs.push(duplicate)

    await writeJsonFile(DATA_FILES.jobs, jobs, `Data update jobs duplicate: ${t}`)

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

    const jobs = await repoLoadJobs()
    const idx = jobs.findIndex((j) => j.id === id)
    if (idx === -1) return { success: false, error: 'Stelle nicht gefunden' }

    const title = jobs[idx].title
    const next = jobs.filter((j) => j.id !== id)

    await writeJsonFile(DATA_FILES.jobs, next, `Data update jobs delete ${id}: ${nowIso()}`)

    await logAudit({
      userId: user.id,
      action: 'delete',
      entityType: 'job_posting',
      entityId: id,
      metadata: { title },
    })

    revalidatePath('/admin/jobs')
    revalidatePath('/jobs')
    return { success: true }
  } catch (error) {
    logServerError('deleteJob error', error)
    return { success: false, error: 'Stelle konnte nicht gelöscht werden' }
  }
}
