import { Link } from '@tanstack/react-router'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/birthday', label: 'Birthday 2026' },
  { to: '/memories', label: 'Memories' },
  { to: '/wish-jar', label: 'Wish Jar' },
  { to: '/feeling', label: 'I Am Feeling' },
]

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-20 py-10 px-4"
      style={{
        background: 'rgba(5,2,13,0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(168,85,247,0.15)',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(244,114,182,0.5), transparent)' }}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-6">
          <span className="font-script text-2xl" style={{
            background: 'linear-gradient(135deg, #c084fc, #f472b6, #fbbf24)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            The Sky Kept Your Wishes ✨
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-body transition-all duration-300"
              style={{ color: 'rgba(196,181,253,0.6)', letterSpacing: '0.05em' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#c084fc'
                el.style.textShadow = '0 0 10px rgba(192,132,252,0.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'rgba(196,181,253,0.6)'
                el.style.textShadow = 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 mb-6 text-lg">
          {['✨', '♡', '🌙', '♡', '✨'].map((s, i) => (
            <span
              key={i}
              style={{
                color: i === 2 ? '#fbbf24' : i % 2 === 0 ? '#a855f7' : '#f472b6',
                opacity: 0.6,
                animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-body text-sm" style={{ color: 'rgba(196,181,253,0.4)', letterSpacing: '0.08em' }}>
          All Rights Reserved — Aakash Singh
        </p>
        <p className="font-script text-xs mt-1" style={{ color: 'rgba(196,181,253,0.3)' }}>
          Made with love, for love ♡
        </p>
      </div>
    </footer>
  )
}
