import { useEffect, useRef } from 'react'

interface Props {
  show: boolean
  onDone?: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  spin: number
  size: number
  color: string
  shape: 'rect' | 'circle'
  life: number // 0..1, 1 = newborn
}

const COLORS = ['#ec4f86', '#ffcf67', '#67c5bf', '#559c68', '#fff1f6', '#ffd6df']

export function Confetti({ show, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (!show) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = (): void => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = window.innerWidth
    const H = window.innerHeight
    const burstX = W / 2
    const burstY = H * 0.42
    const particles: Particle[] = []
    const COUNT = 130
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 7
      particles.push({
        x: burstX,
        y: burstY,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 3,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        size: 5 + Math.random() * 6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        shape: Math.random() < 0.55 ? 'rect' : 'circle',
        life: 1,
      })
    }

    const start = performance.now()
    const DURATION = 2400

    const frame = (now: number): void => {
      const elapsed = now - start
      const fade = Math.max(0, 1 - Math.max(0, elapsed - DURATION * 0.55) / (DURATION * 0.45))
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.vy += 0.22
        p.vx *= 0.992
        p.x += p.vx
        p.y += p.vy
        p.angle += p.spin
        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
      if (elapsed < DURATION) {
        rafRef.current = window.requestAnimationFrame(frame)
      } else {
        ctx.clearRect(0, 0, W, H)
        doneRef.current?.()
      }
    }
    rafRef.current = window.requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [show])

  if (!show) return null
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  )
}
