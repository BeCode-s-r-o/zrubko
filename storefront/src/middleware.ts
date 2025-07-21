import { NextRequest, NextResponse } from "next/server"

// Static list of supported countries - update this to match your backend configuration
const SUPPORTED_COUNTRIES = ['sk', 'cz', 'at']

/**
 * Middleware for regional routing based on IP geolocation
 * Only redirects when no country code is present in the URL
 */
export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

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

    // Check if URL already has a valid country code
    const urlCountryCode = pathname.split("/")[1]?.toLowerCase()
    
    // If URL already has a valid country code, allow it to pass through
    if (SUPPORTED_COUNTRIES.includes(urlCountryCode)) {
      return NextResponse.next()
    }

    // Only redirect if there's no country code or invalid country code
    // This allows direct navigation to /cz and /at routes
    if (!urlCountryCode || !SUPPORTED_COUNTRIES.includes(urlCountryCode)) {
      const url = request.nextUrl.clone()
      const searchParams = request.nextUrl.searchParams.toString()
      
      // Default to Slovakia
      const targetCountryCode = 'sk'
      
      // Redirect to the determined country code
      const newPathname = `/${targetCountryCode}${pathname === '/' ? '' : pathname}`
      url.pathname = newPathname
      
      if (searchParams) {
        url.search = searchParams
      }

      return NextResponse.redirect(url)
    }

    // If we reach here, just continue with the request
    return NextResponse.next()
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