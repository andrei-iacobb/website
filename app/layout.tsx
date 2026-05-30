import type React from "react"
import "@/app/globals.css"
import { Bricolage_Grotesque, DM_Sans, Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andrei Iacob - Software Developer",
    template: "%s · Andrei Iacob"
  },
  description: "Andrei Iacob (Andrei Gabriel Iacob) - software developer and Computer Science student building full-stack web apps, self-hosted infrastructure, and open source tools.",
  keywords: ["Andrei Iacob", "Andrei Gabriel Iacob", "Iacob", "Andrei", "Computer Science", "Software Developer", "React", "Next.js", "TypeScript", "Kubernetes", "Bury St Edmunds"],
  authors: [{ name: "Andrei Iacob", url: SITE_URL }],
  creator: "Andrei Iacob",
  publisher: "Andrei Iacob",
  alternates: {
    canonical: '/',
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
    type: 'profile',
    firstName: 'Andrei',
    lastName: 'Iacob',
    locale: 'en_GB',
    url: SITE_URL,
    title: 'Andrei Iacob - Software Developer',
    description: 'Software developer and Computer Science student building full-stack web apps, self-hosted infrastructure, and open source tools.',
    siteName: 'Andrei Iacob',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Iacob - Software Developer',
    description: 'Software developer and Computer Science student building full-stack web apps, self-hosted infrastructure, and open source tools.',
  },
  // After deploying, register the site in Google Search Console and paste the
  // verification token here (or use the DNS method) to claim the property.
  // verification: { google: 'PASTE_TOKEN_HERE' },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Andrei Iacob",
      alternateName: ["Andrei Gabriel Iacob", "Andrei G. Iacob"],
      givenName: "Andrei",
      additionalName: "Gabriel",
      familyName: "Iacob",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "Software Developer",
      description:
        "Software developer and Computer Science student building full-stack web apps, self-hosted infrastructure, and open source tools.",
      knowsAbout: [
        "Software Development",
        "Web Development",
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Kubernetes",
        "Self-hosting",
        "DevOps",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bury St Edmunds",
        addressRegion: "Suffolk",
        addressCountry: "GB",
      },
      sameAs: [
        "https://github.com/andrei-iacobb",
        "https://linkedin.com/in/andreigiacob",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Andrei Iacob",
      description:
        "Portfolio of Andrei Iacob - software developer and Computer Science student.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-GB",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Andrei Iacob - Software Developer",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

      <body className={`${bricolage.variable} ${dmSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
