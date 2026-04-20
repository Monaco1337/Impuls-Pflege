'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  RotateCcw,
  Check,
  Phone,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { submitApplication } from '@/lib/actions/applicants'

// ── Brand ────────────────────────────────────────────────────────────────────
const MINT = '#18C1A3'

// ── Quiz steps ───────────────────────────────────────────────────────────────
const steps = [
  {
    headline: 'Was gibt Ihnen das Gefühl, etwas Sinnvolles zu tun?',
    options: [
      'Menschen direkt helfen und begleiten',
      'Für Entlastung im Alltag sorgen',
      'Struktur und Sicherheit im Hintergrund schaffen',
      'Ich bin noch auf der Suche',
    ],
  },
  {
    headline: 'Wie möchten Sie arbeiten?',
    options: [
      'Verantwortung übernehmen und aktiv gestalten',
      'Im Team unterstützen',
      'Mich erstmal orientieren und reinfinden',
    ],
  },
  {
    headline: 'Was passt aktuell zu Ihrem Leben?',
    options: ['Vollzeit', 'Teilzeit', 'Flexibel / Minijob'],
  },
  {
    headline: 'Wo stehen Sie gerade?',
    options: [
      'Ich bin bereits ausgebildet',
      'Ich starte gerade oder plane den Einstieg',
      'Ich komme aus einem anderen Bereich',
    ],
  },
]

// ── Types ────────────────────────────────────────────────────────────────────
type ResultKey =
  | 'pflegefachkraft'
  | 'betreuung'
  | 'pflegehilfe'
  | 'hauswirtschaft'
  | 'ausbildung'
  | 'initiativ'

type Phase = 'intro' | 'quiz' | 'result' | 'apply' | 'success'

// ── Result data ───────────────────────────────────────────────────────────────
const results: Record<
  ResultKey,
  { label: string; positionValue: string; description: string; employment: string }
> = {
  pflegefachkraft: {
    label: 'Pflegefachkraft',
    positionValue: 'Pflegefachkraft',
    description:
      'Sie übernehmen Verantwortung, begleiten Menschen im Alltag und gestalten Pflege aktiv mit.',
    employment: 'Vollzeit / Teilzeit',
  },
  betreuung: {
    label: 'Betreuungskraft',
    positionValue: 'Betreuungskraft',
    description:
      'Mit Einfühlungsvermögen schenken Sie Menschen Würde und Normalität im Alltag.',
    employment: 'Teilzeit',
  },
  pflegehilfe: {
    label: 'Pflegehilfskraft',
    positionValue: 'Pflegehilfskraft',
    description:
      'Als Pflegehilfskraft wachsen Sie mit Ihrem Team – mit echtem Rückhalt von Anfang an.',
    employment: 'Teilzeit / Minijob',
  },
  hauswirtschaft: {
    label: 'Hauswirtschaftskraft',
    positionValue: 'Hauswirtschaftskraft',
    description:
      'Hinter jedem gut versorgten Zuhause steckt Herzblut und Sorgfalt – genau das bringen Sie mit.',
    employment: 'Minijob / Teilzeit',
  },
  ausbildung: {
    label: 'Berufseinstieg & Ausbildung',
    positionValue: 'Initiativbewerbung',
    description:
      'Der Einstieg in die Pflege beginnt mit dem richtigen Team. Wir begleiten Sie von Anfang an.',
    employment: 'Vollzeit',
  },
  initiativ: {
    label: 'Initiativbewerbung',
    positionValue: 'Initiativbewerbung',
    description:
      'Wir sind offen für Menschen mit Herz, unabhängig vom Bereich. Gemeinsam finden wir den richtigen Platz.',
    employment: 'Flexibel',
  },
}

const secondaryRoles: Record<ResultKey, ResultKey | null> = {
  pflegefachkraft: 'betreuung',
  betreuung: 'pflegehilfe',
  pflegehilfe: 'ausbildung',
  hauswirtschaft: 'betreuung',
  ausbildung: 'pflegehilfe',
  initiativ: null,
}

// All selectable roles for the role switcher
const ALL_ROLES: ResultKey[] = [
  'pflegefachkraft',
  'pflegehilfe',
  'betreuung',
  'hauswirtschaft',
  'ausbildung',
  'initiativ',
]

// ── Quiz logic ────────────────────────────────────────────────────────────────
function getResult(answers: number[]): ResultKey {
  const [q1, , , q4] = answers
  if (q1 === 3) return 'initiativ'
  if (q1 === 2) return 'hauswirtschaft'
  if (q1 === 1) return 'betreuung'
  if (q4 === 0) return 'pflegefachkraft'
  if (q4 === 1) return 'ausbildung'
  return 'pflegehilfe'
}

function getEmployment(answers: number[]): string {
  return ['Vollzeit', 'Teilzeit', 'Minijob / flexibel'][answers[2]] ?? 'Vollzeit'
}

function getSituation(answers: number[]): string {
  return (
    ['Bereits ausgebildet', 'In Ausbildung / Einstieg', 'Quereinstieg'][answers[3]] ??
    'Bereits ausgebildet'
  )
}

// ── Animation variants ────────────────────────────────────────────────────────
const slide = {
  enter: { opacity: 0, x: 28, filter: 'blur(3px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -28, filter: 'blur(3px)' },
}
const fadeUp = {
  enter: { opacity: 0, y: 20, filter: 'blur(2px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(2px)' },
}
const easing = [0.16, 1, 0.3, 1] as const
const tx = { duration: 0.44, ease: easing }

// ── Sub-components ────────────────────────────────────────────────────────────
function PillOption({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2.5 text-[13px] font-[520] tracking-[-0.01em] transition-all duration-200"
      style={{
        background: active ? 'rgba(24,193,163,0.10)' : '#ffffff',
        borderColor: active ? MINT : 'rgba(0,0,0,0.09)',
        color: active ? '#0d7460' : '#334155',
        boxShadow: active ? '0 0 0 1px rgba(24,193,163,0.25)' : 'none',
      }}
    >
      {active && (
        <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full" style={{ background: MINT }} />
      )}
      {label}
    </button>
  )
}

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[12px] font-[620] uppercase tracking-[0.14em]"
        style={{ color: '#64748B' }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: MINT }}>*</span>}
      </label>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function KarriereQuiz() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedRole, setSelectedRole] = useState<ResultKey>('pflegefachkraft')
  const [showRolePicker, setShowRolePicker] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  // Form state
  const [form, setForm] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    situation: '',
    arbeitsmodell: '',
    nachricht: '',
    datenschutz: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  const quizResult =
    answers.length === steps.length ? getResult(answers) : 'pflegefachkraft'

  // ── Quiz handlers ──
  const handleAnswer = (idx: number) => {
    const next = [...answers, idx]
    setAnswers(next)
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      const role = getResult(next)
      setSelectedRole(role)
      setForm((f) => ({
        ...f,
        situation: getSituation(next),
        arbeitsmodell: getEmployment(next),
      }))
      setPhase('result')
    }
  }

  const reset = () => {
    setPhase('intro')
    setCurrentStep(0)
    setAnswers([])
    setForm({ vorname: '', nachname: '', email: '', telefon: '', situation: '', arbeitsmodell: '', nachricht: '', datenschutz: false })
    setErrors({})
    setFileName(null)
    setShowRolePicker(false)
    setSubmitError(null)
  }

  // ── Form submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof typeof form, string>> = {}
    if (!form.vorname.trim()) newErrors.vorname = 'Pflichtfeld'
    if (!form.nachname.trim()) newErrors.nachname = 'Pflichtfeld'
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Gültige E-Mail erforderlich'
    if (!form.telefon.trim()) newErrors.telefon = 'Pflichtfeld'
    if (!form.datenschutz) newErrors.datenschutz = 'Zustimmung erforderlich'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    setSubmitError(null)

    try {
      const fd = new FormData()
      fd.append('firstName', form.vorname)
      fd.append('lastName', form.nachname)
      fd.append('email', form.email)
      fd.append('phone', form.telefon)
      fd.append('positionApplied', results[selectedRole].positionValue)
      fd.append('availability', form.arbeitsmodell)
      fd.append('experience', form.situation)
      fd.append('motivation', form.nachricht)
      fd.append('privacy', 'true')
      if (fileRef.current?.files?.[0]) {
        fd.append('cv', fileRef.current.files[0])
      }

      const res = await submitApplication(fd)
      if (res?.error) {
        setSubmitError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      } else {
        setPhase('success')
      }
    } catch {
      setSubmitError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setSubmitting(false)
    }
  }

  const result = results[selectedRole]
  const secondary = secondaryRoles[quizResult]

  return (
    <section
      id="quiz-section"
      className="relative overflow-hidden py-28 sm:py-36 scroll-mt-20"
      style={{ background: '#F7FAFA' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(24,193,163,0.07) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </div>

      <Container size="xl" className="relative">
        <div className="mx-auto max-w-[600px]">
          <AnimatePresence mode="wait">

            {/* ═══ INTRO ═══ */}
            {phase === 'intro' && (
              <motion.div key="intro" variants={slide} initial="enter" animate="center" exit="exit" transition={tx}
                className="flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border px-4 py-2"
                  style={{ borderColor: 'rgba(24,193,163,0.22)', background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <span className="text-[11px] font-[640] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(24,193,163,0.85)' }}>
                    Wo gehöre ich hin?
                  </span>
                </div>

                <h2 className="mt-7 text-[clamp(1.85rem,3.8vw,2.8rem)] font-[800] leading-[1.10] tracking-[-0.040em]"
                  style={{ color: '#0F172A' }}>
                  Finden Sie den Platz,<br />
                  <span style={{ color: MINT }}>an dem Sie wirklich</span>
                  <br />etwas bewirken.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15.5px] font-[400] leading-[1.80] tracking-[-0.01em]"
                  style={{ color: '#64748B' }}>
                  Ein paar kurze Fragen – und wir zeigen Ihnen, wo Sie bei uns am besten wirken können.
                </p>

                <button onClick={() => setPhase('quiz')}
                  className="group mt-9 inline-flex h-[54px] items-center gap-3 rounded-full pl-7 pr-2.5 text-[15px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)]"
                  style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 20px -4px rgba(24,193,163,0.30)' }}>
                  Starten
                  <span className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-[1.06]"
                    style={{ background: 'rgba(255,255,255,0.20)' }}>
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </button>
                <p className="mt-5 text-[12.5px] font-[420]" style={{ color: '#94A3B8' }}>
                  4 Fragen · ca. 1 Minute · unverbindlich
                </p>
              </motion.div>
            )}

            {/* ═══ QUIZ ═══ */}
            {phase === 'quiz' && (
              <motion.div key={`step-${currentStep}`} variants={slide} initial="enter" animate="center" exit="exit" transition={tx}>
                {/* Progress */}
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex-1 overflow-hidden rounded-full" style={{ height: '3px', background: 'rgba(0,0,0,0.07)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: MINT }}
                      initial={{ width: `${(currentStep / steps.length) * 100}%` }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.55, ease: easing }} />
                  </div>
                  <span className="shrink-0 text-[12px] font-[500] tabular-nums" style={{ color: '#94A3B8' }}>
                    {currentStep + 1} / {steps.length}
                  </span>
                </div>

                <h2 className="text-[clamp(1.4rem,3vw,2.05rem)] font-[760] leading-[1.24] tracking-[-0.034em]"
                  style={{ color: '#0F172A' }}>
                  {steps[currentStep].headline}
                </h2>

                <div className="mt-8 space-y-3">
                  {steps[currentStep].options.map((option, idx) => (
                    <motion.button key={option} onClick={() => handleAnswer(idx)}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * idx, duration: 0.38, ease: easing }}
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}
                      className="group flex w-full items-center justify-between gap-4 rounded-[18px] border border-[rgba(0,0,0,0.07)] bg-white px-6 py-5 text-left shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[rgba(24,193,163,0.30)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
                      <span className="text-[15px] font-[500] leading-snug tracking-[-0.015em]" style={{ color: '#1E293B' }}>
                        {option}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-[1.07]"
                        style={{ background: 'rgba(24,193,163,0.08)', border: '1px solid rgba(24,193,163,0.20)' }}>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[2px]"
                          style={{ color: MINT }} strokeWidth={2.2} />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ RESULT ═══ */}
            {phase === 'result' && (
              <motion.div key="result" variants={slide} initial="enter" animate="center" exit="exit" transition={tx}
                className="flex flex-col items-center text-center">

                {/* Icon */}
                <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.18, duration: 0.6, ease: easing }}
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.10)', border: '1.5px solid rgba(24,193,163,0.25)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}>
                  <h2 className="mt-7 text-[clamp(1.75rem,3.5vw,2.6rem)] font-[800] leading-[1.10] tracking-[-0.040em]"
                    style={{ color: '#0F172A' }}>
                    Das passt gut zu Ihnen.
                  </h2>
                  <p className="mt-3 text-[15.5px] font-[420] leading-[1.65]" style={{ color: '#64748B' }}>
                    Basierend auf Ihren Antworten empfehlen wir Ihnen diese Rolle:
                  </p>
                </motion.div>

                {/* Primary result card */}
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.40, duration: 0.55, ease: easing }}
                  className="mt-7 w-full overflow-hidden rounded-[22px]"
                  style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
                  <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.18))` }} />
                  <div className="p-6 text-left sm:p-7">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-[680] uppercase tracking-[0.16em]"
                      style={{ background: 'rgba(24,193,163,0.10)', color: MINT, border: '1px solid rgba(24,193,163,0.22)' }}>
                      <span className="h-[5px] w-[5px] rounded-full" style={{ background: MINT }} />
                      Empfohlen für Sie
                    </span>
                    <p className="mt-3 text-[22px] font-[780] tracking-[-0.030em]" style={{ color: '#0F172A' }}>
                      {results[quizResult].label}
                    </p>
                    <p className="mt-1.5 text-[13px] font-[440]" style={{ color: '#94A3B8' }}>
                      {results[quizResult].employment}
                    </p>
                    <p className="mt-3 text-[15px] font-[420] leading-[1.70] tracking-[-0.01em]" style={{ color: '#475569' }}>
                      {results[quizResult].description}
                    </p>
                    <p className="mt-4 text-[13px] font-[430] leading-[1.60]" style={{ color: '#94A3B8' }}>
                      Sie bewerben sich als{' '}
                      <span className="font-[580]" style={{ color: '#334155' }}>
                        {results[quizResult].label} (empfohlen).
                      </span>
                      <br />
                      Natürlich besprechen wir gemeinsam, ob diese Rolle wirklich zu Ihnen passt.
                    </p>
                  </div>
                </motion.div>

                {/* Secondary suggestion */}
                {secondary && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54, duration: 0.45 }}
                    className="mt-4 text-[13px] font-[430] leading-snug" style={{ color: '#94A3B8' }}>
                    Alternativ könnte auch{' '}
                    <button onClick={() => { setSelectedRole(secondary); setPhase('apply') }}
                      className="font-[580] underline underline-offset-2 transition-colors hover:opacity-70"
                      style={{ color: '#64748B' }}>
                      {results[secondary].label}
                    </button>
                    {' '}gut zu Ihnen passen.
                  </motion.p>
                )}

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.60, duration: 0.50 }}
                  className="mt-8 flex w-full flex-col gap-3">
                  <button
                    onClick={() => { setSelectedRole(quizResult); setPhase('apply') }}
                    className="group inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)]"
                    style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 22px -4px rgba(24,193,163,0.30)' }}>
                    Jetzt unverbindlich bewerben
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                  </button>

                  <button
                    onClick={() => { setSelectedRole(quizResult); setShowRolePicker(true); setPhase('apply') }}
                    className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border text-[14px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.03)]"
                    style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}>
                    Andere Rolle wählen
                  </button>

                  <Link href="/kontakt"
                    className="inline-flex h-10 items-center justify-center gap-1.5 text-[13.5px] font-[480] tracking-[-0.01em] transition-opacity duration-300 hover:opacity-60"
                    style={{ color: '#94A3B8' }}>
                    Erstgespräch statt Bewerbung
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </Link>
                </motion.div>

                {/* Reset */}
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.40 }}
                  onClick={reset}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-[440] transition-opacity duration-300 hover:opacity-50"
                  style={{ color: '#CBD5E1' }}>
                  <RotateCcw className="h-3 w-3" strokeWidth={2} />
                  Neu starten
                </motion.button>
              </motion.div>
            )}

            {/* ═══ APPLY ═══ */}
            {phase === 'apply' && (
              <motion.div key="apply" variants={fadeUp} initial="enter" animate="center" exit="exit" transition={tx}>
                {/* Back link */}
                <button onClick={() => setPhase('result')}
                  className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-[480] transition-opacity hover:opacity-60"
                  style={{ color: '#94A3B8' }}>
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" strokeWidth={2} />
                  Zurück zum Ergebnis
                </button>

                {/* Form header */}
                <div>
                  <p className="text-[11px] font-[680] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(24,193,163,0.80)' }}>
                    Ihre Bewerbung
                  </p>
                  <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-[800] leading-[1.14] tracking-[-0.036em]"
                    style={{ color: '#0F172A' }}>
                    Unverbindlich. Persönlich. Unkompliziert.
                  </h2>
                  <p className="mt-2.5 text-[15px] font-[410] leading-[1.72] tracking-[-0.01em]"
                    style={{ color: '#475569' }}>
                    Sie bewerben sich aktuell als{' '}
                    <span className="font-[620]" style={{ color: '#0F172A' }}>{result.label}</span>{' '}
                    (empfohlen). In wenigen Schritten können Sie Ihre Anfrage absenden.
                  </p>
                </div>

                {/* Trust mini-bar */}
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    'Vorausgewählt statt langes Suchen',
                    'Persönliche Rückmeldung',
                    'Auch als Initiativbewerbung möglich',
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-[12.5px] font-[460]" style={{ color: '#64748B' }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: MINT }} strokeWidth={2.2} />
                      {t}
                    </span>
                  ))}
                </div>

                {/* Role selector card */}
                <div className="mt-8 overflow-hidden rounded-[18px]"
                  style={{ border: '1px solid rgba(24,193,163,0.28)', boxShadow: '0 4px 20px rgba(24,193,163,0.08)' }}>
                  <div className="h-[2px]" style={{ background: `linear-gradient(to right, ${MINT}, rgba(24,193,163,0.18))` }} />
                  <div className="flex items-center justify-between px-6 py-4" style={{ background: 'rgba(24,193,163,0.04)' }}>
                    <div>
                      <p className="text-[10.5px] font-[660] uppercase tracking-[0.16em]" style={{ color: MINT }}>
                        Ausgewählte Stelle
                      </p>
                      <p className="mt-0.5 text-[16px] font-[700] tracking-[-0.02em]" style={{ color: '#0F172A' }}>
                        {result.label}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRolePicker((v) => !v)}
                      className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-[540] transition-all duration-200 hover:border-[rgba(24,193,163,0.35)] hover:bg-white"
                      style={{ borderColor: 'rgba(24,193,163,0.22)', color: '#334155', background: '#ffffff' }}>
                      Ändern
                      {showRolePicker ? <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} /> : <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />}
                    </button>
                  </div>

                  {/* Role picker panel */}
                  <AnimatePresence>
                    {showRolePicker && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: easing }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2"
                          style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: '#FAFAFA' }}>
                          {ALL_ROLES.map((rk) => {
                            const r = results[rk]
                            const active = selectedRole === rk
                            return (
                              <button key={rk} type="button"
                                onClick={() => { setSelectedRole(rk); setShowRolePicker(false) }}
                                className="flex items-center justify-between rounded-[14px] border px-4 py-3.5 text-left transition-all duration-200"
                                style={{
                                  background: active ? 'rgba(24,193,163,0.08)' : '#ffffff',
                                  borderColor: active ? MINT : 'rgba(0,0,0,0.07)',
                                  boxShadow: active ? '0 0 0 1px rgba(24,193,163,0.25)' : 'none',
                                }}>
                                <div>
                                  <p className="text-[13.5px] font-[620] tracking-[-0.01em]"
                                    style={{ color: active ? '#0d7460' : '#1E293B' }}>
                                    {r.label}
                                  </p>
                                  <p className="mt-0.5 text-[11px] font-[420]" style={{ color: '#94A3B8' }}>
                                    {r.employment}
                                  </p>
                                </div>
                                {active && (
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                                    style={{ background: MINT }}>
                                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-8" noValidate>

                  {/* Section 1 – Kontakt */}
                  <div>
                    <p className="mb-5 text-[11px] font-[660] uppercase tracking-[0.18em]"
                      style={{ color: 'rgba(0,0,0,0.30)' }}>
                      Persönliche Angaben
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Vorname" required>
                        <input
                          type="text" placeholder="Maria" value={form.vorname}
                          onChange={(e) => setForm((f) => ({ ...f, vorname: e.target.value }))}
                          className="h-[50px] w-full rounded-[12px] border px-4 text-[14.5px] font-[430] outline-none transition-all duration-200"
                          style={{
                            borderColor: errors.vorname ? '#F24B6A' : 'rgba(0,0,0,0.10)',
                            background: '#ffffff',
                            color: '#0F172A',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = MINT)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = errors.vorname ? '#F24B6A' : 'rgba(0,0,0,0.10)')}
                        />
                        {errors.vorname && <p className="text-[11.5px]" style={{ color: '#F24B6A' }}>{errors.vorname}</p>}
                      </FormField>
                      <FormField label="Nachname" required>
                        <input
                          type="text" placeholder="Müller" value={form.nachname}
                          onChange={(e) => setForm((f) => ({ ...f, nachname: e.target.value }))}
                          className="h-[50px] w-full rounded-[12px] border px-4 text-[14.5px] font-[430] outline-none transition-all duration-200"
                          style={{ borderColor: errors.nachname ? '#F24B6A' : 'rgba(0,0,0,0.10)', background: '#ffffff', color: '#0F172A' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = MINT)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = errors.nachname ? '#F24B6A' : 'rgba(0,0,0,0.10)')}
                        />
                        {errors.nachname && <p className="text-[11.5px]" style={{ color: '#F24B6A' }}>{errors.nachname}</p>}
                      </FormField>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <FormField label="E-Mail" required>
                        <input
                          type="email" placeholder="maria@example.de" value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="h-[50px] w-full rounded-[12px] border px-4 text-[14.5px] font-[430] outline-none transition-all duration-200"
                          style={{ borderColor: errors.email ? '#F24B6A' : 'rgba(0,0,0,0.10)', background: '#ffffff', color: '#0F172A' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = MINT)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? '#F24B6A' : 'rgba(0,0,0,0.10)')}
                        />
                        {errors.email && <p className="text-[11.5px]" style={{ color: '#F24B6A' }}>{errors.email}</p>}
                      </FormField>
                      <FormField label="Telefon" required>
                        <input
                          type="tel" placeholder="+49 ..." value={form.telefon}
                          onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
                          className="h-[50px] w-full rounded-[12px] border px-4 text-[14.5px] font-[430] outline-none transition-all duration-200"
                          style={{ borderColor: errors.telefon ? '#F24B6A' : 'rgba(0,0,0,0.10)', background: '#ffffff', color: '#0F172A' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = MINT)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = errors.telefon ? '#F24B6A' : 'rgba(0,0,0,0.10)')}
                        />
                        {errors.telefon && <p className="text-[11.5px]" style={{ color: '#F24B6A' }}>{errors.telefon}</p>}
                      </FormField>
                    </div>
                  </div>

                  {/* Section 2 – Hintergrund */}
                  <div>
                    <p className="mb-5 text-[11px] font-[660] uppercase tracking-[0.18em]"
                      style={{ color: 'rgba(0,0,0,0.30)' }}>
                      Beruflicher Hintergrund
                    </p>
                    <div className="space-y-5">
                      <FormField label="Aktuelle Situation">
                        <div className="flex flex-wrap gap-2">
                          {['Bereits ausgebildet', 'In Ausbildung / Einstieg', 'Quereinstieg'].map((opt) => (
                            <PillOption key={opt} label={opt} active={form.situation === opt}
                              onClick={() => setForm((f) => ({ ...f, situation: opt }))} />
                          ))}
                        </div>
                      </FormField>
                      <FormField label="Gewünschtes Arbeitsmodell">
                        <div className="flex flex-wrap gap-2">
                          {['Vollzeit', 'Teilzeit', 'Minijob / flexibel'].map((opt) => (
                            <PillOption key={opt} label={opt} active={form.arbeitsmodell === opt}
                              onClick={() => setForm((f) => ({ ...f, arbeitsmodell: opt }))} />
                          ))}
                        </div>
                      </FormField>
                    </div>
                  </div>

                  {/* Section 3 – Nachricht */}
                  <div>
                    <p className="mb-5 text-[11px] font-[660] uppercase tracking-[0.18em]"
                      style={{ color: 'rgba(0,0,0,0.30)' }}>
                      Ihre Nachricht
                    </p>
                    <FormField label="Was möchten Sie uns noch mitgeben?">
                      <textarea
                        rows={4}
                        placeholder="Zum Beispiel, wann Sie starten möchten oder welche Erfahrung Sie mitbringen."
                        value={form.nachricht}
                        onChange={(e) => setForm((f) => ({ ...f, nachricht: e.target.value }))}
                        className="w-full resize-none rounded-[12px] border px-4 py-3.5 text-[14.5px] font-[430] leading-[1.65] outline-none transition-all duration-200"
                        style={{ borderColor: 'rgba(0,0,0,0.10)', background: '#ffffff', color: '#0F172A' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = MINT)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)')}
                      />
                    </FormField>
                  </div>

                  {/* Section 4 – Upload */}
                  <div>
                    <p className="mb-5 text-[11px] font-[660] uppercase tracking-[0.18em]"
                      style={{ color: 'rgba(0,0,0,0.30)' }}>
                      Lebenslauf <span className="normal-case font-[420]" style={{ color: '#94A3B8' }}>(optional)</span>
                    </p>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed py-8 transition-all duration-200 hover:border-[rgba(24,193,163,0.40)] hover:bg-[rgba(24,193,163,0.03)]"
                      style={{ borderColor: fileName ? MINT : 'rgba(0,0,0,0.12)', background: fileName ? 'rgba(24,193,163,0.04)' : '#ffffff' }}>
                      {fileName ? (
                        <>
                          <Check className="h-5 w-5" style={{ color: MINT }} strokeWidth={2} />
                          <span className="text-[13.5px] font-[520]" style={{ color: MINT }}>{fileName}</span>
                          <span className="text-[12px] font-[420]" style={{ color: '#94A3B8' }}>Klicken zum Ändern</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5" style={{ color: '#94A3B8' }} strokeWidth={1.8} />
                          <span className="text-[13.5px] font-[500]" style={{ color: '#475569' }}>Lebenslauf hochladen</span>
                          <span className="text-[12px] font-[420]" style={{ color: '#94A3B8' }}>PDF, DOC, DOCX · optional</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Section 5 – Consent */}
                  <div>
                    <label className="icon-list-stack flex cursor-pointer items-start gap-3.5">
                      <div
                        onClick={() => setForm((f) => ({ ...f, datenschutz: !f.datenschutz }))}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 transition-all duration-200"
                        style={{
                          borderColor: form.datenschutz ? MINT : (errors.datenschutz ? '#F24B6A' : 'rgba(0,0,0,0.18)'),
                          background: form.datenschutz ? MINT : '#ffffff',
                        }}>
                        {form.datenschutz && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="icon-list-prose text-[13px] font-[420] leading-[1.65]" style={{ color: '#64748B' }}>
                        Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                        <Link href="/datenschutz" className="underline underline-offset-2 transition-opacity hover:opacity-70"
                          style={{ color: '#334155' }}>
                          Datenschutzerklärung
                        </Link>{' '}
                        zu. Meine Anfrage ist unverbindlich und kann jederzeit widerrufen werden.
                      </span>
                    </label>
                    {errors.datenschutz && (
                      <p className="mt-1.5 text-[11.5px]" style={{ color: '#F24B6A' }}>{errors.datenschutz}</p>
                    )}
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="rounded-[12px] border px-4 py-3 text-[13.5px] font-[440]"
                      style={{ borderColor: 'rgba(242,75,106,0.25)', background: 'rgba(242,75,106,0.05)', color: '#c0324d' }}>
                      {submitError}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col gap-3">
                    <button type="submit" disabled={submitting}
                      className="group inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-6px_rgba(24,193,163,0.38)] disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 22px -4px rgba(24,193,163,0.30)' }}>
                      {submitting ? 'Wird gesendet …' : 'Bewerbung absenden'}
                      {!submitting && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" strokeWidth={2} />
                      )}
                    </button>

                    <Link href="/kontakt"
                      className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border text-[14px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.03)]"
                      style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}>
                      Lieber Erstgespräch vereinbaren
                    </Link>

                    <p className="text-center text-[12.5px] font-[420]" style={{ color: '#94A3B8' }}>
                      Unverbindlich und persönlich · Wir melden uns zeitnah bei Ihnen
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ═══ SUCCESS ═══ */}
            {phase === 'success' && (
              <motion.div key="success" variants={fadeUp} initial="enter" animate="center" exit="exit" transition={tx}
                className="flex flex-col items-center text-center">

                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.7, ease: easing }}
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.10)', border: '2px solid rgba(24,193,163,0.28)' }}>
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.5, ease: easing }}>
                    <Check className="h-9 w-9" style={{ color: MINT }} strokeWidth={2} />
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
                  <h2 className="mt-7 text-[clamp(1.75rem,3.5vw,2.6rem)] font-[800] leading-[1.10] tracking-[-0.040em]"
                    style={{ color: '#0F172A' }}>
                    Danke für Ihre Bewerbung.
                  </h2>
                  <p className="mt-4 max-w-[400px] text-[15.5px] font-[420] leading-[1.78] tracking-[-0.01em]"
                    style={{ color: '#475569' }}>
                    Wir haben Ihre Anfrage erhalten und melden uns{' '}
                    <span className="font-[580]" style={{ color: '#334155' }}>persönlich bei Ihnen.</span>{' '}
                    Wenn Sie möchten, können Sie uns auch direkt anrufen.
                  </p>
                </motion.div>

                {/* Role confirmation */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 0.5 }}
                  className="mt-7 w-full rounded-[18px] px-6 py-5"
                  style={{ background: 'rgba(24,193,163,0.07)', border: '1px solid rgba(24,193,163,0.18)' }}>
                  <p className="text-[12.5px] font-[440]" style={{ color: '#64748B' }}>
                    Bewerbung als{' '}
                    <span className="font-[660]" style={{ color: '#0d7460' }}>{result.label}</span>
                    {' '}· Wir freuen uns auf das Gespräch.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}
                  className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                  <Link href="/karriere"
                    className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full border text-[14px] font-[510] tracking-[-0.01em] transition-all duration-300 hover:border-[rgba(24,193,163,0.28)] hover:bg-[rgba(24,193,163,0.03)]"
                    style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155' }}>
                    Zurück zur Karriereseite
                  </Link>
                  <a href="tel:+4923032920589"
                    className="inline-flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full text-[14.5px] font-[640] tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-6px_rgba(24,193,163,0.36)]"
                    style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 22px -4px rgba(24,193,163,0.30)' }}>
                    <Phone className="h-4 w-4" strokeWidth={1.8} />
                    Jetzt anrufen
                  </a>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
