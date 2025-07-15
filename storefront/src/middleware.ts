import { NextRequest, NextResponse } from "next/server"

// Static list of supported countries - update this to match your backend configuration
const SUPPORTED_COUNTRIES = ['sk', 'gb', 'de', 'dk', 'se', 'fr', 'es', 'it']

/**
 * Middleware for regional routing based on IP geolocation
 * Priority: IP-based detection -> Default region -> First available region
 */
export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const searchParams = request.nextUrl.searchParams.toString()
    const url = request.nextUrl.clone()

    // Skip middleware for static files and API routes
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/public/') ||
      pathname.includes('.') || // Skip files with extensions
      pathname.startsWith('/favicon.ico')
    ) {
      return NextResponse.next()
    }

    // Use static supported countries list
    const supportedCountries = SUPPORTED_COUNTRIES

    // Check if URL already has a valid country code
    const urlCountryCode = pathname.split("/")[1]?.toLowerCase()
    
    if (supportedCountries.includes(urlCountryCode)) {
      return NextResponse.next()
    }

    // Detect user's country from IP
    let detectedCountry = null
    
    // Try different IP geolocation methods
    // 1. Vercel IP geolocation (when deployed on Vercel)
    const vercelCountry = request.headers.get('x-vercel-ip-country')
    if (vercelCountry) {
      detectedCountry = vercelCountry.toLowerCase()
    }
    
    // 2. CloudFlare IP geolocation
    if (!detectedCountry) {
      const cfCountry = request.headers.get('cf-ipcountry')
      if (cfCountry && cfCountry !== 'XX') {
        detectedCountry = cfCountry.toLowerCase()
      }
    }
    
    // 3. Other common IP geolocation headers
    if (!detectedCountry) {
      const xCountry = request.headers.get('x-country-code') || 
                      request.headers.get('x-real-ip-country') ||
                      request.headers.get('x-forwarded-country')
      if (xCountry) {
        detectedCountry = xCountry.toLowerCase()
      }
    }

    // Determine target country code
    let targetCountryCode = null

    // First try detected country if it's supported
    if (detectedCountry && supportedCountries.includes(detectedCountry)) {
      targetCountryCode = detectedCountry
    }
    
    // If detected country is not supported, try country-specific fallbacks
    if (!targetCountryCode && detectedCountry) {
      // Map unsupported countries to supported ones
      const countryMappings: Record<string, string> = {
        'sk': 'sk', // Slovakia
        'cz': 'sk', // Czech Republic -> Slovakia
        'pl': 'de', // Poland -> Germany
        'hu': 'de', // Hungary -> Germany
        'us': 'gb', // US -> UK
        'ca': 'gb', // Canada -> UK
        'au': 'gb', // Australia -> UK
        'at': 'de', // Austria -> Germany
        'ch': 'de', // Switzerland -> Germany
        'be': 'fr', // Belgium -> France
        'nl': 'de', // Netherlands -> Germany
        'no': 'se', // Norway -> Sweden
        'fi': 'se', // Finland -> Sweden
        'pt': 'es', // Portugal -> Spain
      }
      
      const mappedCountry = countryMappings[detectedCountry]
      if (mappedCountry && supportedCountries.includes(mappedCountry)) {
        targetCountryCode = mappedCountry
      }
    }

    // If still no match, use Slovakia as default for Slovak users or fallback to first available
    if (!targetCountryCode) {
      // If detected country is Slovakia, use 'sk' even if not in supported list
      if (detectedCountry === 'sk') {
        targetCountryCode = 'sk'
      } else {
        // Use environment variable or first available region
        const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'sk'
        targetCountryCode = supportedCountries.includes(defaultRegion) 
          ? defaultRegion 
          : supportedCountries[0]
      }
    }

    // Redirect to the determined country code
    const newPathname = `/${targetCountryCode}${pathname === '/' ? '' : pathname}`
    url.pathname = newPathname
    
    if (searchParams) {
      url.search = searchParams
    }

    return NextResponse.redirect(url)
  } catch (error) {
    console.error("Middleware error:", error)
    // Fallback to Slovakia on error
    const url = request.nextUrl.clone()
    url.pathname = `/sk${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp).*)'
  ],
} 