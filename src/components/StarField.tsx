import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleOffset: number
}

interface Lantern {
  x: number
  y: number
  size: number
  floatOffset: number
  floatSpeed: number
  glowIntensity: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Stars
    const stars: Particle[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.8,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    // Lanterns
    const lanterns: Lantern[] = Array.from({ length: 8 }, (_, i) => ({
      x: (i + 1) * (window.innerWidth / 9),
      y: Math.random() * 200 + 100,
      size: Math.random() * 18 + 14,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 0.008 + 0.005,
      glowIntensity: Math.random() * 0.5 + 0.5,
    }))

    // Purple particles
    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    function drawLantern(
      lx: number,
      ly: number,
      size: number,
      glow: number,
      time: number,
      offset: number,
      speed: number
    ) {
      const floatY = ly + Math.sin(time * speed + offset) * 12
      const floatX = lx + Math.cos(time * speed * 0.7 + offset) * 5
      const glowVal = glow * (0.7 + 0.3 * Math.sin(time * 2 + offset))

      // Glow
      const grad = ctx.createRadialGradient(
        floatX,
        floatY,
        0,
        floatX,
        floatY,
        size * 2.5
      )

      grad.addColorStop(0, `rgba(245,158,11,${glowVal * 0.35})`)
      grad.addColorStop(0.5, `rgba(245,158,11,${glowVal * 0.12})`)
      grad.addColorStop(1, 'transparent')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(floatX, floatY, size * 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Lantern body
      ctx.save()

      ctx.shadowColor = `rgba(251,191,36,${glowVal * 0.8})`
      ctx.shadowBlur = 15

      const bodyGrad = ctx.createRadialGradient(
        floatX - size * 0.2,
        floatY - size * 0.2,
        0,
        floatX,
        floatY,
        size
      )

      bodyGrad.addColorStop(0, `rgba(254,243,199,${glowVal * 0.9})`)
      bodyGrad.addColorStop(0.4, `rgba(251,191,36,${glowVal * 0.8})`)
      bodyGrad.addColorStop(1, `rgba(180,83,9,${glowVal * 0.7})`)

      ctx.fillStyle = bodyGrad

      ctx.beginPath()
      ctx.ellipse(
        floatX,
        floatY,
        size * 0.55,
        size * 0.8,
        0,
        0,
        Math.PI * 2
      )

      ctx.fill()

      // String
      ctx.strokeStyle = `rgba(180,83,9,${glowVal * 0.4})`
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.moveTo(floatX, floatY - size * 0.8)
      ctx.lineTo(floatX, floatY - size * 1.3)
      ctx.stroke()

      ctx.restore()
    }

    function frame() {
      if (!canvas || !ctx) return

      t += 0.016

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      stars.forEach((s) => {
        const tw =
          (Math.sin(t * s.speed * 60 + s.twinkleOffset) + 1) / 2

        const alpha = s.opacity * (0.4 + 0.6 * tw)

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)

        ctx.fillStyle = `rgba(255,245,235,${alpha})`
        ctx.shadowColor = `rgba(251,191,36,${alpha * 0.6})`
        ctx.shadowBlur = s.size * 2

        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Lanterns
      lanterns.forEach((l) => {
        drawLantern(
          l.x,
          l.y,
          l.size,
          l.glowIntensity,
          t,
          l.floatOffset,
          l.floatSpeed
        )
      })

      // Floating particles
      particles.forEach((p) => {
        p.y -= p.speed * 0.5
        p.x += Math.sin(t * 0.5 + p.twinkleOffset) * 0.3

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        const alpha =
          p.opacity *
          (0.5 + 0.5 * Math.sin(t * 1.5 + p.twinkleOffset))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        ctx.fillStyle = `rgba(192,132,252,${alpha})`
        ctx.shadowColor = `rgba(192,132,252,${alpha})`
        ctx.shadowBlur = 8

        ctx.fill()
        ctx.shadowBlur = 0
      })

      animId = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}