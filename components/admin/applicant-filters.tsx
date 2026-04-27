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
  { value: 'IN_PRUEFUNG', label: 'In Prüfung' },
  { value: 'INTERESSANT', label: 'Interessant' },
  { value: 'GESPRAECH_GEPLANT', label: 'Gespräch geplant' },
  { value: 'WARTELISTE', label: 'Warteliste' },
  { value: 'ABGELEHNT', label: 'Abgelehnt' },
  { value: 'EINGESTELLT', label: 'Eingestellt' },
  { value: 'ARCHIVIERT', label: 'Archiviert' },
]

interface User {
  id: string
  firstName: string
  lastName: string
  role: string
}

interface ApplicantFiltersProps {
  currentPage: number
  totalPages: number
  total: number
  positions: string[]
  users: User[]
  /** z. B. Tabelle/Pipeline-Umschalter – wird mit den Filtern auf einer Zeile ausgerichtet */
  toolbarEnd?: React.ReactNode
}

export function ApplicantFilters({
  currentPage,
  totalPages,
  total,
  positions,
  users,
  toolbarEnd,
}: ApplicantFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') ?? '',
  )
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const statusValue = searchParams.get('status') ?? ''
  const positionValue = searchParams.get('position') ?? ''
  const assignedValue = searchParams.get('assignedTo') ?? ''
  const hasActiveFilters = !!(
    searchParams.get('search') ||
    searchParams.get('status') ||
    searchParams.get('position') ||
    searchParams.get('assignedTo')
  )

  const positionOptions = [
    { value: '', label: 'Alle Positionen' },
    ...positions.map((p) => ({ value: p, label: p })),
  ]

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
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }

      if (
        updates.search !== undefined ||
        updates.status !== undefined ||
        updates.position !== undefined ||
        updates.assignedTo !== undefined
      ) {
        params.delete('page')
      }

      startTransition(() => {
        router.push(`/admin/applicants?${params.toString()}`)
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
      router.push('/admin/applicants')
    })
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', String(page))
    } else {
      params.delete('page')
    }
    startTransition(() => {
      router.push(`/admin/applicants?${params.toString()}`)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 sm:max-w-xs">
            <Input
              placeholder="Name, E-Mail oder Position suchen…"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-44">
              <Select
                options={statusOptions}
                value={statusValue}
                onChange={(e) => pushParams({ status: e.target.value })}
              />
            </div>
            <div className="w-44">
              <Select
                options={positionOptions}
                value={positionValue}
                onChange={(e) => pushParams({ position: e.target.value })}
              />
            </div>
            <div className="w-44">
              <Select
                options={userOptions}
                value={assignedValue}
                onChange={(e) => pushParams({ assignedTo: e.target.value })}
              />
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                icon={<RotateCcw className="h-3.5 w-3.5" />}
              >
                Zurücksetzen
              </Button>
            )}
          </div>
        </div>
        {toolbarEnd ? (
          <div className="flex shrink-0 justify-end lg:justify-end">{toolbarEnd}</div>
        ) : null}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-warm-500">
            {total} {total === 1 ? 'Bewerber' : 'Bewerber'} gefunden
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
