'use client'

import { useState, useRef, useCallback, type FormEvent, type ChangeEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Phone,
  Shield,
  HeartPulse,
  Pill,
  Activity,
  Brain,
  Home,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  AlertCircle,
  ChevronDown,
  Sparkles,
  Heart,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────────────────────── Step Config ─────────────────────── */

const STEPS: { id: string; label: string; short: string; icon: LucideIcon; hint: string }[] = [
  { id: 'person',        label: 'Persönliche Daten',           short: 'Person',        icon: User,          hint: 'Wer wird gepflegt?' },
  { id: 'kontakt',       label: 'Kontaktperson',               short: 'Kontakt',       icon: Phone,         hint: 'Wen dürfen wir anrufen?' },
  { id: 'versicherung',  label: 'Versicherung',                short: 'Versicherung',  icon: Shield,        hint: 'Kasse & Pflegegrad' },
  { id: 'diagnosen',     label: 'Diagnosen',                   short: 'Diagnosen',     icon: HeartPulse,    hint: 'Aktuelle Gesundheit' },
  { id: 'medikation',    label: 'Medikation & Hilfsmittel',    short: 'Medikation',    icon: Pill,          hint: 'Medikamente & Allergien' },
  { id: 'mobilitaet',    label: 'Mobilität & Alltag',          short: 'Mobilität',     icon: Activity,      hint: 'Wie läuft der Alltag?' },
  { id: 'kognition',     label: 'Kognition & Psyche',          short: 'Kognition',     icon: Brain,         hint: 'Geistiges Wohlbefinden' },
  { id: 'wohnsituation', label: 'Wohnsituation',               short: 'Wohnung',       icon: Home,          hint: 'Ihr Zuhause' },
  { id: 'pflegebedarf',  label: 'Pflegebedarf & Wünsche',      short: 'Wünsche',       icon: ClipboardList, hint: 'Was benötigen Sie?' },
  { id: 'abschluss',     label: 'Einwilligung & Absenden',     short: 'Absenden',      icon: CheckCircle2,  hint: 'Fast geschafft!' },
]

type FormData = Record<string, string | boolean>

/* ─────────────────────── Primitives ─────────────────────── */

const inputBase = [
  'h-[52px] w-full rounded-[14px] border bg-[#FAFAFA] px-5 text-[15px] font-[430] tracking-[-0.01em] outline-none transition-all duration-300',
  'placeholder:text-[rgba(0,0,0,0.28)]',
  'hover:border-[rgba(24,193,163,0.28)] hover:bg-white',
  'focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]',
].join(' ')

const inputStyle = { borderColor: 'rgba(0,0,0,0.09)', color: '#0F172A' }
const labelBase = 'mb-2 block text-[11px] font-[640] uppercase tracking-[0.14em]'
const labelStyle = { color: '#64748b' }

function FormField({ label, name, value, onChange, type = 'text', placeholder, required, error, className }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string; placeholder?: string; required?: boolean; error?: string; className?: string; icon?: LucideIcon
}) {
  return (
    <div className={cn('group', className)}>
      <label htmlFor={name} className={labelBase} style={labelStyle}>
        {label}{required && <span className="ml-1" style={{ color: '#18C1A3' }}>*</span>}
      </label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className={cn(inputBase, error ? 'border-red-300 shadow-[0_0_0_4px_rgba(220,38,38,0.05)]' : '')}
        style={inputStyle}
      />
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-[480] text-red-500">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </motion.p>
      )}
    </div>
  )
}

function TextareaField({ label, name, value, onChange, placeholder, required, rows = 4, helper, className }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string; required?: boolean; rows?: number; helper?: string; className?: string
}) {
  return (
    <div className={cn('group', className)}>
      <label htmlFor={name} className={labelBase} style={labelStyle}>
        {label}{required && <span className="ml-1" style={{ color: '#18C1A3' }}>*</span>}
      </label>
      <textarea
        id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={rows}
        className="w-full resize-none rounded-[14px] border bg-[#FAFAFA] px-5 py-4 text-[15px] font-[430] leading-[1.65] tracking-[-0.01em] outline-none transition-all duration-300 placeholder:text-[rgba(0,0,0,0.28)] hover:border-[rgba(24,193,163,0.28)] hover:bg-white focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]"
        style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#0F172A' }}
      />
      {helper && <p className="mt-2 text-[12px] font-[420] leading-[1.55]" style={{ color: '#94a3b8' }}>{helper}</p>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, required, placeholder, className }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]; required?: boolean; placeholder?: string; className?: string
}) {
  return (
    <div className={cn('group', className)}>
      <label htmlFor={name} className={labelBase} style={labelStyle}>
        {label}{required && <span className="ml-1" style={{ color: '#18C1A3' }}>*</span>}
      </label>
      <div className="relative">
        <select
          id={name} name={name} value={value} onChange={onChange} required={required}
          className={cn(
            'h-[52px] w-full appearance-none rounded-[14px] border bg-[#FAFAFA] px-5 pr-12 text-[15px] font-[430] tracking-[-0.01em] outline-none transition-all duration-300',
            'hover:border-[rgba(24,193,163,0.28)] hover:bg-white focus:border-[rgba(24,193,163,0.50)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,193,163,0.07)]',
          )}
          style={{ borderColor: 'rgba(0,0,0,0.09)', color: value ? '#0F172A' : 'rgba(0,0,0,0.28)' }}
        >
          <option value="">{placeholder ?? 'Bitte wählen'}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'rgba(0,0,0,0.30)' }} />
      </div>
    </div>
  )
}

function OptionPill({ label, selected, onClick, icon: Icon }: {
  label: string; selected: boolean; onClick: () => void; icon?: LucideIcon
}) {
  return (
    <button type="button" onClick={onClick}
      className="relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13.5px] font-[500] tracking-[-0.01em] transition-all duration-200"
      style={selected
        ? { borderColor: 'rgba(24,193,163,0.40)', background: 'rgba(24,193,163,0.07)', color: '#0d7460', boxShadow: '0 0 0 1px rgba(24,193,163,0.20)' }
        : { borderColor: 'rgba(0,0,0,0.09)', background: '#FAFAFA', color: '#475569' }
      }
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: selected ? '#18C1A3' : 'rgba(0,0,0,0.28)' }} />}
      {label}
      {selected && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}
          className="flex h-4.5 w-4.5 items-center justify-center rounded-full"
          style={{ background: '#18C1A3', minWidth: '18px', minHeight: '18px' }}>
          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        </motion.span>
      )}
    </button>
  )
}

function CardCheckbox({ label, name, checked, onChange, description, icon: Icon, className }: {
  label: string; name: string; checked: boolean; onChange: (e: ChangeEvent<HTMLInputElement>) => void
  description?: string; icon?: LucideIcon; className?: string
}) {
  return (
    <label className={cn('group flex cursor-pointer items-start gap-4 rounded-[16px] border p-5 transition-all duration-200', className)}
      style={checked
        ? { borderColor: 'rgba(24,193,163,0.35)', background: 'rgba(24,193,163,0.04)', boxShadow: '0 0 0 1px rgba(24,193,163,0.16)' }
        : { borderColor: 'rgba(0,0,0,0.08)', background: '#FAFAFA' }
      }>
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200"
        style={checked
          ? { borderColor: '#18C1A3', background: '#18C1A3' }
          : { borderColor: 'rgba(0,0,0,0.18)', background: 'white' }
        }>
        {checked && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}>
            <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
          </motion.div>
        )}
      </div>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" style={{ color: checked ? '#18C1A3' : 'rgba(0,0,0,0.30)' }} />}
          <span className="text-[14px] font-[540] tracking-[-0.01em]" style={{ color: checked ? '#0d7460' : '#334155' }}>
            {label}
          </span>
        </div>
        {description && (
          <p className="mt-1.5 text-[12.5px] font-[420] leading-[1.58]" style={{ color: '#94a3b8' }}>
            {description}
          </p>
        )}
      </div>
    </label>
  )
}

function RadioGroup({ label, name, value, onChange, options, required }: {
  label: string; name: string; value: string; onChange: (val: string) => void
  options: { value: string; label: string; icon?: LucideIcon }[]; required?: boolean
}) {
  return (
    <div>
      <p className={cn(labelBase, 'mb-3')} style={labelStyle}>
        {label}{required && <span className="ml-1" style={{ color: '#18C1A3' }}>*</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <OptionPill key={o.value} label={o.label} selected={value === o.value} onClick={() => onChange(o.value)} icon={o.icon} />
        ))}
      </div>
    </div>
  )
}

function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[20px] border bg-white p-6 sm:p-8', className)}
      style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      {children}
    </div>
  )
}

function SubHeading({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {Icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: 'rgba(24,193,163,0.09)', border: '1px solid rgba(24,193,163,0.18)' }}>
          <Icon className="h-4 w-4" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
        </div>
      )}
      <h4 className="text-[15px] font-[660] tracking-[-0.022em]" style={{ color: '#0F172A' }}>{children}</h4>
    </div>
  )
}

function Spacer() { return <div className="h-8" /> }

/* ─────────────────────── Animation ─────────────────────── */

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, filter: 'blur(4px)' }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, filter: 'blur(4px)' }),
}

/* ─────────────────────── Main Component ─────────────────────── */

export function AnamnesebogenForm() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState<FormData>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const total = STEPS.length
  const pct = Math.round(((step + 1) / total) * 100)

  const get = useCallback((k: string) => (data[k] as string) ?? '', [data])
  const getBool = useCallback((k: string) => (data[k] as boolean) ?? false, [data])
  const set = (k: string, v: string | boolean) => {
    setData((p) => ({ ...p, [k]: v }))
    setErrors((p) => { const n = { ...p }; delete n[k]; return n })
  }
  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    set(name, type === 'checkbox' ? (e.target as HTMLInputElement).checked : value)
  }

  const validate = (): boolean => {
    const err: Record<string, string> = {}
    if (step === 0) {
      if (!get('vorname')) err.vorname = 'Bitte Vornamen eingeben'
      if (!get('nachname')) err.nachname = 'Bitte Nachnamen eingeben'
      if (!get('geburtsdatum')) err.geburtsdatum = 'Bitte Geburtsdatum eingeben'
      if (!get('telefon')) err.telefon = 'Bitte Telefonnummer eingeben'
    }
    if (step === 9) {
      if (!getBool('datenschutz')) err.datenschutz = 'Einwilligung erforderlich'
      if (!getBool('richtigkeit')) err.richtigkeit = 'Bestätigung erforderlich'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const nav = (target: number) => {
    if (target > step && !validate()) return
    if (target < 0 || target >= total) return
    setDir(target > step ? 1 : -1)
    setStep(target)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/anamnesebogen', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) setSubmitted(true)
    } catch { /* handled */ } finally { setSubmitting(false) }
  }

  /* ───── Success ───── */
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[520px] py-16 text-center sm:py-24">
        {/* Icon */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto mb-2">
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'rgba(24,193,163,0.15)' }} />
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(24,193,163,0.14), rgba(24,193,163,0.06))', border: '2px solid rgba(24,193,163,0.28)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#18C1A3" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
          <p className="text-[11px] font-[660] uppercase tracking-[0.22em]" style={{ color: 'rgba(24,193,163,0.80)' }}>
            Übermittelt
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.5rem)] font-[820] tracking-[-0.044em]" style={{ color: '#0F172A' }}>
            Vielen Dank!
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54 }}
          className="mx-auto mt-5 max-w-[400px] text-[15.5px] font-[420] leading-[1.76] tracking-[-0.01em]"
          style={{ color: '#475569' }}>
          Unser Pflegeteam prüft Ihren Anamnesebogen sorgfältig und meldet sich innerhalb von{' '}
          <strong className="font-[620]" style={{ color: '#0F172A' }}>1–2 Werktagen</strong> bei Ihnen,
          um das persönliche Erstgespräch zu vereinbaren.
        </motion.p>

        <motion.a href="tel:+4923032920589" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }}
          className="mt-9 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-[580] text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 6px 20px -4px rgba(24,193,163,0.28)' }}>
          <Phone className="h-4 w-4" strokeWidth={2} />
          Bei Fragen: 02303 2920589
        </motion.a>
      </motion.div>
    )
  }

  /* ───── Steps Content ───── */
  const steps: (() => ReactNode)[] = [
    /* 0 – Person */
    () => (
      <>
        <RadioGroup label="Anrede" name="anrede" value={get('anrede')} onChange={(v) => set('anrede', v)} options={[
          { value: 'Frau', label: 'Frau' }, { value: 'Herr', label: 'Herr' }, { value: 'Divers', label: 'Divers' },
        ]} />
        <Spacer />
        <SectionCard>
          <SubHeading icon={User}>Stammdaten</SubHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Vorname" name="vorname" value={get('vorname')} onChange={handle} required error={errors.vorname} placeholder="Max" />
            <FormField label="Nachname" name="nachname" value={get('nachname')} onChange={handle} required error={errors.nachname} placeholder="Mustermann" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField label="Geburtsdatum" name="geburtsdatum" type="date" value={get('geburtsdatum')} onChange={handle} required error={errors.geburtsdatum} />
            <FormField label="Geburtsort" name="geburtsort" value={get('geburtsort')} onChange={handle} placeholder="Unna" />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={Home}>Adresse</SubHeading>
          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <FormField label="Straße & Hausnummer" name="strasse" value={get('strasse')} onChange={handle} placeholder="Massener Str. 147" />
            <FormField label="Etage / Whg." name="etage" value={get('etage')} onChange={handle} placeholder="2. OG links" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_2fr]">
            <FormField label="PLZ" name="plz" value={get('plz')} onChange={handle} placeholder="59423" />
            <FormField label="Ort" name="ort" value={get('ort')} onChange={handle} placeholder="Unna" />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={Phone}>Erreichbarkeit</SubHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Telefon" name="telefon" type="tel" value={get('telefon')} onChange={handle} required error={errors.telefon} placeholder="02303 2920589" />
            <FormField label="E-Mail (optional)" name="email" type="email" value={get('email')} onChange={handle} placeholder="max@beispiel.de" />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Weitere Angaben</SubHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Staatsangehörigkeit" name="staatsangehoerigkeit" value={get('staatsangehoerigkeit')} onChange={handle} placeholder="Deutsch" />
            <FormField label="Konfession" name="konfession" value={get('konfession')} onChange={handle} placeholder="z.B. evangelisch" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <SelectField label="Familienstand" name="familienstand" value={get('familienstand')} onChange={handle} options={[
              { value: 'ledig', label: 'Ledig' }, { value: 'verheiratet', label: 'Verheiratet' }, { value: 'geschieden', label: 'Geschieden' },
              { value: 'verwitwet', label: 'Verwitwet' }, { value: 'lebenspartnerschaft', label: 'Eingetragene LP' },
            ]} />
            <FormField label="Gewicht (kg)" name="gewicht" value={get('gewicht')} onChange={handle} placeholder="75" />
            <FormField label="Größe (cm)" name="groesse" value={get('groesse')} onChange={handle} placeholder="170" />
          </div>
        </SectionCard>
      </>
    ),

    /* 1 – Kontakt */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Phone}>Ansprechperson / Notfallkontakt</SubHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Vorname" name="kontakt_vorname" value={get('kontakt_vorname')} onChange={handle} placeholder="Lisa" />
            <FormField label="Nachname" name="kontakt_nachname" value={get('kontakt_nachname')} onChange={handle} placeholder="Mustermann" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField label="Verhältnis" name="kontakt_verhaeltnis" value={get('kontakt_verhaeltnis')} onChange={handle} placeholder="Tochter, Ehepartner..." />
            <FormField label="Telefon" name="kontakt_telefon" type="tel" value={get('kontakt_telefon')} onChange={handle} placeholder="0171 / 123 4567" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField label="E-Mail" name="kontakt_email" type="email" value={get('kontakt_email')} onChange={handle} placeholder="lisa@beispiel.de" />
            <FormField label="Adresse (falls abweichend)" name="kontakt_adresse" value={get('kontakt_adresse')} onChange={handle} placeholder="Andere Straße 5, Unna" />
          </div>
        </SectionCard>
        <Spacer />
        <div className="grid gap-3 sm:grid-cols-2">
          <CardCheckbox label="Vorsorgevollmacht vorhanden" name="kontakt_vollmacht" checked={getBool('kontakt_vollmacht')} onChange={handle} description="Unser Team bespricht die Unterlagen beim Erstgespräch." icon={Shield} />
          <CardCheckbox label="Patientenverfügung vorhanden" name="patientenverfuegung" checked={getBool('patientenverfuegung')} onChange={handle} description="Bitte zum Erstgespräch mitbringen." icon={ClipboardList} />
        </div>
        <Spacer />
        <SectionCard>
          <SubHeading icon={HeartPulse}>Hausarzt / Behandelnder Arzt</SubHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Arzt / Praxis" name="arzt_name" value={get('arzt_name')} onChange={handle} placeholder="Dr. Schmidt" />
            <FormField label="Telefon Praxis" name="arzt_telefon" type="tel" value={get('arzt_telefon')} onChange={handle} placeholder="02303 / 987 654" />
          </div>
          <div className="mt-5">
            <FormField label="Adresse der Praxis" name="arzt_adresse" value={get('arzt_adresse')} onChange={handle} placeholder="Arztweg 10, 59423 Unna" />
          </div>
        </SectionCard>
      </>
    ),

    /* 2 – Versicherung */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Shield}>Krankenversicherung</SubHeading>
          <RadioGroup label="Art der Versicherung" name="versicherungsart" value={get('versicherungsart')} onChange={(v) => set('versicherungsart', v)} options={[
            { value: 'gesetzlich', label: 'Gesetzlich versichert' }, { value: 'privat', label: 'Privat versichert' }, { value: 'beihilfe', label: 'Beihilfe' },
          ]} />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <FormField label="Krankenkasse / Versicherung" name="krankenkasse" value={get('krankenkasse')} onChange={handle} placeholder="AOK, TK, Barmer..." />
            <FormField label="Versichertennummer" name="versichertennummer" value={get('versichertennummer')} onChange={handle} placeholder="A123456789" />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={ClipboardList}>Pflegegrad</SubHeading>
          <RadioGroup label="Liegt ein Pflegegrad vor?" name="pflegegrad_vorhanden" value={get('pflegegrad_vorhanden')} onChange={(v) => set('pflegegrad_vorhanden', v)} options={[
            { value: 'ja', label: 'Ja' }, { value: 'nein', label: 'Nein' }, { value: 'beantragt', label: 'Beantragt' },
          ]} />
          {get('pflegegrad_vorhanden') === 'ja' && (
            <div className="mt-5">
              <SelectField label="Aktueller Pflegegrad" name="pflegegrad" value={get('pflegegrad')} onChange={handle} className="sm:w-1/2" options={[
                { value: '1', label: 'Pflegegrad 1' }, { value: '2', label: 'Pflegegrad 2' }, { value: '3', label: 'Pflegegrad 3' },
                { value: '4', label: 'Pflegegrad 4' }, { value: '5', label: 'Pflegegrad 5' },
              ]} />
            </div>
          )}
          <div className="mt-6">
            <CardCheckbox label="Befreiung von Zuzahlungen liegt vor" name="zuzahlungsbefreiung" checked={getBool('zuzahlungsbefreiung')} onChange={handle} />
          </div>
        </SectionCard>
      </>
    ),

    /* 3 – Diagnosen */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={HeartPulse}>Diagnosen</SubHeading>
          <TextareaField label="Hauptdiagnose(n)" name="hauptdiagnose" value={get('hauptdiagnose')} onChange={handle} placeholder="z.B. Diabetes mellitus Typ 2, Herzinsuffizienz, Demenz..." rows={3} helper="Listen Sie die wichtigsten aktuellen Diagnosen auf." />
          <div className="mt-6">
            <TextareaField label="Weitere Vorerkrankungen" name="vorerkrankungen" value={get('vorerkrankungen')} onChange={handle} placeholder="z.B. Schlaganfall 2019, Hüft-TEP links 2020..." rows={3} helper="Auch zurückliegende Erkrankungen oder Operationen." />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Krankenhausaufenthalte</SubHeading>
          <TextareaField label="Letzte Krankenhausaufenthalte" name="krankenhausaufenthalte" value={get('krankenhausaufenthalte')} onChange={handle} placeholder="z.B. März 2025 – St. Barbara Klinik, Oberschenkelfraktur..." rows={3} />
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Schmerzsituation</SubHeading>
          <RadioGroup label="Bestehen aktuell Schmerzen?" name="schmerzen" value={get('schmerzen')} onChange={(v) => set('schmerzen', v)} options={[
            { value: 'keine', label: 'Keine' }, { value: 'leicht', label: 'Leicht' }, { value: 'mittel', label: 'Mittel' }, { value: 'stark', label: 'Stark' }, { value: 'sehr_stark', label: 'Sehr stark' },
          ]} />
          {get('schmerzen') && get('schmerzen') !== 'keine' && (
            <div className="mt-5">
              <FormField label="Wo treten die Schmerzen auf?" name="schmerzen_ort" value={get('schmerzen_ort')} onChange={handle} placeholder="Rücken, Knie, Kopf..." />
            </div>
          )}
        </SectionCard>
      </>
    ),

    /* 4 – Medikation */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Pill}>Aktuelle Medikamente</SubHeading>
          <TextareaField label="Medikamentenplan" name="medikamente" value={get('medikamente')} onChange={handle} placeholder={"Metformin 500mg – morgens & abends\nRamipril 5mg – morgens\nMarcumar – nach Plan"} rows={5} helper="Alle Medikamente mit Dosierung und Einnahmezeiten." />
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={AlertCircle}>Allergien &amp; Unverträglichkeiten</SubHeading>
          <TextareaField label="Bekannte Allergien" name="allergien" value={get('allergien')} onChange={handle} placeholder="Penicillin, Pflaster, Latex, Nahrungsmittel..." rows={3} />
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Hilfsmittel im Einsatz</SubHeading>
          <p className="mb-5 text-[13px] font-[420] leading-[1.6]" style={{ color: '#94a3b8' }}>Welche Hilfsmittel werden aktuell genutzt? Einfach antippen.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ['hm_rollator', 'Rollator'], ['hm_rollstuhl', 'Rollstuhl'], ['hm_gehstock', 'Gehstock / Gehhilfe'],
              ['hm_pflegebett', 'Pflegebett'], ['hm_toilettenstuhl', 'Toilettenstuhl'], ['hm_duschstuhl', 'Duschstuhl / Badewannenlift'],
              ['hm_inkontinenz', 'Inkontinenzmaterial'], ['hm_sauerstoff', 'Sauerstoffgerät'], ['hm_kompression', 'Kompressionsstrümpfe'],
              ['hm_brille', 'Brille / Sehhilfe'], ['hm_hoergeraet', 'Hörgerät'], ['hm_prothese', 'Prothese'],
            ] as const).map(([name, label]) => (
              <CardCheckbox key={name} label={label} name={name} checked={getBool(name)} onChange={handle} />
            ))}
          </div>
          <div className="mt-5">
            <FormField label="Sonstige Hilfsmittel" name="hm_sonstige" value={get('hm_sonstige')} onChange={handle} placeholder="Weitere..." />
          </div>
        </SectionCard>
      </>
    ),

    /* 5 – Mobilität */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Activity}>Mobilität</SubHeading>
          <RadioGroup label="Innerhalb der Wohnung" name="mobilitaet_innen" value={get('mobilitaet_innen')} onChange={(v) => set('mobilitaet_innen', v)} options={[
            { value: 'selbststaendig', label: 'Selbstständig' }, { value: 'mit_hilfe', label: 'Mit Hilfsmittel' }, { value: 'mit_person', label: 'Mit Personenhilfe' }, { value: 'immobil', label: 'Bettlägerig' },
          ]} />
          <div className="mt-6">
            <RadioGroup label="Außerhalb der Wohnung" name="mobilitaet_aussen" value={get('mobilitaet_aussen')} onChange={(v) => set('mobilitaet_aussen', v)} options={[
              { value: 'selbststaendig', label: 'Selbstständig' }, { value: 'mit_hilfe', label: 'Mit Hilfsmittel' }, { value: 'mit_person', label: 'Mit Begleitung' }, { value: 'nicht_moeglich', label: 'Nicht möglich' },
            ]} />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Alltagsaktivitäten (ADL)</SubHeading>
          <p className="mb-6 text-[13px] font-[420] leading-[1.6]" style={{ color: '#94a3b8' }}>Wie selbstständig sind folgende Aktivitäten?</p>
          <div className="space-y-5">
            {([
              ['adl_koerperpflege', 'Körperpflege'], ['adl_ankleiden', 'An- und Auskleiden'], ['adl_ernaehrung', 'Essen und Trinken'],
              ['adl_toilette', 'Toilettengang'], ['adl_transfers', 'Transfers (Aufstehen, Umlagern)'],
            ] as const).map(([name, label]) => (
              <div key={name} className="rounded-[14px] border p-4 sm:p-5"
                style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#FAFAFA' }}>
                <RadioGroup label={label} name={name} value={get(name)} onChange={(v) => set(name, v)} options={[
                  { value: 'selbststaendig', label: 'Selbstständig' }, { value: 'teilweise', label: 'Teilweise Hilfe' }, { value: 'vollstaendig', label: 'Vollständig' },
                ]} />
              </div>
            ))}
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Sturzrisiko</SubHeading>
          <RadioGroup label="Sturzgefahr" name="sturzrisiko" value={get('sturzrisiko')} onChange={(v) => set('sturzrisiko', v)} options={[
            { value: 'gering', label: 'Gering' }, { value: 'mittel', label: 'Mittel' }, { value: 'hoch', label: 'Hoch' }, { value: 'unbekannt', label: 'Unbekannt' },
          ]} />
          <div className="mt-5">
            <TextareaField label="Besonderheiten" name="mobilitaet_besonderheiten" value={get('mobilitaet_besonderheiten')} onChange={handle} placeholder="Sturzneigung, Schwindel..." rows={2} />
          </div>
        </SectionCard>
      </>
    ),

    /* 6 – Kognition */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Brain}>Orientierung &amp; Kognition</SubHeading>
          <RadioGroup label="Orientierung" name="orientierung" value={get('orientierung')} onChange={(v) => set('orientierung', v)} options={[
            { value: 'voll', label: 'Voll orientiert' }, { value: 'zeitweise', label: 'Zeitweise eingeschränkt' }, { value: 'stark', label: 'Stark eingeschränkt' }, { value: 'desorientiert', label: 'Desorientiert' },
          ]} />
          <div className="mt-6">
            <RadioGroup label="Demenzerkrankung" name="demenz" value={get('demenz')} onChange={(v) => set('demenz', v)} options={[
              { value: 'nein', label: 'Nein' }, { value: 'leicht', label: 'Leicht' }, { value: 'mittel', label: 'Mittel' }, { value: 'schwer', label: 'Schwer' }, { value: 'unbekannt', label: 'Unklar' },
            ]} />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Kommunikation</SubHeading>
          <RadioGroup label="Sprachliche Verständigung" name="kommunikation" value={get('kommunikation')} onChange={(v) => set('kommunikation', v)} options={[
            { value: 'uneingeschraenkt', label: 'Uneingeschränkt' }, { value: 'eingeschraenkt', label: 'Eingeschränkt' }, { value: 'stark_eingeschraenkt', label: 'Stark eingeschränkt' }, { value: 'nicht_moeglich', label: 'Nicht möglich' },
          ]} />
          <div className="mt-5">
            <FormField label="Muttersprache" name="muttersprache" value={get('muttersprache')} onChange={handle} placeholder="Deutsch" />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={Heart}>Psychisches Wohlbefinden</SubHeading>
          <p className="mb-5 text-[13px] font-[420] leading-[1.6]" style={{ color: '#94a3b8' }}>Bestehen folgende Symptome? Einfach zutreffendes antippen.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ['psyche_angst', 'Ängste', 'z.B. Sturzangst, Alleinsein'], ['psyche_depression', 'Depressive Verstimmung', ''],
              ['psyche_unruhe', 'Unruhe / Agitiertheit', ''], ['psyche_schlaf', 'Schlafstörungen', ''],
              ['psyche_antriebslos', 'Antriebslosigkeit', ''], ['psyche_aggression', 'Aggressives Verhalten', ''],
            ] as const).map(([name, label, desc]) => (
              <CardCheckbox key={name} label={label} name={name} checked={getBool(name)} onChange={handle} description={desc || undefined} />
            ))}
          </div>
          <div className="mt-5">
            <TextareaField label="Sonstige Hinweise" name="psyche_sonstiges" value={get('psyche_sonstiges')} onChange={handle} placeholder="Laufende Therapien, besondere Verhaltensweisen..." rows={3} />
          </div>
        </SectionCard>
      </>
    ),

    /* 7 – Wohnsituation */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={Home}>Wohnform &amp; Umgebung</SubHeading>
          <RadioGroup label="Wie leben Sie?" name="wohnform" value={get('wohnform')} onChange={(v) => set('wohnform', v)} options={[
            { value: 'allein', label: 'Allein' }, { value: 'partner', label: 'Mit Partner/in' }, { value: 'familie', label: 'Mit Familie' },
            { value: 'wg', label: 'Wohngemeinschaft' }, { value: 'betreut', label: 'Betreutes Wohnen' },
          ]} />
          <div className="mt-6">
            <RadioGroup label="Wohnungstyp" name="wohnungstyp" value={get('wohnungstyp')} onChange={(v) => set('wohnungstyp', v)} options={[
              { value: 'eg', label: 'Erdgeschoss' }, { value: 'og_aufzug', label: 'OG mit Aufzug' }, { value: 'og_ohne', label: 'OG ohne Aufzug' }, { value: 'haus', label: 'Einfamilienhaus' },
            ]} />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Barrierefreiheit</SubHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ['wohnung_schwellen', 'Schwellen / Stufen vorhanden'], ['wohnung_badumbau', 'Barrierefreies Bad'],
              ['wohnung_tueren', 'Rollstuhlbreite Türen'], ['wohnung_haltegriffe', 'Haltegriffe vorhanden'],
            ] as const).map(([name, label]) => (
              <CardCheckbox key={name} label={label} name={name} checked={getBool(name)} onChange={handle} />
            ))}
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Zugang zur Wohnung</SubHeading>
          <RadioGroup label="Wie kommen wir hinein?" name="schluessel" value={get('schluessel')} onChange={(v) => set('schluessel', v)} options={[
            { value: 'schluessel', label: 'Schlüssel hinterlegen' }, { value: 'tresor', label: 'Schlüsseltresor' },
            { value: 'anwesend', label: 'Person öffnet' }, { value: 'sonstiges', label: 'Sonstiges' },
          ]} />
          <div className="mt-5">
            <TextareaField label="Sonstiges zur Wohnsituation" name="wohnung_sonstiges" value={get('wohnung_sonstiges')} onChange={handle} placeholder="Haustiere, Zugangshinweise, Parkplatz..." rows={3} />
          </div>
        </SectionCard>
      </>
    ),

    /* 8 – Pflegebedarf */
    () => (
      <>
        <SectionCard>
          <SubHeading icon={ClipboardList}>Gewünschte Leistungen</SubHeading>
          <p className="mb-5 text-[13px] font-[420] leading-[1.6]" style={{ color: '#94a3b8' }}>Was dürfen wir für Sie tun? Wählen Sie alles Passende aus.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ['leistung_grundpflege', 'Grundpflege', 'Körperpflege, An-/Auskleiden, Mobilisation'],
              ['leistung_behandlungspflege', 'Behandlungspflege', 'Medikamente, Injektionen, Wundversorgung'],
              ['leistung_betreuung', 'Betreuung & Aktivierung', 'Spaziergänge, Gesellschaft, Beschäftigung'],
              ['leistung_hauswirtschaft', 'Hauswirtschaft', 'Einkaufen, Kochen, Wäsche, Reinigung'],
              ['leistung_verhinderung', 'Verhinderungspflege', 'Vertretung pflegender Angehöriger'],
              ['leistung_beratung', 'Pflegeberatung', 'Leistungen, Pflegegrad, Hilfsmittel'],
            ] as const).map(([name, label, desc]) => (
              <CardCheckbox key={name} label={label} name={name} checked={getBool(name)} onChange={handle} description={desc} />
            ))}
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading>Zeitplanung</SubHeading>
          <RadioGroup label="Gewünschter Versorgungsbeginn" name="beginn" value={get('beginn')} onChange={(v) => set('beginn', v)} options={[
            { value: 'sofort', label: 'So schnell wie möglich' }, { value: '1woche', label: 'Innerhalb 1 Woche' },
            { value: '2wochen', label: 'Innerhalb 2 Wochen' }, { value: 'spaeter', label: 'Später' },
          ]} />
          <div className="mt-6">
            <RadioGroup label="Bevorzugte Einsatzzeiten" name="einsatzzeiten" value={get('einsatzzeiten')} onChange={(v) => set('einsatzzeiten', v)} options={[
              { value: 'morgens', label: 'Morgens' }, { value: 'mittags', label: 'Mittags' }, { value: 'abends', label: 'Abends' },
              { value: 'flexibel', label: 'Flexibel' }, { value: 'mehrmals', label: 'Mehrmals täglich' },
            ]} />
          </div>
        </SectionCard>
        <Spacer />
        <SectionCard>
          <SubHeading icon={Sparkles}>Ihre Wünsche</SubHeading>
          <TextareaField label="Bisherige Versorgung" name="bisherige_versorgung" value={get('bisherige_versorgung')} onChange={handle} placeholder="Bisher durch Angehörige versorgt, Pflegedienst XY..." rows={3} />
          <div className="mt-5">
            <TextareaField label="Persönliche Wünsche & Besonderheiten" name="wuensche" value={get('wuensche')} onChange={handle} placeholder="Was ist Ihnen besonders wichtig? Gewohnheiten, Vorlieben, Routinen..." rows={4} helper="Tagesablauf, religiöse Bedürfnisse, Haustiere – alles ist relevant." />
          </div>
        </SectionCard>
      </>
    ),

    /* 9 – Abschluss */
    () => (
      <>
        <div className="mb-8 overflow-hidden rounded-[20px] border p-6 sm:p-7"
          style={{ borderColor: 'rgba(24,193,163,0.28)', background: 'rgba(24,193,163,0.04)' }}>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(24,193,163,0.12)', border: '1.5px solid rgba(24,193,163,0.25)' }}>
              <Sparkles className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-[16px] font-[700] tracking-[-0.025em]" style={{ color: '#0d7460' }}>
                Fast geschafft!
              </h4>
              <p className="mt-1 text-[14px] font-[420] leading-[1.65]" style={{ color: '#475569' }}>
                Nur noch die Einwilligungen bestätigen – dann kümmern wir uns um alles Weitere.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CardCheckbox label="Einwilligung Datenschutz" name="datenschutz" checked={getBool('datenschutz')} onChange={handle} icon={Shield}
            description="Ich bin damit einverstanden, dass meine Angaben zum Zweck der pflegerischen Versorgung erhoben, verarbeitet und gespeichert werden. Eine Weitergabe an Dritte erfolgt nur im Rahmen der gesetzlichen Bestimmungen. Ich kann meine Einwilligung jederzeit widerrufen." />
          {errors.datenschutz && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 pl-1 text-[12.5px] font-[480] text-error-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.datenschutz}
            </motion.p>
          )}

          <CardCheckbox label="Bestätigung der Richtigkeit" name="richtigkeit" checked={getBool('richtigkeit')} onChange={handle} icon={CheckCircle2}
            description="Ich bestätige, dass die vorstehenden Angaben nach bestem Wissen und Gewissen gemacht wurden." />
          {errors.richtigkeit && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 pl-1 text-[12.5px] font-[480] text-error-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.richtigkeit}
            </motion.p>
          )}

          <CardCheckbox label="Kontaktaufnahme erlauben (optional)" name="kontakt_erlaubnis" checked={getBool('kontakt_erlaubnis')} onChange={handle} icon={Phone}
            description="IMPULS darf mich telefonisch oder per E-Mail kontaktieren, um das Erstgespräch zu vereinbaren." />
        </div>

        <Spacer />

        <div className="rounded-[20px] border bg-white p-6 sm:p-7"
          style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <p className="text-[11px] font-[660] uppercase tracking-[0.16em]" style={{ color: '#64748b' }}>Was passiert als Nächstes?</p>
          <div className="mt-5 space-y-5">
            {[
              ['Unser Team prüft Ihre Angaben sorgfältig.', 'Rückmeldung innerhalb von 1–2 Werktagen.'],
              ['Wir melden uns telefonisch bei Ihnen.', 'Um einen Termin für das persönliche Erstgespräch zu vereinbaren.'],
              ['Erstgespräch bei Ihnen zu Hause.', 'Persönlich, unverbindlich und in Ruhe.'],
              ['Ihre Daten sind sicher.', 'DSGVO-konform, verschlüsselt, vertraulich.'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-[700]"
                  style={{ background: 'rgba(24,193,163,0.09)', border: '1.5px solid rgba(24,193,163,0.22)', color: '#18C1A3', minWidth: '28px' }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-[560] tracking-[-0.01em]" style={{ color: '#0F172A' }}>{title}</p>
                  <p className="mt-0.5 text-[12.5px] font-[420]" style={{ color: '#94a3b8' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  ]

  /* ───── Render ───── */
  const currentStep = STEPS[step]
  const Icon = currentStep.icon

  return (
    <div ref={topRef} className="scroll-mt-28">

      {/* ─── Desktop Sidebar + Content Layout ─── */}
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">

        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">

            {/* Progress summary */}
            <div className="overflow-hidden rounded-[20px] border bg-white p-5"
              style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-[660] uppercase tracking-[0.14em]" style={{ color: '#64748b' }}>
                  Fortschritt
                </span>
                <span className="text-[11px] font-[640]" style={{ color: '#18C1A3' }}>
                  {pct}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(to right, #18C1A3, #20C9AA)' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="mt-2.5 text-[12px] font-[440]" style={{ color: '#94a3b8' }}>
                Schritt {step + 1} von {total} — {currentStep.hint}
              </p>
            </div>

            {/* Step list */}
            <nav className="overflow-hidden rounded-[20px] border bg-white"
              style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              {STEPS.map((s, i) => {
                const StepIcon = s.icon
                const past = i < step
                const current = i === step
                const future = i > step
                return (
                  <button
                    key={s.id} type="button"
                    onClick={() => { if (past) nav(i) }}
                    disabled={future}
                    className={cn(
                      'group flex w-full items-center gap-3 px-5 py-3.5 text-left transition-all duration-200',
                      'border-b last:border-b-0',
                      future && 'cursor-not-allowed',
                    )}
                    style={{
                      borderBottomColor: 'rgba(0,0,0,0.05)',
                      background: current ? 'rgba(24,193,163,0.05)' : past ? 'transparent' : 'transparent',
                    }}
                  >
                    {/* Icon */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200"
                      style={current
                        ? { background: 'rgba(24,193,163,0.12)', border: '1.5px solid rgba(24,193,163,0.30)' }
                        : past
                          ? { background: 'rgba(24,193,163,0.08)', border: '1.5px solid rgba(24,193,163,0.20)' }
                          : { background: 'rgba(0,0,0,0.04)', border: '1.5px solid rgba(0,0,0,0.07)' }
                      }>
                      {past ? (
                        <Check className="h-3.5 w-3.5" style={{ color: '#18C1A3' }} strokeWidth={3} />
                      ) : (
                        <StepIcon className="h-3.5 w-3.5"
                          style={{ color: current ? '#18C1A3' : future ? 'rgba(0,0,0,0.22)' : '#475569' }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span className="text-[13px] font-[520] tracking-[-0.01em] transition-colors duration-200"
                      style={current
                        ? { color: '#0d7460' }
                        : past
                          ? { color: '#475569' }
                          : { color: 'rgba(0,0,0,0.28)' }
                      }>
                      {s.short}
                    </span>

                    {/* Active mint dot */}
                    {current && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: '#18C1A3' }} />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Help card */}
            <div className="overflow-hidden rounded-[20px] border bg-white px-5 py-5"
              style={{ borderColor: 'rgba(24,193,163,0.18)', background: 'rgba(24,193,163,0.025)' }}>
              <p className="text-[12.5px] font-[560] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                Hilfe benötigt?
              </p>
              <p className="mt-1 text-[12px] font-[420] leading-[1.60]" style={{ color: '#64748b' }}>
                Wir helfen Ihnen gerne persönlich.
              </p>
              <a href="tel:+4923032920589"
                className="mt-3.5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-[580] text-white transition-all duration-200 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)' }}>
                <Phone className="h-3 w-3" strokeWidth={2} />
                02303 2920589
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">

          {/* Mobile progress */}
          <div className="mb-8 lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-[660] uppercase tracking-[0.14em]" style={{ color: '#64748b' }}>
                Schritt {step + 1} von {total}
              </span>
              <span className="text-[11px] font-[640]" style={{ color: '#18C1A3' }}>{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #18C1A3, #20C9AA)' }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
            </div>

            {/* Mobile step pills */}
            <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {STEPS.map((s, i) => {
                const SI = s.icon
                return (
                  <button key={s.id} type="button" onClick={() => { if (i < step) nav(i) }} disabled={i > step}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[11.5px] font-[530] transition-all duration-200"
                    style={i === step
                      ? { borderColor: 'rgba(24,193,163,0.40)', background: 'rgba(24,193,163,0.08)', color: '#0d7460' }
                      : i < step
                        ? { borderColor: 'rgba(24,193,163,0.25)', background: 'rgba(24,193,163,0.04)', color: '#18C1A3' }
                        : { borderColor: 'rgba(0,0,0,0.07)', background: 'transparent', color: 'rgba(0,0,0,0.24)' }
                    }>
                    {i < step ? <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={3} /> : <SI className="h-2.5 w-2.5 shrink-0" />}
                    {s.short}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step header */}
          <AnimatePresence mode="wait">
            <motion.div key={`header-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mb-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'rgba(24,193,163,0.09)', border: '1.5px solid rgba(24,193,163,0.22)' }}>
                  <Icon className="h-5 w-5" style={{ color: '#18C1A3' }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[10.5px] font-[640] uppercase tracking-[0.20em]" style={{ color: 'rgba(24,193,163,0.80)' }}>
                    Schritt {step + 1} von {total}
                  </p>
                  <h2 className="text-[clamp(1.3rem,2.5vw,1.65rem)] font-[780] tracking-[-0.034em] leading-[1.15]" style={{ color: '#0F172A' }}>
                    {currentStep.label}
                  </h2>
                  <p className="text-[13px] font-[420] tracking-[-0.01em]" style={{ color: '#94a3b8' }}>
                    {currentStep.hint}
                  </p>
                </div>
              </div>
              <div className="mt-5 h-px" style={{ background: 'rgba(0,0,0,0.055)' }} />
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={submit}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                {steps[step]()}
              </motion.div>
            </AnimatePresence>

            {/* Footer navigation */}
            <div className="mt-12 flex items-center justify-between rounded-[20px] border px-6 py-4 sm:px-7"
              style={{ background: '#F7FAFA', borderColor: 'rgba(0,0,0,0.07)' }}>
              <button type="button" onClick={() => nav(step - 1)} disabled={step === 0}
                className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-[510] tracking-[-0.01em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ borderColor: 'rgba(0,0,0,0.09)', color: '#334155', background: 'white' }}>
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Zurück
              </button>

              {step < total - 1 ? (
                <button type="button" onClick={() => nav(step + 1)}
                  className="group inline-flex items-center gap-2.5 rounded-full px-7 py-2.5 text-[14.5px] font-[620] tracking-[-0.01em] text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-6px_rgba(24,193,163,0.36)]"
                  style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 4px 14px -3px rgba(24,193,163,0.28)' }}>
                  Weiter
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button type="submit" disabled={submitting}
                  className="group inline-flex items-center gap-2.5 rounded-full px-8 py-2.5 text-[14.5px] font-[620] tracking-[-0.01em] text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-6px_rgba(24,193,163,0.36)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #18C1A3, #20C9AA)', boxShadow: '0 4px 14px -3px rgba(24,193,163,0.28)' }}>
                  {submitting ? (
                    <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Wird gesendet...</>
                  ) : (
                    <>Absenden <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /></>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
