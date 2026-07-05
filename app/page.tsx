import Image from "next/image"
import type { CSSProperties } from "react"
import { ContributionGraph } from "@/components/contribution-graph"
import { CopyEmail } from "@/components/copy-email"
import { HomelabStatus } from "@/components/homelab-status"
import { SiteHeader } from "@/components/site-header"

// ──────────────────────────────────────────────
// Content
// ──────────────────────────────────────────────

const projects = [
  { year: "2026", name: "Visitor Management", kind: "Multi-site check-in with Android kiosks and contractor validation.", role: "Commissioned", url: null, locked: true },
  { year: "2026", name: "Fleet Management System", kind: "Fleet management platform with live vehicle tracking and driver apps.", role: "Commissioned", url: null, locked: true },
  { year: "2026", name: "Swish", kind: "Swipe-first fashion discovery app for iOS, in TestFlight.", role: "In development", url: null, locked: true },
  { year: "2025", name: "NeatPlan", kind: "Cleaning-ops SaaS with live tracking and scheduling.", role: "Commissioned", url: "https://github.com/andrei-iacobb/neatplan" },
  { year: "Since 2023", name: "HomeOps", kind: "A Kubernetes homelab running 60-odd self-hosted services on bare-metal ProLiants.", role: "Personal infra", url: "https://github.com/andrei-iacobb/homeops" },
  { year: "2024", name: "StaffClock", kind: "Facial-recognition time tracking and payroll exports.", role: "Commissioned", url: "https://github.com/andrei-iacobb/staffclock" },
  { year: "2025", name: "Informate", kind: "AI news summariser built with Java and OpenAI.", role: "Built solo", url: "https://github.com/andrei-iacobb/informate" },
]

const nav = [
  { href: "#work", label: "Work" },
  { href: "#homelab", label: "Homelab" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

const heroSocials = [
  { label: "GitHub", href: "https://github.com/andrei-iacobb" },
  { label: "LinkedIn", href: "https://linkedin.com/in/andreigiacob" },
]

const contactSocials = [
  { label: "GitHub", href: "https://github.com/andrei-iacobb" },
  { label: "LinkedIn", href: "https://linkedin.com/in/andreigiacob" },
  { label: "Forgejo", href: "https://git.iacob.co.uk/andrei" },
  { label: "Phone", href: "tel:+447497772848" },
]

const services = [
  { t: "App development", d: "Custom web apps and internal tools, built with Next.js and Postgres and shipped quickly." },
  { t: "IT support", d: "Hands-on support for businesses: hardware, networks and the day-to-day that keeps teams running." },
  { t: "Self-hosting & infra", d: "Kubernetes, Docker and bare-metal setups. I host what I build, and can host yours." },
]

const homelabStats = [
  ["60+", "self-hosted services"],
  ["Bare-metal", "Kubernetes cluster"],
  ["2x", "HP ProLiant G9 servers"],
  ["2023", "running since"],
]

const now = [
  "Studying for my BSc in Computer Science at Anglia Ruskin.",
  "Building commissioned apps, including a multi-site visitor-management system.",
  "Growing the homelab and the services it runs.",
]

const eyebrow = "font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/65"
const SHELL = "mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16"
const h2Style = "font-display font-bold text-[clamp(36px,5.5vw,76px)] tracking-[-0.02em] leading-[0.95] text-ink"

const stagger = (n: number) => ({ "--stagger": n } as CSSProperties)

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function Page() {
  return (
    <div className="preview-shell min-h-[100svh] text-ink/90 antialiased">
      <a href="#work" className="preview-skip-link">Skip to work</a>

      <SiteHeader />

      <main>
        {/* ----- Hero ----- */}
        <section aria-label="Intro" className={`${SHELL} pt-16 md:pt-24 pb-16 md:pb-24`}>
          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-12 lg:gap-20 items-end">
            <div>
              <p data-animate style={stagger(0)} className={`${eyebrow} mb-6 md:mb-8`}>
                Software Developer - Bury St Edmunds, UK
              </p>
              <h1
                data-animate
                style={stagger(1)}
                className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-ink text-[clamp(52px,8vw,120px)]"
              >
                Andrei Iacob
              </h1>
              <p data-animate style={stagger(2)} className="mt-7 md:mt-9 text-[19px] md:text-[23px] leading-[1.45] text-ink/70 max-w-2xl">
                I build web apps and look after the servers they run on, usually the same week.
              </p>
              <div data-animate style={stagger(3)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href="mailto:andrei@iacob.co.uk"
                  className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper hover:opacity-90 transition-opacity"
                >
                  Get in touch
                </a>
                <a href="#work" className="editorial-link text-[15px] text-ink/70 hover:text-ink">See selected work</a>
              </div>
              <div data-animate style={stagger(4)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                {heroSocials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="editorial-link text-ink/65 hover:text-ink">
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="mt-10 font-mono text-[13px] text-ink/65">
                <span className="status-dot mr-2.5 align-middle" aria-hidden />
                Currently: multi-site visitor management · commissioned apps · the homelab · BSc Computer Science
              </p>
            </div>
            <div data-animate style={stagger(2)} className="hidden lg:block">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ink/[0.04] ring-1 ring-ink/10">
                <Image
                  src="/og-panel.jpg"
                  alt="Andrei Iacob on a beach at dusk"
                  width={920}
                  height={1250}
                  sizes="(max-width: 1024px) 0px, 460px"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ----- Selected work ----- */}
        <section id="work" aria-labelledby="work-label" className={`${SHELL} py-20 md:py-28 border-t border-ink/12 scroll-mt-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <h2 id="work-label" className={h2Style}>Selected work</h2>
            <p className="text-[16px] text-ink/65 max-w-sm">A handful of what I&apos;ve shipped. Some paid, some open source, some just for me.</p>
          </div>
          <ul className="border-t border-ink/15">
            {projects.map((p) => {
              const Row = (
                <div className="grid grid-cols-[1fr_auto] md:grid-cols-[140px_1fr_160px] gap-x-6 gap-y-2 items-baseline py-7 md:py-8">
                  <span className="order-2 md:order-1 font-mono text-[13px] text-ink/65 tabular-nums whitespace-nowrap">{p.year}</span>
                  <div className="order-1 md:order-2 col-span-2 md:col-span-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="archive-title font-display text-[24px] md:text-[30px] font-semibold text-ink tracking-[-0.01em] leading-none">{p.name}</span>
                      {p.locked && <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/65 border border-ink/20 rounded-full px-2.5 py-0.5">Private</span>}
                      {p.url && <span aria-hidden className="text-ink/30 text-[18px] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">↗</span>}
                    </div>
                    <p className="mt-2.5 text-[15px] md:text-[16px] leading-relaxed text-ink/65 max-w-[52ch]">{p.kind}</p>
                  </div>
                  <span className="order-3 font-sans text-[12px] uppercase tracking-[0.14em] text-ink/65 md:text-right self-center">{p.role}</span>
                </div>
              )
              return (
                <li key={p.name} className="border-b border-ink/15 group">
                  {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="archive-row block">{Row}</a> : <div className="archive-row archive-row--static">{Row}</div>}
                </li>
              )
            })}
          </ul>
          <p className="mt-10 text-[15px] text-ink/65">
            Everything else lives on{" "}
            <a href="https://github.com/andrei-iacobb" target="_blank" rel="noopener noreferrer" className="editorial-link text-ink/80 hover:text-ink">github.com/andrei-iacobb</a>.
          </p>
        </section>

        {/* ----- What I do ----- */}
        <section id="services" aria-labelledby="services-label" className={`${SHELL} py-20 md:py-28 border-t border-ink/12 scroll-mt-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <h2 id="services-label" className={h2Style}>What I do</h2>
            <p className="text-[16px] text-ink/65 max-w-sm">Three things, done properly. Often all three for the same client.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((s) => (
              <div key={s.t} className="border-t border-ink/15 pt-5">
                <h3 className="font-display text-[19px] font-semibold text-ink tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ----- Homelab ----- */}
        <section id="homelab" aria-labelledby="homelab-label" className={`${SHELL} py-20 md:py-28 border-t border-ink/12 scroll-mt-24`}>
          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-10 lg:gap-20 mb-12 md:mb-16">
            <div>
              <p className={eyebrow}>The homelab</p>
              <div className="relative group mt-8 hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-ink/[0.04] ring-1 ring-ink/10">
                  <Image src="/IMG_3905.jpeg" alt="Andrei's desk setup: dual monitors, MacBook and a custom RTX PC" width={1200} height={900} sizes="(max-width: 1024px) 0px, 340px" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-3 font-sans text-[12px] text-ink/65">Where the building happens.</p>
              </div>
            </div>
            <div className="max-w-[44ch]">
              <h2 id="homelab-label" className={h2Style}>I host what I build.</h2>
              <p className="mt-6 text-[18px] leading-[1.6] text-ink/70">Most of what I build, I also host. There is a Kubernetes cluster on bare-metal HP ProLiants in my garage, running the services I rely on day to day and giving me somewhere real to break things.</p>
            </div>
          </div>

          {/* Live service status, health-checked server-side */}
          <HomelabStatus />

          <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 border-t border-ink/15 pt-8">
            {homelabStats.map(([n, label]) => (
              <div key={label}>
                <dt className="font-display font-bold text-[30px] md:text-[38px] leading-none tracking-[-0.02em] text-ink">{n}</dt>
                <dd className="mt-2.5 text-[14px] text-ink/65">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----- Activity ----- */}
        <div className="border-t border-ink/12">
          <ContributionGraph />
        </div>

        {/* ----- About ----- */}
        <section id="about" aria-labelledby="about-label" className={`${SHELL} py-20 md:py-28 border-t border-ink/12 scroll-mt-24`}>
          <div className="grid lg:grid-cols-[1fr_0.78fr] gap-12 lg:gap-20 items-start">
            <div className="max-w-[58ch]">
              <h2 id="about-label" className={`${eyebrow} mb-8`}>About</h2>
              <div className="space-y-7 text-[19px] md:text-[21px] leading-[1.6] text-ink/85">
                <p>I&apos;m a software developer and a Computer Science student, and I tend to own a project end to end, from the first commit to the box it runs on.</p>
                <p>I got into this fixing people&apos;s computers. Eventually that turned into building the software they&apos;d been avoiding buying.</p>
                <p>These days it&apos;s mostly Next.js and Postgres, with a cluster in my garage running the bits I host myself. I work with companies on IT support and custom internal apps.</p>
              </div>
              <div className="mt-12">
                <p className={`${eyebrow} mb-5`}>Now</p>
                <ul className="space-y-3">
                  {now.map((item) => (
                    <li key={item} className="text-[16px] leading-[1.5] text-ink/70">{item}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-10 font-mono text-[13px] text-ink/65">Next.js · TypeScript · Postgres · Kubernetes · Docker · Linux</p>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ink/[0.04] ring-1 ring-ink/10">
                <Image src="/IMG_3962.jpeg" alt="Andrei Iacob" width={640} height={800} sizes="(max-width: 1024px) 90vw, 460px" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
            </div>
          </div>
        </section>

        {/* ----- Contact ----- */}
        <section id="contact" aria-labelledby="contact-label" className={`${SHELL} py-24 md:py-36 border-t border-ink/12 scroll-mt-24`}>
          <p className={`${eyebrow} mb-8`}>Contact</p>
          <h2 id="contact-label" className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-ink text-[clamp(40px,6.5vw,96px)]">Let&apos;s build something.</h2>
          <p className="mt-10 max-w-xl text-[19px] leading-[1.6] text-ink/65">Got a project, or just want to talk shop? My inbox is open.</p>
          <div className="mt-10"><CopyEmail /></div>
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-[15px]">
            {contactSocials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined} className="editorial-link text-ink/65 hover:text-ink">{s.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-ink/12">
        <div className={`${SHELL} py-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4`}>
          <p className="text-[13px] text-ink/65">&copy; {new Date().getFullYear()} Andrei Iacob</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-[13px] text-ink/65 hover:text-ink transition-colors">{n.label}</a>
            ))}
          </nav>
          <p className="inline-flex items-center gap-2 text-[13px] text-ink/65">
            <span className="status-dot" aria-hidden />
            Built with Next.js, running on the homelab
          </p>
        </div>
      </footer>
    </div>
  )
}
