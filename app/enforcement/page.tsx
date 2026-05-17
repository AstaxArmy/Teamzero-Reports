'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { FormPage } from '@/components/FormPage'
import { FormInput, FormSelect, FormRadioGroup, FormYesNo } from '@/components/FormInput'
import { SuccessModal } from '@/components/SuccessModal'

export default function EnforcementPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      department: formData.get('department'),
      whoInvolved: formData.get('whoInvolved'),
      issue: formData.get('issue'),
      issueType: formData.get('issueType'),
      explanation: formData.get('explanation'),
      evidenceUrl: formData.get('evidenceUrl'),
      reportedBefore: formData.get('reportedBefore'),
      severity: formData.get('severity'),
      suggestedAction: formData.get('suggestedAction'),
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enforcement', data }),
      })
      setSuccess(true)
    } catch {
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <FormPage
        icon={AlertTriangle}
        title="Enforcement Escalation"
        subtitle="Enforcement"
        description="Handle serious internal issues and leadership abuse."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT ESCALATION"
      >
        <div className="space-y-6">
          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Department & People
            </h3>
            <div className="space-y-4">
              <FormSelect
                label="Which department is involved?"
                name="department"
                options={['Operations', 'Community', 'Growth', 'Enforcement']}
                required
              />
              <FormInput
                label="Who is involved?"
                name="whoInvolved"
                placeholder="List names or roles..."
                required
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Issue Details
            </h3>
            <div className="space-y-4">
              <FormInput
                label="What is the issue?"
                name="issue"
                placeholder="Brief description of the issue..."
                required
              />
              <FormSelect
                label="Is this inactivity, abuse, or misconduct?"
                name="issueType"
                options={['Inactivity', 'Abuse of Power', 'Misconduct', 'Harassment', 'Other']}
                required
              />
              <FormInput
                label="Provide full explanation"
                name="explanation"
                placeholder="Explain the situation in full detail..."
                required
                multiline
                rows={5}
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Evidence
            </h3>
            <FormInput
              label="Upload Evidence (URL)"
              name="evidenceUrl"
              placeholder="https://imgur.com/... or Discord message link"
            />
            <div className="mt-4">
              <FormYesNo label="Has this been reported before?" name="reportedBefore" required />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Severity Level
            </h3>
            <FormRadioGroup
              label="Select severity"
              name="severity"
              options={['Low', 'Medium', 'High', 'Critical']}
              required
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Suggested Action
            </h3>
            <FormInput
              label="What action do you suggest should be taken..."
              name="suggestedAction"
              placeholder="Describe the action you recommend..."
              required
              multiline
              rows={3}
            />
          </div>
        </div>
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
