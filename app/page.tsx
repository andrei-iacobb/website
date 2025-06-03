"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Code, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
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
    <div className="min-h-screen bg-background">
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
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                scrolled ? "h-9 w-9 rounded-full border-2 border-primary" : "h-0 w-0 opacity-0"
              }`}
            >
              {scrolled && (
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold transition-all duration-500 ${scrolled ? "text-base" : "text-xl"}`}>
                {scrolled ? "Andrei" : "Welcome"}
              </span>
              {!scrolled && (
                <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full text-primary text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Portfolio</span>
                </div>
              )}
              {scrolled && <span className="text-xs text-muted-foreground animate-fade-in">Developer</span>}
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
      <main className="container py-8 md:py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center">
            <div className="space-y-4 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground mb-2">
                <Code className="h-4 w-4" />
                <span>Computer Science Student</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-primary to-blue-500">
                  Andrei
                </span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Developer & Tech Enthusiast</p>
              <div className="flex gap-4">
                <Button asChild className="relative group">
                  <a href="#contact">
                    <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md opacity-30 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></span>
                    <span className="relative">Contact Me</span>
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#projects">View Projects</a>
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="https://github.com/andrei-iacobb" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://linkedin.com/in/andreigiacob" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="mailto:andreiiacob2006@gmail.com">
                  <Mail className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative h-60 w-60 overflow-hidden rounded-full border-4 border-background">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg"
                    alt="Profile photo at night with palm trees"
                    width={240}
                    height={240}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="space-y-6 py-8 md:py-12 lg:py-16 scroll-mt-20">
          <div className="mx-auto max-w-[58rem]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">About Me</h2>
              <p className="mt-4 max-w-[85%] mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                I'm a Computer Science student passionate about building innovative solutions. I enjoy working with
                modern technologies and am constantly learning new skills. My interests include web development,
                artificial intelligence, and open source contributions.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold leading-[1.1] text-center sm:text-3xl md:text-5xl mb-8">Skills</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Languages */}
                <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md group">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-primary/10 group-hover:to-blue-500/20 transition-colors">
                    <h3 className="font-medium">Languages</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["Python", "C", "C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"].map((skill) => (
                        <div
                          key={skill}
                          className="bg-muted/50 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Frameworks & Libraries */}
                <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md group">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-primary/10 group-hover:to-blue-500/20 transition-colors">
                    <h3 className="font-medium">Frameworks & Libraries</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "Node.js", "React Native"].map((skill) => (
                        <div
                          key={skill}
                          className="bg-muted/50 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tools & Technologies */}
                <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md group">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-primary/10 group-hover:to-blue-500/20 transition-colors">
                    <h3 className="font-medium">Tools & Technologies</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["Git", "GitHub", "Linux", "Docker", "PostgreSQL", "VS Code", "Bash"].map((skill) => (
                        <div
                          key={skill}
                          className="bg-muted/50 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="max-w-[85%] mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Currently, I'm focusing on expanding my knowledge in React, JS, TypeScript and many more! I am looking
                for opportunities to apply my skills in real-world projects.
              </p>
            </div>
          </div>
        </section>
        <section id="projects" className="space-y-6 py-8 md:py-12 lg:py-16 scroll-mt-20">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Projects</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              My project showcase is coming soon!
            </p>
            <div className="w-full max-w-md mx-auto mt-8">
              <Card className="border-dashed overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                  <Link
                    href="https://github.com/andrei-iacobb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-muted p-3 mb-4 inline-block hover:bg-muted/80 transition-colors relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-500"></div>
                    <Github className="h-6 w-6 text-muted-foreground relative z-10" />
                  </Link>
                  <h3 className="text-xl font-medium mb-2">Stay Tuned</h3>
                  <p className="text-muted-foreground">
                    I'm currently working on some exciting projects that will be showcased here soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-6 py-8 md:py-12 lg:py-16 scroll-mt-20">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild className="relative group">
                <Link href="mailto:andreiiacob2006@gmail.com">
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md opacity-30 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></span>
                  <span className="relative flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://linkedin.com/in/andreigiacob" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Andrei. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://github.com/andrei-iacobb" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/andreigiacob" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:andreiiacob2006@gmail.com">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

