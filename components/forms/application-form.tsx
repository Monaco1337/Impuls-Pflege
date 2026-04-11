'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { FileUpload } from '@/components/ui/file-upload'
import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/sections/motion-wrapper'
import { applicationSchema, type ApplicationFormData } from '@/lib/validation/schemas'
import { submitApplication } from '@/lib/actions/applicants'

const positionOptions = [
  { value: 'Pflegefachkraft', label: 'Pflegefachkraft (m/w/d)' },
  { value: 'Pflegehilfskraft', label: 'Pflegehilfskraft (m/w/d)' },
  { value: 'Betreuungskraft', label: 'Betreuungskraft (m/w/d)' },
  { value: 'Hauswirtschaftskraft', label: 'Hauswirtschaftskraft (m/w/d)' },
  { value: 'Initiativbewerbung', label: 'Initiativbewerbung' },
]

interface ApplicationFormProps {
  preselectedPosition?: string
}

export function ApplicationForm({ preselectedPosition }: ApplicationFormProps) {
  const router = useRouter()
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [docFiles, setDocFiles] = useState<File[]>([])
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      positionApplied: resolvePosition(preselectedPosition),
      availability: '',
      qualification: '',
      experience: '',
      motivation: '',
    },
  })

  const onCvChange = useCallback((files: File[]) => setCvFiles(files), [])
  const onDocsChange = useCallback((files: File[]) => setDocFiles(files), [])

  const onSubmit = async (data: ApplicationFormData) => {
    setServerError(null)

    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    if (cvFiles[0]) {
      formData.append('cv', cvFiles[0])
      formData.append('documents', cvFiles[0])
    }

    for (const file of docFiles) {
      formData.append('documents', file)
    }

    const result = await submitApplication(formData)

    if (result.success) {
      router.push('/bewerbung/danke')
    } else {
      setServerError(
        result.error ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
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

      {/* Persönliche Daten */}
      <MotionWrapper>
        <fieldset>
          <legend className="text-lg font-semibold text-warm-900">
            Persönliche Daten
          </legend>
          <p className="mt-1 text-sm text-warm-500">
            Wie können wir Sie erreichen?
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
            <Input
              label="E-Mail-Adresse *"
              type="email"
              placeholder="max@beispiel.de"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Telefonnummer *"
              type="tel"
              placeholder="02303 / 123 456"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <div className="sm:col-span-2">
              <Input
                label="Adresse"
                placeholder="Musterstraße 1, 59423 Unna"
                error={errors.address?.message}
                {...register('address')}
              />
            </div>
          </div>
        </fieldset>
      </MotionWrapper>

      {/* Zur Stelle */}
      <MotionWrapper delay={0.05}>
        <fieldset>
          <legend className="text-lg font-semibold text-warm-900">
            Zur Stelle
          </legend>
          <p className="mt-1 text-sm text-warm-500">
            Für welche Position interessieren Sie sich?
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Select
              label="Position *"
              placeholder="Bitte wählen"
              options={positionOptions}
              error={errors.positionApplied?.message}
              {...register('positionApplied')}
            />
            <Input
              label="Verfügbarkeit"
              placeholder="z. B. ab sofort, ab 01.06.2026"
              error={errors.availability?.message}
              {...register('availability')}
            />
            <Input
              label="Qualifikation"
              placeholder="z. B. Examinierte Pflegefachkraft"
              error={errors.qualification?.message}
              {...register('qualification')}
            />
            <Input
              label="Berufserfahrung"
              placeholder="z. B. 3 Jahre ambulante Pflege"
              error={errors.experience?.message}
              {...register('experience')}
            />
          </div>
        </fieldset>
      </MotionWrapper>

      {/* Motivation */}
      <MotionWrapper delay={0.1}>
        <fieldset>
          <legend className="text-lg font-semibold text-warm-900">
            Motivation
          </legend>
          <p className="mt-1 text-sm text-warm-500">
            Warum möchten Sie bei IMPULS arbeiten?
          </p>
          <div className="mt-6">
            <Textarea
              label="Ihr Motivationsschreiben"
              placeholder="Erzählen Sie uns, was Sie antreibt und warum Sie Teil unseres Teams werden möchten..."
              rows={6}
              error={errors.motivation?.message}
              {...register('motivation')}
            />
          </div>
        </fieldset>
      </MotionWrapper>

      {/* Dokumente */}
      <MotionWrapper delay={0.15}>
        <fieldset>
          <legend className="text-lg font-semibold text-warm-900">
            Dokumente
          </legend>
          <p className="mt-1 text-sm text-warm-500">
            Laden Sie Ihren Lebenslauf und weitere Unterlagen hoch.
          </p>
          <div className="mt-6 space-y-5">
            <FileUpload
              label="Lebenslauf"
              accept=".pdf,.doc,.docx"
              maxSizeMB={10}
              onChange={onCvChange}
              helperText="PDF, DOC oder DOCX – max. 10 MB"
            />
            <FileUpload
              label="Weitere Dokumente"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxSizeMB={10}
              multiple
              onChange={onDocsChange}
              helperText="Zeugnisse, Zertifikate etc. – max. 10 MB pro Datei"
            />
          </div>
        </fieldset>
      </MotionWrapper>

      {/* Datenschutz */}
      <MotionWrapper delay={0.2}>
        <fieldset>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 h-4 w-4 shrink-0 rounded border-warm-300 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
              {...register('privacy', {
                setValueAs: (v: boolean) => (v ? true : undefined),
              })}
            />
            <label htmlFor="privacy" className="text-sm leading-relaxed text-warm-600">
              Ich habe die{' '}
              <Link
                href="/datenschutz"
                target="_blank"
                className="font-medium text-primary-600 underline underline-offset-2 transition-colors duration-150 hover:text-primary-700"
              >
                Datenschutzerklärung
              </Link>{' '}
              gelesen und stimme der Verarbeitung meiner personenbezogenen Daten
              im Rahmen des Bewerbungsverfahrens zu. *
            </label>
          </div>
          {errors.privacy?.message && (
            <p className="mt-2 text-xs text-error-500" role="alert">
              {errors.privacy.message}
            </p>
          )}
        </fieldset>
      </MotionWrapper>

      {/* Submit */}
      <MotionWrapper delay={0.25}>
        <div className="flex flex-col gap-4 border-t border-warm-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-warm-400">* Pflichtfelder</p>
          <Button type="submit" size="lg" loading={isSubmitting}>
            Bewerbung absenden
          </Button>
        </div>
      </MotionWrapper>
    </form>
  )
}

function resolvePosition(slug?: string): string {
  if (!slug) return ''
  const map: Record<string, string> = {
    pflegefachkraft: 'Pflegefachkraft',
    pflegehilfskraft: 'Pflegehilfskraft',
    betreuungskraft: 'Betreuungskraft',
    hauswirtschaftskraft: 'Hauswirtschaftskraft',
    initiativbewerbung: 'Initiativbewerbung',
  }
  const lower = slug.toLowerCase()
  for (const [key, value] of Object.entries(map)) {
    if (lower.includes(key)) return value
  }
  return ''
}
