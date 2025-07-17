"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function InteractiveHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // For the compact header transition
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      // For the progress indicator
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY / windowHeight
      setScrollProgress(scrollPosition)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ease-in-out ${scrolled ? "py-2" : "py-4"}`}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-primary to-blue-500"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Background with blur and gradient */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10" />
      </div>

      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out group ${
              scrolled ? "h-9 w-9 rounded-full border-2 border-primary" : "h-0 w-0 opacity-0"
            }`}
          >
            {scrolled && (
              <div className="relative w-full h-full overflow-hidden rounded-full">
                {/* Photo 1 */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg"
                  alt="Profile Photo 1"
                  width={36}
                  height={36}
                  className="object-cover transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-110"
                />
                                 {/* Photo 2 - Replace this src with your second photo URL when ready */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg"
                  alt="Profile Photo 2"
                  width={36}
                  height={36}
                  className="object-cover absolute inset-0 opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!scrolled ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">Welcome to my</span>
                <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full text-primary text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Portfolio</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-bold text-base">Andrei</span>
                <span className="text-xs text-muted-foreground animate-fade-in">Developer</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {scrolled && (
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-full">
              <Link
                href="https://github.com/andrei-iacobb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-background/80 transition-colors"
              >
                <Github className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com/in/andreigiacob"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-background/80 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="mailto:andreiiacob2006@gmail.com"
                className="p-1.5 rounded-full hover:bg-background/80 transition-colors"
              >
                <Mail className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          )}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-3 left-1/4 h-6 w-6 rounded-full bg-primary/10 blur-xl" />
      <div className="absolute -bottom-2 right-1/3 h-4 w-4 rounded-full bg-purple-500/20 blur-lg" />
      <div className="absolute -bottom-4 right-1/4 h-8 w-8 rounded-full bg-blue-500/10 blur-xl" />
    </header>
  )
} 