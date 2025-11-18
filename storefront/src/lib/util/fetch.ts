const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

// Country-specific API keys mapping
const PUBLISHABLE_KEYS = {
  sk: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY_SK || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  cz: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY_CZ || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  de: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY_DE || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  gb: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY_GB || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
}

// Fallback to default key if country-specific key is not available
const getPublishableKey = (countryCode?: string): string => {
  if (countryCode && PUBLISHABLE_KEYS[countryCode as keyof typeof PUBLISHABLE_KEYS]) {
    return PUBLISHABLE_KEYS[countryCode as keyof typeof PUBLISHABLE_KEYS]!
  }
  return process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!
}

export async function storeFetch(path: string, init: RequestInit = {}, countryCode?: string) {
  const pk = getPublishableKey(countryCode)

  return fetch(`${base}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "x-publishable-api-key": pk,
      "Content-Type": "application/json",
    },
  })
}

