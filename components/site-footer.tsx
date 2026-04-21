import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

const pages = [
  { href: "/", label: "Home" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Andrei Iacob
          </p>
          <nav className="flex items-center gap-4">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/andrei-iacobb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/andreigiacob"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
