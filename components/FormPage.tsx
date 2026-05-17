'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface FormPageProps {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  children: ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  submitText?: string
}

export function FormPage({ icon: Icon, title, subtitle, description, children, onSubmit, loading, submitText = 'Submit' }: FormPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10 fade-in visible">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 mb-4">
          <Icon className="h-6 w-6 text-brand-light" />
        </div>
        <p className="font-orbitron text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">{subtitle}</p>
        <h1 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">{title}</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8 space-y-6 fade-in visible">
        {children}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg btn-brand disabled:opacity-50 disabled:cursor-not-allowed font-orbitron text-xs tracking-wider"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              SUBMITTING...
            </span>
          ) : (
            submitText
          )}
        </button>
      </form>
    </div>
  )
}
