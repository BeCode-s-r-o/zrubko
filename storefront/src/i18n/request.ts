import { getRequestConfig } from "next-intl/server"

// Mapovanie country codes na locale
const countryToLocaleMap: Record<string, string> = {
  sk: "sk",
  cz: "cz",
  at: "at",
  de: "de",
  gb: "gb"
}

export default getRequestConfig(async ({ locale }) => {
  // Ak nie je locale definované, použij SK ako default
  const resolvedLocale = locale || "sk"

  // Skontroluj či je locale podporované
  const supportedLocale = countryToLocaleMap[resolvedLocale] || "sk"

  return {
    locale: supportedLocale,
    messages: (await import(`../../messages/${supportedLocale}.json`)).default,
  }
})
