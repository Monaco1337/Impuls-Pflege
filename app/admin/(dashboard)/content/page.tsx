import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { getContentBlocks } from '@/lib/actions/content'
import { CONTENT_BLOCK_GROUPS } from './content-block-groups'
import { ContentManagement } from './content-management'

export const metadata: Metadata = {
  title: 'Inhaltsverwaltung',
}

export const dynamic = 'force-dynamic'

interface ContentBlock {
  id: string
  key: string
  title: string | null
  content: unknown
  imageUrl: string | null
  sortOrder: number | null
  updatedAt: string | Date
  updatedBy: { firstName: string; lastName: string } | null
}

export default async function ContentPage() {
  const result = await getContentBlocks()
  const blocks = (result.data ?? []) as ContentBlock[]

  return (
    <div className="space-y-8">
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
        <ContentManagement blocks={blocks} groups={CONTENT_BLOCK_GROUPS} />
      )}
    </div>
  )
}
