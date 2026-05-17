'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { FormPage } from '@/components/FormPage'
import { FormInput, FormSelect, FormRadioGroup } from '@/components/FormInput'
import { SuccessModal } from '@/components/SuccessModal'

export default function GrowthPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      discordUsername: formData.get('discordUsername'),
      propositionType: formData.get('propositionType'),
      idea: formData.get('idea'),
      howItWorks: formData.get('howItWorks'),
      expectedImpact: formData.get('expectedImpact'),
      problemSolved: formData.get('problemSolved'),
      priority: formData.get('priority'),
      extraInfo: formData.get('extraInfo'),
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'growth_feedback', data }),
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
        icon={TrendingUp}
        title="Propositions Hub"
        subtitle="Growth System"
        description="For ideas, improvements, and expansion opportunities."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT PROPOSITION"
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
              required
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Type of Proposition
            </h3>
            <FormSelect
              label="Select type"
              name="propositionType"
              options={[
                'Server Growth Idea',
                'Event / Tournament Idea',
                'Recruitment Improvement',
                'Partnership Suggestion',
                'Content / Branding Idea',
                'Community Feature Idea',
              ]}
              required
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Your Idea
            </h3>
            <div className="space-y-4">
              <FormInput
                label="Explain your suggestion in detail"
                name="idea"
                placeholder="Describe your idea..."
                required
                multiline
                rows={4}
              />
              <FormInput
                label="How does it work?"
                name="howItWorks"
                placeholder="Explain the implementation..."
                required
                multiline
                rows={3}
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Expected Impact
            </h3>
            <div className="space-y-4">
              <FormInput
                label="How will this help Team Zero?"
                name="expectedImpact"
                placeholder="Describe the benefits..."
                required
                multiline
                rows={3}
              />
              <FormInput
                label="What problem does it solve?"
                name="problemSolved"
                placeholder="Explain the problem..."
                required
                multiline
                rows={3}
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Priority Level
            </h3>
            <FormRadioGroup
              label="Select priority"
              name="priority"
              options={['Low', 'Medium', 'High', 'Game-changing']}
              required
            />
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Extra Information
            </h3>
            <FormInput
              label="Links / references / examples (optional)"
              name="extraInfo"
              placeholder="Add any supporting links or examples..."
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
