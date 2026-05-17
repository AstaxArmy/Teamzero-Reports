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
        title="Community Feedback & Reports"
        subtitle="Community"
        description="For members and staff to report issues or suggest improvements."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT FEEDBACK"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Basic Information
            </h3>
            <FormInput
              label="Discord Username"
              name="discordUsername"
              placeholder="username#0000"
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Submission Type
            </h3>
            <FormSelect
              label="Type of Submission"
              name="submissionType"
              options={['Staff Report', 'Member Report', 'Server Issue', 'Suggestion', 'General Feedback']}
              required
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Report Details
            </h3>
            <div className="space-y-4">
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
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Evidence
            </h3>
            <FormInput
              label="Upload Proof/Screenshots (URL or link)"
              name="proofUrl"
              placeholder="https://imgur.com/... or Discord message link"
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
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
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Outcome
            </h3>
            <FormInput
              label="What outcome do you expect?"
              name="expectedOutcome"
              placeholder="Describe the resolution you're seeking..."
              required
              multiline
              rows={3}
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Additional Comments
            </h3>
            <FormInput
              label="Anything else you want to add"
              name="additionalComments"
              placeholder="Any additional information..."
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
