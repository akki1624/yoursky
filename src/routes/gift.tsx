import { createFileRoute } from '@tanstack/react-router'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EnvelopeReveal from '@/components/EnvelopeReveal'

export const Route = createFileRoute('/gift')({
  component: GiftPage,
})

// Replace this with the URL of the second website
const GIFT_URL = 'https://your-second-website.com'

function GiftPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d1008 0%, #1a0535 30%, #0d0520 60%, #05020d 100%)',
      }}
    >
      <StarField />
      <SparkleCanvas />
      <Navbar />

      {/* Golden ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(251,191,36,0.05) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-3">
              {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
                <span
                  key={i}
                  style={{
                    color: i % 2 === 0 ? '#fbbf24' : 'rgba(251,191,36,0.3)',
                    animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="font-script text-base mb-2" style={{ color: '#fbbf24' }}>
              May 25 — The Final Day
            </p>
            <h1
              className="font-serif font-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                background: 'linear-gradient(135deg, #fde68a, #fbbf24, #f472b6)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              Here Is Your Gift ♡
            </h1>
            <p
              className="font-body max-w-md mx-auto"
              style={{ color: 'rgba(233,213,255,0.6)', lineHeight: '1.7' }}
            >
              Everything this journey was building toward — sealed inside this envelope, just for you.
            </p>

            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4))' }} />
              <span style={{ color: '#fbbf24', fontSize: '1.1rem' }}>✦</span>
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.4), transparent)' }} />
            </div>
          </div>

          {/* Envelope reveal */}
          <div className="flex justify-center">
            <EnvelopeReveal giftUrl={GIFT_URL} />
          </div>

          {/* Bottom poem */}
          <div
            className="mt-16 rounded-3xl p-6 text-center"
            style={{
              background: 'rgba(13,5,32,0.6)',
              border: '1px solid rgba(251,191,36,0.15)',
            }}
          >
            <p
              className="font-body italic"
              style={{ color: 'rgba(233,213,255,0.7)', lineHeight: '1.9', fontSize: '0.95rem' }}
            >
              "This was never just a website,<br />
              a countdown or a card —<br />
              this was every night I missed you,<br />
              every wish made from afar."
            </p>
            <p className="font-script text-sm mt-3" style={{ color: '#f472b6' }}>
              — with everything I have, Aakash ♡
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
