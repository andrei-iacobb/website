"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { translations, type Language } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LANG_KEY = "lang"
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function parseLanguage(value: string | null): Language {
  return value === "en" || value === "ro" ? value : "en"
}

function readLanguage(): Language {
  return parseLanguage(localStorage.getItem(LANG_KEY))
}

let listeners: Array<() => void> = []

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot(): Language {
  return readLanguage()
}

function getServerSnapshot(): Language {
  return "en"
}

function setStoredLanguage(lang: Language) {
  localStorage.setItem(LANG_KEY, lang)
  listeners.forEach((l) => l())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLanguage = useCallback((lang: Language) => {
    setStoredLanguage(lang)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key: string) => translations[language][key] ?? key,
    [language]
  )

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
