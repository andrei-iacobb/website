import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "The homelab",
  description:
    "Andrei Iacob's homelab: a Kubernetes cluster on Proxmox across two HP ProLiant G9s, running 60+ self-hosted services - including this site - since 2023.",
  alternates: { canonical: "/homelab" },
  openGraph: {
    type: "website",
    title: "The homelab · Andrei Iacob",
    description:
      "A Kubernetes cluster on Proxmox in a garage in Suffolk, running 60+ self-hosted services - including this site.",
    url: `${SITE_URL}/homelab`,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/homelab#webpage`,
  url: `${SITE_URL}/homelab`,
  name: "The homelab - Andrei Iacob",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
}

const stats = [
  ["60+", "self-hosted services"],
  ["Proxmox", "Kubernetes cluster"],
  ["2x", "HP ProLiant G9 servers"],
  ["2023", "running since"],
]

const eyebrow = "font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/65"
const SHELL = "mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16"

const stagger = (n: number) => ({ "--stagger": n } as CSSProperties)

export default function HomelabPage() {
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
            The homelab
          </p>
          <h1
            data-animate
            style={stagger(1)}
            className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-ink text-[clamp(40px,6.5vw,96px)] max-w-4xl"
          >
            I host what I build.
          </h1>

          <div data-animate style={stagger(2)} className="mt-12 md:mt-16 max-w-[58ch] space-y-7 text-[18px] md:text-[20px] leading-[1.6] text-ink/85">
            <p>
              Most of what I build, I also host. There is a Kubernetes cluster running in my
              garage, and this page is being served from it right now.
            </p>
            <p>
              The hardware is a pair of HP ProLiant G9 servers running Proxmox. It has been going
              since 2023 - first as a place to break things safely, then gradually as the place
              where everything I rely on actually lives.
            </p>
            <p>
              Proxmox handles the virtual machines; Kubernetes runs on top and schedules
              everything else. At last count there were sixty-odd self-hosted services on the
              cluster: Postgres databases, internal tools, monitoring, and a Forgejo instance at{" "}
              <a href="https://git.iacob.co.uk/andrei" target="_blank" rel="noopener noreferrer" className="editorial-link text-ink/85 hover:text-ink">
                git.iacob.co.uk
              </a>{" "}
              where my code lives. This site is one of those services, and the{" "}
              <Link href="/#homelab" className="editorial-link text-ink/85 hover:text-ink">
                live status panel
              </Link>{" "}
              on the home page health-checks the important ones server-side.
            </p>
            <p>
              With sixty services on two physical machines, you have to care about resource
              limits - a memory leak in one container eventually becomes everyone&apos;s problem.
              Hardware fails, nodes drop, pods get rescheduled. The apps I build have to survive
              that and reconnect gracefully.
            </p>
            <p>
              It also keeps the freelance work grounded. When I{" "}
              <Link href="/#services" className="editorial-link text-ink/85 hover:text-ink">
                set up self-hosting for clients
              </Link>
              , it is the same stack I run and repair at home.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 border-t border-ink/15 pt-8 max-w-4xl">
            {stats.map(([n, label]) => (
              <div key={label}>
                <dt className="font-display font-bold text-[30px] md:text-[38px] leading-none tracking-[-0.02em] text-ink">{n}</dt>
                <dd className="mt-2.5 text-[14px] text-ink/65">{label}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-[16px] text-ink/70">
            The whole setup is tracked as code - every deployment and service definition lives at{" "}
            <a href="https://github.com/andrei-iacobb/homeops" target="_blank" rel="noopener noreferrer" className="editorial-link text-ink/85 hover:text-ink">
              github.com/andrei-iacobb/homeops
            </a>
            . If you are building something similar, steal what is useful. Or{" "}
            <Link href="/about" className="editorial-link text-ink/85 hover:text-ink">read more about me</Link>.
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
