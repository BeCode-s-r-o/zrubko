"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { StoreRegion } from "@medusajs/types"
import { useRouter, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { useRegion } from "@lib/context/region-context"

interface RegionSwitcherProps {
  regions: StoreRegion[]
  currentRegion: StoreRegion
}

const RegionSwitcher = ({ regions, currentRegion }: RegionSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { currentCountryCode, updateRegion: updateRegionContext, isUpdating } = useRegion()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getRegionFlag = (countryCode: string) => {
    const flagMap: { [key: string]: string } = {
      "sk": "🇸🇰",
      "cz": "🇨🇿", 
      "at": "🇦🇹",
      "de": "🇩🇪",
      "hu": "🇭🇺",
      "pl": "🇵🇱"
    }
    return flagMap[countryCode.toLowerCase()] || "🌍"
  }

  const getRegionName = (countryCode: string) => {
    const nameMap: { [key: string]: string } = {
      "sk": "Slovakia",
      "cz": "Czech Republic",
      "at": "Austria", 
      "de": "Germany",
      "hu": "Hungary",
      "pl": "Poland"
    }
    return nameMap[countryCode.toLowerCase()] || countryCode.toUpperCase()
  }

  // Get available country codes from regions
  const getAvailableCountries = () => {
    const countries: Array<{ countryCode: string; region: StoreRegion; name: string }> = []
    
    regions.forEach((region) => {
      region.countries?.forEach((country) => {
        if (country.iso_2) {
          countries.push({
            countryCode: country.iso_2.toLowerCase(),
            region: region,
            name: country.display_name || getRegionName(country.iso_2)
          })
        }
      })
    })
    
    return countries.sort((a, b) => a.name.localeCompare(b.name))
  }

  const handleRegionChange = async (countryCode: string) => {
    if (isUpdating) return // Prevent multiple clicks
    
    setIsOpen(false)
    
    try {
      // Extract the path without the current locale
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      
      console.log('Switching to region:', countryCode, 'with path:', pathWithoutLocale) // Debug log
      
      // Update context immediately for instant UI feedback
      updateRegionContext(countryCode)
      
      // Use Next.js router for client-side navigation
      const newPath = `/${countryCode}${pathWithoutLocale}`
      router.push(newPath)
      
      // Update the cart region in the background
      try {
        await updateRegion(countryCode, pathWithoutLocale)
        console.log('Cart region updated successfully')
      } catch (serverError) {
        console.log('Background cart update failed:', serverError)
        // This is not critical - the cart will update when the page loads
      }
      
    } catch (error) {
      console.error('Error in region change:', error)
      // Fallback to direct navigation if router fails
      const newPath = `/${countryCode}${pathname.replace(/^\/[a-z]{2}/, '') || '/'}`
      window.location.href = newPath
    }
  }

  const availableCountries = getAvailableCountries()

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main button with "Shipping to:" label */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="flex items-center gap-x-2 text-sm text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm">Shipping to:</span>
        <div className="flex items-center gap-x-2">
          <span className="text-lg">{getRegionFlag(currentCountryCode)}</span>
          <span className="text-sm font-medium">{getRegionName(currentCountryCode)}</span>
          <ChevronUp 
            size={14} 
            className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="max-h-96 overflow-y-auto">
            {availableCountries.map((country) => (
              <button
                key={country.countryCode}
                onClick={() => handleRegionChange(country.countryCode)}
                disabled={isUpdating || country.countryCode === currentCountryCode}
                className="flex items-center gap-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed border-b border-gray-100 last:border-b-0"
              >
                <span className="text-lg flex-shrink-0">{getRegionFlag(country.countryCode)}</span>
                <span className="font-medium">{country.name}</span>
                {country.countryCode === currentCountryCode && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
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