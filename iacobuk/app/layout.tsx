import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iacob.uk",
  description: "Welcome to iacob.uk - Andrei's personal domain",
  keywords: ["iacob.uk", "Andrei Iacob", "personal website", "portfolio"],
  authors: [{ name: "Andrei Iacob" }],
  creator: "Andrei Iacob",
  openGraph: {
    title: "iacob.uk",
    description: "Welcome to iacob.uk - Andrei's personal domain",
    url: "https://iacob.uk",
    siteName: "iacob.uk",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "iacob.uk",
    description: "Welcome to iacob.uk - Andrei's personal domain",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
