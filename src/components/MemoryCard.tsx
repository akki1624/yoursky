import { useState } from 'react'
import type { Memory } from '@/data/memories'

interface Props {
  memory: Memory
}

export default function MemoryCard({ memory }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="polaroid cursor-pointer relative"
        style={{
          transform: `rotate(${memory.rotation}deg)`,
          background: memory.color,
          maxWidth: '180px',
          zIndex: open ? 20 : 1,
        }}
        onClick={() => setOpen(true)}
      >
        {/* Photo placeholder */}
        <div
          className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #1a0535, #2e0d5e)',
            minHeight: '120px',
          }}
        >
          <div className="text-center px-2">
            <div className="text-3xl mb-1">📷</div>
            <p className="text-xs font-body" style={{ color: 'rgba(196,181,253,0.6)', fontSize: '0.65rem' }}>
              <img
  src={memory.imagePlaceholder}
  alt={memory.title}
  className="w-full h-full object-cover"
/>
            </p>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(168,85,247,0.4)' }}
          >
            <span className="text-white text-sm font-body">Open ♡</span>
          </div>
        </div>

        {/* Caption */}
        <div style={{ minHeight: '44px', padding: '0 2px' }}>
          <p
            className="font-script text-center leading-tight"
            style={{ color: '#1a0535', fontSize: '0.75rem' }}
          >
            {memory.title}
          </p>
          <p
            className="text-center font-body"
            style={{ color: 'rgba(30,10,60,0.5)', fontSize: '0.6rem', marginTop: '2px' }}
          >
            {memory.date}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1 justify-center">
          {memory.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-1 rounded"
              style={{ background: 'rgba(168,85,247,0.15)', color: '#7c3aed', fontSize: '0.55rem' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,2,13,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(13,5,32,0.95)',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 20px 60px rgba(168,85,247,0.3)',
              animation: 'scaleIn 0.4s ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Photo area */}
            <div
              className="w-full flex items-center justify-center py-12"
              style={{ background: 'linear-gradient(135deg, #1a0535, #2e0d5e)', minHeight: '220px' }}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">📷</div>
                <p className="font-body text-sm" style={{ color: 'rgba(196,181,253,0.5)' }}>
                  <img
  src={memory.imagePlaceholder}
  alt={memory.title}
  className="w-full h-full object-cover"
/>
                </p>
              </div>
            </div>

            <div className="p-6">
              {/* Title + date */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl" style={{ color: '#fde68a', textShadow: '0 0 15px rgba(251,191,36,0.3)' }}>
                    {memory.title}
                  </h3>
                  <p className="font-body text-sm" style={{ color: 'rgba(196,181,253,0.5)' }}>{memory.date}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-purple-400 hover:text-purple-200 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Memory note */}
              <p
                className="font-body leading-relaxed"
                style={{ color: 'rgba(233,213,255,0.8)', fontSize: '1rem', lineHeight: '1.8' }}
              >
                {memory.note}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {memory.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-body"
                    style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
