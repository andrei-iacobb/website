"use client"

import { useEffect, useState } from "react"

const EMAIL = "andrei@iacob.co.uk"

export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const [copiedUntil, setCopiedUntil] = useState<number | null>(null)

  useEffect(() => {
    if (copiedUntil === null) return

    const timer = setTimeout(() => {
      setCopied(false)
      setCopiedUntil(null)
    }, Math.max(0, copiedUntil - Date.now()))

    return () => clearTimeout(timer)
  }, [copiedUntil])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setCopiedUntil(Date.now() + 1600)
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
