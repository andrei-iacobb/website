"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ro" : "en")}
      aria-label={language === "en" ? "Schimbă în Română" : "Switch to English"}
      className="text-xs font-semibold uppercase text-muted-foreground hover:text-foreground px-2"
    >
      {language === "en" ? "RO" : "EN"}
    </Button>
  )
}
