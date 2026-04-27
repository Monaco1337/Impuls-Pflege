'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { ContentBlockEditor } from '@/components/admin/content-block-editor'

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

const LABEL_BY_KEY: Record<string, string> = {
  hero: 'Hero · Startseite',
  intro: 'Intro · Startseite',
  'site-images': 'Website-Fotos',
  team: 'Team',
  'contact-info': 'Kontakt & Adresse',
}

function cardTitle(block: ContentBlock) {
  return LABEL_BY_KEY[block.key] ?? block.title ?? block.key
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
    <Card className="overflow-hidden shadow-sm ring-1 ring-black/[0.02] transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-warm-50/60 sm:px-5"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-warm-900">{cardTitle(block)}</p>
          {block.updatedBy && (
            <p className="mt-0.5 text-[11px] text-warm-400">
              {block.updatedBy.firstName} {block.updatedBy.lastName} · {formatDateTime(block.updatedAt)}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-warm-400 transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      {expanded && (
        <CardContent className="border-t border-warm-100 bg-warm-50/20 px-4 py-5 sm:px-6">
          <ContentBlockEditor block={block} />
        </CardContent>
      )}
    </Card>
  )
}

export function ContentManagement({
  blocks,
  groups,
}: {
  blocks: ContentBlock[]
  groups: { id: string; label: string; keys: string[] }[]
}) {
  const groupedKeySet = new Set(groups.flatMap((g) => g.keys))
  const ungrouped = blocks.filter((b) => !groupedKeySet.has(b.key))
  const byKey = new Map(blocks.map((b) => [b.key, b]))

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set())

  function toggle(key: string) {
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const groupBlocks = group.keys.map((k) => byKey.get(k)).filter(Boolean) as ContentBlock[]
        if (groupBlocks.length === 0) return null
        return (
          <section key={group.id} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-400">
              {group.label}
            </h3>
            <div className="space-y-2.5">
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
        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-400">
            Weitere Blöcke
          </h3>
          <div className="space-y-2.5">
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
