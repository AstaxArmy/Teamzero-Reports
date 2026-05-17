'use client'

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { FormPage } from '@/components/FormPage'
import { FormInput, FormSelect, FormToggle, FormYesNo } from '@/components/FormInput'
import { SuccessModal } from '@/components/SuccessModal'
import { DEPARTMENTS } from '@/lib/types'

export default function DepartmentReviewPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      discordUsername: anonymous ? 'Anonymous' : formData.get('discordUsername'),
      anonymous,
      role: formData.get('role'),
      department: formData.get('department'),
      organized: formData.get('organized'),
      clearTasks: formData.get('clearTasks'),
      leadershipCommunication: formData.get('leadershipCommunication'),
      feelsSupported: formData.get('feelsSupported'),
      fairResponsibilities: formData.get('fairResponsibilities'),
      rating,
      departmentIssues: formData.get('departmentIssues'),
      unprofessionalBehavior: formData.get('unprofessionalBehavior'),
      suggestions: formData.get('suggestions'),
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'department_review', data }),
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
        icon={BarChart3}
        title="Department Staff Review"
        subtitle="Internal Review"
        description="Staff under departments can review leadership and internal structure."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT REVIEW"
      >
        <FormInput
          label="Discord Username"
          name="discordUsername"
          placeholder="username#0000"
          required={!anonymous}
        />

        <FormToggle
          label="Submit Anonymously"
          name="anonymous"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />

        <FormInput
          label="Your Role"
          name="role"
          placeholder="e.g. Moderator, Content Creator, Designer"
          required
        />

        <FormSelect
          label="Your Department"
          name="department"
          options={DEPARTMENTS as string[]}
          required
        />

        <FormYesNo label="Is your department organised properly?" name="organized" required />
        <FormYesNo label="Does leadership assign tasks clearly?" name="clearTasks" required />
        <FormYesNo label="Does your admin communicate well?" name="leadershipCommunication" required />
        <FormYesNo label="Do you feel supported by your department?" name="feelsSupported" required />
        <FormYesNo label="Are responsibilities fair and balanced?" name="fairResponsibilities" required />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Rate your department (1–10) <span className="text-purple">*</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  rating === num
                    ? 'bg-purple text-black'
                    : rating >= num
                    ? 'bg-purple/20 text-purple border border-purple/30'
                    : 'bg-bg-input text-gray-500 border border-border-subtle hover:border-purple/30'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <FormInput
          label="What issues do you see in your department?"
          name="departmentIssues"
          placeholder="Describe any issues..."
          required
          multiline
          rows={3}
        />

        <FormInput
          label="Any unprofessional or inactive leadership behaviour?"
          name="unprofessionalBehavior"
          placeholder="Describe any concerns..."
          multiline
          rows={3}
        />

        <FormInput
          label="Suggestions for improvement"
          name="suggestions"
          placeholder="Share your ideas..."
          required
          multiline
          rows={3}
        />
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
