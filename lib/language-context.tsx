"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { translations, type Language } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en"
  const saved = localStorage.getItem("lang")
  return saved === "en" || saved === "ro" ? saved : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage)

  // Sync the HTML lang attribute with the current language on mount
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem("lang", lang)
  }

  function t(key: string) {
    return translations[language][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
