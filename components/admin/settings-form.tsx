'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { settingsSchema, type SettingsFormData } from '@/lib/validation/schemas'
import { updateSettings } from '@/lib/actions/settings'

interface SettingsFormProps {
  initialValues: SettingsFormData
}

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues,
  })

  function onSubmit(data: SettingsFormData) {
    setFeedback(null)
    startTransition(async () => {
      const result = await updateSettings(data as Record<string, unknown>)
      if (result.success) {
        setFeedback({ type: 'success', message: 'Einstellungen wurden gespeichert.' })
      } else {
        setFeedback({ type: 'error', message: result.error ?? 'Fehler beim Speichern.' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Organisationsname *"
        placeholder="IMPULS Soziales Management"
        error={errors.org_name?.message}
        {...register('org_name')}
      />

      <Input
        label="Adresse *"
        placeholder="Massener Str. 147, 12345 Musterstadt"
        error={errors.org_address?.message}
        {...register('org_address')}
      />

      <Input
        label="Telefon *"
        type="tel"
        placeholder="+49 123 456789"
        error={errors.org_phone?.message}
        {...register('org_phone')}
      />

      <Input
        label="E-Mail *"
        type="email"
        placeholder="info@beispiel.de"
        error={errors.org_email?.message}
        {...register('org_email')}
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
          icon={<Save className="h-4 w-4" />}
        >
          Speichern
        </Button>
      </div>
    </form>
  )
}
