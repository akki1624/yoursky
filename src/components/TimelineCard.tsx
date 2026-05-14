import { Link } from '@tanstack/react-router'
import type { DayData } from '@/data/journey'

interface Props {
  day: DayData
  index: number
}

const colorMap: Record<string, { border: string; glow: string; badge: string; icon: string }> = {
  purple: {
    border: 'rgba(168,85,247,0.35)',
    glow: 'rgba(168,85,247,0.2)',
    badge: 'rgba(168,85,247,0.2)',
    icon: '#a855f7',
  },
  pink: {
    border: 'rgba(244,114,182,0.35)',
    glow: 'rgba(244,114,182,0.2)',
    badge: 'rgba(244,114,182,0.2)',
    icon: '#f472b6',
  },
  gold: {
    border: 'rgba(251,191,36,0.35)',
    glow: 'rgba(251,191,36,0.2)',
    badge: 'rgba(251,191,36,0.15)',
    icon: '#fbbf24',
  },
  birthday: {
    border: 'rgba(251,191,36,0.5)',
    glow: 'rgba(251,191,36,0.3)',
    badge: 'rgba(251,191,36,0.2)',
    icon: '#fbbf24',
  },
}

export default function TimelineCard({ day, index: _index }: Props) {
  const colors = colorMap[day.color] || colorMap.purple
  const isUnlocked = !day.locked

  return (
    <Link
      to="/birthday/$day"
      params={{ day: day.date }}
      className="block relative group"
    >
      <div
        className="timeline-card rounded-2xl overflow-hidden relative"
        style={{
          background: day.isBirthday
            ? 'linear-gradient(135deg, rgba(30,10,60,0.85), rgba(60,20,5,0.85))'
            : 'rgba(13,5,32,0.7)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${colors.border}`,
          boxShadow: `0 4px 24px ${colors.glow}, inset 0 0 20px rgba(0,0,0,0.2)`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = `0 12px 40px ${colors.glow.replace('0.2', '0.5')}, inset 0 0 20px rgba(0,0,0,0.2)`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = `0 4px 24px ${colors.glow}, inset 0 0 20px rgba(0,0,0,0.2)`
        }}
      >
        {/* Top glow strip */}
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.icon}, transparent)` }}
        />

        <div className="p-5">
          {/* Day badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-body uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: colors.badge,
                color: colors.icon,
                border: `1px solid ${colors.border}`,
                letterSpacing: '0.15em',
              }}
            >
              Day {day.day}
            </span>
            {day.isBirthday && (
              <span className="text-xs px-2 py-1 rounded-full font-body"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
              >
                🎂 Birthday
              </span>
            )}
            {day.isFinal && (
              <span className="text-xs px-2 py-1 rounded-full font-body"
                style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                💌 Final Gift
              </span>
            )}
          </div>

          {/* Emoji + Date */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" style={{ filter: `drop-shadow(0 0 8px ${colors.icon})` }}>
              {day.emoji}
            </span>
            <span className="font-body text-sm" style={{ color: 'rgba(196,181,253,0.6)' }}>
              {day.displayDate}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-serif text-lg font-semibold mb-1 leading-tight"
            style={{
              color: day.isBirthday ? '#fde68a' : '#e9d5ff',
              textShadow: day.isBirthday ? '0 0 15px rgba(251,191,36,0.4)' : 'none',
            }}
          >
            {day.title}
          </h3>

          {/* Subtitle */}
          <p className="font-script text-sm" style={{ color: 'rgba(244,114,182,0.7)' }}>
            {day.subtitle}
          </p>

          {/* Lock/unlock indicator */}
          <div className="mt-4 flex items-center justify-between">
            {isUnlocked ? (
              <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: '#86efac' }}>
                <span>✦</span> Open
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: 'rgba(196,181,253,0.4)' }}>
                <span>🔒</span> Locked
              </span>
            )}
            <span
              className="text-xs font-body group-hover:translate-x-1 transition-transform"
              style={{ color: colors.icon, opacity: 0.7 }}
            >
              Open →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
