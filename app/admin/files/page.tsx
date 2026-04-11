import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { getFiles } from '@/lib/actions/files'
import { FileList } from '@/components/admin/file-list'

export const metadata: Metadata = {
  title: 'Dokumente',
}

export const dynamic = 'force-dynamic'

export default async function FilesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const fileType = typeof params.type === 'string' ? params.type : undefined

  const result = await getFiles({ page, fileType })

  const files = (result.data as any)?.files ?? []
  const total = (result.data as any)?.total ?? 0
  const totalPages = (result.data as any)?.totalPages ?? 1
  const currentPage = (result.data as any)?.page ?? 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Dokumente</h2>
        <p className="mt-1 text-sm text-warm-500">
          Übersicht aller hochgeladenen Dokumente
        </p>
      </div>

      {files.length === 0 && !fileType ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="Keine Dokumente vorhanden"
              description="Es wurden noch keine Dokumente hochgeladen."
            />
          </CardContent>
        </Card>
      ) : (
        <FileList
          files={files}
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          activeFileType={fileType}
        />
      )}
    </div>
  )
}
