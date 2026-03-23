"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export function InteractiveHeader() {
  return (
    <div className="container flex items-center justify-between pt-6 pb-2">
      <Link
        href="/"
        className="font-display font-semibold text-base sm:text-lg tracking-tight hover:text-primary transition-colors"
      >
        Andrei Gabriel Iacob
      </Link>
      <div className="flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  )
}
