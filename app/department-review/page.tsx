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
      discordUsername: formData.get('discordUsername'),
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
        description="For staff members to review leadership, structure, and department performance."
        onSubmit={handleSubmit}
        loading={loading}
        submitText="SUBMIT REVIEW"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Basic Information
            </h3>
            <div className="space-y-4">
              <FormInput
                label="Discord Username"
                name="discordUsername"
                placeholder="username#0000"
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
                options={['Operations', 'Community', 'Growth']}
                required
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Department Performance
            </h3>
            <div className="space-y-4">
              <FormYesNo label="Is your department organised properly?" name="organized" required />
              <FormYesNo label="Does leadership assign tasks clearly?" name="clearTasks" required />
              <FormYesNo label="Does your admin communicate well?" name="leadershipCommunication" required />
              <FormYesNo label="Do you feel supported by your department?" name="feelsSupported" required />
              <FormYesNo label="Are responsibilities fair and balanced?" name="fairResponsibilities" required />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Rate your department (1–10) <span className="text-brand">*</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        rating === num
                          ? 'bg-brand text-white'
                          : rating >= num
                          ? 'bg-brand/20 text-brand-light border border-brand/30'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Internal Feedback
            </h3>
            <div className="space-y-4">
              <FormInput
                label="What issues do you see in your department?"
                name="departmentIssues"
                placeholder="Describe any issues..."
                required
                multiline
                rows={3}
              />
              <FormInput
                label="Any inactive or unprofessional leadership behaviour?"
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
            </div>
          </div>
        </div>
      </FormPage>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  )
}
