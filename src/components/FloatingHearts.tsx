import { useEffect, useState } from 'react'

interface Heart {
  id: number
  x: number
  y: number
  emoji: string
  duration: number
}

const heartEmojis = ['♡', '💕', '💫', '✨', '🌸', '💖']
let hId = 0

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const spawn = () => {
      const id = ++hId
      const heart: Heart = {
        id,
        x: Math.random() * 90 + 5, // percent
        y: Math.random() * 60 + 20, // percent
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        duration: 3 + Math.random() * 2,
      }
      setHearts(prev => [...prev.slice(-15), heart])
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), (heart.duration + 1) * 1000)
    }

    const interval = setInterval(spawn, 2500)
    spawn()
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute text-lg"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            animation: `floatHeart ${h.duration}s ease-out forwards`,
            color: ['#f472b6', '#c084fc', '#fbbf24', '#e879f9'][Math.floor(Math.random() * 4)],
            opacity: 0.4,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  )
}
