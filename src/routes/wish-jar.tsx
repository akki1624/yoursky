import { createFileRoute } from '@tanstack/react-router'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WishJarGame from '@/components/WishJarGame'

export const Route = createFileRoute('/wish-jar')({
  component: WishJarPage,
})

function WishJarPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1a0535 0%, #0d0520 50%, #05020d 100%)',
      }}
    >
      <StarField />
      <SparkleCanvas />
      <Navbar />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-script text-base mb-2" style={{ color: '#fbbf24' }}>
              A magical mini-game
            </p>
            <h1
              className="font-serif font-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #fbbf24, #c084fc, #f472b6)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              The Wish Jar ✨
            </h1>

            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4))' }} />
              <span style={{ color: '#fbbf24' }}>✦</span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.4), transparent)' }} />
            </div>

            <p
              className="font-body max-w-md mx-auto mb-2"
              style={{ color: 'rgba(196,181,253,0.6)', lineHeight: '1.7' }}
            >
              Inside this jar, fireflies carry wishes. One golden firefly is special.
            </p>
            <p
              className="font-body max-w-md mx-auto"
              style={{ color: 'rgba(196,181,253,0.5)', lineHeight: '1.7', fontSize: '0.9rem' }}
            >
              Catch it → Answer a question about us → Choose 3 wishes to seal in the sky.
            </p>
          </div>

          {/* Instructions */}
          <div
            className="rounded-2xl p-5 mb-8 grid grid-cols-3 gap-3 text-center"
            style={{
              background: 'rgba(13,5,32,0.6)',
              border: '1px solid rgba(251,191,36,0.15)',
            }}
          >
            {[
              { step: '1', icon: '🪲', text: 'Catch the golden firefly' },
              { step: '2', icon: '💭', text: 'Answer a question about us' },
              { step: '3', icon: '✨', text: 'Choose 3 wishes' },
            ].map(({ step, icon, text }) => (
              <div key={step}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-body text-xs"
                  style={{
                    background: 'rgba(251,191,36,0.15)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    color: '#fbbf24',
                  }}
                >
                  {step}
                </div>
                <p className="text-2xl mb-1">{icon}</p>
                <p className="font-body text-xs" style={{ color: 'rgba(196,181,253,0.5)' }}>{text}</p>
              </div>
            ))}
          </div>

          {/* The game */}
          <WishJarGame />

          {/* Tip */}
          <div className="text-center mt-6">
            <p className="font-script text-sm" style={{ color: 'rgba(251,191,36,0.5)' }}>
              Hint: the golden one glows a little differently ✨
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
