import type React from "react"
import type { Metadata } from "next"
import { Aldrich } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const _aldrich = Aldrich({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Casino AI - Smart Casino Guide & Advisor",
  description:
    "Your intelligent casino advisor powered by AI. Compare casinos, find top-rated sites, and get personalized recommendations.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${_aldrich.className}`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
