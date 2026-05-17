'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { FormPage } from '@/components/FormPage'
import { FormInput, FormSelect, FormYesNo } from '@/components/FormInput'
import { SuccessModal } from '@/components/SuccessModal'

export default function GrowthPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      strongestDept: formData.get('strongestDept'),
      needsImprovement: formData.get('needsImprovement'),
      growingPace: formData.get('growingPace'),
      eventsConsistent: formData.get('eventsConsistent'),
      whatsMissing: formData.get('whatsMissing'),
      growthSuggestions: formData.get('growthSuggestions'),
      recruitmentFeedback: formData.get('recruitmentFeedback'),
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
        title="Growth & Activity Feedback"
        subtitle="Growth"
        description="Measure server performance and growth across departments."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT FEEDBACK"
      >
        <FormSelect
          label="Which department is strongest?"
          name="strongestDept"
          options={['Operations', 'Community', 'Growth', 'Enforcement']}
          required
        />

        <FormSelect
          label="Which department needs improvement?"
          name="needsImprovement"
          options={['Operations', 'Community', 'Growth', 'Enforcement']}
          required
        />

        <FormYesNo label="Is Team Zero growing at a good pace?" name="growingPace" required />
        <FormYesNo label="Are events and activity consistent?" name="eventsConsistent" required />

        <FormInput
          label="What is missing in the community?"
          name="whatsMissing"
          placeholder="Describe what you feel is lacking..."
          required
          multiline
          rows={3}
        />

        <FormInput
          label="Suggestions for growth"
          name="growthSuggestions"
          placeholder="Share your ideas for growth..."
          required
          multiline
          rows={3}
        />

        <FormInput
          label="Feedback on recruitment/partnerships"
          name="recruitmentFeedback"
          placeholder="Any thoughts on recruitment or partnerships..."
          multiline
          rows={3}
        />
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
