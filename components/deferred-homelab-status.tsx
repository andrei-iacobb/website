"use client"

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"

export function DeferredHomelabStatus({ fallback }: { fallback: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [Status, setStatus] = useState<ComponentType | null>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return

    let cancelled = false
    const load = () => {
      void import("@/components/homelab-status")
        .then(({ HomelabStatus }) => {
          if (!cancelled) setStatus(() => HomelabStatus)
        })
        .catch(() => {
          // Keep the server-rendered snapshot when the enhancement chunk fails.
        })
    }

    if (!("IntersectionObserver" in window)) {
      load()
      return () => {
        cancelled = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        load()
      },
      { rootMargin: "600px 0px" },
    )
    observer.observe(element)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return <div ref={root}>{Status ? <Status /> : fallback}</div>
}
