import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { RegionProvider } from "@lib/context/region-context"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { listRegions } from "@lib/data/regions"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  
  // Get available regions from backend
  const regions = await listRegions()
  const availableCountryCodes = regions?.flatMap(region => 
    region.countries?.map(country => country.iso_2?.toLowerCase()).filter(Boolean) || []
  ) || ["sk", "cz", "at"] // fallback

  return (
    <html lang={locale} data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RegionProvider availableCountryCodes={availableCountryCodes}>
            <main className="">{children}</main>
          </RegionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
