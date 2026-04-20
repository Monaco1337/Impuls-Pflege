'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Send,
  AlertCircle,
  Phone,
  ChevronDown,
  User,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { inquirySchema, type InquiryFormData } from '@/lib/validation/schemas'
import { submitInquiry } from '@/lib/actions/inquiries'

const inquiryTypes = [
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
      setServerError(result.error ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 text-center sm:py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 mx-auto h-24 w-24 rounded-full bg-primary-100/60 blur-2xl" />
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-50 ring-8 ring-primary-50/50">
            <CheckCircle2 className="h-10 w-10 text-primary-600" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="mt-8 text-[24px] font-[700] tracking-[-0.035em] text-warm-900">
            Vielen Dank!
          </h3>
          <p className="mt-1.5 text-[16px] font-[450] tracking-[-0.01em] text-primary-600/80">
            Ihre Nachricht wurde erfolgreich gesendet.
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-4 max-w-sm text-[15px] font-[400] leading-[1.7] text-warm-500"
        >
          Unser Team meldet sich innerhalb von <strong className="font-[560] text-warm-700">1–2 Werktagen</strong> bei Ihnen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="icon-list-stack mt-8 inline-flex items-start gap-2.5 rounded-2xl bg-primary-50/80 px-5 py-3 text-[13.5px] font-[530] text-primary-700"
        >
          <Phone className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="icon-list-prose">Dringend? 02303 2920589</span>
        </motion.div>
      </motion.div>
    )
  }

  const fieldClasses = cn(
    'h-[52px] w-full rounded-[14px] border bg-[#FAFAFA] px-5 text-[15px] font-[430] tracking-[-0.01em] outline-none transition-all duration-300',
    'placeholder:text-[rgba(0,0,0,0.28)]',
    'hover:border-[rgba(24,193,163,0.28)] hover:bg-white',
    'focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]',
  )
  const fieldStyle = { borderColor: 'rgba(0,0,0,0.09)', color: '#0F172A' }

  const labelClasses = 'mb-2 flex items-center gap-1.5 text-[12.5px] font-[580] tracking-[0.01em] uppercase'
  const labelStyle = { color: '#64748b' }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-2xl border border-error-200 bg-error-50/60 p-5" role="alert">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error-500" />
              <p className="text-[14px] font-[460] leading-[1.6] text-error-700">{serverError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Kontaktdaten ── */}
      <div className="space-y-5">
        {/* Section label */}
        <p className="text-[10.5px] font-[660] uppercase tracking-[0.20em]" style={{ color: 'rgba(24,193,163,0.75)' }}>
          Kontaktdaten
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClasses} style={labelStyle}>
              Vollständiger Name <span style={{ color: '#18C1A3' }}>*</span>
            </label>
            <input
              id="fullName"
              placeholder="Max Mustermann"
              className={cn(fieldClasses, errors.fullName ? 'border-red-300 shadow-[0_0_0_4px_rgba(220,38,38,0.05)]' : '')}
              style={fieldStyle}
              {...register('fullName')}
            />
            {errors.fullName && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-[480] text-red-500">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName.message}
              </motion.p>
            )}
          </div>
          <div>
            <label htmlFor="email" className={labelClasses} style={labelStyle}>
              E-Mail <span style={{ color: '#18C1A3' }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="max@beispiel.de"
              className={cn(fieldClasses, errors.email ? 'border-red-300 shadow-[0_0_0_4px_rgba(220,38,38,0.05)]' : '')}
              style={fieldStyle}
              {...register('email')}
            />
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-[480] text-red-500">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
              </motion.p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClasses} style={labelStyle}>
              Telefonnummer
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="02303 2920589"
              className={fieldClasses}
              style={fieldStyle}
              {...register('phone')}
            />
          </div>
          <div>
            <label htmlFor="inquiryType" className={labelClasses} style={labelStyle}>
              Art der Anfrage <span style={{ color: '#18C1A3' }}>*</span>
            </label>
            <div className="relative">
              <select
                id="inquiryType"
                className={cn(
                  'h-[52px] w-full appearance-none rounded-[14px] border bg-[#FAFAFA] px-5 pr-12 text-[15px] font-[430] tracking-[-0.01em] outline-none transition-all duration-300',
                  'hover:border-[rgba(24,193,163,0.28)] hover:bg-white focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]',
                  errors.inquiryType ? 'border-red-300' : '',
                )}
                style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#0F172A' }}
                defaultValue=""
                {...register('inquiryType')}
              >
                <option value="" disabled>Bitte wählen</option>
                {inquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'rgba(0,0,0,0.30)' }} />
            </div>
            {errors.inquiryType && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-[480] text-red-500">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.inquiryType.message}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-7 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />

      {/* ── Nachricht ── */}
      <div className="space-y-5">
        <p className="text-[10.5px] font-[660] uppercase tracking-[0.20em]" style={{ color: 'rgba(24,193,163,0.75)' }}>
          Ihre Nachricht
        </p>

        <div>
          <label htmlFor="message" className={labelClasses} style={labelStyle}>
            Beschreiben Sie Ihr Anliegen <span style={{ color: '#18C1A3' }}>*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Wie können wir Ihnen helfen? Beschreiben Sie Ihre Situation, Ihre Fragen oder Ihren Wunsch nach Beratung..."
            className={cn(
              'w-full resize-none rounded-[14px] border bg-[#FAFAFA] px-5 py-4 text-[15px] font-[430] leading-[1.65] tracking-[-0.01em] outline-none transition-all duration-300',
              'placeholder:text-[rgba(0,0,0,0.28)]',
              'hover:border-[rgba(24,193,163,0.28)] hover:bg-white focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]',
              errors.message ? 'border-red-300' : '',
            )}
            style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#0F172A' }}
            {...register('message')}
          />
          {errors.message && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-[480] text-red-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.message.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="preferredCallback" className={labelClasses} style={labelStyle}>
            Rückruftermin (optional)
          </label>
          <input
            id="preferredCallback"
            placeholder="z.B. Dienstag, 14:00 Uhr"
            className={fieldClasses}
            style={fieldStyle}
            {...register('preferredCallback')}
          />
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[12px] font-[420]" style={{ color: '#94a3b8' }}>
          <span style={{ color: '#18C1A3' }}>*</span> Pflichtfelder · Vertraulich behandelt.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[14.5px] font-[620] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #18C1A3, #20C9AA)',
            boxShadow: '0 6px 20px -4px rgba(24,193,163,0.30)',
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet...
            </>
          ) : (
            <>
              Nachricht senden
              <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5" style={{ background: 'rgba(255,255,255,0.22)' }}>
                <Send className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
