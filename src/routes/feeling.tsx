import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import feelings from '@/data/feelings'

export const Route = createFileRoute('/feeling')({
  component: FeelingPage,
})

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function MessageModal({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,2,13,0.9)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full rounded-3xl p-8 text-center"
        style={{
          background: 'rgba(13,5,32,0.95)',
          border: '1px solid rgba(244,114,182,0.3)',
          boxShadow: '0 20px 60px rgba(244,114,182,0.15), 0 0 80px rgba(168,85,247,0.1)',
          animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top glow */}
        <div
          className="absolute -top-1 left-1/4 right-1/4 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.6), transparent)' }}
        />

        <div className="text-4xl mb-4">💌</div>

        <p
          className="font-body leading-relaxed"
          style={{
            color: 'rgba(233,213,255,0.9)',
            fontSize: '1.1rem',
            lineHeight: '1.85',
            fontStyle: 'italic',
          }}
        >
          "{text}"
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.4))' }} />
          <span className="text-sm" style={{ color: '#f472b6' }}>♡</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(244,114,182,0.4), transparent)' }} />
        </div>

        <button
          onClick={onClose}
          className="mt-5 btn-magical text-sm py-2.5 px-6"
        >
          Close ♡
        </button>
      </div>
    </div>
  )
}

function FeelingPage() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null)
  const [shuffledMessages, setShuffledMessages] = useState<Record<string, string[]>>({})

  const openFeeling = useCallback((id: string) => {
    const feeling = feelings.find(f => f.id === id)
    if (!feeling) return

    const msgs = shuffledMessages[id] || shuffle(feeling.messages)
    setShuffledMessages(prev => ({ ...prev, [id]: msgs }))
    setActiveMessage(msgs[0])

    // Rotate for next click
    const rotated = [...msgs.slice(1), msgs[0]]
    setShuffledMessages(prev => ({ ...prev, [id]: rotated }))
  }, [shuffledMessages])

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'radial-gradient(ellipse at 40% 20%, #1e0840 0%, #0d0520 50%, #05020d 100%)',
      }}
    >
      <StarField />
      <SparkleCanvas />
      <Navbar />

      {activeMessage && (
        <MessageModal text={activeMessage} onClose={() => setActiveMessage(null)} />
      )}

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-script text-base mb-2" style={{ color: '#f472b6' }}>
              Whatever you're feeling right now...
            </p>
            <h1
              className="font-serif font-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              I Am Feeling... ♡
            </h1>
            <p
              className="font-body max-w-md mx-auto"
              style={{ color: 'rgba(196,181,253,0.6)', lineHeight: '1.7' }}
            >
              Tap how you're feeling. Get a message made just for that moment.
            </p>

            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4))' }} />
              <span style={{ color: '#a855f7' }}>✦</span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.4), transparent)' }} />
            </div>
          </div>

          {/* Feelings grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {feelings.map(feeling => (
              <button
                key={feeling.id}
                onClick={() => openFeeling(feeling.id)}
                className={`rounded-2xl p-5 text-center transition-all duration-300 group bg-gradient-to-br ${feeling.color}`}
                style={{
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translateY(-4px) scale(1.02)'
                  el.style.boxShadow = '0 12px 30px rgba(168,85,247,0.2)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div
                  className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  {feeling.emoji}
                </div>
                <p
                  className="font-body text-sm font-medium"
                  style={{ color: 'rgba(233,213,255,0.85)' }}
                >
                  {feeling.label}
                </p>
                <p
                  className="font-body text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(244,114,182,0.7)' }}
                >
                  Tap ♡
                </p>
              </button>
            ))}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-8">
            <p className="font-script text-base" style={{ color: 'rgba(244,114,182,0.5)' }}>
              Each tap shuffles a new message, just for you ✨
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
