"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowUpRight, Lock } from "lucide-react"
import { InteractiveHeader } from "@/components/interactive-header"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    name: "NeatPlan",
    descKey: "project.neatplan.desc",
    tags: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    url: "https://github.com/andrei-iacobb/neatplan",
  },
  {
    name: "HomeOps",
    descKey: "project.homeops.desc",
    tags: ["Kubernetes", "Flux CD", "Talos", "Proxmox"],
    url: "https://github.com/andrei-iacobb/homeops",
  },
  {
    name: "Visitor Management",
    descKey: "project.visitor.desc",
    tags: ["React", "Express", "Kotlin", "PostgreSQL"],
    url: "#",
    private: true,
  },
  {
    name: "StaffClock",
    descKey: "project.staffclock.desc",
    tags: ["Python", "PyQt6", "OpenCV"],
    url: "https://github.com/andrei-iacobb/staffclock",
  },
  {
    name: "Informate",
    descKey: "project.informate.desc",
    tags: ["Java", "OpenAI", "NLP"],
    url: "https://github.com/andrei-iacobb/informate",
  },
  {
    name: "Car Sales Finalised",
    descKey: "project.carsales.desc",
    tags: ["C", "Educational"],
    url: "https://github.com/andrei-iacobb/car_sales_finalised",
  },
] as const

const technologies = [
  "TypeScript", "JavaScript", "Python", "Java", "C#", "C", "C++", "SQL", "Bash",
  "React", "Next.js", "Tailwind CSS", "Framer Motion", "Radix UI", "tRPC",
  "Node.js", "Express", ".NET", "Flask", "Prisma", "OpenAI API",
  "TensorFlow", "scikit-learn", "Pandas", "NumPy", "OpenCV",
  "PostgreSQL", "Redis", "MongoDB", "SQLite", "MariaDB", "MinIO",
  "Docker", "Kubernetes", "Flux CD", "Talos Linux", "Proxmox", "Cilium",
  "GitHub Actions", "Nginx", "Cloudflare", "WireGuard",
  "Grafana", "Prometheus", "Loki", "Plausible",
  "Git", "Linux", "ESP32", "Arduino",
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <InteractiveHeader />

      <main>
        {/* Hero */}
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative">
            <div className="flex flex-col items-center text-center space-y-6">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase animate-fade-up">
                {t("hero.subtitle")}
              </p>
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.08] animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                {t("hero.title.line1")}
                <br />
                {t("hero.title.line2")}
              </h1>
              <p
                className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                {t("hero.description")}
              </p>
              <div
                className="flex items-center gap-5 pt-4 animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                <Link
                  href="https://github.com/andrei-iacobb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://linkedin.com/in/andreigiacob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="mailto:andrei@iacob.co.uk"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32 scroll-mt-20">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-start md:gap-16 lg:gap-24">
              <div className="flex-1">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                  {t("about.heading")}
                </h2>
                <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                </div>
              </div>

              <div className="mt-10 md:mt-0 md:flex-shrink-0">
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden ring-1 ring-border">
                  <Image
                    src="/IMG_3962.jpeg"
                    alt="Andrei Iacob"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-sm font-semibold text-primary tracking-widest uppercase mb-10">
                {t("about.tech.heading")}
              </h3>
              <div className="flex flex-col md:flex-row md:items-start md:gap-14 lg:gap-20">
                <div className="md:flex-shrink-0 mb-8 md:mb-0 space-y-4">
                  <div className="w-52 md:w-64 rounded-xl overflow-hidden ring-1 ring-border">
                    <Image
                      src="/Gemini_Generated_Image_n6c5r1n6c5r1n6c5.png"
                      alt="Server rack"
                      width={560}
                      height={280}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 208px, 256px"
                    />
                  </div>
                  <div className="w-52 md:w-64 rounded-xl overflow-hidden ring-1 ring-border">
                    <Image
                      src="/IMG_3905.jpeg"
                      alt="Desk setup"
                      width={560}
                      height={420}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 208px, 256px"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-5">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t("about.tech.p1")}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t("about.tech.p2")}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 md:py-32 scroll-mt-20">
          <div className="container">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t("projects.heading")}
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              {t("projects.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project) =>
                "private" in project && project.private ? (
                  <div
                    key={project.name}
                    className="group relative block p-7 rounded-xl border border-border cursor-default overflow-hidden"
                  >
                    <div className="transition-all duration-300 group-hover:blur-sm group-hover:opacity-30 group-hover:select-none">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display font-semibold text-lg">
                          {project.name}
                        </h3>
                        <Lock className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {t(project.descKey)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <Lock className="h-6 w-6 text-muted-foreground mb-3" />
                      <p className="text-sm font-medium text-foreground">{t("projects.private.label")}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("projects.private.note")}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-7 rounded-xl border border-border hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 shrink-0 mt-0.5" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {t(project.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 scroll-mt-20">
          <div className="container">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
              {t("contact.heading")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              {t("contact.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <Link
                href="mailto:andrei@iacob.co.uk"
                className="inline-flex items-center gap-2.5 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                andrei@iacob.co.uk
              </Link>
              <Link
                href="https://linkedin.com/in/andreigiacob"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/andrei-iacobb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Andrei Iacob
          </p>
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
    </div>
  )
}
