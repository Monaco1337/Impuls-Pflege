'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'

const statusOptions = [
  { value: '', label: 'Alle Status' },
  { value: 'NEU', label: 'Neu' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'RUECKRUF_GEPLANT', label: 'Rückruf geplant' },
  { value: 'WARTET_AUF_RUECKMELDUNG', label: 'Wartet auf Rückmeldung' },
  { value: 'ERLEDIGT', label: 'Erledigt' },
  { value: 'ARCHIVIERT', label: 'Archiviert' },
]

const priorityOptions = [
  { value: '', label: 'Alle Prioritäten' },
  { value: 'NIEDRIG', label: 'Niedrig' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HOCH', label: 'Hoch' },
  { value: 'DRINGEND', label: 'Dringend' },
]

interface InquiryFiltersProps {
  currentPage: number
  totalPages: number
  total: number
}

export function InquiryFilters({ currentPage, totalPages, total }: InquiryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchValue, setSearchValue] = useState(searchParams.get('search') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const statusValue = searchParams.get('status') ?? ''
  const priorityValue = searchParams.get('priority') ?? ''
  const hasActiveFilters = !!(searchParams.get('search') || searchParams.get('status') || searchParams.get('priority'))

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

      if (updates.search !== undefined || updates.status !== undefined || updates.priority !== undefined) {
        params.delete('page')
      }

      startTransition(() => {
        router.push(`/admin/inquiries?${params.toString()}`)
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
      router.push('/admin/inquiries')
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
      router.push(`/admin/inquiries?${params.toString()}`)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 sm:max-w-xs">
          <Input
            placeholder="Name, E-Mail oder Nachricht suchen…"
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
              options={priorityOptions}
              value={priorityValue}
              onChange={(e) => pushParams({ priority: e.target.value })}
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

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-warm-500">
            {total} {total === 1 ? 'Anfrage' : 'Anfragen'} gefunden
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
