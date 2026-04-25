'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'

const statusOptions = [
  { value: '', label: 'Alle Status' },
  { value: 'NEU_EINGEGANGEN', label: 'Neu eingegangen' },
  { value: 'GESICHTET', label: 'Gesichtet' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'ERLEDIGT', label: 'Erledigt' },
  { value: 'ARCHIVIERT', label: 'Archiviert' },
]

interface User {
  id: string
  firstName: string
  lastName: string
  role: string
}

interface AnamneseFiltersProps {
  currentPage: number
  totalPages: number
  total: number
  users: User[]
}

export function AnamneseFilters({
  currentPage,
  totalPages,
  total,
  users,
}: AnamneseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(searchParams.get('search') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const statusValue = searchParams.get('status') ?? ''
  const assignedValue = searchParams.get('assignedTo') ?? ''
  const hasActiveFilters = !!(
    searchParams.get('search') ||
    searchParams.get('status') ||
    searchParams.get('assignedTo')
  )

  const userOptions = [
    { value: '', label: 'Alle Bearbeiter' },
    ...users.map((u) => ({
      value: u.id,
      label: `${u.firstName} ${u.lastName}`,
    })),
  ]

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }
      if (
        updates.search !== undefined ||
        updates.status !== undefined ||
        updates.assignedTo !== undefined
      ) {
        params.delete('page')
      }
      startTransition(() => {
        router.push(`/admin/anamnese?${params.toString()}`)
      })
    },
    [router, searchParams, startTransition],
  )

  useEffect(() => {
    setSearchValue(searchParams.get('search') ?? '')
  }, [searchParams])

  function handleSearchChange(value: string) {
    setSearchValue(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      pushParams({ search: value })
    }, 350)
  }

  function handleReset() {
    setSearchValue('')
    startTransition(() => {
      router.push('/admin/anamnese')
    })
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) params.set('page', String(page))
    else params.delete('page')
    startTransition(() => {
      router.push(`/admin/anamnese?${params.toString()}`)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1 sm:max-w-md">
          <Input
            placeholder="Name, Telefon, E-Mail…"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-44">
            <Select
              options={statusOptions}
              value={statusValue}
              onChange={(e) => pushParams({ status: e.target.value })}
              disabled={isPending}
            />
          </div>
          <div className="w-52">
            <Select
              options={userOptions}
              value={assignedValue}
              onChange={(e) => pushParams({ assignedTo: e.target.value })}
              disabled={isPending}
            />
          </div>
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              icon={<RotateCcw className="h-3.5 w-3.5" />}
              disabled={isPending}
            >
              Zurücksetzen
            </Button>
          )}
        </div>
      </div>
      {total > 0 && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-warm-500">
            {total} {total === 1 ? 'Eintrag' : 'Einträge'} gefunden
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  )
}
