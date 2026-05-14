import { useEffect, useRef } from 'react'

interface SparkleParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

const COLORS = ['#c084fc', '#f472b6', '#fbbf24', '#e879f9', '#a5f3fc', '#ffffff']

export default function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<SparkleParticle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // Spawn ambient sparkles
    const spawnInterval = setInterval(() => {
      const count = 2
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.8 - 0.2,
          life: 1,
          maxLife: Math.random() * 80 + 60,
          size: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }, 200)

    const frame = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.life > 0)

      particles.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 1
        const alpha = (p.life / p.maxLife) * 0.7

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.size * 3

        // Draw 4-pointed star
        const s = p.size
        ctx.beginPath()
        ctx.moveTo(p.x, p.y - s)
        ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3)
        ctx.lineTo(p.x + s, p.y)
        ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3)
        ctx.lineTo(p.x, p.y + s)
        ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3)
        ctx.lineTo(p.x - s, p.y)
        ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(frame)
    }

    animRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animRef.current)
      clearInterval(spawnInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.5 }}
    />
  )
}
