export const languages = ["en", "ro"] as const
export type Language = (typeof languages)[number]

export const languageLabels: Record<Language, string> = {
  en: "English",
  ro: "Română",
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "hero.subtitle": "Computer Science Student",
    "hero.title.line1": "I build things",
    "hero.title.line2": "for the web.",
    "hero.description":
      "Building practical software with modern web technologies. Focused on clean code and real-world solutions.",

    "about.heading": "About",
    "about.p1":
      "I'm a Computer Science student passionate about building innovative solutions. I enjoy working with modern technologies and am constantly learning new skills. My interests span web development, artificial intelligence, and open source contributions.",
    "about.p2":
      "I also specialise in providing IT solutions and support for various companies and individuals. Currently expanding my skills in React, TypeScript, and cloud infrastructure, always looking for opportunities to apply them in real-world projects.",
    "about.tech.heading": "Technologies",
    "about.tech.p1":
      "I work across the full stack, from React and Next.js on the frontend to Node.js, Python, and .NET on the backend, with PostgreSQL and MongoDB for data.",
    "about.tech.p2":
      "Outside of application development, I run a GitOps-managed homelab on enterprise HP ProLiant servers, a Kubernetes cluster orchestrated with Flux CD on Talos Linux, behind Cloudflare tunnels, hosting everything from media services to local LLMs.",

    "projects.heading": "Projects",
    "projects.subtitle": "A selection of things I've built.",
    "projects.private.label": "Private Repository",
    "projects.private.note": "As per company requirements",

    "project.neatplan.desc":
      "Cleaning management system with real-time tracking, admin dashboard, analytics, scheduling, and mobile support.",
    "project.homeops.desc":
      "GitOps-managed homelab running Kubernetes on enterprise HP ProLiant servers with Flux CD, Talos Linux, and 30+ self-hosted services.",
    "project.visitor.desc":
      "Multi-site visitor check-in platform with Android kiosks, contractor validation, vehicle tracking, and Telegram notifications.",
    "project.staffclock.desc":
      "Time tracking and staff management application for monitoring employee hours and productivity.",
    "project.informate.desc":
      "AI-powered news summarizer built with Java, OpenAI API, and natural language processing.",
    "project.carsales.desc":
      "Car sales and inventory tracking system built in C for educational purposes.",

    "contact.heading": "Get in touch",
    "contact.description":
      "I'm always open to new opportunities and interesting projects. Feel free to reach out.",
  },
  ro: {
    "hero.subtitle": "Student Informatică",
    "hero.title.line1": "Construiesc lucruri",
    "hero.title.line2": "pentru web.",
    "hero.description":
      "Construiesc software practic cu tehnologii web moderne. Axat pe cod curat și soluții reale.",

    "about.heading": "Despre mine",
    "about.p1":
      "Sunt student la Informatică, pasionat de construirea de soluții inovatoare. Îmi place să lucrez cu tehnologii moderne și învăț constant lucruri noi. Interesele mele acoperă dezvoltarea web, inteligența artificială și contribuțiile open source.",
    "about.p2":
      "De asemenea, mă specializez în furnizarea de soluții și suport IT pentru diverse companii și persoane. În prezent îmi extind cunoștințele în React, TypeScript și infrastructură cloud, mereu în căutare de oportunități de a le aplica în proiecte reale.",
    "about.tech.heading": "Tehnologii",
    "about.tech.p1":
      "Lucrez pe întreg stack-ul, de la React și Next.js pe frontend la Node.js, Python și .NET pe backend, cu PostgreSQL și MongoDB pentru date.",
    "about.tech.p2":
      "În afara dezvoltării de aplicații, administrez un homelab gestionat cu GitOps pe servere enterprise HP ProLiant, un cluster Kubernetes orchestrat cu Flux CD pe Talos Linux, în spatele tunelurilor Cloudflare, găzduind de la servicii media la LLM-uri locale.",

    "projects.heading": "Proiecte",
    "projects.subtitle": "O selecție din lucrurile pe care le-am construit.",
    "projects.private.label": "Repozitoriu Privat",
    "projects.private.note": "Conform cerințelor companiei",

    "project.neatplan.desc":
      "Sistem de management al curățeniei cu urmărire în timp real, panou de administrare, analiză, programare și suport mobil.",
    "project.homeops.desc":
      "Homelab gestionat cu GitOps care rulează Kubernetes pe servere enterprise HP ProLiant cu Flux CD, Talos Linux și peste 30 de servicii auto-găzduite.",
    "project.visitor.desc":
      "Platformă de check-in vizitatori multi-locație cu chioșcuri Android, validare contractori, urmărire vehicule și notificări Telegram.",
    "project.staffclock.desc":
      "Aplicație de pontaj și management al personalului pentru monitorizarea orelor și productivității angajaților.",
    "project.informate.desc":
      "Sumarizator de știri alimentat de AI, construit cu Java, API-ul OpenAI și procesare a limbajului natural.",
    "project.carsales.desc":
      "Sistem de urmărire a vânzărilor și inventarului auto, construit în C în scop educativ.",

    "contact.heading": "Contactează-mă",
    "contact.description":
      "Sunt mereu deschis la noi oportunități și proiecte interesante. Nu ezita să mă contactezi.",
  },
}
