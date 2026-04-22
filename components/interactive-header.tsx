"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

const navItems = [
  { href: "/", label: "home" },
]

export function InteractiveHeader() {
  const pathname = usePathname()

  // Preview uses its own shell
  if (pathname?.startsWith("/preview")) return null

  return (
    <div className="container flex items-center justify-between pt-6 pb-2">
      <Link
        href="/"
        className="font-display font-semibold text-base sm:text-lg tracking-tight hover:text-primary transition-colors"
      >
        Andrei Gabriel Iacob
      </Link>

      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-6 pb-px">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors duration-200 select-none pb-px ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-px bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
