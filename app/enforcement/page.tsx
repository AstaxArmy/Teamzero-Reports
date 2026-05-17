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

        <FormInput
          label="Upload Evidence (URL)"
          name="evidenceUrl"
          placeholder="https://imgur.com/... or Discord message link"
        />

        <FormYesNo label="Has this been reported before?" name="reportedBefore" required />

        <FormRadioGroup
          label="Severity Level"
          name="severity"
          options={['Low', 'Medium', 'High', 'Critical']}
          required
        />

        <FormInput
          label="Suggested action"
          name="suggestedAction"
          placeholder="What action do you suggest should be taken..."
          required
          multiline
          rows={3}
        />
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
