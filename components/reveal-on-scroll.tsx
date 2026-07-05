"use client"

import { useEffect } from "react"

// Mounts once, renders nothing. Reveals each `[data-reveal]` element the
// first time it intersects the viewport. Elements are hidden by default in
// CSS (so there is no first-paint flash); a <noscript> override and the
// reduced-motion media query keep them visible when this never runs.
export function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!els.length) return

    // Reduced motion: CSS already forces these visible; skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // No IntersectionObserver (very old browsers): reveal everything now
    // rather than leave it stuck hidden - <noscript> can't cover this since
    // JS is enabled.
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
