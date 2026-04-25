'use client'

import { useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'

const ACTION_OPTIONS = [
  { value: '', label: 'Alle Aktionen' },
  { value: 'create', label: 'Erstellt' },
  { value: 'update', label: 'Aktualisiert' },
  { value: 'delete', label: 'Gelöscht' },
  { value: 'status_change', label: 'Status geändert' },
  { value: 'login', label: 'Anmeldung' },
  { value: 'upload', label: 'Hochgeladen' },
  { value: 'password_change', label: 'Passwort geändert' },
  { value: 'settings_update', label: 'Einstellungen geändert' },
]

const ENTITY_TYPE_OPTIONS = [
  { value: '', label: 'Alle Bereiche' },
  { value: 'applicant', label: 'Bewerber' },
  { value: 'inquiry', label: 'Anfrage' },
  { value: 'job_posting', label: 'Stellenanzeige' },
  { value: 'user', label: 'Benutzer' },
  { value: 'document', label: 'Dokument' },
  { value: 'setting', label: 'Einstellung' },
  { value: 'content', label: 'Inhalt' },
]

interface ActivityFiltersProps {
  currentPage: number
  totalPages: number
  total: number
  /** Standard: /admin/settings/activity */
  basePath?: string
}

export function ActivityFilters({
  currentPage,
  totalPages,
  total,
  basePath = '/admin/settings/activity',
}: ActivityFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const actionValue = searchParams.get('action') ?? ''
  const entityTypeValue = searchParams.get('entityType') ?? ''
  const dateFromValue = searchParams.get('dateFrom') ?? ''
  const dateToValue = searchParams.get('dateTo') ?? ''
  const hasActiveFilters = !!(
    searchParams.get('action') ||
    searchParams.get('entityType') ||
    searchParams.get('dateFrom') ||
    searchParams.get('dateTo')
  )

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
      params.delete('page')
      startTransition(() => {
        router.push(`${basePath}?${params.toString()}`)
      })
    },
    [router, searchParams, startTransition, basePath],
  )

  function handleReset() {
    startTransition(() => {
      router.push(basePath)
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
      router.push(`${basePath}?${params.toString()}`)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-44">
            <Select
              options={ACTION_OPTIONS}
              value={actionValue}
              onChange={(e) => pushParams({ action: e.target.value })}
            />
          </div>
          <div className="w-44">
            <Select
              options={ENTITY_TYPE_OPTIONS}
              value={entityTypeValue}
              onChange={(e) => pushParams({ entityType: e.target.value })}
            />
          </div>
          <div className="w-40">
            <Input
              type="date"
              placeholder="Von"
              value={dateFromValue}
              onChange={(e) => pushParams({ dateFrom: e.target.value })}
            />
          </div>
          <div className="w-40">
            <Input
              type="date"
              placeholder="Bis"
              value={dateToValue}
              onChange={(e) => pushParams({ dateTo: e.target.value })}
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
