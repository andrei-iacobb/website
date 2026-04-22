"use client"

import Link from "next/link"
import Image from "next/image"
import type { CSSProperties } from "react"
import { ContributionGraph } from "@/components/contribution-graph"

// ──────────────────────────────────────────────
// Starfield — deterministic seeded PRNG so SSR
// and client render the same positions (no hydration mismatch).
// Module-scope so it runs once per page load.
// ──────────────────────────────────────────────

const STARS = (() => {
  let s = 7919
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  return Array.from({ length: 110 }, () => {
    const rare = r()
    const size = rare > 0.95 ? 2.2 : rare > 0.82 ? 1.6 : 1
    const baseOp = 0.35 + r() * 0.5
    return {
      x: r() * 100,
      y: r() * 100,
      size,
      lo: +(baseOp * 0.35).toFixed(3),
      hi: +baseOp.toFixed(3),
      dur: 2.6 + r() * 4.5,
      delay: +(r() * -7).toFixed(2),
      tinted: r() > 0.93,
      bright: size > 1.5,
    }
  })
})()

// ──────────────────────────────────────────────
// Content
// ──────────────────────────────────────────────

const projects = [
  {
    year: "2024",
    name: "NeatPlan",
    kind: "Cleaning-ops SaaS with live tracking and scheduling.",
    role: "Commissioned",
    url: "https://github.com/andrei-iacobb/neatplan",
  },
  {
    year: "Since 2023",
    name: "HomeOps",
    kind: "A Kubernetes homelab running 30-ish self-hosted services on bare-metal ProLiants.",
    role: "Personal infra",
    url: "https://github.com/andrei-iacobb/homeops",
  },
  {
    year: "2024",
    name: "Visitor Management",
    kind: "Multi-site check-in with Android kiosks and contractor validation",
    role: "Commissioned",
    url: null,
    locked: true,
  },
  {
    year: "2023",
    name: "StaffClock",
    kind: "Facial-recognition time tracking + payroll exports",
    role: "Commissioned",
    url: "https://github.com/andrei-iacobb/staffclock",
  },
  {
    year: "2023",
    name: "Informate",
    kind: "AI news summariser built with Java and OpenAI.",
    role: "Built solo",
    url: "https://github.com/andrei-iacobb/informate",
  },
  {
    year: "2022",
    name: "Car Sales",
    kind: "Inventory tracker written in C for the fun of bare metal",
    role: "Uni project",
    url: "https://github.com/andrei-iacobb/car_sales_finalised",
  },
]

const nav = [
  { href: "#work", label: "work" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
]

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function Preview() {
  return (
    <div className="preview-shell min-h-[100svh] bg-[#0a0a0a] text-white/[0.92] antialiased">
      {/* Solid #0a0a0a paints first, aurora + stars fade in 300ms after mount.
          Stars sit behind blobs — aurora's blur softly bleeds over them.
          Outer blob = scroll-linked parallax; inner core = time-based breathing.
          Star field has its own slower scroll drift for depth. */}
      <div className="preview-live-bg" aria-hidden>
        <div className="preview-stars">
          <div className="preview-stars-layer">
            {STARS.map((star, i) => (
              <span
                key={i}
                className={`preview-star${star.bright ? " preview-star--bright" : ""}${star.tinted ? " preview-star--tinted" : ""}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  ["--star-lo" as string]: star.lo,
                  ["--star-hi" as string]: star.hi,
                  animationDuration: `${star.dur}s`,
                  animationDelay: `${star.delay}s`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="preview-blob preview-blob--a">
          <div className="preview-blob-core" />
        </div>
        <div className="preview-blob preview-blob--b">
          <div className="preview-blob-core" />
        </div>
      </div>

      {/* Skip link — first focusable element per a11y baseline */}
      <a href="#work" className="preview-skip-link">
        Skip to work
      </a>

      {/* ————— Minimal header (nav only, no CTA per playbook) ————— */}
      <header className="relative z-10">
        <nav
          aria-label="Primary"
          className="mx-auto max-w-5xl px-6 md:px-10 pt-8 pb-2 flex items-center justify-between"
        >
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] font-mono text-[13px] tracking-tight text-white/70 hover:text-white transition-colors"
          >
            andrei<span className="text-white/40">.</span>iacob
          </Link>
          <ul className="flex items-center gap-3 md:gap-6">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="editorial-link inline-flex items-center min-h-[44px] px-2 font-mono text-[13px] text-white/60 hover:text-white transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* ————— Right-aligned serif masthead (Mariana variant) ————— */}
        <section
          aria-label="Intro"
          className="relative mx-auto max-w-5xl px-6 md:px-10 pt-14 md:pt-20 pb-14 md:pb-18"
        >
          <div className="hero-enter">
            {/* mono eyebrow with live-pulse dot — teal accent */}
            <p className="flex items-center gap-2 font-mono text-[12px] text-white/55 mb-10 md:mb-14">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[hsl(175_84%_42%)] animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(175_84%_42%)]" />
              </span>
              Available for contract, May 2026
            </p>

            {/* Serif name, right-aligned */}
            <h1
              className="font-serif text-right leading-[0.92] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(52px, 9.5vw, 128px)" }}
            >
              Andrei <span className="italic text-[hsl(175_84%_55%)]">Iacob</span>
            </h1>

            {/* Two-column meta strip */}
            <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-2 md:gap-10">
              <p className="font-serif italic text-[20px] md:text-[24px] leading-snug text-white/70 max-w-md">
                I build web apps and look after the servers they run on.
              </p>
              <p className="font-mono text-[12px] text-white/45 md:text-right self-end">
                Mainly Suffolk, available remote
                <br />
                BSc Computer Science
              </p>
            </div>
          </div>
        </section>

        {/* ————— About — moved up for warmer intro ————— */}
        <section
          id="about"
          aria-labelledby="about-label"
          className="mx-auto max-w-5xl px-6 md:px-10 py-14 md:py-20 scroll-mt-20"
        >
          <p
            id="about-label"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/40 mb-10 md:mb-12"
          >
            About
          </p>
          <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-16 items-start">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-white/[0.03]">
                <Image
                  src="/IMG_3962.jpeg"
                  alt="Andrei"
                  width={520}
                  height={650}
                  sizes="(max-width: 768px) 100vw, 260px"
                  className="w-full h-full object-cover grayscale-[0.1]"
                  priority={false}
                />
              </div>
              <p className="mt-3 font-mono text-[11px] text-white/35">2026</p>
            </div>

            <div className="max-w-[58ch]">
              <div className="space-y-6 text-[17px] leading-[1.6] text-white/80">
                <p>
                  I&apos;m Andrei. I build web apps and look after the
                  servers they run on, usually the same week.
                </p>
                <p>
                  I got into this fixing people&apos;s computers. Eventually
                  that turned into fixing their small businesses, and then
                  writing the software they&apos;d been avoiding buying.
                </p>
                <p>
                  These days it&apos;s mostly Next.js and Postgres, with a
                  small cluster in my garage running the bits I host myself.
                  I freelance for small companies, mostly IT support and
                  custom internal apps. If you&apos;ve got something that
                  needs building, my inbox is{" "}
                  <a
                    href="#contact"
                    className="editorial-link text-white hover:text-white"
                  >
                    below
                  </a>
                  .
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 font-mono text-[12px]">
                {[
                  ["Degree", "BSc Computer Science"],
                  ["Freelance", "IT support and app dev"],
                  ["Stack", "Next.js, Postgres, Kubernetes"],
                  ["Reading", "Designing Data-Intensive Applications"],
                  ["Coffee", "Filter, any roaster"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-1">
                    <dt className="text-white/35 w-20 shrink-0">{k}</dt>
                    <dd className="text-white/70">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ————— Selected work — archive list (Rauchg variant) ————— */}
        <section
          id="work"
          aria-labelledby="work-label"
          className="mx-auto max-w-5xl px-6 md:px-10 py-16 md:py-20 border-t border-white/10 scroll-mt-20"
        >
          <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16 mb-10 md:mb-14">
            <p
              id="work-label"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/40"
            >
              Selected work
            </p>
            <p className="text-[17px] leading-[1.55] text-white/70 max-w-[55ch]">
              A handful of what I&apos;ve shipped. Some paid, some open
              source, some just for me.
            </p>
          </div>

          <ul className="border-t border-white/10">
            {projects.map((p) => {
              const Row = (
                <div className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[120px_1fr_140px] gap-4 md:gap-8 items-baseline py-5 md:py-6">
                  <span className="font-mono text-[12px] text-white/40 tabular-nums whitespace-nowrap">
                    {p.year}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="archive-title text-[18px] md:text-[20px] font-medium text-white/95 tracking-tight">
                        {p.name}
                      </span>
                      {p.locked && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 border border-white/15 rounded-sm px-1.5 py-0.5">
                          private
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[14px] leading-snug text-white/55 max-w-[50ch]">
                      {p.kind}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 md:text-right">
                    {p.role}
                  </span>
                </div>
              )

              return (
                <li
                  key={p.name}
                  className="border-b border-white/10 group"
                >
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="archive-row block"
                    >
                      {Row}
                    </a>
                  ) : (
                    <div className="archive-row archive-row--static">{Row}</div>
                  )}
                </li>
              )
            })}
          </ul>

          <p className="mt-10 font-mono text-[12px] text-white/40">
            Everything else lives on{" "}
            <a
              href="https://github.com/andrei-iacobb"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link text-white/70 hover:text-white"
            >
              github.com/andrei-iacobb
            </a>
            .
          </p>
        </section>

        {/* ————— Contribution proof ————— */}
        <div className="border-t border-white/10">
          <ContributionGraph />
        </div>

        {/* ————— Contact ————— */}
        <section
          id="contact"
          aria-labelledby="contact-label"
          className="mx-auto max-w-5xl px-6 md:px-10 py-20 md:py-28 border-t border-white/10 scroll-mt-20"
        >
          <p
            id="contact-label"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/40 mb-10"
          >
            Contact
          </p>
          <h2
            className="font-serif leading-[0.95] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
          >
            Let&apos;s <span className="italic text-[hsl(175_84%_55%)]">talk</span>.
          </h2>
          <p className="mt-8 max-w-xl text-[17px] leading-[1.6] text-white/65">
            Available from May 2026, contract or permanent. Full-stack work,
            IT support, or infra. Happy with any of those.
          </p>

          <a
            href="mailto:andrei@iacob.co.uk"
            className="contact-email mt-10 inline-block font-serif italic text-[28px] md:text-[40px]"
          >
            andrei@iacob.co.uk
          </a>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px]">
            {[
              { label: "GitHub", href: "https://github.com/andrei-iacobb" },
              { label: "LinkedIn", href: "https://linkedin.com/in/andreigiacob" },
              { label: "Phone", href: "tel:+447497772848" },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="editorial-link text-white/55 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 flex flex-wrap gap-4 items-center justify-between font-mono text-[11px] text-white/35">
          <p>&copy; {new Date().getFullYear()} Andrei Iacob</p>
          <p>Running on a homelab</p>
        </div>
      </footer>
    </div>
  )
}
