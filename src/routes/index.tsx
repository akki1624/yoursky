import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import FloatingHearts from '@/components/FloatingHearts'
import Countdown from '@/components/Countdown'
import TimelineCard from '@/components/TimelineCard'
import TonightsSky from '@/components/TonightsSky'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import journey from '@/data/journey'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function FloatingHeart({ delay, x }: { delay: number; x: number }) {
  const emojis = ['♡', '💕', '✨', '💫']
  const colors = ['#f472b6', '#c084fc', '#fbbf24', '#e879f9']
  const idx = Math.floor(x / 25)
  return (
    <div
      className="absolute pointer-events-none text-lg"
      style={{
        left: `${x}%`,
        bottom: '10%',
        animation: `floatHeart ${4 + delay}s ease-out infinite`,
        animationDelay: `${delay}s`,
        color: colors[idx],
        opacity: 0.5,
      }}
    >
      {emojis[idx]}
    </div>
  )
}

function HomePage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen night-bg relative">
      <StarField />
      <SparkleCanvas />
      <FloatingHearts />
      <Navbar />
      

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {[10, 25, 40, 55, 70, 85].map((x, i) => (
          <FloatingHeart key={x} x={x} delay={i * 1.2} />
        ))}
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative z-10 min-h-screen flex items-center pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Hero text */}
            <div
              className="text-center lg:text-left"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 1s ease',
              }}
            >
              {/* Sparkle accent */}
              <p
                className="font-script text-base mb-3 tracking-wide"
                style={{ color: '#f472b6', textShadow: '0 0 15px rgba(244,114,182,0.5)' }}
              >
                ✨ A love story, wrapped in starlight ✨
              </p>

              {/* Main heading */}
              <h1
                className="font-serif font-bold mb-2 leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                <span
                  style={{
                    background: 'linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fbbf24 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 4s ease infinite',
                  }}
                >
                  The Sky Kept
                </span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #c084fc 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 4s ease infinite 1s',
                  }}
                >
                  Your Wishes ✨
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="font-script text-xl mt-3 mb-4"
                style={{ color: '#c084fc', textShadow: '0 0 15px rgba(192,132,252,0.4)' }}
              >
                Every moment with you is my favourite ♡
              </p>
              <p
                className="font-body leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
                style={{ color: 'rgba(233,213,255,0.7)', fontSize: '1.05rem', lineHeight: '1.8' }}
              >
                Eleven days of love, memories, and magic — from May 15 to May 25.
                This is your story, told in starlight.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/birthday" className="btn-magical inline-block text-center">
                  Begin Our Journey ♡
                </Link>
                <Link
                  to="/memories"
                  className="inline-block text-center px-8 py-3 rounded-full font-body transition-all duration-300"
                  style={{
                    border: '1px solid rgba(168,85,247,0.4)',
                    color: '#c084fc',
                    background: 'rgba(168,85,247,0.08)',
                    fontSize: '1.05rem',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(168,85,247,0.15)'
                    el.style.boxShadow = '0 0 20px rgba(168,85,247,0.3)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(168,85,247,0.08)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  Our Memories ✦
                </Link>
              </div>
            </div>

            {/* RIGHT — Countdown */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 1s ease 0.3s',
              }}
            >
              <Countdown />

              {/* Journey preview */}
              <div
                className="mt-4 rounded-2xl p-4 text-center"
                style={{
                  background: 'rgba(168,85,247,0.08)',
                  border: '1px solid rgba(168,85,247,0.15)',
                }}
              >
                <p className="font-script text-base" style={{ color: '#c084fc' }}>
                  May 15 → May 25
                </p>
                <p className="font-body text-sm mt-1" style={{ color: 'rgba(196,181,253,0.5)' }}>
                  Eleven days of birthday magic
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {journey.map(d => (
                    <div
                      key={d.day}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: d.isBirthday ? '#fbbf24' : d.color === 'pink' ? '#f472b6' : '#a855f7',
                        boxShadow: d.isBirthday ? '0 0 6px #fbbf24' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 11-DAY JOURNEY TIMELINE ========== */}
      <section className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="font-script text-base mb-2" style={{ color: '#f472b6' }}>
              Our Story, Day by Day
            </p>
            <h2
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                background: 'linear-gradient(135deg, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our 11 Day Journey
            </h2>
            <div className="flex justify-center items-center gap-2 mt-3">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5))' }} />
              <span style={{ color: '#a855f7' }}>✦</span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.5), transparent)' }} />
            </div>
          </div>

          {/* Mobile: horizontal scroll / Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {journey.map((day, i) => (
              <TimelineCard key={day.day} day={day} index={i} />
            ))}
          </div>

          <div className="md:hidden flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {journey.map((day, i) => (
              <div key={day.day} className="flex-shrink-0" style={{ width: '200px' }}>
                <TimelineCard day={day} index={i} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/birthday" className="btn-magical inline-block">
              Open All 11 Days ✨
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WISH JAR PREVIEW ========== */}
      <section className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'rgba(13,5,32,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 8px 40px rgba(168,85,247,0.15)',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              {/* Jar visual */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-28 h-36 rounded-b-3xl rounded-t-lg relative flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(168,85,247,0.15) 0%, rgba(13,5,32,0.5) 100%)',
                    border: '1.5px solid rgba(168,85,247,0.4)',
                    boxShadow: '0 0 30px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.08)',
                  }}
                >
                  {/* Fireflies inside */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${25 + (i % 3) * 20}%`,
                        background: i === 4 ? '#fbbf24' : '#86efac',
                        boxShadow: i === 4
                          ? '0 0 8px #fbbf24, 0 0 20px #fbbf2466'
                          : '0 0 6px #86efac, 0 0 15px #86efac66',
                        animation: `fireflyGlow ${1.5 + i * 0.4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.6}s`,
                      }}
                    />
                  ))}
                  {/* Jar shine */}
                  <div
                    className="absolute top-3 left-3 w-4 h-14 rounded-full opacity-20"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.8), transparent)' }}
                  />
                </div>
              </div>

              <h2 className="font-serif text-2xl mb-2" style={{
                background: 'linear-gradient(135deg, #c084fc, #fbbf24)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                The Wish Jar
              </h2>
              <p className="font-script text-base mb-2" style={{ color: '#f472b6' }}>
                Catch the golden firefly, answer a question, and seal three wishes in starlight
              </p>
              <p className="font-body text-sm mb-6" style={{ color: 'rgba(196,181,253,0.5)' }}>
                One golden firefly hides among the rest — find it, answer correctly, and choose your 3 wishes.
              </p>

              <Link to="/wish-jar" className="btn-magical inline-block">
                Enter the Wish Jar ✨
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TONIGHT'S SKY WIDGET ========== */}
      <section className="relative z-10 py-10 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <TonightsSky />
        </div>
      </section>

      <Footer />
    </div>
  )
}
