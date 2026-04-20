import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getJob } from '@/lib/actions/jobs'
import { getUsers } from '@/lib/actions/users'
import { JobForm } from '@/components/admin/job-form'

export const metadata: Metadata = {
  title: 'Stellenanzeige bearbeiten',
}

export const dynamic = 'force-dynamic'

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [jobResult, usersResult] = await Promise.all([
    getJob(id),
    getUsers(),
  ])

  if (!jobResult.success || !jobResult.data) {
    notFound()
  }

  const job = jobResult.data as any
  const users = ((usersResult.data ?? []) as any[]).filter(
    (u: any) => u.active !== false,
  )

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/jobs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Stellenanzeigen
        </Link>
        <h2 className="text-2xl font-bold text-warm-900">
          Stellenanzeige bearbeiten
        </h2>
        <p className="mt-1 text-sm text-warm-500">
          {job.title}
          {job._count?.applicants > 0 && (
            <> · {job._count.applicants} {job._count.applicants === 1 ? 'Bewerber' : 'Bewerber'}</>
          )}
        </p>
      </div>

      <JobForm job={job} users={users} />
    </div>
  )
}
