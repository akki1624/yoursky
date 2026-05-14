import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReactionPanel from '@/components/ReactionPanel'
import journey from '@/data/journey'

export const Route = createFileRoute('/birthday_/$day')({
  component: DayPage,
})

function LockedScreen({ day }: { day: (typeof journey)[0] }) {
  const unlock = new Date(day.unlockDate)
  const now = new Date()
  const diffDays = Math.max(0, Math.ceil((unlock.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'rgba(168,85,247,0.1)',
          border: '1px solid rgba(168,85,247,0.3)',
          animation: 'lockShake 4s ease-in-out infinite',
        }}
      >
        <span className="text-4xl">🔒</span>
      </div>
      <h2 className="font-serif text-2xl mb-2" style={{ color: '#e9d5ff' }}>
        This Day Is Still Locked
      </h2>
      <p className="font-body text-lg" style={{ color: 'rgba(196,181,253,0.6)' }}>
        Unlocks in {diffDays} day{diffDays !== 1 ? 's' : ''}
      </p>
      <p className="font-script text-sm mt-2" style={{ color: '#f472b6' }}>
        on {day.displayDate} ♡
      </p>
    </div>
  )
}

function DayPage() {
  const { day: dayParam } = Route.useParams()
  const [bonusOpen, setBonusOpen] = useState(false)

  const day = journey.find(d => d.date === dayParam)
  if (!day) {
    return (
      <div className="min-h-screen night-bg flex items-center justify-center">
        <p className="font-serif text-xl" style={{ color: '#e9d5ff' }}>Day not found.</p>
      </div>
    )
  }

  const currentIdx = journey.findIndex(d => d.date === dayParam)

const prev =
  currentIdx > 0
    ? journey[currentIdx - 1]
    : null

const next =
  currentIdx < journey.length - 1
    ? journey[currentIdx + 1]
    : null

// AUTO UNLOCK SYSTEM
const unlockDate = new Date(day.unlockDate)
const isUnlocked =
  Date.now() >= unlockDate.getTime()

  const colorMap: Record<string, string> = {
    purple: '#a855f7',
    pink: '#f472b6',
    gold: '#fbbf24',
    birthday: '#fbbf24',
  }
  const accent = colorMap[day.color] || '#a855f7'

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: day.isBirthday
          ? 'radial-gradient(ellipse at top, #2d1008 0%, #1a0535 40%, #05020d 100%)'
          : 'radial-gradient(ellipse at top, #1a0535 0%, #0d0520 40%, #05020d 100%)',
      }}
    >
      <StarField />
      <SparkleCanvas />
      <Navbar />
    

      {day.isBirthday && (
        /* Birthday confetti glow */
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 60%)',
            zIndex: 2,
          }}
        />
      )}

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Navigation breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-body">
            <Link to="/birthday" style={{ color: 'rgba(196,181,253,0.5)' }} className="hover:text-purple-300 transition-colors">
              Birthday 2026
            </Link>
            <span style={{ color: 'rgba(196,181,253,0.3)' }}>›</span>
            <span style={{ color: accent }}>{day.displayDate}</span>
          </div>

          {/* Day header */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 font-body text-xs uppercase tracking-widest"
              style={{
                background: `rgba(${accent === '#fbbf24' ? '251,191,36' : accent === '#f472b6' ? '244,114,182' : '168,85,247'},0.12)`,
                border: `1px solid ${accent}44`,
                color: accent,
                letterSpacing: '0.15em',
              }}
            >
              <span>{day.emoji}</span>
              <span>Day {day.day} • {day.displayDate}</span>
            </div>

            <h1
              className="font-serif font-bold mb-3"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                color: day.isBirthday ? '#fde68a' : '#e9d5ff',
                textShadow: day.isBirthday ? '0 0 30px rgba(251,191,36,0.4)' : 'none',
                lineHeight: 1.2,
              }}
            >
              {day.title}
            </h1>
            <p className="font-script text-lg" style={{ color: '#f472b6' }}>
              {day.subtitle}
            </p>
          </div>

          {/* Locked or unlocked */}
          {!isUnlocked ? (
            <LockedScreen day={day} />
          ) : (
            <div className="space-y-8">

              {/* ===== POEM ===== */}
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: 'rgba(13,5,32,0.75)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${accent}44`,
                  boxShadow: `0 4px 30px ${accent}18`,
                }}
              >
                <div className="absolute top-4 right-4 opacity-10 text-5xl pointer-events-none">✦</div>

                <div className="flex items-center gap-2 mb-5">
                  <span style={{ color: accent }}>✦</span>
                  <h2 className="font-serif text-lg" style={{ color: '#e9d5ff' }}>Today's Poem</h2>
                </div>

                <blockquote
                  className="font-body leading-relaxed mb-4"
                  style={{
                    color: 'rgba(233,213,255,0.85)',
                    fontSize: '1.1rem',
                    lineHeight: '2',
                    fontStyle: 'italic',
                    whiteSpace: 'pre-line',
                    borderLeft: `2px solid ${accent}44`,
                    paddingLeft: '1.5rem',
                  }}
                >
                  {day.poem}
                </blockquote>

                <p className="font-script text-sm text-right" style={{ color: `${accent}aa` }}>
                  — {day.poemAuthor}
                </p>
              </div>

              {/* ===== MEMORY ===== */}
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: 'rgba(13,5,32,0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(244,114,182,0.2)',
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span style={{ color: '#f472b6' }}>♡</span>
                  <h2 className="font-serif text-lg" style={{ color: '#e9d5ff' }}>A Memory</h2>
                </div>

                {/* Memory Image */}
<div
  className="rounded-3xl overflow-hidden mb-6"
  style={{
    border: '1px solid rgba(168,85,247,0.25)',
    boxShadow: '0 0 40px rgba(168,85,247,0.12)',
  }}
>
  <img
    src={`/memories/day${day.day}.png`}
    alt={`Memory Day ${day.day}`}
    className="w-full object-cover"
    style={{
      width: '100%',
      maxHeight: '750px',
    }}
  />
</div>

                <p
                  className="font-body leading-relaxed"
                  style={{ color: 'rgba(233,213,255,0.75)', fontSize: '1rem', lineHeight: '1.85' }}
                >
                  {day.memoryNote}
                </p>
              </div>

              

              {/* ===== BONUS SURPRISE ===== */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: `1px solid ${accent}44`,
                }}
              >
                <button
                  className="w-full p-6 flex items-center justify-between transition-all duration-300"
                  style={{
                    background: bonusOpen ? 'rgba(168,85,247,0.12)' : 'rgba(13,5,32,0.75)',
                    backdropFilter: 'blur(16px)',
                  }}
                  onClick={() => setBonusOpen(v => !v)}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: accent }}>🎁</span>
                    <h2 className="font-serif text-lg" style={{ color: '#e9d5ff' }}>
                      Bonus Surprise
                    </h2>
                  </div>
                  <span
                    className="text-lg transition-transform duration-300"
                    style={{
                      color: accent,
                      transform: bonusOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▾
                  </span>
                </button>

                {bonusOpen && (
                  <div
                    className="px-6 pb-6"
                    style={{
                      background: 'rgba(13,5,32,0.75)',
                      backdropFilter: 'blur(16px)',
                      animation: 'fadeInUp 0.3s ease-out',
                    }}
                  >
                    <div
                      className="h-px w-full mb-5"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}44, transparent)` }}
                    />
                    <p
                      className="font-body leading-relaxed"
                      style={{ color: 'rgba(233,213,255,0.75)', lineHeight: '1.85' }}
                    >
                      {day.bonusSurprise}
                    </p>
                  </div>
                )}
              </div>

              {/* ===== REACTIONS ===== */}
              <ReactionPanel day={day.date} />

              {/* ===== DAY NAVIGATION ===== */}
              <div className="flex justify-between items-center pt-4">
                {prev ? (
                  <Link
                    to="/birthday/$day"
                    params={{ day: prev.date }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-body text-sm group"
                    style={{
                      background: 'rgba(168,85,247,0.08)',
                      border: '1px solid rgba(168,85,247,0.2)',
                      color: '#c084fc',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'rgba(168,85,247,0.15)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'rgba(168,85,247,0.08)'
                    }}
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>{prev.displayDate}</span>
                  </Link>
                ) : <div />}

                <Link
                  to="/birthday"
                  className="font-body text-xs uppercase tracking-widest transition-all duration-300"
                  style={{ color: 'rgba(196,181,253,0.4)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c084fc' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,181,253,0.4)' }}
                >
                  All Days
                </Link>

                {next ? (
                  <Link
                    to="/birthday/$day"
                    params={{ day: next.date }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-body text-sm group"
                    style={{
                      background: 'rgba(168,85,247,0.08)',
                      border: '1px solid rgba(168,85,247,0.2)',
                      color: '#c084fc',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'rgba(168,85,247,0.15)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'rgba(168,85,247,0.08)'
                    }}
                  >
                    <span>{next.displayDate}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ) : <div />}
              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
