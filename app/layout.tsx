import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
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
    url: 'https://andrei.iacob.uk',
    title: 'Andrei Iacob - Portfolio',
    description: 'Computer Science student passionate about building innovative solutions. Explore my projects, skills, and experience.',
    siteName: 'Andrei Iacob Portfolio',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg',
        width: 1200,
        height: 630,
        alt: 'Andrei Iacob - Developer & Computer Science Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Iacob - Portfolio',
    description: 'Computer Science student passionate about building innovative solutions.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp.jpg-jnNV3ygNy4DZBVIYQJ7zaedW8CWhYE.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false} 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}