'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { userSchema, type UserFormData } from '@/lib/validation/schemas'
import { createUser, updateUser } from '@/lib/actions/users'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const ROLE_OPTIONS = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'RECRUITING', label: 'Recruiting' },
  { value: 'OFFICE_STAFF', label: 'Büropersonal' },
  { value: 'CONTENT_MANAGER', label: 'Content Manager' },
  { value: 'READ_ONLY', label: 'Nur Lesen' },
]

interface UserFormProps {
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    active: boolean
  }
  onSuccess?: () => void
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const isEditing = !!user?.id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      role: (user?.role as UserFormData['role']) ?? 'READ_ONLY',
      active: user?.active ?? true,
      password: '',
    },
  })

  function onSubmit(data: UserFormData) {
    setServerError(null)

    if (!isEditing && !data.password) {
      setServerError('Passwort ist für neue Benutzer erforderlich')
      return
    }

    const payload = { ...data }
    if (isEditing && !payload.password) {
      delete (payload as any).password
    }

    startTransition(async () => {
      const result = isEditing
        ? await updateUser(user!.id, payload)
        : await createUser(payload)

      if (result.success) {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/users')
        }
      } else {
        setServerError(result.error ?? 'Ein Fehler ist aufgetreten')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
          {serverError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Vorname *"
          placeholder="Max"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Nachname *"
          placeholder="Mustermann"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <Input
        label="E-Mail *"
        type="email"
        placeholder="max@beispiel.de"
        error={errors.email?.message}
        {...register('email')}
      />

      <Select
        label="Rolle *"
        options={ROLE_OPTIONS}
        error={errors.role?.message}
        {...register('role')}
      />

      <Input
        label={isEditing ? 'Passwort' : 'Passwort *'}
        type="password"
        placeholder={isEditing ? 'Neues Passwort eingeben' : 'Passwort'}
        helperText={
          isEditing
            ? 'Nur ausfüllen, wenn das Passwort geändert werden soll'
            : 'Mindestens 8 Zeichen'
        }
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-warm-700">Status</span>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-warm-300 bg-white px-3 py-2.5 transition-colors hover:border-warm-400">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-warm-300 text-primary-500 focus:ring-primary-500"
            {...register('active')}
          />
          <span className="text-sm text-warm-700">
            Aktiv (kann sich anmelden)
          </span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        {!onSuccess && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/users')}
            disabled={isPending}
          >
            Abbrechen
          </Button>
        )}
        <Button
          type="submit"
          loading={isPending}
          icon={<Save className="h-4 w-4" />}
        >
          {isEditing ? 'Speichern' : 'Erstellen'}
        </Button>
      </div>
    </form>
  )
}
