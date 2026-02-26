import type React from "react"
import "@/app/globals.css"
import { Bricolage_Grotesque, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import Script from "next/script"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Andrei Iacob - Portfolio",
    template: "%s | Andrei Iacob"
  },
  description: "Computer Science student passionate about building innovative solutions. Explore my projects, skills, and experience in web development, AI, and modern technologies.",
  keywords: ["Andrei Iacob", "Computer Science", "Developer", "Portfolio", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Andrei Iacob" }],
  creator: "Andrei Iacob",
  publisher: "Andrei Iacob",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andrei.iacob.co.uk',
    title: 'Andrei Iacob - Portfolio',
    description: 'Computer Science student passionate about building innovative solutions. Explore my projects, skills, and experience.',
    siteName: 'Andrei Iacob Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Iacob - Portfolio',
    description: 'Computer Science student passionate about building innovative solutions.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <Script
          async
          src="https://plausible.iacob.co.uk/js/pa-m1xwZ1hSkHyno5MdVsJ0G.js"
        />

        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() {
              (plausible.q = plausible.q || []).push(arguments)
            };
            plausible.init = plausible.init || function(i) {
              plausible.o = i || {}
            };
            plausible.init();
          `}
        </Script>
      </head>

      <body className={`${bricolage.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
