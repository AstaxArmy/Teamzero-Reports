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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10 fade-in visible">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/20 mb-4">
          <Icon className="h-8 w-8 text-cyan" />
        </div>
        <p className="font-orbitron text-xs font-bold tracking-widest text-cyan uppercase mb-2">{subtitle}</p>
        <h1 className="font-orbitron text-3xl sm:text-4xl font-bold gradient-text mb-3">{title}</h1>
        <p className="text-gray-400 max-w-lg mx-auto">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 fade-in visible">
        {children}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl btn-cyan disabled:opacity-50 disabled:cursor-not-allowed font-orbitron text-sm tracking-wider"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
