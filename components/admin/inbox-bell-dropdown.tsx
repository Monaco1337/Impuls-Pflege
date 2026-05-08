'use client'

import { useRouter } from 'next/navigation'
import { Bell, Mail, UserPlus, Stethoscope } from 'lucide-react'
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
const APP_LIST = '/admin/applicants'
const ANAM_FILTER = '/admin/anamnese?status=NEU_EINGEGANGEN'
const INQ_LIST = '/admin/inquiries'
const ANAM_LIST = '/admin/anamnese'

type Props = {
  userRole: RoleName
  newInquiries: number
  newApplicants: number
  newAnamnese: number
  liveReady: boolean
  onAckInquiries: () => void | Promise<void>
  onAckApplicants: () => void | Promise<void>
  onAckAnamnese: () => void | Promise<void>
}

export function InboxBellDropdown({
  userRole,
  newInquiries,
  newApplicants,
  newAnamnese,
  liveReady,
  onAckInquiries,
  onAckApplicants,
  onAckAnamnese,
}: Props) {
  const router = useRouter()
  const canInq = hasPermission(userRole, 'inquiries', 'view')
  const canApp = hasPermission(userRole, 'applicants', 'view')
  const canAnam = hasPermission(userRole, 'anamnese', 'view')

  if (!canInq && !canApp && !canAnam) return null

  const total =
    (canInq ? newInquiries : 0) + (canApp ? newApplicants : 0) + (canAnam ? newAnamnese : 0)
  const hasUrgent = total > 0

  const handleInquiriesClick = () => {
    const target = newInquiries > 0 ? INQ_FILTER : INQ_LIST
    if (newInquiries > 0) void onAckInquiries()
    router.push(target)
  }

  const handleApplicantsClick = () => {
    if (newApplicants > 0) void onAckApplicants()
    router.push(APP_LIST)
  }

  const handleAnamneseClick = () => {
    const target = newAnamnese > 0 ? ANAM_FILTER : ANAM_LIST
    if (newAnamnese > 0) void onAckAnamnese()
    router.push(target)
  }

  return (
    <Dropdown>
      <DropdownTrigger
        className={cn(
          'relative rounded-lg p-2',
          hasUrgent
            ? 'text-primary-600 hover:bg-primary-50'
            : 'text-warm-400 hover:bg-warm-50 hover:text-warm-600',
        )}
        title="Eingang: Anfragen, Anamnese, Bewerbungen"
        aria-label="Eingang, neue Anfragen, Anamnesebögen und Bewerbungen"
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
          <p className="text-xs text-warm-500">
            Klicken markiert die neuen Eingänge sofort als gesehen
          </p>
        </div>
        {canInq && (
          <InboxItem
            icon={Mail}
            label="Neue Anfragen"
            count={newInquiries}
            onGo={handleInquiriesClick}
            hasWork={newInquiries > 0}
            liveReady={liveReady}
          />
        )}
        {canInq && (canAnam || canApp) && <DropdownSeparator className="my-0" />}
        {canAnam && (
          <InboxItem
            icon={Stethoscope}
            label="Neue Anamnese"
            count={newAnamnese}
            onGo={handleAnamneseClick}
            hasWork={newAnamnese > 0}
            liveReady={liveReady}
          />
        )}
        {canAnam && canApp && <DropdownSeparator className="my-0" />}
        {canApp && (
          <InboxItem
            icon={UserPlus}
            label="Neue Bewerbungen"
            count={newApplicants}
            onGo={handleApplicantsClick}
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
