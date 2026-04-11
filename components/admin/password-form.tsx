'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { passwordChangeSchema, type PasswordChangeFormData } from '@/lib/validation/schemas'
import { changePassword } from '@/lib/actions/users'

export function PasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: PasswordChangeFormData) {
    setFeedback(null)
    startTransition(async () => {
      const result = await changePassword(data.currentPassword, data.newPassword)
      if (result.success) {
        setFeedback({ type: 'success', message: 'Passwort wurde erfolgreich geändert.' })
        reset()
      } else {
        setFeedback({ type: 'error', message: result.error ?? 'Fehler beim Ändern des Passworts.' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Aktuelles Passwort *"
        type="password"
        placeholder="Aktuelles Passwort"
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />

      <Input
        label="Neues Passwort *"
        type="password"
        placeholder="Neues Passwort"
        helperText="Mindestens 8 Zeichen"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />

      <Input
        label="Passwort bestätigen *"
        type="password"
        placeholder="Neues Passwort wiederholen"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {feedback && (
        <div
          className={
            feedback.type === 'success'
              ? 'flex items-center gap-2 rounded-lg bg-success-50 px-3 py-2 text-sm text-success-700'
              : 'flex items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700'
          }
          role="alert"
        >
          {feedback.type === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0" />}
          {feedback.message}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          loading={isPending}
          icon={<Lock className="h-4 w-4" />}
        >
          Passwort ändern
        </Button>
      </div>
    </form>
  )
}
