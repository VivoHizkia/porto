import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

/* Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.classList.add('is-in')
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

/* A card that tilts toward the pointer and shows a soft light under it. */
export function GlowCard({
  children,
  className = '',
  tilt = 5,
}: {
  children: ReactNode
  className?: string
  tilt?: number
}) {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const element = event.currentTarget
    const box = element.getBoundingClientRect()
    const x = event.clientX - box.left
    const y = event.clientY - box.top
    element.style.setProperty('--mx', `${x}px`)
    element.style.setProperty('--my', `${y}px`)
    element.style.setProperty('--rx', `${(0.5 - y / box.height) * tilt * 2}deg`)
    element.style.setProperty('--ry', `${(x / box.width - 0.5) * tilt * 2}deg`)
  }

  const onLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg')
    event.currentTarget.style.setProperty('--ry', '0deg')
  }

  return (
    <div className={`glow-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}

/* A large soft light that trails the mouse across the whole page. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(hover: hover)').matches) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 }
    const current = { ...target }
    let frame = 0

    const onMove = (event: globalThis.PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }
    const tick = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      element.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/* Counts up from zero the first time it is seen. */
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1)
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      setValue(0)
      frame = requestAnimationFrame(step)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/* Types each phrase out, pauses, deletes it, and moves to the next. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let phrase = 0
    let length = phrases[0].length
    let deleting = true
    let timer = 0

    const step = () => {
      const full = phrases[phrase]
      length += deleting ? -1 : 1
      setText(full.slice(0, length))
      let wait = deleting ? 35 : 70
      if (!deleting && length === full.length) {
        deleting = true
        wait = 1700
      } else if (deleting && length === 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length
        wait = 300
      }
      timer = window.setTimeout(step, wait)
    }

    timer = window.setTimeout(step, 1900)
    return () => window.clearTimeout(timer)
  }, [phrases])

  return (
    <span className="typewriter" aria-label={phrases.join(', ')}>
      <span aria-hidden="true">{text}</span>
    </span>
  )
}
