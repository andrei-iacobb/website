"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

// "/#section" (not "#section") so the links also work from /about and /homelab.
const nav = [
  { href: "/#work", label: "Work" },
  { href: "/homelab", label: "Homelab" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // Keep anchor navigation working but drop the #hash from the URL
    // afterwards, so a refresh reloads the page at the top instead of
    // jumping back to the last section.
    const onHashChange = () => {
      history.replaceState(null, "", window.location.pathname + window.location.search)
    }
    window.addEventListener("hashchange", onHashChange)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return (
    <header className="preview-header" data-scrolled={scrolled}>
      <nav
        aria-label="Primary"
        className="mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between"
      >
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-ink hover:opacity-70 transition-opacity"
        >
          Andrei Iacob
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="editorial-link inline-flex items-center min-h-[44px] text-[13px] sm:text-[14px] text-ink/65 hover:text-ink transition-colors"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
