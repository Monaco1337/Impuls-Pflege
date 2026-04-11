import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { getContentBlocks } from '@/lib/actions/content'
import { ContentManagement } from './content-management'

export const metadata: Metadata = {
  title: 'Inhaltsverwaltung',
}

export const dynamic = 'force-dynamic'

interface ContentBlock {
  id: string
  key: string
  title: string | null
  content: Record<string, string>
  imageUrl: string | null
  sortOrder: number | null
  updatedAt: string | Date
  updatedBy: { firstName: string; lastName: string } | null
}

const blockGroups: { label: string; keys: string[] }[] = [
  { label: 'Startseite', keys: ['hero', 'intro'] },
  { label: 'Kontakt', keys: ['contact-info'] },
]

export default async function ContentPage() {
  const result = await getContentBlocks()
  const blocks = (result.data ?? []) as ContentBlock[]

  const groupedKeys = new Set(blockGroups.flatMap((g) => g.keys))
  const ungrouped = blocks.filter((b) => !groupedKeys.has(b.key))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">Inhaltsverwaltung</h2>
        <p className="mt-1 text-sm text-warm-500">
          Bearbeiten Sie die Inhalte der öffentlichen Website
        </p>
      </div>

      {!result.success ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="Fehler beim Laden"
              description={result.error ?? 'Inhalte konnten nicht geladen werden.'}
            />
          </CardContent>
        </Card>
      ) : blocks.length === 0 ? (
        <Card>
          <CardContent className="py-0">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="Keine Inhaltsblöcke"
              description="Es sind noch keine Inhaltsblöcke vorhanden."
            />
          </CardContent>
        </Card>
      ) : (
        <ContentManagement
          blocks={blocks}
          blockGroups={blockGroups}
          ungrouped={ungrouped}
        />
      )}
    </div>
  )
}
