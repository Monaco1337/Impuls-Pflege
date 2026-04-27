'use client'

import { useState, useMemo, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'

export interface ColumnDef<T> {
  id: string
  header: string
  accessorFn?: (row: T) => unknown
  cell?: (row: T) => ReactNode
  sortable?: boolean
  className?: string
}

type SortDirection = 'asc' | 'desc' | null

interface SortState {
  columnId: string | null
  direction: SortDirection
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  /** Field used for simple text search across all accessor columns */
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  emptyMessage?: string
  className?: string
  /** Content rendered in the toolbar area (next to search) */
  toolbar?: ReactNode
}

export function DataTable<T>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Suchen…',
  pageSize = 10,
  emptyMessage = 'Keine Einträge vorhanden.',
  className,
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState>({ columnId: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const term = search.toLowerCase()
    return data.filter((row) =>
      columns.some((col) => {
        const value = col.accessorFn?.(row)
        return value != null && String(value).toLowerCase().includes(term)
      }),
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sort.columnId || !sort.direction) return filtered
    const col = columns.find((c) => c.id === sort.columnId)
    if (!col?.accessorFn) return filtered

    return [...filtered].sort((a, b) => {
      const aVal = col.accessorFn!(a)
      const bVal = col.accessorFn!(b)
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      const cmp = String(aVal).localeCompare(String(bVal), 'de', { numeric: true })
      return sort.direction === 'desc' ? -cmp : cmp
    })
  }, [filtered, sort, columns])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const handleSort = (columnId: string) => {
    setSort((prev) => {
      if (prev.columnId !== columnId) return { columnId, direction: 'asc' }
      if (prev.direction === 'asc') return { columnId, direction: 'desc' }
      return { columnId: null, direction: null }
    })
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {(searchable || toolbar) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchable && (
            <div className="w-full sm:max-w-xs">
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          )}
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="rounded-lg border border-warm-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow variant="plain">
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(col.sortable && 'cursor-pointer select-none', col.className)}
                  onClick={col.sortable ? () => handleSort(col.id) : undefined}
                  aria-sort={
                    sort.columnId === col.id
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sort.columnId === col.id && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-hidden="true">
                        {sort.direction === 'asc' ? (
                          <path d="M6 3l3 4H3l3-4z" fill="currentColor" />
                        ) : (
                          <path d="M6 9L3 5h6L6 9z" fill="currentColor" />
                        )}
                      </svg>
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow variant="plain">
                <TableCell colSpan={columns.length} className="py-12 text-center text-warm-400">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell key={col.id} className={col.className}>
                      {col.cell
                        ? col.cell(row)
                        : col.accessorFn
                          ? String(col.accessorFn(row) ?? '')
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-warm-500">
            {sorted.length} {sorted.length === 1 ? 'Eintrag' : 'Einträge'}
          </p>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
