'use client'

import { useCallback, useState, useTransition } from 'react'
import { Check, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateContentBlock } from '@/lib/actions/content'
import type { TeamFeaturedCms, TeamMemberCms } from '@/lib/content/team-cms'
import { parseTeamBlock } from '@/lib/content/team-cms'
import { CmsImageDropzone } from '@/components/admin/cms-image-dropzone'

interface Block {
  id: string
  key: string
  title: string | null
  content: unknown
  sortOrder: number | null
}

function emptyMember(): TeamMemberCms {
  return { name: '', position: '', description: '', image: null }
}

function buildPayload(
  featured: TeamFeaturedCms,
  members: TeamMemberCms[],
  block: Block,
) {
  const cleanedMembers = members
    .map((m) => ({
      ...m,
      name: m.name.trim(),
      position: m.position.trim(),
      description: m.description.trim(),
      image: m.image?.trim() || null,
    }))
    .filter((m) => m.name || m.position || m.description || m.image)

  const tags = featured.tags.map((t) => t.trim()).filter(Boolean)

  return {
    key: 'team' as const,
    title: block.title ?? 'Team',
    content: {
      featured: {
        ...featured,
        name: featured.name.trim(),
        role: featured.role.trim(),
        quote: featured.quote.trim(),
        bio: featured.bio.trim(),
        image: featured.image.trim(),
        tags,
      },
      members: cleanedMembers.length ? cleanedMembers : members,
    },
    sortOrder: block.sortOrder ?? 4,
  }
}

export function TeamCmsEditor({ block }: { block: Block }) {
  const initial = parseTeamBlock(block.content)
  const [featured, setFeatured] = useState<TeamFeaturedCms>(initial.featured)
  const [members, setMembers] = useState<TeamMemberCms[]>(initial.members)
  const [pending, startTransition] = useTransition()
  const [savedFlash, setSavedFlash] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const persist = useCallback(
    (f: TeamFeaturedCms, m: TeamMemberCms[]) => {
      setError(null)
      startTransition(async () => {
        const result = await updateContentBlock('team', buildPayload(f, m, block))
        if (result.success) {
          setSavedFlash(true)
          setTimeout(() => setSavedFlash(false), 1600)
        } else {
          setError(result.error ?? 'Speichern fehlgeschlagen')
        }
      })
    },
    [block],
  )

  const persistImages = useCallback(
    (f: TeamFeaturedCms, m: TeamMemberCms[]) => {
      startTransition(async () => {
        setError(null)
        const result = await updateContentBlock('team', buildPayload(f, m, block))
        if (result.success) {
          setSavedFlash(true)
          setTimeout(() => setSavedFlash(false), 1600)
        } else {
          setError(result.error ?? 'Speichern fehlgeschlagen')
        }
      })
    },
    [block],
  )

  function updateTag(i: number, value: string) {
    setFeatured((prev) => {
      const tags = [...prev.tags]
      tags[i] = value
      return { ...prev, tags }
    })
  }

  function handleSaveText() {
    persist(featured, members)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,220px)_1fr]">
        <div className="space-y-1">
          <p className="text-center text-[11px] font-medium text-warm-500">Profil · groß</p>
          <CmsImageDropzone
            src={featured.image || '/images/team-elena-tschupina.jpg'}
            aspectClassName="aspect-[4/5]"
            disabled={pending}
            onPathChange={(p) => {
              const next = { ...featured, image: p }
              setFeatured(next)
              persistImages(next, members)
            }}
          />
        </div>
        <div className="space-y-3">
          <Input
            label="Name"
            value={featured.name}
            onChange={(e) => setFeatured((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Rolle"
            value={featured.role}
            onChange={(e) => setFeatured((f) => ({ ...f, role: e.target.value }))}
          />
          <Textarea
            label="Zitat"
            value={featured.quote}
            onChange={(e) => setFeatured((f) => ({ ...f, quote: e.target.value }))}
            rows={2}
          />
          <Textarea
            label="Text"
            value={featured.bio}
            onChange={(e) => setFeatured((f) => ({ ...f, bio: e.target.value }))}
            rows={4}
          />
          <div className="flex flex-col gap-2">
            {featured.tags.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <Input value={tag} onChange={(e) => updateTag(i, e.target.value)} placeholder="Stichwort" />
                <Button type="button" variant="outline" size="sm" onClick={() => setFeatured((f) => ({ ...f, tags: f.tags.filter((_, j) => j !== i) }))} icon={<Trash2 className="h-4 w-4" />} />
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setFeatured((f) => ({ ...f, tags: [...f.tags, ''] }))} icon={<Plus className="h-4 w-4" />}>
              Stichwort
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setMembers((m) => [...m, emptyMember()])}
            icon={<Plus className="h-4 w-4" />}
          >
            Karte
          </Button>
        </div>

        <div className="space-y-5">
          {members.map((m, idx) => (
            <div
              key={idx}
              className="grid gap-4 rounded-xl border border-warm-200/80 bg-white p-4 sm:grid-cols-[120px_1fr]"
            >
              <div className="space-y-1">
                <p className="text-center text-[11px] font-medium text-warm-500">Foto {idx + 1}</p>
                <CmsImageDropzone
                  src={m.image || '/images/care-smile.jpg'}
                  aspectClassName="aspect-square"
                  disabled={pending}
                  onPathChange={(p) => {
                    const nextMembers = members.map((x, j) => (j === idx ? { ...x, image: p } : x))
                    setMembers(nextMembers)
                    persistImages(featured, nextMembers)
                  }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMembers((list) => list.filter((_, j) => j !== idx))}
                    disabled={members.length <= 1}
                    icon={<Trash2 className="h-4 w-4" />}
                  >
                    Entfernen
                  </Button>
                </div>
                <Input
                  label="Name"
                  value={m.name}
                  onChange={(e) => {
                    const v = e.target.value
                    setMembers((list) => list.map((x, j) => (j === idx ? { ...x, name: v } : x)))
                  }}
                />
                <Input
                  label="Position"
                  value={m.position}
                  onChange={(e) => {
                    const v = e.target.value
                    setMembers((list) => list.map((x, j) => (j === idx ? { ...x, position: v } : x)))
                  }}
                />
                <Textarea
                  label="Kurztext"
                  value={m.description}
                  onChange={(e) => {
                    const v = e.target.value
                    setMembers((list) => list.map((x, j) => (j === idx ? { ...x, description: v } : x)))
                  }}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-warm-100 pt-4">
        <Button onClick={handleSaveText} loading={pending} size="sm" variant="secondary">
          Texte speichern
        </Button>
        {savedFlash && !pending && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-success-600">
            <Check className="h-3.5 w-3.5" />
            Live
          </span>
        )}
        {error && (
          <p className="text-xs font-medium text-error-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
