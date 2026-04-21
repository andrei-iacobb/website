import type React from "react"
import "@/app/globals.css"
import { Bricolage_Grotesque, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { InteractiveHeader } from "@/components/interactive-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { SITE_URL } from "@/lib/constants"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bricolage",
})

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Andrei Iacob",
    template: "%s · Andrei Iacob"
  },
  description: "CS student building full-stack apps, self-hosted infrastructure, and open source tools. andrei.iacob.co.uk",
  keywords: ["Andrei Iacob", "Computer Science", "Developer", "React", "Next.js", "TypeScript", "Kubernetes"],
  authors: [{ name: "Andrei Iacob" }],
  creator: "Andrei Iacob",
  publisher: "Andrei Iacob",
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
    url: SITE_URL,
    title: 'Andrei Iacob',
    description: 'CS student building full-stack apps, self-hosted infrastructure, and open source tools.',
    siteName: 'Andrei Iacob',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Iacob',
    description: 'CS student building full-stack apps, self-hosted infrastructure, and open source tools.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <Script
          async
          src="/js/p.js"
          data-api="/api/p"
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
          <LanguageProvider>
            <InteractiveHeader />
            {children}
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
