import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from 'next/script'
import "./globals.css"

export const metadata: Metadata = {
  title: "Waveful - Feel Appreciated Every Day",
  description:
    "The social platform where you receive the recognition and appreciation you deserve. Share your talents, receive Superlikes, and never feel invisible again.",
  keywords: ["appreciation", "community", "social", "superlikes", "validation", "connection"],
  openGraph: {
    title: "Waveful - Feel Appreciated Every Day",
    description: "Share your talents, receive Superlikes, and never feel invisible again.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#BB00FF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
