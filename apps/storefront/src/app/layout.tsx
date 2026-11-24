import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google"
import "styles/globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="ucp" href="/.well-known/ucp" />
      </head>
      <body className="font-sans antialiased bg-creata-cream text-creata-ink selection:bg-creata-yellow selection:text-creata-ink">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
