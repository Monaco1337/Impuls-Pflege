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
import { FadeIn } from '@/components/animations/fade-in'
import { applicationSchema, type ApplicationFormData } from '@/lib/validation/schemas'
import { submitApplication } from '@/lib/actions/applicants'
import { ArrowRight, User, Briefcase, Heart, FileText, AlertCircle } from 'lucide-react'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const MINT = '#18C1A3'
const PINK = '#F24B6A'

const positionOptions = [
  { value: 'Pflegefachkraft',     label: 'Pflegefachkraft (m/w/d)' },
  { value: 'Pflegehilfskraft',    label: 'Pflegehilfskraft (m/w/d)' },
  { value: 'Betreuungskraft',     label: 'Betreuungskraft (m/w/d)' },
  { value: 'Hauswirtschaftskraft',label: 'Hauswirtschaftskraft (m/w/d)' },
  { value: 'Initiativbewerbung',  label: 'Initiativbewerbung' },
]

interface SectionProps {
  icon: React.ReactNode
  number: string
  title: string
  description: string
  children: React.ReactNode
  delay?: number
}

function FormSection({ icon, number, title, description, children, delay = 0 }: SectionProps) {
  return (
    <FadeIn delay={delay} direction="up" distance={20}>
      <div
        className="overflow-hidden rounded-[20px] border bg-white"
        style={{
          borderColor: 'rgba(0,0,0,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)',
        }}
      >
        {/* Section header */}
        <div
          className="flex items-center gap-4 border-b px-7 py-5"
          style={{ borderColor: 'rgba(0,0,0,0.05)', background: 'rgba(247,250,250,0.60)' }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: 'rgba(24,193,163,0.10)' }}
          >
            <span style={{ color: MINT }}>{icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-[600] tracking-[0.08em]" style={{ color: MINT }}>
                {number}
              </span>
              <span className="h-px w-4 bg-warm-200" />
              <h2 className="text-[15.5px] font-[680] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                {title}
              </h2>
            </div>
            <p className="mt-0.5 text-[12.5px] font-[420]" style={{ color: '#94a3b8' }}>
              {description}
            </p>
          </div>
        </div>

        {/* Section body */}
        <div className="px-7 py-6">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

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
      firstName:       '',
      lastName:        '',
      email:           '',
      phone:           '',
      address:         '',
      positionApplied: resolvePosition(preselectedPosition),
      availability:    '',
      qualification:   '',
      experience:      '',
      motivation:      '',
    },
  })

  const onCvChange   = useCallback((files: File[]) => setCvFiles(files), [])
  const onDocsChange = useCallback((files: File[]) => setDocFiles(files), [])

  const onSubmit = async (data: ApplicationFormData) => {
    setServerError(null)
    const formData = new FormData()
    const { privacy, ...fields } = data
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value))
    })
    if (privacy === true) {
      formData.append('privacy', 'true')
    }
    if (cvFiles[0]) {
      formData.append('cv', cvFiles[0])
      formData.append('documents', cvFiles[0])
    }
    for (const file of docFiles) formData.append('documents', file)

    try {
      const result = await submitApplication(formData)
      if (result.success) {
        router.push('/bewerbung/danke')
      } else {
        setServerError(result.error ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      setServerError('Die Bewerbung konnte nicht gesendet werden. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* Server error — nicht in FadeIn: sonst opacity 0 solange nicht im Viewport (Nutzer scrollt unten zum Absenden). */}
      {serverError && (
        <div
          className="flex items-start gap-3 rounded-[14px] border px-5 py-4 text-sm"
          style={{ borderColor: 'rgba(242,75,106,0.25)', background: 'rgba(242,75,106,0.04)', color: '#b91c1c' }}
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: PINK }} />
          {serverError}
        </div>
      )}

      {/* 1 — Persönliche Daten */}
      <FormSection
        number="01"
        icon={<User className="h-4 w-4" strokeWidth={1.8} />}
        title="Persönliche Daten"
        description="Wie können wir Sie erreichen?"
        delay={0.05}
      >
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
            placeholder="02303 2920589"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <div className="sm:col-span-2">
            <Input
              label="Adresse"
              placeholder="Massener Str. 147, 59423 Unna"
              error={errors.address?.message}
              {...register('address')}
            />
          </div>
        </div>
      </FormSection>

      {/* 2 — Zur Stelle */}
      <FormSection
        number="02"
        icon={<Briefcase className="h-4 w-4" strokeWidth={1.8} />}
        title="Zur Stelle"
        description="Für welche Position interessieren Sie sich?"
        delay={0.10}
      >
        <div className="grid gap-4 sm:grid-cols-2">
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
      </FormSection>

      {/* 3 — Motivation */}
      <FormSection
        number="03"
        icon={<Heart className="h-4 w-4" strokeWidth={1.8} />}
        title="Motivation"
        description="Warum möchten Sie bei IMPULS arbeiten?"
        delay={0.15}
      >
        <Textarea
          label="Ihr Motivationsschreiben"
          placeholder="Erzählen Sie uns, was Sie antreibt und warum Sie Teil unseres Teams werden möchten..."
          rows={6}
          error={errors.motivation?.message}
          {...register('motivation')}
        />
      </FormSection>

      {/* 4 — Dokumente */}
      <FormSection
        number="04"
        icon={<FileText className="h-4 w-4" strokeWidth={1.8} />}
        title="Dokumente"
        description="Laden Sie Ihren Lebenslauf und weitere Unterlagen hoch."
        delay={0.20}
      >
        <div className="space-y-4">
          <FileUpload
            label="Lebenslauf"
            accept=".pdf,.doc,.docx"
            maxSizeMB={4}
            onChange={onCvChange}
            helperText="PDF, DOC oder DOCX - max. 4 MB"
          />
          <FileUpload
            label="Weitere Dokumente"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            maxSizeMB={4}
            multiple
            onChange={onDocsChange}
            helperText="Zeugnisse, Zertifikate etc. - max. 4 MB pro Datei"
          />
        </div>
      </FormSection>

      {/* Datenschutz + Submit */}
      <FadeIn delay={0.25} direction="up" distance={16}>
        <div
          className="rounded-[20px] border bg-white px-7 py-6"
          style={{ borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
        >
          {/* Datenschutz checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-warm-300 focus:ring-2 focus:ring-offset-1"
              style={{ accentColor: MINT }}
              {...register('privacy')}
            />
            <label htmlFor="privacy" className="cursor-pointer text-[13.5px] leading-[1.65]" style={{ color: '#475569' }}>
              Ich habe die{' '}
              <Link
                href="/datenschutz"
                target="_blank"
                className="font-[530] underline underline-offset-2 transition-colors duration-150"
                style={{ color: MINT }}
              >
                Datenschutzerklärung
              </Link>{' '}
              gelesen und stimme der Verarbeitung meiner personenbezogenen Daten
              im Rahmen des Bewerbungsverfahrens zu. *
            </label>
          </div>
          {errors.privacy?.message && (
            <p className="mt-2 text-xs" style={{ color: PINK }} role="alert">
              {errors.privacy.message}
            </p>
          )}

          {/* Submit row */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <p className="text-[12px]" style={{ color: '#94a3b8' }}>* Pflichtfelder</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-[13px] pl-6 pr-5 text-[15px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
              style={{
                background: isSubmitting
                  ? '#94a3b8'
                  : `linear-gradient(135deg, ${MINT} 0%, #20C9AA 100%)`,
                boxShadow: isSubmitting
                  ? 'none'
                  : `0 6px 24px rgba(24,193,163,0.32), inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-600 group-hover:translate-x-full"
              />
              {isSubmitting ? 'Wird gesendet…' : 'Bewerbung absenden'}
              {!isSubmitting && (
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.18] transition-all duration-300 group-hover:bg-white/[0.26]">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2.2} />
                </span>
              )}
            </button>
          </div>
        </div>
      </FadeIn>

    </form>
  )
}

function resolvePosition(slug?: string): string {
  if (!slug) return ''
  const map: Record<string, string> = {
    pflegefachkraft:     'Pflegefachkraft',
    pflegehilfskraft:    'Pflegehilfskraft',
    betreuungskraft:     'Betreuungskraft',
    hauswirtschaftskraft:'Hauswirtschaftskraft',
    initiativbewerbung:  'Initiativbewerbung',
  }
  const lower = slug.toLowerCase()
  for (const [key, value] of Object.entries(map)) {
    if (lower.includes(key)) return value
  }
  return ''
}
