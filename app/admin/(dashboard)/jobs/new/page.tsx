import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getUsers } from '@/lib/actions/users'
import { JobForm } from '@/components/admin/job-form'

export const metadata: Metadata = {
  title: 'Neue Stellenanzeige erstellen',
}

export const dynamic = 'force-dynamic'

export default async function NewJobPage() {
  const usersResult = await getUsers()
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
          Neue Stellenanzeige erstellen
        </h2>
        <p className="mt-1 text-sm text-warm-500">
          Füllen Sie die Details für die neue Stelle aus.
        </p>
      </div>

      <JobForm users={users} />
    </div>
  )
}
