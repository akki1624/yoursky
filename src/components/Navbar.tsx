import { Link, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/birthday', label: 'Birthday 2026' },
  { to: '/memories', label: 'Memories' },
  { to: '/wish-jar', label: 'Wish Jar' },
  { to: '/feeling', label: 'I Am Feeling' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(0,0,0,0)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(168,85,247,0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="text-xl" style={{ animation: 'twinkle 3s ease-in-out infinite' }}>✨</span>
          <span
            className="font-script text-lg"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
            }}
          >
            The Sky Kept Your Wishes
          </span>
          <span className="text-xl" style={{ animation: 'twinkle 3s ease-in-out infinite 1.5s' }}>✨</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 font-body"
                style={{
                  color: active ? '#fbbf24' : 'rgba(255,255,255,0.75)',
                  background: active ? 'rgba(168,85,247,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                  textShadow: active ? '0 0 15px rgba(251,191,36,0.6)' : 'none',
                  letterSpacing: '0.03em',
                  fontSize: '0.95rem',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = '#e9d5ff'
                    el.style.background = 'rgba(168,85,247,0.1)'
                    el.style.border = '1px solid rgba(168,85,247,0.2)'
                    el.style.textShadow = '0 0 10px rgba(168,85,247,0.4)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = 'rgba(255,255,255,0.75)'
                    el.style.background = 'transparent'
                    el.style.border = '1px solid transparent'
                    el.style.textShadow = 'none'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-purple-300 hover:text-purple-100 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(5,2,13,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(168,85,247,0.15)',
            padding: '1rem',
          }}
        >
          {navLinks.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl mb-1 transition-all duration-300 font-body text-center"
                style={{
                  color: active ? '#fbbf24' : 'rgba(255,255,255,0.8)',
                  background: active ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.05)',
                  border: active ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(168,85,247,0.1)',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
