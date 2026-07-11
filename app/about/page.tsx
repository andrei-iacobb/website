import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About",
  description:
    "Andrei Iacob is a software developer in Bury St Edmunds, Suffolk - building web apps with Next.js and Postgres, supporting business IT, and studying Computer Science at Anglia Ruskin.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Andrei Iacob",
    description:
      "Software developer in Bury St Edmunds - web apps, business IT support, and self-hosted infrastructure.",
    url: `${SITE_URL}/about`,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: "About Andrei Iacob",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
}

const facts = [
  ["Based in", "Bury St Edmunds, Suffolk, UK"],
  ["Studying", "BSc Computer Science, Anglia Ruskin University"],
  ["Stack", "Next.js · TypeScript · Postgres · Kubernetes · Docker · Linux"],
  ["Elsewhere", "GitHub, LinkedIn and a self-hosted Forgejo"],
]

const now = [
  "Studying for my BSc in Computer Science at Anglia Ruskin.",
  "Building commissioned apps, including a multi-site visitor-management system.",
  "Growing the homelab and the services it runs.",
]

const eyebrow = "font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/65"
const SHELL = "mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16"

const stagger = (n: number) => ({ "--stagger": n } as CSSProperties)

export default function AboutPage() {
  return (
    <div className="preview-shell min-h-[100svh] text-ink/90 antialiased">
      <a href="#main" className="preview-skip-link">Skip to content</a>

      <SiteHeader />

      <main id="main">
        <article className={`${SHELL} pt-16 md:pt-24 pb-20 md:pb-28`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <p data-animate style={stagger(0)} className={`${eyebrow} mb-6 md:mb-8`}>
            About
          </p>
          <h1
            data-animate
            style={stagger(1)}
            className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-ink text-[clamp(40px,6.5vw,96px)] max-w-4xl"
          >
            About Andrei Iacob
          </h1>

          <div data-animate style={stagger(2)} className="mt-12 md:mt-16 max-w-[58ch] space-y-7 text-[18px] md:text-[20px] leading-[1.6] text-ink/85">
            <p>
              I&apos;m Andrei Gabriel Iacob - most people drop the middle name. I&apos;m a software
              developer in Bury St Edmunds, Suffolk. I build web apps and look after the servers
              they run on, usually the same week.
            </p>
            <p>
              I got into this fixing people&apos;s computers. Dead laptops, broken networks, the
              day-to-day that keeps a business running. Eventually that turned into building the
              software they&apos;d been avoiding buying - the tools they needed but could never
              quite find off the shelf.
            </p>
            <p>
              When I take something on, I prefer to own it end to end: the first commit, the
              database, the box it runs on. Most of my work is Next.js, TypeScript and Postgres,
              shipped in Docker onto{" "}
              <Link href="/homelab" className="editorial-link text-ink/85 hover:text-ink">
                infrastructure I run myself
              </Link>
              . Hosting my own work means that when something breaks, there is no one else to
              call.
            </p>
            <p>
              The freelance side comes in three flavours: custom apps, IT support for businesses -
              hardware, networks and the day-to-day - and self-hosted infrastructure for people
              who want their software on their own terms. Often all three for the same client.
            </p>
          </div>

          <div className="mt-14 max-w-[58ch]">
            <p className={`${eyebrow} mb-5`}>Now</p>
            <ul className="space-y-3">
              {now.map((item) => (
                <li key={item} className="text-[16px] leading-[1.5] text-ink/70">{item}</li>
              ))}
            </ul>
          </div>

          <dl className="mt-14 max-w-2xl border-t border-ink/15">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-x-6 py-4 border-b border-ink/15">
                <dt className="font-mono text-[13px] text-ink/45">{k}</dt>
                <dd className="text-[15px] text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-[16px] text-ink/70">
            See{" "}
            <Link href="/#work" className="editorial-link text-ink/85 hover:text-ink">selected work</Link>
            {", read about "}
            <Link href="/homelab" className="editorial-link text-ink/85 hover:text-ink">the homelab</Link>
            {", or "}
            <a href="mailto:andrei@iacob.co.uk" className="editorial-link text-ink/85 hover:text-ink">get in touch</a>.
          </p>
        </article>
      </main>

      <footer className="border-t border-ink/12">
        <div className={`${SHELL} py-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4`}>
          <p className="text-[13px] text-ink/65">&copy; {new Date().getFullYear()} Andrei Iacob</p>
          <Link href="/" className="text-[13px] text-ink/65 hover:text-ink transition-colors">andrei.iacob.co.uk</Link>
        </div>
      </footer>
    </div>
  )
}
