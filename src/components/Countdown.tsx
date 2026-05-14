import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const target = new Date('2026-05-22T00:00:00').getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl relative"
        style={{
          background: 'rgba(168,85,247,0.12)',
          border: '1px solid rgba(168,85,247,0.3)',
          boxShadow: '0 0 20px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.05)',
        }}
      >
        <span
          className="font-serif text-2xl sm:text-3xl font-bold"
          style={{
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251,191,36,0.7)',
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span
        className="text-xs mt-2 tracking-widest uppercase font-body"
        style={{ color: 'rgba(233,213,255,0.6)', letterSpacing: '0.15em' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const isPast = Date.now() >= new Date('2026-05-22T00:00:00').getTime()

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 relative overflow-hidden"
style={{
  background: 'transparent',
}}
    >
      {/* Decorative corner glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        {isPast ? (
          <div className="text-center">
            <div className="text-4xl mb-3">🎂</div>
            <p className="font-script text-2xl" style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.6)' }}>
              Today is your day! ♡
            </p>
            <p className="font-body text-purple-300 mt-1 text-sm">May 22, 2026</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <p
  className="font-script"
  style={{
    color: '#f3c6ff',
    fontSize: '2rem',
    lineHeight: '1',
    marginBottom: '10px',
    textShadow: '0 0 18px rgba(255,180,220,0.35)',}}>Counting down to</p>
              <p className="font-serif text-xl font-semibold" style={{ color: '#fde68a', textShadow: '0 0 15px rgba(251,191,36,0.4)' }}>
                Your Birthday ♡
              </p>
              <p className="text-sm font-body" style={{ color: 'rgba(233,213,255,0.5)' }}>May 22, 2026</p>
            </div>
            <div className="flex items-start justify-center gap-3 sm:gap-4">
              <Unit value={time.days} label="Days" />
              <span className="font-serif text-2xl sm:text-3xl mt-4" style={{ color: '#a855f7' }}>:</span>
              <Unit value={time.hours} label="Hours" />
              <span className="font-serif text-2xl sm:text-3xl mt-4" style={{ color: '#a855f7' }}>:</span>
              <Unit value={time.minutes} label="Minutes" />
              <span className="font-serif text-2xl sm:text-3xl mt-4" style={{ color: '#a855f7' }}>:</span>
              <Unit value={time.seconds} label="Seconds" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
