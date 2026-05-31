'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; size: number
  speedX: number; speedY: number
  opacity: number; pulse: number; pulseSpeed: number
}

interface Props { count?: number; color?: string }

export default function ParticleField({ count = 50, color = '214,198,165' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const particles = useRef<Particle[]>([])
  const running   = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>
    const resize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
        // Re-init particles within new bounds
        particles.current = init(canvas.width, canvas.height, count)
      }, 200)
    }

    const init = (w: number, h: number, n: number): Particle[] =>
      Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size:       Math.random() * 1.2 + 0.2,
        speedX:     (Math.random() - 0.5) * 0.15,
        speedY:     -(Math.random() * 0.12 + 0.04),
        opacity:    Math.random() * 0.35 + 0.08,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.006 + 0.002,
      }))

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    particles.current = init(canvas.width, canvas.height, count)

    const draw = () => {
      if (!running.current) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach(p => {
        p.pulse += p.pulseSpeed
        const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -10)                 { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10)                  p.x = canvas.width + 10
        if (p.x > canvas.width + 10)    p.x = -10
      })
      animRef.current = requestAnimationFrame(draw)
    }

    // IntersectionObserver — pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        running.current = true
        draw()
      } else {
        running.current = false
        cancelAnimationFrame(animRef.current)
      }
    }, { threshold: 0.01 })
    observer.observe(canvas)

    window.addEventListener('resize', resize)
    return () => {
      running.current = false
      cancelAnimationFrame(animRef.current)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [count, color])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
  )
}
