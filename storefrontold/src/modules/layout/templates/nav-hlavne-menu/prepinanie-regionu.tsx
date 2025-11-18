"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { ChevronUp } from "lucide-react"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"

interface Country {
  iso_2: string
  display_name: string
  flag?: string
}

interface RegionSwitcherProps {
  regions: StoreRegion[]
  currentRegion: StoreRegion
}

const RegionSwitcher = ({ regions, currentRegion }: RegionSwitcherProps) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Mapovanie krajín na zobrazenie - každá krajina má svoj vlastný locale
  const countryDisplayMap: Record<string, { name: string; flag: string; locale: string }> = {
    sk: { name: "SK", flag: "🇸🇰", locale: "sk" },
    cz: { name: "CZ", flag: "🇨🇿", locale: "cz" },
    at: { name: "AT", flag: "🇦🇹", locale: "at" }, // AT má vlastný locale (at.json)
    de: { name: "DE", flag: "🇩🇪", locale: "de" },
    gb: { name: "GB", flag: "🇬🇧", locale: "gb" },
  }

  // Získaj country code z URL
  const getCountryCodeFromPath = () => {
    const segments = pathname.split('/')
    const potentialCountryCode = segments[1]?.toLowerCase()
    
    // Mapovanie locale späť na country code
    const localeToCountryMap: Record<string, string> = {
      'sk': 'sk',
      'cz': 'cz', 
      'at': 'at', // AT má vlastný locale
      'de': 'de',
      'gb': 'gb'
    }
    
    return localeToCountryMap[potentialCountryCode] || potentialCountryCode || 'sk'
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const regions = await listRegions()
        const allCountries: Country[] = []
        
        regions.forEach((region: HttpTypes.StoreRegion) => {
          region.countries?.forEach((country) => {
            if (country.iso_2 && countryDisplayMap[country.iso_2]) {
              allCountries.push({
                iso_2: country.iso_2,
                display_name: countryDisplayMap[country.iso_2].name,
                flag: countryDisplayMap[country.iso_2].flag,
              })
            }
          })
        })
        
        // Usporiadaj podľa poradia SK, CZ, AT, DE, GB
        const order = ["sk", "cz", "at", "de", "gb"]
        allCountries.sort((a, b) => order.indexOf(a.iso_2) - order.indexOf(b.iso_2))
        setCountries(allCountries)
        
        // Nastav aktuálnu krajinu
        const currentCountryCode = getCountryCodeFromPath()
        const current = allCountries.find(c => c.iso_2 === currentCountryCode)
        setCurrentCountry(current || allCountries[0])
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchCountries()
  }, [pathname])

  // Aktualizuj currentCountry pri zmene URL
  useEffect(() => {
    if (countries.length > 0) {
      const currentCountryCode = getCountryCodeFromPath()
      const current = countries.find(c => c.iso_2 === currentCountryCode)
      setCurrentCountry(current || countries[0])
    }
  }, [pathname, countries])

  // Zatvor dropdown keď sa klikne mimo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.region-dropdown')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCountryChange = (country: Country) => {
    setIsOpen(false)
    
    const currentCountryCode = getCountryCodeFromPath()
    if (country.iso_2 === currentCountryCode) {
      return // Už sme na tejto krajine
    }

    // Získaj aktuálnu cestu bez country/locale kódu
    const pathWithoutCountry = pathname.replace(new RegExp(`^/[a-z]{2}(?=/|$)`), '')
    const targetLocale = countryDisplayMap[country.iso_2]?.locale || country.iso_2
    const newPath = `/${targetLocale}${pathWithoutCountry}`
    
    // Použi window.location.href pre hard navigation aby sa zabezpečilo správne prepnutie
    window.location.href = newPath
  }

  if (!currentCountry) {
    return null
  }

  return (
    <div className="relative region-dropdown">
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-sm text-gray-700 transition-colors font-sans gap-x-2 hover:text-gray-900 ${isOpen ? 'text-mahogany underline' : ''}`}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-medium">{currentCountry.display_name}</span>
          <ChevronUp 
            size={14} 
            className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 z-50 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
          <div className="overflow-y-auto max-h-96">
            {countries.map((country) => (
              <button
                key={country.iso_2}
                onClick={() => handleCountryChange(country)}
                className={`flex items-center w-full px-4 py-3 text-sm text-left text-gray-700 transition-colors font-sans border-b border-gray-100 gap-x-3 hover:bg-gray-50 last:border-b-0 ${
                  country.iso_2 === currentCountry.iso_2 ? 'bg-gray-50' : ''
                }`}
              >
                <span className="flex-shrink-0 text-sm">{country.flag}</span>
                <span className="font-medium">{country.display_name}</span>
                {country.iso_2 === currentCountry.iso_2 && (
                  <div className="flex-shrink-0 w-2 h-2 ml-auto bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RegionSwitcher 