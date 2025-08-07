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
    // Používame jednoduché textové kódy namiesto emoji vlajok
    return countryCode.toUpperCase()
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
    
    // Vlastné poradie: SK, CZ, AT, potom ostatné alfabeticky
    const preferredOrder = ['sk', 'cz', 'at']
    
    return countries.sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a.countryCode)
      const bIndex = preferredOrder.indexOf(b.countryCode)
      
      // Ak sú oba v preferovanom zozname, usporiadaj podľa indexu
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // Ak je len jeden v preferovanom zozname, daj ho prvý
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // Ostatné usporiadaj alfabeticky
      return a.name.localeCompare(b.name)
    })
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
        className={`flex items-center text-sm text-gray-700 transition-colors font-sans gap-x-2 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${isOpen ? 'text-mahogany underline' : ''}`}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-medium">{currentCountryCode.toUpperCase()}</span>
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
            {availableCountries.map((country) => (
              <button
                key={country.countryCode}
                onClick={() => handleRegionChange(country.countryCode)}
                disabled={isUpdating || country.countryCode === currentCountryCode}
                className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-700 transition-colors font-sans border-b border-gray-100 gap-x-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed last:border-b-0"
              >
                <span className="flex-shrink-0 text-sm">{getRegionFlag(country.countryCode)}</span>
                <span className="font-medium">{country.name}</span>
                {country.countryCode === currentCountryCode && (
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