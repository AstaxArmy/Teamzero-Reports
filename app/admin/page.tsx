'use client'

import { useState, useEffect } from 'react'
import { Shield, Search, Download, CheckCircle, XCircle, Eye, ChevronDown } from 'lucide-react'
import { SEVERITY_COLORS, TYPE_LABELS, TYPE_COLORS, SubmissionType, DEPARTMENTS } from '@/lib/types'

interface Submission {
  id: string
  type: SubmissionType
  created_at: string
  resolved: boolean
  data: Record<string, unknown>
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<SubmissionType | 'all'>('all')
  const [filterDept, setFilterDept] = useState<string>('all')
  const [filterResolved, setFilterResolved] = useState<'all' | 'resolved' | 'pending'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    const authed = sessionStorage.getItem('tz_admin_auth') === 'true'
    if (authed) setAuthenticated(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === 'TZ-2026-Secure-Admin-Access-Key-99!') {
      setAuthenticated(true)
      sessionStorage.setItem('tz_admin_auth', 'true')
    } else {
      alert('Invalid access code')
    }
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/submissions')
      const json = await res.json()
      if (json.submissions) setSubmissions(json.submissions)
    } catch {
      console.error('Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) fetchSubmissions()
  }, [authenticated])

  const toggleResolved = async (id: string, current: boolean) => {
    try {
      await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resolved: !current }),
      })
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, resolved: !current } : s))
      )
    } catch {
      alert('Failed to update status')
    }
  }

  const exportData = () => {
    const csv = [
      ['ID', 'Type', 'Department', 'Date', 'Resolved', 'Severity', 'Data'].join(','),
      ...filteredSubmissions.map((s) => {
        const d = s.data as Record<string, string>
        return [
          s.id,
          s.type,
          d.department || d.strongestDept || '-',
          s.created_at,
          s.resolved ? 'Yes' : 'No',
          d.severity || '-',
          JSON.stringify(d).replace(/,/g, ';'),
        ].join(',')
      }),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `team-zero-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredSubmissions = submissions
    .filter((s) => {
      const d = s.data as Record<string, string>
      if (filterType !== 'all' && s.type !== filterType) return false
      if (filterDept !== 'all' && d.department !== filterDept && d.strongestDept !== filterDept) return false
      if (filterResolved === 'resolved' && !s.resolved) return false
      if (filterResolved === 'pending' && s.resolved) return false
      if (search) {
        const searchLower = search.toLowerCase()
        const dataStr = JSON.stringify(s.data).toLowerCase()
        return dataStr.includes(searchLower) || s.type.includes(searchLower) || s.id.includes(searchLower)
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
      }
      const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
      const sevA = severityOrder[(a.data as Record<string, string>).severity as keyof typeof severityOrder] || 0
      const sevB = severityOrder[(b.data as Record<string, string>).severity as keyof typeof severityOrder] || 0
      return sortOrder === 'desc' ? sevB - sevA : sevA - sevB
    })

  const stats = {
    total: submissions.length,
    resolved: submissions.filter((s) => s.resolved).length,
    pending: submissions.filter((s) => !s.resolved).length,
    critical: submissions.filter((s) => (s.data as Record<string, string>).severity === 'Critical').length,
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="glass-card rounded-2xl p-8 animate-slide-up">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-brand mx-auto mb-4" />
            <h1 className="font-orbitron text-2xl font-bold gradient-text">ADMIN ACCESS</h1>
            <p className="text-zinc-400 text-sm mt-2">Enter the access code to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Access Code"
              className="w-full rounded-xl px-4 py-3 text-sm"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl btn-purple font-orbitron text-sm tracking-wider"
            >
              ACCESS DASHBOARD
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-orbitron text-2xl sm:text-3xl font-bold gradient-text">ADMIN DASHBOARD</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage all submissions and reports</p>
        </div>
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm font-medium text-zinc-300 hover:border-brand/30 hover:text-brand transition-all"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
          { label: 'Resolved', value: stats.resolved, color: 'text-brand' },
          { label: 'Critical', value: stats.critical, color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4">
            <p className="text-sm text-zinc-400">{stat.label}</p>
            <p className={`font-orbitron text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search submissions..."
              className="w-full rounded-xl pl-10 pr-4 py-2 text-sm"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as SubmissionType | 'all')}
            className="rounded-xl px-3 py-2 text-sm cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="department_review">Dept Reviews</option>
            <option value="community_feedback">Community</option>
            <option value="growth_feedback">Growth</option>
            <option value="enforcement">Enforcement</option>
          </select>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm cursor-pointer"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={filterResolved}
            onChange={(e) => setFilterResolved(e.target.value as typeof filterResolved)}
            className="rounded-xl px-3 py-2 text-sm cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-')
              setSortBy(by as typeof sortBy)
              setSortOrder(order as typeof sortOrder)
            }}
            className="rounded-xl px-3 py-2 text-sm cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="severity-desc">Highest Severity</option>
            <option value="severity-asc">Lowest Severity</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-400 mt-4">Loading submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-xl">
          <p className="text-zinc-400">No submissions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSubmissions.map((submission) => {
            const data = submission.data as Record<string, string>
            const severity = data.severity
            const dept = data.department || data.strongestDept
            return (
              <div
                key={submission.id}
                className={`glass-card rounded-xl p-4 transition-all ${submission.resolved ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${TYPE_COLORS[submission.type]}`}>
                      {TYPE_LABELS[submission.type]}
                    </span>
                    {dept && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium border border-border-subtle text-zinc-400">
                        {dept}
                      </span>
                    )}
                    {severity && (
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${SEVERITY_COLORS[severity]}`}>
                        {severity}
                      </span>
                    )}
                    <span className="text-sm text-zinc-400 truncate">
                      {data.discordUsername || data.whoInvolved || 'Anonymous'}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-brand hover:bg-white/5 transition-all"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleResolved(submission.id, submission.resolved)}
                      className={`p-2 rounded-lg transition-all ${
                        submission.resolved
                          ? 'text-brand hover:text-brand-light'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                      title={submission.resolved ? 'Mark as Pending' : 'Mark as Resolved'}
                    >
                      {submission.resolved ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {data.details || data.explanation || data.whatHappened ? (
                  <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                    {data.details || data.explanation || data.whatHappened}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      )}

      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onToggleResolved={() => {
            toggleResolved(selectedSubmission.id, selectedSubmission.resolved)
            setSelectedSubmission({ ...selectedSubmission, resolved: !selectedSubmission.resolved })
          }}
        />
      )}
    </div>
  )
}

function SubmissionModal({
  submission,
  onClose,
  onToggleResolved,
}: {
  submission: Submission
  onClose: () => void
  onToggleResolved: () => void
}) {
  const data = submission.data as Record<string, string>
  const dept = data.department || data.strongestDept

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-orbitron text-xl font-bold gradient-text">SUBMISSION DETAILS</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`px-3 py-1 rounded-md text-xs font-medium border ${TYPE_COLORS[submission.type]}`}>
            {TYPE_LABELS[submission.type]}
          </span>
          {dept && (
            <span className="px-3 py-1 rounded-md text-xs font-medium border border-border-subtle text-zinc-400">
              {dept}
            </span>
          )}
          {data.severity && (
            <span className={`px-3 py-1 rounded-md text-xs font-medium border ${SEVERITY_COLORS[data.severity]}`}>
              {data.severity}
            </span>
          )}
          <span className={`px-3 py-1 rounded-md text-xs font-medium border ${submission.resolved ? 'bg-brand/20 text-brand border-brand/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
            {submission.resolved ? 'Resolved' : 'Pending'}
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-medium border border-border-subtle text-zinc-400">
            {new Date(submission.created_at).toLocaleString()}
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(data)
            .filter(([_, value]) => value && value !== 'undefined' && value !== 'null')
            .map(([key, value]) => (
              <div key={key} className="p-3 rounded-xl bg-bg-input">
                <p className="text-xs font-medium text-brand uppercase tracking-wider mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-zinc-300 whitespace-pre-wrap">{value}</p>
              </div>
            ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-xl border border-border-subtle text-sm font-medium text-zinc-300 hover:bg-white/5 transition-all"
          >
            Close
          </button>
          <button
            onClick={onToggleResolved}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              submission.resolved
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                : 'bg-brand/20 text-brand border border-brand/30 hover:bg-brand/30'
            }`}
          >
            {submission.resolved ? 'Mark as Pending' : 'Mark as Resolved'}
          </button>
        </div>
      </div>
    </div>
  )
}
