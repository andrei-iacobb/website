import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InteractiveHeader } from "@/components/interactive-header"


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <InteractiveHeader />
      <main className="container py-8 md:py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center">
            <div className="space-y-4 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground mb-2 initial-hidden animate-slide-in-down will-animate">
                <Code className="h-4 w-4" />
                <span>Computer Science Student</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl initial-hidden animate-slide-in-left delay-100 will-animate">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-primary to-blue-500">
                  Andrei
                </span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl initial-hidden animate-slide-in-left delay-200 will-animate">Developer & Tech Enthusiast</p>
              <div className="flex gap-4 initial-hidden animate-slide-in-up delay-300 will-animate">
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
              <div className="flex gap-4 pt-4 initial-hidden animate-fade-in-scale delay-400 will-animate">
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
            <div className="md:w-1/3 flex justify-center initial-hidden animate-slide-in-right delay-200 will-animate">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative h-60 w-60 overflow-hidden rounded-full border-4 border-background transition-transform duration-500 ease-in-out group-hover:scale-105">
                  {/* Photo 1 */}
                  <Image
                    src="/D5CFE413-5175-409A-819C-C6615A60E76D.jpeg"
                    alt="Profile Photo 1"
                    width={240}
                    height={240}
                    className="object-cover object-[center_-27px] transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-110"
                    priority
                  />
                  {/* Photo 2 - Replace this src with your second photo URL when ready */}
                  <Image
                    src="/1000003113.JPG"
                    alt="Profile Photo 2"
                    width={240}
                    height={240}
                    className="object-cover absolute inset-0 opacity-0 scale-95 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110"
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
                artificial intelligence, and open source contributions. I also specialise in providing IT solutions and support for various companies and individuals
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
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Frameworks */}
                <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md group">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-primary/10 group-hover:to-blue-500/20 transition-colors">
                    <h3 className="font-medium">Frameworks</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "Node.js", "Express", "Flask", ".NET", "Tailwind CSS"].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tools */}
                <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md group">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-blue-500/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-primary/10 group-hover:to-blue-500/20 transition-colors">
                    <h3 className="font-medium">Tools</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {["Git", "Docker", "PostgreSQL", "MongoDB", "AWS", "Linux", "VS Code"].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted"
                        >
                          {skill}
                        </span>
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
              Here are some of my featured projects showcasing different technologies and solutions.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-[58rem] grid-cols-1 gap-6 md:grid-cols-2">
            {/* CleanTrack Project */}
            <Card className="group overflow-hidden border border-border/40 transition-all hover:shadow-lg">
              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-600/10 p-4 border-b border-border/30 group-hover:from-green-500/20 group-hover:via-emerald-500/10 group-hover:to-green-600/20 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">CleanTrack</h3>
                  <Link
                    href="https://github.com/andrei-iacobb/cleantrack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  A tracking and management system for cleaning operations with modern web technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded-md text-sm font-medium">
                    Web App
                  </div>
                  <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                    Management
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* StaffClock Project */}
            <Card className="group overflow-hidden border border-border/40 transition-all hover:shadow-lg">
              <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-blue-600/10 p-4 border-b border-border/30 group-hover:from-blue-500/20 group-hover:via-indigo-500/10 group-hover:to-blue-600/20 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">StaffClock</h3>
                  <Link
                    href="https://github.com/andrei-iacobb/staffclock"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Time tracking and staff management application for monitoring employee hours and productivity.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                    Time Tracking
                  </div>
                  <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                    HR Management
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informate Project */}
            <Card className="group overflow-hidden border border-border/40 transition-all hover:shadow-lg">
              <div className="bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-purple-600/10 p-4 border-b border-border/30 group-hover:from-purple-500/20 group-hover:via-violet-500/10 group-hover:to-purple-600/20 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Informate</h3>
                  <Link
                    href="https://github.com/andrei-iacobb/informate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
                             <CardContent className="p-6">
                 <p className="text-muted-foreground mb-4">
                   AI-powered news summarizer built for university using Java, OpenAI API, and natural language processing.
                 </p>
                 <div className="flex flex-wrap gap-2">
                   <div className="bg-purple-500/10 text-purple-600 px-2 py-1 rounded-md text-sm font-medium">
                     AI/NLP
                   </div>
                   <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                     Java
                   </div>
                   <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                     OpenAI API
                   </div>
                 </div>
               </CardContent>
            </Card>

            {/* Car Sales Project */}
            <Card className="group overflow-hidden border border-border/40 transition-all hover:shadow-lg">
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-orange-600/10 p-4 border-b border-border/30 group-hover:from-orange-500/20 group-hover:via-amber-500/10 group-hover:to-orange-600/20 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Car Sales Finalised</h3>
                  <Link
                    href="https://github.com/andrei-iacobb/car_sales_finalised"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
                             <CardContent className="p-6">
                 <p className="text-muted-foreground mb-4">
                   Simple car sales and inventory tracking system built in C programming language for teaching university students.
                 </p>
                 <div className="flex flex-wrap gap-2">
                   <div className="bg-orange-500/10 text-orange-600 px-2 py-1 rounded-md text-sm font-medium">
                     C Programming
                   </div>
                   <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                     Educational
                   </div>
                   <div className="bg-muted/50 px-2 py-1 rounded-md text-sm font-medium">
                     Inventory System
                   </div>
                 </div>
               </CardContent>
            </Card>
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
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Andrei Gabriel Iacob. All rights reserved.</p>
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

