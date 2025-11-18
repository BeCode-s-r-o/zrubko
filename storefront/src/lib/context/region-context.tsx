"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"

interface RegionContextType {
  currentCountryCode: string
  updateRegion: (countryCode: string) => void
  isUpdating: boolean
  availableCountryCodes: string[]
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export function RegionProvider({ 
  children, 
  availableCountryCodes = ["sk", "cz", "at", "de", "gb"] // fallback default
}: { 
  children: ReactNode
  availableCountryCodes?: string[]
}) {
  const [currentCountryCode, setCurrentCountryCode] = useState(availableCountryCodes[0] || "sk")
  const [isUpdating, setIsUpdating] = useState(false)
  const pathname = usePathname()

  // Update country code when pathname changes
  useEffect(() => {
    const countryCode = pathname.split("/")[1]?.toLowerCase()
    if (countryCode && availableCountryCodes.includes(countryCode)) {
      setCurrentCountryCode(countryCode)
    }
  }, [pathname, availableCountryCodes])

  const updateRegion = (countryCode: string) => {
    setIsUpdating(true)
    setCurrentCountryCode(countryCode)
    
    // Reset updating state after a short delay
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  return (
    <RegionContext.Provider value={{ currentCountryCode, updateRegion, isUpdating, availableCountryCodes }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}

