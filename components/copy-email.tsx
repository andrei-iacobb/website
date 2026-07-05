"use client"

import { useEffect, useRef, useState } from "react"

const EMAIL = "andrei@iacob.co.uk"

export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <button
        type="button"
        onClick={copy}
        className="contact-email inline-block font-display font-semibold text-[28px] md:text-[44px] tracking-[-0.01em]"
        aria-label={`Copy email address ${EMAIL}`}
      >
        {EMAIL}
      </button>
      <span
        aria-live="polite"
        className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink/65"
      >
        {copied ? "Copied" : "Click to copy"}
      </span>
    </div>
  )
}
