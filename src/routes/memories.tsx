import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import StarField from '@/components/StarField'
import SparkleCanvas from '@/components/SparkleCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MemoryCard from '@/components/MemoryCard'
import memories from '@/data/memories'

export const Route = createFileRoute('/memories')({
  component: MemoriesPage,
})

function StringLight({ count }: { count: number }) {
  return (
    <div className="flex items-end gap-3 justify-center mb-2 relative">
      {/* String line */}
      <div
        className="absolute top-1.5 left-0 right-0 h-px"
        style={{ background: 'rgba(180,83,9,0.4)' }}
      />
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <div style={{ width: '1px', height: '10px', background: 'rgba(180,83,9,0.5)' }} />
          <div
            className="string-light"
            style={{
              animationDelay: `${i * 0.3}s`,
              transform: `scale(${0.7 + (i % 3) * 0.15})`,
              opacity: 0.6 + (i % 4) * 0.1,
            }}
          />
        </div>
      ))}
    </div>
  )
}

function MemoriesPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const allTags = [...new Set(memories.flatMap(m => m.tags))]

  const filtered = filter ? memories.filter(m => m.tags.includes(filter)) : memories

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'radial-gradient(ellipse at 20% 10%, #1a0535 0%, #0d0520 50%, #05020d 100%)',
      }}
    >
      <StarField />
      <SparkleCanvas />
      <Navbar />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-script text-base mb-2" style={{ color: '#f472b6' }}>
              A scrapbook of us
            </p>
            <h1
              className="font-serif font-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Memories ♡
            </h1>
            <p className="font-body max-w-lg mx-auto" style={{ color: 'rgba(196,181,253,0.6)' }}>
              How we have been through everything smiling and loving each other.❤️
            </p>
          </div>

          {/* String lights */}
          <div className="mb-10">
            <StringLight count={15} />
          </div>

          {/* Tag filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFilter(null)}
              className="px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200"
              style={{
                background: !filter ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.08)',
                border: !filter ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.2)',
                color: !filter ? '#c084fc' : 'rgba(196,181,253,0.5)',
              }}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag === filter ? null : tag)}
                className="px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200"
                style={{
                  background: filter === tag ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.08)',
                  border: filter === tag ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(168,85,247,0.2)',
                  color: filter === tag ? '#c084fc' : 'rgba(196,181,253,0.5)',
                }}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Polaroid wall */}
          <div
            className="relative py-4"
            style={{
              background: 'rgba(13,5,32,0.4)',
              borderRadius: '24px',
              border: '1px solid rgba(168,85,247,0.12)',
              padding: '2rem',
            }}
          >
            {/* Decorative string at top */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(180,83,9,0.4), transparent)' }}
            />

            <div className="flex flex-wrap gap-4 justify-center items-start">
              {filtered.map(memory => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="font-script text-lg" style={{ color: 'rgba(196,181,253,0.5)' }}>
                  No memories with that tag yet...
                </p>
              </div>
            )}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-8">
            <p className="font-script text-base" style={{ color: 'rgba(244,114,182,0.6)' }}>
              15 memories and counting... ♡
            </p>
            <p className="font-body text-sm mt-1" style={{ color: 'rgba(196,181,253,0.4)' }}>
              
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
