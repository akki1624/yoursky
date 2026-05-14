import { useEffect, useState } from 'react'

const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
const constellations = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

const quotes = [
  'Under the same sky, I think of you.',
  'The moon keeps all my wishes for you.',
  'Stars spelled your name tonight.',
  'Every night sky leads me back to you.',
  'Even the universe is in love with you.',
  'The night is beautiful because you exist.',
  'I traced your name in constellations.',
  'The moon rose early just to see you.',
  'Somewhere out there, you\'re under this same sky.',
  'The stars have known your name since before I did.',
]

function getMoonPhase(): { phase: string; name: string; index: number } {
  const known = new Date('2001-01-24')
  const now = new Date()
  const diff = (now.getTime() - known.getTime()) / (1000 * 60 * 60 * 24)
  const cycle = diff % 29.53
  const idx = Math.floor((cycle / 29.53) * 8)
  const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
  const i = Math.min(idx, 7)
  return { phase: moonPhases[i], name: names[i], index: i }
}

function getDailyQuote(): string {
  const day = new Date().getDay()
  return quotes[day % quotes.length]
}

function getDailyConstellation(): string {
  const month = new Date().getMonth()
  return constellations[month]
}

export default function TonightsSky() {
  const [moon] = useState(getMoonPhase)
  const [quote] = useState(getDailyQuote)
  const [constellation] = useState(getDailyConstellation)
  const [sparkle, setSparkle] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setSparkle(v => !v), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="rounded-3xl p-6 relative overflow-hidden"
      style={{
        background: 'rgba(13,5,32,0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(251,191,36,0.2)',
        boxShadow: '0 4px 30px rgba(251,191,36,0.1)',
      }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${8 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
              width: `${i % 3 === 0 ? 3 : 2}px`,
              height: `${i % 3 === 0 ? 3 : 2}px`,
              background: '#fde68a',
              opacity: sparkle ? (i % 2 === 0 ? 0.8 : 0.3) : (i % 2 === 0 ? 0.3 : 0.8),
              transition: 'opacity 1.5s ease',
              boxShadow: '0 0 4px #fbbf24',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          {/* Moon */}
          <div
            className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.2)',
              animation: 'moonGlow 4s ease-in-out infinite',
            }}
          >
            <span className="text-3xl">{moon.phase}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-script text-base" style={{ color: '#fde68a' }}>
                Tonight's Sky
              </p>
              <span className="text-sm">{constellation}</span>
            </div>
            <p className="text-xs font-body mb-2" style={{ color: 'rgba(251,191,36,0.5)' }}>
              {moon.name}
            </p>
            <p
              className="font-body italic"
              style={{ color: 'rgba(233,213,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}
            >
              "{quote}"
            </p>
          </div>
        </div>

        {/* Bottom sparkle row */}
        <div className="flex justify-center gap-2 mt-4">
          {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
            <span
              key={i}
              className="text-xs"
              style={{
                color: i % 2 === 0 ? '#fbbf24' : 'rgba(251,191,36,0.3)',
                transition: 'all 1s ease',
                animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
