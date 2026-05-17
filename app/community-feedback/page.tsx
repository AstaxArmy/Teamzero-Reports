'use client'

import { useState } from 'react'
import { Users } from 'lucide-react'
import { FormPage } from '@/components/FormPage'
import { FormInput, FormSelect, FormRadioGroup } from '@/components/FormInput'
import { SuccessModal } from '@/components/SuccessModal'

export default function CommunityFeedbackPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      discordUsername: formData.get('discordUsername') || 'Anonymous',
      submissionType: formData.get('submissionType'),
      whatHappened: formData.get('whatHappened'),
      whoInvolved: formData.get('whoInvolved'),
      details: formData.get('details'),
      proofUrl: formData.get('proofUrl'),
      severity: formData.get('severity'),
      expectedOutcome: formData.get('expectedOutcome'),
      additionalComments: formData.get('additionalComments'),
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'community_feedback', data }),
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
        icon={Users}
        title="Community Feedback & Report"
        subtitle="Community"
        description="Allow members to report issues or suggest improvements."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT FEEDBACK"
      >
        <FormInput
          label="Discord Username"
          name="discordUsername"
          placeholder="username#0000"
        />

        <FormSelect
          label="Type of Submission"
          name="submissionType"
          options={['Staff Report', 'Member Report', 'Server Issue', 'Suggestion', 'General Feedback']}
          required
        />

        <FormInput
          label="What happened?"
          name="whatHappened"
          placeholder="Briefly describe the situation..."
          required
        />

        <FormInput
          label="Who is involved?"
          name="whoInvolved"
          placeholder="List usernames or roles..."
          required
        />

        <FormInput
          label="Explain the situation in detail"
          name="details"
          placeholder="Provide as much detail as possible..."
          required
          multiline
          rows={5}
        />

        <FormInput
          label="Upload Proof/Screenshots (URL)"
          name="proofUrl"
          placeholder="https://imgur.com/... or Discord message link"
        />

        <FormRadioGroup
          label="Severity Level"
          name="severity"
          options={['Low', 'Medium', 'High', 'Critical']}
          required
        />

        <FormInput
          label="What outcome do you expect?"
          name="expectedOutcome"
          placeholder="Describe the resolution you're seeking..."
          required
          multiline
          rows={3}
        />

        <FormInput
          label="Additional Comments"
          name="additionalComments"
          placeholder="Anything else you'd like to share..."
          multiline
          rows={3}
        />
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
