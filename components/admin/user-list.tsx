'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  UserPlus,
  Pencil,
  ShieldCheck,
  ShieldOff,
  ArrowRight,
} from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { toggleUserActive } from '@/lib/actions/users'
import { getRoleLabel } from '@/lib/rbac/permissions'
import { UserForm } from './user-form'

interface User {
  id: string
  username?: string | null
  email: string
  firstName: string
  lastName: string
  role: string
  active: boolean
  avatar?: string | null
  lastLoginAt: string | null
  createdAt: string
}

interface UserListProps {
  users: User[]
  currentUserId: string | null
}

export function UserList({ users, currentUserId }: UserListProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const [confirmUser, setConfirmUser] = useState<User | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleToggle(user: User) {
    if (user.active) {
      setConfirmUser(user)
    } else {
      performToggle(user.id)
    }
  }

  function performToggle(id: string) {
    startTransition(async () => {
      await toggleUserActive(id)
      setConfirmUser(null)
    })
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          icon={<UserPlus className="h-4 w-4" />}
          onClick={() => setCreateOpen(true)}
        >
          Neuer Benutzer
        </Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Benutzername</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Rolle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Letzte Anmeldung</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.avatar}
                      name={`${user.firstName} ${user.lastName}`}
                      size="sm"
                    />
                    <Link
                      href={`/admin/settings/users/${user.id}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-warm-900 hover:text-primary-600"
                    >
                      {user.firstName} {user.lastName}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-warm-700">
                  {user.username?.trim() || '—'}
                </TableCell>
                <TableCell className="text-warm-600">{user.email}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <Badge variant={user.active ? 'success' : 'error'}>
                    {user.active ? 'Aktiv' : 'Inaktiv'}
                  </Badge>
                </TableCell>
                <TableCell className="text-warm-500">
                  {user.lastLoginAt ? (
                    formatDateTime(user.lastLoginAt)
                  ) : (
                    <span className="text-warm-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/settings/users/${user.id}`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    {user.id !== currentUserId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggle(user)}
                        disabled={isPending}
                        className={cn(
                          user.active
                            ? 'text-error-600 hover:text-error-700 hover:bg-error-50'
                            : 'text-success-600 hover:text-success-700 hover:bg-success-50',
                        )}
                      >
                        {user.active ? (
                          <ShieldOff className="h-3.5 w-3.5" />
                        ) : (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create user dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogClose onClose={() => setCreateOpen(false)} />
        <DialogHeader>
          <DialogTitle>Neuer Benutzer</DialogTitle>
          <DialogDescription>
            Erstellen Sie einen neuen Benutzer für das Admin-Panel.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <UserForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Confirm deactivation dialog */}
      <Dialog
        open={!!confirmUser}
        onClose={() => setConfirmUser(null)}
      >
        <DialogClose onClose={() => setConfirmUser(null)} />
        <DialogHeader>
          <DialogTitle>Benutzer deaktivieren</DialogTitle>
          <DialogDescription>
            Möchten Sie den Benutzer{' '}
            <strong>
              {confirmUser?.firstName} {confirmUser?.lastName}
            </strong>{' '}
            wirklich deaktivieren? Der Benutzer kann sich danach nicht mehr
            anmelden.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setConfirmUser(null)}
            disabled={isPending}
          >
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            loading={isPending}
            onClick={() => confirmUser && performToggle(confirmUser.id)}
          >
            Deaktivieren
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

function RoleBadge({ role }: { role: string }) {
  const variant =
    role === 'SUPER_ADMIN' || role === 'ADMIN'
      ? 'primary'
      : role === 'RECRUITING'
        ? 'warning'
        : 'default'

  return (
    <Badge variant={variant}>
      {getRoleLabel(role as any)}
    </Badge>
  )
}
