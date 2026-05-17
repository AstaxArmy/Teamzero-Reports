'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div id="loading-screen" className={!visible ? 'hidden' : ''}>
      <div className="loading-content">
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Team Zero"
            width={140}
            height={140}
            className="mx-auto animate-pulse"
            style={{ filter: 'invert(1) brightness(1.2) drop-shadow(0 0 20px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 229, 255, 0.4))' }}
          />
        </div>
        <div className="loading-text">TEAM ZERO</div>
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
      </div>
    </div>
  )
}
