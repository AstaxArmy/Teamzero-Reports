import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, AlertTriangle, BarChart3, ArrowRight, Shield } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'

const categories = [
  {
    href: '/department-review',
    icon: BarChart3,
    title: 'Department Staff Review',
    description: 'Staff under departments can review leadership and internal structure',
    color: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    href: '/community-feedback',
    icon: Users,
    title: 'Community Feedback & Report',
    description: 'Members can report issues or suggest improvements',
    color: 'from-cyan/20 to-cyan-dark/10',
    borderColor: 'border-cyan/20',
    iconColor: 'text-cyan',
  },
  {
    href: '/growth',
    icon: TrendingUp,
    title: 'Growth & Activity Feedback',
    description: 'Measure server performance and growth across departments',
    color: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    href: '/enforcement',
    icon: AlertTriangle,
    title: 'Enforcement Escalation',
    description: 'Handle serious internal issues and leadership abuse',
    color: 'from-red-500/20 to-red-600/10',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
]

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan/5 via-bg-primary to-bg-primary" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-cyan/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <Image
                  src="/logo.png"
                  alt="Team Zero"
                  width={180}
                  height={180}
                  className="relative mx-auto animate-float"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 60px rgba(0, 229, 255, 0.3))' }}
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <Shield className="h-4 w-4 text-cyan" />
              <span className="font-orbitron text-xs font-bold tracking-widest text-cyan uppercase">Internal Review System</span>
            </div>

            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="gradient-text">TEAM ZERO</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Professional esports organisation management system. Report issues, give feedback, and help us improve.
            </p>

            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              All submissions are securely stored and reviewed by the Team Zero administration team.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <FadeIn key={cat.href} delay={i * 100}>
              <Link
                href={cat.href}
                className="group glass-card rounded-2xl p-6 block transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border ${cat.borderColor} mb-4`}>
                  <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                </div>
                <h3 className="font-orbitron text-base font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{cat.description}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-cyan group-hover:gap-2 transition-all">
                  Submit <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-sm font-medium text-gray-400 hover:text-cyan hover:border-cyan/30 transition-all"
            >
              <Shield className="h-4 w-4" />
              Admin Dashboard
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
