'use client'

import { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function JobSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')

  const applySearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (term) {
        params.set('search', term)
        params.delete('page')
      } else {
        params.delete('search')
      }
      router.push(`/admin/jobs${params.toString() ? `?${params.toString()}` : ''}`)
    },
    [router, searchParams],
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        applySearch(value)
      }}
      className="max-w-sm"
    >
      <Input
        placeholder="Stellen durchsuchen…"
        icon={<Search className="h-4 w-4" />}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (!e.target.value) applySearch('')
        }}
      />
    </form>
  )
}
