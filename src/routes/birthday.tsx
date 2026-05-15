import { createFileRoute, Link } from '@tanstack/react-router'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TimelineCard from '@/components/TimelineCard'
import Countdown from '@/components/Countdown'
import journey from '@/data/journey'

export const Route = createFileRoute('/birthday')({
  component: BirthdayPage,
})

function BirthdayPage() {
  return (
    <div className="min-h-screen night-bg-2 relative">
      <StarField />
      <SparkleCanvas />
      <Navbar />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-script text-base mb-2" style={{ color: '#f472b6', textShadow: '0 0 10px rgba(244,114,182,0.4)' }}>
              From May 15 to May 25
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
              Birthday 2026 ✨
            </h1>
            <p
              className="font-body max-w-xl mx-auto"
              style={{ color: 'rgba(196,181,253,0.6)', lineHeight: '1.7' }}
            >
              Eleven days of magic, crafted with love. Each day unlocks a poem, a memory, a song, and a surprise — just for you.
            </p>

            {/* Divider */}
            <div className="flex justify-center items-center gap-3 mt-5">
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4))' }} />
              <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>✦</span>
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.4), transparent)' }} />
            </div>
          </div>

          {/* Countdown */}
          <div className="max-w-md mx-auto mb-12">
            <Countdown />
          </div>

          {/* Journey grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {journey.map((day, i) => (
              <TimelineCard key={day.day} day={day} index={i} />
            ))}
          </div>

          {/* Bottom note */}
          <div className="text-center">
            <div
              className="inline-block rounded-2xl px-6 py-4"
              style={{
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
              }}
            >
              <p className="font-script text-base" style={{ color: '#f472b6' }}>
                Each card opens a full page of love ♡
              </p>
              <p className="font-body text-sm mt-1" style={{ color: 'rgba(196,181,253,0.5)' }}>
                Everyday will have something for you, maybe a poem, a memory, or a message. Try to understand that each thing is from the bottom of someone's heart.
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#a855f7' }} />
              <span className="font-body text-xs" style={{ color: 'rgba(196,181,253,0.5)' }}>Journey Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
              <span className="font-body text-xs" style={{ color: 'rgba(196,181,253,0.5)' }}>Birthday (May 22)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#f472b6' }} />
              <span className="font-body text-xs" style={{ color: 'rgba(196,181,253,0.5)' }}>Final Gift (May 25)</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
