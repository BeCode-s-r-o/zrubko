import createMiddleware from 'next-intl/middleware'

// Podporované locale
export const locales = ['sk', 'cz', 'de', 'gb']
export const defaultLocale = 'sk'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // Domains can be used to configure locale-specific domains
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'sk'
  //   },
  //   {
  //     domain: 'example.cz',
  //     defaultLocale: 'cz'
  //   },
  //   {
  //     domain: 'example.de',
  //     defaultLocale: 'de'
  //   }
  // ]
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(sk|cz|de|gb)/:path*']
}
