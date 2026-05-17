export type SubmissionType =
  | 'department_review'
  | 'community_feedback'
  | 'growth_feedback'
  | 'enforcement'

export type Department = 'Operations' | 'Community' | 'Growth' | 'Enforcement'

export const DEPARTMENTS: Department[] = ['Operations', 'Community', 'Growth', 'Enforcement']

export const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const

export const SEVERITY_COLORS: Record<string, string> = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export const TYPE_LABELS: Record<SubmissionType, string> = {
  department_review: 'Department Review',
  community_feedback: 'Community Feedback',
  growth_feedback: 'Growth Feedback',
  enforcement: 'Enforcement',
}

export const TYPE_COLORS: Record<SubmissionType, string> = {
  department_review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  community_feedback: 'bg-cyan/20 text-cyan border-cyan/30',
  growth_feedback: 'bg-green-500/20 text-green-400 border-green-500/30',
  enforcement: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export const DEPT_ICONS: Record<Department, string> = {
  Operations: '️',
  Community: '',
  Growth: '',
  Enforcement: '🛡️',
}
