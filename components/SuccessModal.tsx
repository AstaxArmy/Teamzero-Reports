'use client'

import { CheckCircle2, X } from 'lucide-react'
import Link from 'next/link'

interface SuccessModalProps {
  open: boolean
  onClose: () => void
  message?: string
}

export function SuccessModal({ open, onClose, message = 'Your submission has been received successfully.' }: SuccessModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full animate-slide-up relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-purple mb-4" />
          <h3 className="font-orbitron text-xl font-bold text-white mb-2">SUBMISSION RECEIVED</h3>
          <p className="text-gray-400 text-sm mb-6">{message}</p>
          <div className="flex gap-3 w-full">
            <Link
              href="/"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-xl border border-border-subtle text-sm font-medium text-gray-300 hover:bg-white/5 transition-all text-center"
            >
              Home
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-xl bg-purple text-sm font-medium text-black hover:bg-purple-light transition-all"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
