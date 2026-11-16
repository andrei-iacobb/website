import Link from "next/link"

// "/#section" (not "#section") so the links also work from /about and /homelab.
const nav = [
  { href: "/#work", label: "Work" },
  { href: "/homelab", label: "Homelab" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="preview-header">
      <nav
        aria-label="Primary"
        className="mx-auto w-full max-w-328 px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between"
      >
        <Link
          href="/"
          data-testid="nav-home"
          className="inline-flex items-center min-h-[44px] font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-ink hover:opacity-70 transition-opacity"
        >
          Andrei Iacob
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {nav.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                data-testid={`nav-${n.label.toLowerCase()}`}
                className="editorial-link inline-flex items-center min-h-[44px] text-[13px] sm:text-[14px] text-ink/65 hover:text-ink transition-colors"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
