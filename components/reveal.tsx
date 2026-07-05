"use client"

import { useEffect, useRef } from "react"

// Ease-out cubic, matching the previous motion curve closely enough for a counter.
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function CountUp({
  value,
  className,
  duration = 1.4,
}: {
  value: number
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Write straight to the node so the animation never re-renders the tree.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value.toLocaleString()
      return
    }

    let raf = 0
    let start = 0
    const durationMs = duration * 1000
    el.textContent = "0"

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const step = (now: number) => {
          if (!start) start = now
          const t = Math.min((now - start) / durationMs, 1)
          el.textContent = Math.round(easeOut(t) * value).toLocaleString()
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  // Server-render the real number so no-JS and SSR see the true value.
  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
    </span>
  )
}
