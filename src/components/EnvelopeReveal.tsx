import { useState } from 'react'

interface Props {
  giftUrl?: string
}

export default function EnvelopeReveal({ giftUrl = '#' }: Props) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')

  const open = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => setPhase('open'), 1800)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Envelope */}
      <div
        className="relative cursor-pointer select-none"
        style={{ width: '280px', height: '200px', perspective: '800px' }}
        onClick={open}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a0535, #2e0d5e)',
            border: '1.5px solid rgba(251,191,36,0.4)',
            boxShadow: phase === 'open'
              ? '0 20px 60px rgba(251,191,36,0.3), 0 0 100px rgba(168,85,247,0.2)'
              : '0 8px 30px rgba(168,85,247,0.2)',
            transition: 'box-shadow 1s ease',
          }}
        >
          {/* Bottom flap lines */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(251,191,36,0.1))',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 49.5%, rgba(251,191,36,0.2) 50%, transparent 50.5%)',
              }}
            />
          </div>

          {/* Envelope seal */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.3), rgba(168,85,247,0.2))',
              border: '1px solid rgba(251,191,36,0.4)',
              boxShadow: '0 0 20px rgba(251,191,36,0.3)',
            }}
          >
            <span className="text-xl">💌</span>
          </div>

          {/* Fold lines */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), transparent)',
              clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
            }}
          />
        </div>

        {/* Flap (top) */}
        <div
          className="absolute top-0 left-0 right-0 rounded-t-2xl overflow-hidden"
          style={{
            height: '55%',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            transform: phase === 'opening' || phase === 'open' ? 'rotateX(-180deg)' : 'rotateX(0deg)',
            transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 5,
          }}
        >
          <div
            className="absolute inset-0 rounded-t-2xl"
            style={{
              background: 'linear-gradient(180deg, #2e0d5e, #1a0535)',
              border: '1.5px solid rgba(251,191,36,0.3)',
              borderBottom: 'none',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* Floating click hint */}
        {phase === 'closed' && (
          <div
            className="absolute -bottom-8 left-0 right-0 text-center font-script text-sm pointer-events-none"
            style={{
              color: 'rgba(251,191,36,0.7)',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            Click to open ♡
          </div>
        )}
      </div>

      {/* Letter reveal */}
      {phase === 'open' && (
        <div
          className="mt-12 max-w-lg w-full rounded-3xl p-8"
          style={{
            background: 'rgba(13,5,32,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(251,191,36,0.25)',
            boxShadow: '0 16px 60px rgba(251,191,36,0.15), 0 0 80px rgba(168,85,247,0.1)',
            animation: 'letterReveal 0.8s ease-out',
          }}
        >
          {/* Letter heading */}
          <div className="text-center mb-6">
            <span className="text-4xl">💌</span>
            <h2
              className="font-serif text-2xl mt-3"
              style={{ color: '#fde68a', textShadow: '0 0 20px rgba(251,191,36,0.4)' }}
            >
              My Dearest Love,
            </h2>
          </div>

          <div
            className="font-body leading-relaxed mb-6"
            style={{ color: 'rgba(233,213,255,0.85)', fontSize: '1.05rem', lineHeight: '1.9' }}
          >
            <p className="mb-4">
              [Replace this with your final letter. This is the most important part of the website — the letter she'll read on May 25th.]
            </p>
            <p className="mb-4">
              [Tell her everything you've wanted to say. What this year meant. What she means to you. What you're building together. Make it real, raw, and unforgettable.]
            </p>
            <p>
              [End with the gift reveal — a button that opens the second website you built together.]
            </p>
          </div>

          <div className="text-right font-script text-lg mb-6" style={{ color: '#f472b6' }}>
            — Aakash, forever yours ♡
          </div>

          {/* Gift button */}
          <div className="text-center">
            <a
              href={giftUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block"
              style={{ fontSize: '1rem', padding: '14px 36px' }}
            >
              ✨ Open Your Birthday Gift ✨
            </a>
            <p className="font-script text-sm mt-3" style={{ color: 'rgba(244,114,182,0.6)' }}>
              [Replace with the URL of your second website]
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
