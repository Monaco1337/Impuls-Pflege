'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ContentBlockEditor } from '@/components/admin/content-block-editor'

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

interface ContentManagementProps {
  blocks: ContentBlock[]
  blockGroups: { label: string; keys: string[] }[]
  ungrouped: ContentBlock[]
}

function BlockCard({
  block,
  expanded,
  onToggle,
}: {
  block: ContentBlock
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <Card>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-warm-50/50"
      >
        <div className="min-w-0">
          <p className="font-medium text-warm-900">
            {block.title || block.key}
          </p>
          {block.updatedBy && (
            <p className="mt-0.5 text-xs text-warm-400">
              Zuletzt bearbeitet von {block.updatedBy.firstName}{' '}
              {block.updatedBy.lastName} am {formatDateTime(block.updatedAt)}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            'ml-4 h-4 w-4 shrink-0 text-warm-400 transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      {expanded && (
        <CardContent className="border-t border-warm-100">
          <ContentBlockEditor block={block} />
        </CardContent>
      )}
    </Card>
  )
}

export function ContentManagement({
  blocks,
  blockGroups,
  ungrouped,
}: ContentManagementProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())

  function toggle(key: string) {
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const blocksByKey = new Map(blocks.map((b) => [b.key, b]))

  return (
    <div className="space-y-8">
      {blockGroups.map((group) => {
        const groupBlocks = group.keys
          .map((key) => blocksByKey.get(key))
          .filter(Boolean) as ContentBlock[]

        if (groupBlocks.length === 0) return null

        return (
          <section key={group.label}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-400">
              {group.label}
            </h3>
            <div className="space-y-3">
              {groupBlocks.map((block) => (
                <BlockCard
                  key={block.id}
                  block={block}
                  expanded={expandedKeys.has(block.key)}
                  onToggle={() => toggle(block.key)}
                />
              ))}
            </div>
          </section>
        )
      })}

      {ungrouped.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-400">
            Weitere Inhalte
          </h3>
          <div className="space-y-3">
            {ungrouped.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                expanded={expandedKeys.has(block.key)}
                onToggle={() => toggle(block.key)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
