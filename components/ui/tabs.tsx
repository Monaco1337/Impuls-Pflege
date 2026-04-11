'use client'

import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  value: string
  onChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
  return ctx
}

export interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ value: controlledValue, defaultValue = '', onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue

  const onChange = (v: string) => {
    setInternalValue(v)
    onValueChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 border-b border-warm-200',
        className,
      )}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
}

export function TabsTrigger({ value, disabled, className, children, ...props }: TabsTriggerProps) {
  const { value: selected, onChange } = useTabsContext()
  const isActive = selected === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      className={cn(
        'relative px-4 py-2.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-t-md',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500'
          : 'text-warm-500 hover:text-warm-700',
        className,
      )}
      onClick={() => onChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected } = useTabsContext()
  if (selected !== value) return null

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      className={cn('mt-4 focus-visible:outline-none', className)}
      tabIndex={0}
      {...props}
    />
  )
}
