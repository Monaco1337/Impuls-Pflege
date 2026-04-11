'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
import { inquirySchema, type InquiryFormData } from '@/lib/validation/schemas'
import { submitInquiry } from '@/lib/actions/inquiries'

const inquiryTypeOptions = [
  { value: 'Pflegeberatung', label: 'Pflegeberatung' },
  { value: 'Leistungsanfrage', label: 'Leistungsanfrage' },
  { value: 'Kostenübernahme', label: 'Kostenübernahme' },
  { value: 'Allgemeine Anfrage', label: 'Allgemeine Anfrage' },
  { value: 'Sonstiges', label: 'Sonstiges' },
]

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
      preferredCallback: '',
    },
  })

  const onSubmit = async (data: InquiryFormData) => {
    setServerError(null)

    const result = await submitInquiry(data)

    if (result.success) {
      setIsSuccess(true)
    } else {
      setServerError(
        result.error ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      )
    }
  }

  if (isSuccess) {
    return (
      <MotionWrapper>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <CheckCircle className="h-7 w-7 text-primary-600" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-semibold text-warm-900">
              Vielen Dank für Ihre Anfrage
            </p>
            <p className="mt-2 text-sm leading-relaxed text-warm-600">
              Wir melden uns in Kürze bei Ihnen.
            </p>
          </div>
        </div>
      </MotionWrapper>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <MotionWrapper>
          <div
            className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
            role="alert"
          >
            {serverError}
          </div>
        </MotionWrapper>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Vollständiger Name *"
          placeholder="Max Mustermann"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="E-Mail-Adresse *"
          type="email"
          placeholder="max@beispiel.de"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Telefonnummer"
          type="tel"
          placeholder="02303 / 123 456"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Select
          label="Art der Anfrage *"
          placeholder="Bitte wählen"
          options={inquiryTypeOptions}
          error={errors.inquiryType?.message}
          {...register('inquiryType')}
        />
      </div>

      <Textarea
        label="Ihre Nachricht *"
        placeholder="Beschreiben Sie Ihr Anliegen..."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      <Input
        label="Bevorzugter Rückruftermin"
        placeholder="z.B. Dienstag, 14:00 Uhr"
        error={errors.preferredCallback?.message}
        {...register('preferredCallback')}
      />

      <div className="flex flex-col gap-4 border-t border-warm-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-warm-400">* Pflichtfelder</p>
        <Button type="submit" size="lg" loading={isSubmitting}>
          Nachricht senden
        </Button>
      </div>
    </form>
  )
}
