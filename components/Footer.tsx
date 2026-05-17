import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Team Zero"
              width={36}
              height={36}
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))' }}
            />
            <span className="font-orbitron text-sm font-bold tracking-wider">
              TEAM <span className="text-brand-light">ZERO</span>
            </span>
          </div>
          <p className="text-gray-600 text-xs">
            2024 Team Zero. Internal Review & Feedback System.
          </p>
        </div>
      </div>
    </footer>
  )
}
