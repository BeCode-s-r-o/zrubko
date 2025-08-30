"use client"

import { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"

type CheckoutNavProps = {
  countryCode?: string
}

export default function CheckoutNav({ countryCode }: CheckoutNavProps) {
  const [regions, setRegions] = useState<StoreRegion[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load regions asynchronously for better performance
    const loadRegions = async () => {
      try {
        const regionsData = await listRegions()
        setRegions(regionsData || [])
      } catch (error) {
        console.error("Failed to load regions:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadRegions()
  }, [])

  const currentRegion = regions.find(region =>
    region.countries?.some(country =>
      country.iso_2?.toLowerCase() === countryCode?.toLowerCase()
    )
  ) || regions[0]

  return (
    <div className={`sticky inset-x-0 top-0 z-50 group transition-all duration-300 ease-in-out ${
      isLoaded ? 'border-b border-gray-200 shadow-lg backdrop-blur-sm bg-white/95' : 'bg-white'
    }`}>
      {/* TOPBAR – simplified for checkout */}
      <div className="w-full py-2 text-xs text-white lg:text-sm bg-primary">
        <div className="flex items-center justify-center w-full gap-4 px-4 mx-auto lg:justify-between max-w-8xl">
          {/* Minimal static pages navigation */}
          <div className="items-center hidden gap-6 font-sans whitespace-nowrap lg:flex">
            <LocalizedClientLink href="/o-nas" className="transition-colors hover:text-gray-300">O nás</LocalizedClientLink>
            <LocalizedClientLink href="/kontakt" className="transition-colors hover:text-gray-300">Kontakt</LocalizedClientLink>
          </div>

          {/* Contact info - simplified */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs lg:gap-4 lg:text-sm shrink-0">
            <a href="tel:+421 911 869 777" className="flex items-center gap-1 transition-colors hover:text-gray-300">
              <span>+421 911 869 777</span>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER - simplified */}
      <header className="relative mx-auto bg-white border-b border-gray-100 shadow-sm min-h-20">
        <div className="mx-auto max-w-8xl">
          <nav className="relative flex items-center justify-between w-full px-2 xl:px-6 min-h-20 text-small-regular text-ebony">
            {/* Logo - centered */}
            <div className="flex items-center justify-center flex-1 gap-6 lg:gap-8">
              <LocalizedClientLink href="/">
                <div className="relative w-[110px] h-[44px] md:w-[135px] md:h-[54px] xl:w-[160px] xl:h-[64px] overflow-hidden rounded-md">
                  <Image
                    src="/domov/brown_black_logo_zrubko.png"
                    alt="Zrubko.sk"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </LocalizedClientLink>
            </div>

            {/* Minimal right side - just account link */}
            <div className="hidden md:flex items-center gap-3">
              <LocalizedClientLink
                href="/prihlasit-sa"
                className="items-center gap-2 mx-2 transition-all duration-200 rounded-lg text-ebony border-gold hover:bg-gold-light hover:border-ebony hover:text-ebony-dark px-3 py-2 text-sm"
                aria-label="Prihlásiť sa"
              >
                Prihlásiť sa
              </LocalizedClientLink>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
