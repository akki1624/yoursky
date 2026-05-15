import { useState, useRef, useEffect, useCallback } from 'react'
import { wishJarQuestion, wishes } from '@/data/wishJar'

interface FireflyPos {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  special: boolean
  caught: boolean
}

type Phase = 'catching' | 'question' | 'success' | 'wrong' | 'outOfAttempts' | 'done'

export default function WishJarGame() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [flies, setFlies] = useState<FireflyPos[]>([])
  const [phase, setPhase] = useState<Phase>('catching')
  const [attempts, setAttempts] = useState(2)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [selectedWishes, setSelectedWishes] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  const initFlies = useCallback(() => {
    const w = containerRef.current?.clientWidth || 320
    const h = containerRef.current?.clientHeight || 360

    const newFlies: FireflyPos[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * (w - 20) + 10,
      y: Math.random() * (h - 20) + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      special: i === 11,
      caught: false,
    }))
    setFlies(newFlies)
  }, [])

  useEffect(() => {
    initFlies()
    return () => cancelAnimationFrame(animRef.current)
  }, [initFlies])

  useEffect(() => {
    if (phase !== 'catching') return

    const animate = (ts: number) => {
      timeRef.current = ts

      const w = containerRef.current?.clientWidth || 320
      const h = containerRef.current?.clientHeight || 360

      setFlies(prev => prev.map(f => {
        if (f.caught) return f
        let nx = f.x + f.vx + Math.sin(ts * 0.001 * (f.id + 1)) * 0.8
        let ny = f.y + f.vy + Math.cos(ts * 0.0013 * (f.id + 1)) * 0.8
        let nvx = f.vx + (Math.random() - 0.5) * 0.05
        let nvy = f.vy + (Math.random() - 0.5) * 0.05
        nvx = Math.max(-2, Math.min(2, nvx))
        nvy = Math.max(-2, Math.min(2, nvy))
        if (nx < 10 || nx > w - 10) nvx *= -1
        if (ny < 10 || ny > h - 10) nvy *= -1
        nx = Math.max(10, Math.min(w - 10, nx))
        ny = Math.max(10, Math.min(h - 10, ny))
        return { ...f, x: nx, y: ny, vx: nvx, vy: nvy }
      }))

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [phase])

  const catchFly = (fly: FireflyPos) => {
    if (fly.caught || phase !== 'catching') return
    cancelAnimationFrame(animRef.current)

    setFlies(prev => prev.map(f => f.id === fly.id ? { ...f, caught: true } : f))

    if (fly.special) {
      setTimeout(() => setPhase('question'), 600)
    } else {
      // Sparkle effect, reset after delay
      setTimeout(() => {
        setFlies(prev => prev.map(f => f.id === fly.id ? { ...f, caught: false } : f))
      }, 1000)
    }
  }

  const submitAnswer = () => {
    if (!selectedAnswer) return
    if (selectedAnswer === wishJarQuestion.correctAnswer) {
      setPhase('success')
    } else {
      const left = attempts - 1
      setAttempts(left)
      if (left <= 0) {
        setPhase('outOfAttempts')
      } else {
        setPhase('wrong')
        setSelectedAnswer(null)
      }
    }
  }

  const toggleWish = (id: string) => {
    setSelectedWishes(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  const saveWishes = async () => {
    setSaved(true)
    setPhase('done')
    try {
      await fetch('/api/wish-jar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selectedAnswer, wishes: selectedWishes, ts: Date.now() }),
      })
    } catch {}
  }

  return (
    <div className="w-full">
      {/* Jar container */}
      <div
        ref={containerRef}
        className="relative mx-auto rounded-3xl overflow-y-auto"
        style={{
          width: '100%',
          maxWidth: '380px',
          minHeight: '380px',
maxHeight: '85vh',
          background: 'linear-gradient(180deg, rgba(168,85,247,0.08) 0%, rgba(13,5,32,0.6) 100%)',
          border: '2px solid rgba(168,85,247,0.35)',
          boxShadow: '0 0 40px rgba(168,85,247,0.15), inset 0 0 40px rgba(168,85,247,0.05)',
        }}
      >
        {/* Jar shine */}
        <div
          className="absolute top-4 left-6 w-8 h-24 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.8), transparent)' }}
        />

        {phase === 'catching' && (
          <>
            {flies.filter(f => !f.caught).map(fly => (
              <button
                key={fly.id}
                className={fly.special ? 'firefly-special' : 'firefly-dot'}
                style={{
                  left: fly.x,
                  top: fly.y,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${fly.id * 0.3}s`,
                }}
                onClick={() => catchFly(fly)}
                title={fly.special ? 'Click me!' : 'Catch the fireflies!'}
              />
            ))}
            <div
              className="absolute bottom-4 left-0 right-0 text-center font-script text-sm pointer-events-none"
              style={{ color: 'rgba(192,132,252,0.6)' }}
            >
              Catch the golden one ✨
            </div>
          </>
        )}

        {(phase === 'question' || phase === 'wrong') && (
          <div className="absolute inset-0 flex items-center justify-center p-6" style={{ background: 'rgba(5,2,13,0.92)' }}>
            <div className="w-full">
              <p className="font-script text-center text-lg mb-1" style={{ color: '#fbbf24' }}>
                A question appears...
              </p>
              <p className="font-body text-center text-sm mb-4" style={{ color: 'rgba(196,181,253,0.5)' }}>
                {wishJarQuestion.hint}
              </p>
              <p className="font-serif text-center text-base mb-4" style={{ color: '#e9d5ff' }}>
                {wishJarQuestion.question}
              </p>

              {phase === 'wrong' && (
                <p className="text-center text-xs mb-3 font-body" style={{ color: '#f87171' }}>
                  Not quite... {attempts} attempt{attempts !== 1 ? 's' : ''} remaining.
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {wishJarQuestion.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAnswer(opt.id)}
                    className="p-2.5 rounded-xl text-xs font-body text-left transition-all duration-200"
                    style={{
                      background: selectedAnswer === opt.id ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.08)',
                      border: selectedAnswer === opt.id ? '1px solid rgba(168,85,247,0.6)' : '1px solid rgba(168,85,247,0.2)',
                      color: selectedAnswer === opt.id ? '#e9d5ff' : 'rgba(196,181,253,0.6)',
                    }}
                  >
                    <span style={{ color: '#fbbf24', fontWeight: 600 }}>{opt.id}.</span> {opt.text}
                  </button>
                ))}
              </div>

              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="w-full mt-3 py-2 rounded-xl font-body text-sm transition-all duration-200"
                style={{
                  background: selectedAnswer ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'rgba(168,85,247,0.1)',
                  color: selectedAnswer ? 'white' : 'rgba(196,181,253,0.4)',
                  cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                  border: '1px solid rgba(168,85,247,0.3)',
                }}
              >
                Confirm ♡
              </button>
            </div>
          </div>
        )}

        {phase === 'outOfAttempts' && (
          <div className="absolute inset-0 flex items-center justify-center p-6" style={{ background: 'rgba(5,2,13,0.92)' }}>
            <div className="text-center">
              <p className="text-3xl mb-3">💔</p>
              <p className="font-serif text-base" style={{ color: '#f87171' }}>Out of attempts...</p>
              <p className="font-body text-sm mt-2" style={{ color: 'rgba(196,181,253,0.5)' }}>
                Come back tomorrow and try again, my love.
              </p>
            </div>
          </div>
        )}

        {phase === 'success' && (
  <div
    className="absolute inset-0 overflow-y-auto p-5"
    style={{
      background: 'rgba(5,2,13,0.92)',
    }}
  >
    <div
      className="w-full"
      style={{
        maxHeight: '85vh',
        overflowY: 'auto',
        paddingRight: '4px',
      }}
    >
      <p
        className="font-script text-center text-lg mb-1"
        style={{ color: '#86efac' }}
      >
        ✓ You got it right! ♡
      </p>

      <p
        className="font-body text-center text-xs mb-4"
        style={{ color: 'rgba(196,181,253,0.5)' }}
      >
        Choose 3 wishes to keep in the jar...
      </p>

      <div className="space-y-2">
        {wishes.map(wish => {
          const sel = selectedWishes.includes(wish.id)

          return (
            <button
              key={wish.id}
              onClick={() => toggleWish(wish.id)}
              className="w-full p-2.5 rounded-xl text-xs font-body text-left transition-all duration-200 flex items-start gap-2"
              style={{
                background: sel
                  ? 'rgba(168,85,247,0.2)'
                  : 'rgba(168,85,247,0.06)',

                border: sel
                  ? '1px solid rgba(168,85,247,0.5)'
                  : '1px solid rgba(168,85,247,0.15)',

                color: sel
                  ? '#e9d5ff'
                  : 'rgba(196,181,253,0.5)',
              }}
            >
              <span>{wish.emoji}</span>
              <span>{wish.text}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={saveWishes}
        disabled={selectedWishes.length !== 3}
        className="w-full mt-3 py-2 rounded-xl font-body text-sm transition-all duration-200"
        style={{
          background:
            selectedWishes.length === 3
              ? 'linear-gradient(135deg, #f59e0b, #ec4899)'
              : 'rgba(168,85,247,0.1)',

          color:
            selectedWishes.length === 3
              ? 'white'
              : 'rgba(196,181,253,0.4)',

          cursor:
            selectedWishes.length === 3
              ? 'pointer'
              : 'not-allowed',
        }}
      >
        {selectedWishes.length}/3 — Save Wishes ✨
      </button>
    </div>
  </div>
)}

        {phase === 'done' && (
          <div className="absolute inset-0 flex items-center justify-center p-6" style={{ background: 'rgba(5,2,13,0.92)' }}>
            <div className="text-center">
              <p className="text-3xl mb-3">🌟</p>
              <p className="font-serif text-base" style={{ color: '#fbbf24', textShadow: '0 0 15px rgba(251,191,36,0.5)' }}>
                Your wishes are sealed
              </p>
              <p className="font-script text-sm mt-2" style={{ color: '#f472b6' }}>
                in the sky, for you ♡
              </p>
              {saved && (
                <p className="text-xs font-body mt-3" style={{ color: 'rgba(134,239,172,0.7)' }}>
                  ✓ Saved to the stars
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
