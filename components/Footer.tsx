import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-black border-t border-cyan/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Team Zero"
              width={36}
              height={36}
              style={{ filter: 'invert(1) brightness(1.2) drop-shadow(0 0 6px rgba(0, 229, 255, 0.5))' }}
            />
            <span className="font-orbitron text-sm font-bold tracking-wider">
              TEAM <span className="text-cyan">ZERO</span>
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
