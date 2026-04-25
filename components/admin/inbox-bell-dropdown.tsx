'use client'

import { useRouter } from 'next/navigation'
import { Bell, Mail, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { hasPermission } from '@/lib/rbac/permissions'
import type { RoleName } from '@/lib/types/enums'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '@/components/ui/dropdown'

const INQ_FILTER = '/admin/inquiries?status=NEU'
const APP_FILTER = '/admin/applicants?status=NEU_EINGEGANGEN'

type Props = {
  userRole: RoleName
  newInquiries: number
  newApplicants: number
  liveReady: boolean
}

export function InboxBellDropdown({ userRole, newInquiries, newApplicants, liveReady }: Props) {
  const router = useRouter()
  const canInq = hasPermission(userRole, 'inquiries', 'view')
  const canApp = hasPermission(userRole, 'applicants', 'view')

  if (!canInq && !canApp) return null

  const total = (canInq ? newInquiries : 0) + (canApp ? newApplicants : 0)
  const hasUrgent = total > 0

  return (
    <Dropdown>
      <DropdownTrigger
        className={cn(
          'relative rounded-lg p-2',
          hasUrgent
            ? 'text-primary-600 hover:bg-primary-50'
            : 'text-warm-400 hover:bg-warm-50 hover:text-warm-600',
        )}
        title="Eingang: neue Anfragen & Bewerbungen"
        aria-label="Eingang, neue Anfragen und Bewerbungen"
      >
        <Bell className={cn('h-[18px] w-[18px]', hasUrgent && 'text-primary-600')} />
        {hasUrgent && liveReady && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[10px] font-semibold leading-none text-white shadow ring-1 ring-white">
            {total > 9 ? '9+' : total}
          </span>
        )}
        {hasUrgent && !liveReady && (
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"
            aria-hidden
          />
        )}
      </DropdownTrigger>
      <DropdownContent align="right" className="min-w-64 p-0">
        <div className="border-b border-warm-100 px-3 py-2.5">
          <p className="text-sm font-semibold text-warm-900">Eingang</p>
          <p className="text-xs text-warm-500">Aktualisiert automatisch, wenn der Tab sichtbar ist</p>
        </div>
        {canInq && (
          <InboxItem
            icon={Mail}
            label="Neue Anfragen"
            count={newInquiries}
            onGo={() => router.push(INQ_FILTER)}
            hasWork={newInquiries > 0}
            liveReady={liveReady}
          />
        )}
        {canInq && canApp && <DropdownSeparator className="my-0" />}
        {canApp && (
          <InboxItem
            icon={UserPlus}
            label="Neue Bewerbungen"
            count={newApplicants}
            onGo={() => router.push(APP_FILTER)}
            hasWork={newApplicants > 0}
            liveReady={liveReady}
          />
        )}
      </DropdownContent>
    </Dropdown>
  )
}

function InboxItem({
  icon: Icon,
  label,
  count,
  onGo,
  hasWork,
  liveReady,
}: {
  icon: React.ElementType
  label: string
  count: number
  onGo: () => void
  hasWork: boolean
  liveReady: boolean
}) {
  return (
    <DropdownItem
      onClick={onGo}
      className={cn(
        'w-full !justify-start text-left !py-2.5',
        hasWork ? 'text-warm-800' : 'text-warm-500',
      )}
    >
      <Icon
        className={cn('h-4 w-4 shrink-0', hasWork ? 'text-primary-500' : 'text-warm-300')}
        aria-hidden
      />
      <span className="min-w-0 flex-1">{label}</span>
      {liveReady ? (
        <span
          className={cn(
            'shrink-0 tabular-nums',
            'inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-md px-1.5 text-xs font-semibold',
            hasWork ? 'bg-rose-500 text-white' : 'bg-warm-100 text-warm-500',
          )}
        >
          {count}
        </span>
      ) : (
        <span className="h-2 w-8 rounded bg-warm-100" aria-label="Laden" />
      )}
    </DropdownItem>
  )
}
