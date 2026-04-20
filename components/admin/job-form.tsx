'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExternalLink, Save, Loader2 } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { jobPostingSchema, type JobPostingFormData } from '@/lib/validation/schemas'
import { createJob, updateJob } from '@/lib/actions/jobs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface User {
  id: string
  firstName: string
  lastName: string
}

interface JobFormProps {
  job?: {
    id: string
    title: string
    slug: string
    department: string | null
    location: string | null
    employmentType: string
    workload: string | null
    shortIntro: string | null
    description: string | null
    requirements: string | null
    benefits: string | null
    contactPersonId: string | null
    active: boolean
    publishDate: string | Date | null
    sortOrder: number
  }
  users: User[]
}

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'VOLLZEIT', label: 'Vollzeit' },
  { value: 'TEILZEIT', label: 'Teilzeit' },
  { value: 'MINIJOB', label: 'Minijob' },
  { value: 'WERKSTUDENT', label: 'Werkstudent' },
  { value: 'PRAKTIKUM', label: 'Praktikum' },
  { value: 'FREIBERUFLICH', label: 'Freiberuflich' },
]

function formatDateForInput(date: string | Date | null | undefined): string {
  if (!date) return new Date().toISOString().split('T')[0]
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

export function JobForm({ job, users }: JobFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const slugManuallyEdited = useRef(false)
  const isEditing = !!job?.id

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: job?.title ?? '',
      slug: job?.slug ?? '',
      department: job?.department ?? '',
      location: job?.location ?? 'Unna',
      employmentType: (job?.employmentType as JobPostingFormData['employmentType']) ?? 'VOLLZEIT',
      workload: job?.workload ?? '',
      shortIntro: job?.shortIntro ?? '',
      description: job?.description ?? '',
      requirements: job?.requirements ?? '',
      benefits: job?.benefits ?? '',
      contactPersonId: job?.contactPersonId ?? '',
      active: job?.active ?? true,
      publishDate: formatDateForInput(job?.publishDate),
      sortOrder: job?.sortOrder ?? 0,
    },
  })

  const title = watch('title')
  const currentSlug = watch('slug')

  useEffect(() => {
    if (slugManuallyEdited.current) return
    if (!title) return
    const generated = slugify(title)
    if (generated !== currentSlug) {
      setValue('slug', generated)
    }
  }, [title, currentSlug, setValue])

  function onSubmit(data: JobPostingFormData) {
    setServerError(null)
    startTransition(async () => {
      const result = isEditing
        ? await updateJob(job!.id, data)
        : await createJob(data)

      if (result.success) {
        router.push('/admin/jobs')
      } else {
        setServerError(result.error ?? 'Ein Fehler ist aufgetreten')
      }
    })
  }

  const contactPersonOptions = [
    { value: '', label: 'Kein Ansprechpartner' },
    ...users.map((u) => ({
      value: u.id,
      label: `${u.firstName} ${u.lastName}`,
    })),
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
          {serverError}
        </div>
      )}

      {/* Grundinformationen */}
      <Card>
        <CardHeader>
          <CardTitle>Grundinformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Titel *"
              placeholder="z.B. Pflegefachkraft (m/w/d)"
              error={errors.title?.message}
              {...register('title')}
            />
            <Input
              label="Slug *"
              placeholder="pflegefachkraft-m-w-d"
              helperText="URL-Pfad für die Stellenanzeige"
              error={errors.slug?.message}
              {...register('slug', {
                onChange: () => {
                  slugManuallyEdited.current = true
                },
              })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Abteilung"
              placeholder="z.B. Pflege"
              error={errors.department?.message}
              {...register('department')}
            />
            <Input
              label="Standort"
              placeholder="z.B. Unna"
              error={errors.location?.message}
              {...register('location')}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Beschäftigungsart *"
              options={EMPLOYMENT_TYPE_OPTIONS}
              error={errors.employmentType?.message}
              {...register('employmentType')}
            />
            <Input
              label="Arbeitsumfang"
              placeholder="z.B. Vollzeit / Teilzeit"
              error={errors.workload?.message}
              {...register('workload')}
            />
          </div>

          <Select
            label="Ansprechpartner"
            options={contactPersonOptions}
            error={errors.contactPersonId?.message}
            {...register('contactPersonId')}
          />
        </CardContent>
      </Card>

      {/* Beschreibung */}
      <Card>
        <CardHeader>
          <CardTitle>Beschreibung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            label="Kurzeinleitung *"
            placeholder="Kurze Beschreibung der Stelle (max. 500 Zeichen)"
            rows={3}
            error={errors.shortIntro?.message}
            {...register('shortIntro')}
          />
          <Textarea
            label="Beschreibung *"
            placeholder="Ausführliche Stellenbeschreibung"
            rows={8}
            className="min-h-[200px]"
            error={errors.description?.message}
            {...register('description')}
          />
          <Textarea
            label="Anforderungen"
            placeholder="Gewünschte Qualifikationen und Erfahrungen"
            rows={5}
            error={errors.requirements?.message}
            {...register('requirements')}
          />
          <Textarea
            label="Benefits"
            placeholder="Was wir bieten"
            rows={5}
            error={errors.benefits?.message}
            {...register('benefits')}
          />
        </CardContent>
      </Card>

      {/* Einstellungen */}
      <Card>
        <CardHeader>
          <CardTitle>Einstellungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Veröffentlichungsdatum"
              type="date"
              error={errors.publishDate?.message}
              {...register('publishDate')}
            />
            <Input
              label="Sortierung"
              type="number"
              helperText="Niedrigere Werte werden zuerst angezeigt"
              error={errors.sortOrder?.message}
              {...register('sortOrder', { valueAsNumber: true })}
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-warm-700">Status</span>
              <label className="flex items-center gap-3 rounded-lg border border-warm-300 bg-white px-3 py-2.5 transition-colors hover:border-warm-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-warm-300 text-primary-500 focus:ring-primary-500"
                  {...register('active')}
                />
                <span className="text-sm text-warm-700">Aktiv (öffentlich sichtbar)</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-warm-200 pt-6">
        <div>
          {isEditing && job?.slug && (
            <a
              href={`/karriere/${job.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-primary-600"
            >
              <ExternalLink className="h-4 w-4" />
              Vorschau öffnen
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/jobs')}
            disabled={isPending}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            loading={isPending}
            icon={<Save className="h-4 w-4" />}
          >
            {isEditing ? 'Speichern' : 'Erstellen'}
          </Button>
        </div>
      </div>
    </form>
  )
}
