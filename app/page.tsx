import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, AlertTriangle, BarChart3, ArrowRight, Shield } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'

const categories = [
  {
    href: '/department-review',
    icon: BarChart3,
    title: 'Department Review',
    description: 'Review leadership and internal structure',
    color: 'from-violet-500/10 to-violet-600/5',
    borderColor: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    href: '/community-feedback',
    icon: Users,
    title: 'Community Feedback',
    description: 'Report issues or suggest improvements',
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    href: '/growth',
    icon: TrendingUp,
    title: 'Growth & Activity',
    description: 'Measure performance across departments',
    color: 'from-emerald-500/10 to-emerald-600/5',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    href: '/enforcement',
    icon: AlertTriangle,
    title: 'Enforcement',
    description: 'Handle serious internal issues',
    color: 'from-red-500/10 to-red-600/5',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
]

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/20 via-zinc-950 to-zinc-950" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="mb-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full scale-150 animate-pulse" />
                <Image
                  src="/logo.png"
                  alt="Team Zero"
                  width={160}
                  height={160}
                  className="relative mx-auto animate-float"
                  style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))' }}
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-orbitron text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Internal Review System</span>
            </div>

            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              <span className="text-white">TEAM </span>
              <span className="text-brand-light">ZERO</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto mb-4 font-light">
              Professional esports organisation management system.
            </p>

            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Submit reports, feedback, and suggestions to help us improve.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <FadeIn key={cat.href} delay={i * 100}>
              <Link
                href={cat.href}
                className="group glass-card p-6 block transition-all duration-300 hover:border-zinc-600"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} border ${cat.borderColor} mb-4`}>
                  <cat.icon className={`h-5 w-5 ${cat.iconColor}`} />
                </div>
                <h3 className="font-orbitron text-sm font-bold text-white mb-1.5 tracking-wide">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 group-hover:text-brand-light transition-all">
                  Submit <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin Dashboard
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
