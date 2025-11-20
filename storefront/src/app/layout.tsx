import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"
import { RegionProvider } from "@lib/context/region-context"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { listRegions } from "@lib/data/regions"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Get locale from next-intl
  const locale = await getLocale()
  
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
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* Google Fonts - Poppins for Furnitor */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        
        {/* Furnitor Vendor CSS */}
        <link rel="stylesheet" href="/furnitor/vendors/fontawesome-pro-5/css/all.css" />
        <link rel="stylesheet" href="/furnitor/vendors/bootstrap-select/css/bootstrap-select.min.css" />
        <link rel="stylesheet" href="/furnitor/vendors/slick/slick.min.css" />
        <link rel="stylesheet" href="/furnitor/vendors/magnific-popup/magnific-popup.min.css" />
        <link rel="stylesheet" href="/furnitor/vendors/jquery-ui/jquery-ui.min.css" />
        <link rel="stylesheet" href="/furnitor/vendors/animate.css" />
        <link rel="stylesheet" href="/furnitor/vendors/mapbox-gl/mapbox-gl.min.css" />
        
        {/* Furnitor Theme CSS */}
        <link rel="stylesheet" href="/furnitor/css/themes.css" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RegionProvider availableCountryCodes={availableCountryCodes}>
            <main>{children}</main>
          </RegionProvider>
        </NextIntlClientProvider>
        
        {/* Furnitor Vendor JavaScript */}
        <Script src="/furnitor/vendors/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/furnitor/vendors/jquery-ui/jquery-ui.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/bootstrap/bootstrap.bundle.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/bootstrap-select/js/bootstrap-select.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/slick/slick.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/waypoints/jquery.waypoints.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/counter/countUp.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/magnific-popup/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/hc-sticky/hc-sticky.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/jparallax/TweenMax.min.js" strategy="afterInteractive" />
        <Script src="/furnitor/vendors/mapbox-gl/mapbox-gl.js" strategy="afterInteractive" />
        
        {/* Furnitor Theme JavaScript */}
        <Script src="/furnitor/js/theme.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
