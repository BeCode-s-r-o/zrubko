"use client"

import { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/kosik-button"
import {
  Phone,
  Mail,
  User,
  ShoppingCart,
  Facebook,
  Instagram,
  ChevronDown,
  Menu,
} from "lucide-react"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import SearchBar from "@modules/search/components/SearchBar"
import RegionSwitcher from "./prepinanie-regionu"
import HlavneMobilneMenu from "./HlavneMobilneMenu"

type NavClientProps = {
  regions: StoreRegion[]
  categories: HttpTypes.StoreProductCategory[]
  currentRegion: StoreRegion
}

// Mobilný komponent pre navigáciu - removed for simplicity

export default function NavClient({ regions, categories, currentRegion }: NavClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Iba click handling - žiadne hover
  const handleClick = (dropdownId: string) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdownId)
    }
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Zatvor dropdown ak klikneme mimo neho
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky inset-x-0 top-0 z-50 group transition-all duration-300 ease-in-out ${
      isScrolled ? 'border-b border-gray-200 shadow-lg backdrop-blur-sm bg-white/95' : 'bg-white'
    }`}>
      {/* TOPBAR – static pages */}
      <div className="w-full py-2 text-xs text-white lg:text-sm bg-primary">
        <div className="flex items-center justify-center w-full gap-4 px-4 mx-auto lg:justify-between max-w-8xl">
          {/* Static pages navigation */}
          <div className="items-center hidden gap-6 font-sans whitespace-nowrap lg:flex">
           
            <LocalizedClientLink href="/o-nas" className="transition-colors hover:text-gray-300">O nás</LocalizedClientLink>
            <LocalizedClientLink href="/projekty" className="transition-colors hover:text-gray-300">Realizácie</LocalizedClientLink>
            <LocalizedClientLink href="/sluzby" className="transition-colors hover:text-gray-300">Doprava a Služby</LocalizedClientLink>
            <LocalizedClientLink href="/spolupraca" className="transition-colors hover:text-gray-300">Spolupráca</LocalizedClientLink>
            <LocalizedClientLink href="/blog" className="transition-colors hover:text-gray-300">Blog</LocalizedClientLink>
            <LocalizedClientLink href="/kontakt" className="transition-colors hover:text-gray-300">Kontakt</LocalizedClientLink>
          </div>

          {/* Searchbar in the center (desktop) */}
          <div className="justify-center flex-1 hidden lg:flex">
            <div className="relative w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          {/* Contact + socials - Hide some elements on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs lg:gap-4 lg:text-sm shrink-0">
            <a href="mailto:info@zrubko.sk" className="items-center hidden gap-1 transition-colors sm:flex hover:text-gray-300">
              <Mail size={14} /> <span className="hidden md:inline">info@zrubko.sk</span>
            </a>
            <a href="tel:+421 911 869 777" className="flex items-center gap-1 transition-colors hover:text-gray-300">
              <Phone size={14} /> <span className="hidden sm:inline">+421 911 869 777</span>
            </a>

          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative mx-auto bg-white border-b border-gray-100 shadow-sm min-h-20">
        <div className="mx-auto max-w-8xl">
          <nav className="relative flex items-center justify-between w-full px-2 xl:px-6 min-h-20 text-small-regular text-ebony">
            {/* Mobile hamburger menu - Show when logo is centered */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 transition-colors text-ebony hover:text-mahogany"
                aria-label="Otvoriť menu"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center justify-center flex-1 gap-6 lg:gap-8 xl:justify-start">
            {/* Logo - Mobile/tablet center, desktop left */}
            <LocalizedClientLink
              href="/"
              className="transition-all duration-300 lg:ml-0 lg:mr-0"
            >
              <div
                className="relative w-[110px] h-[44px] md:w-[135px] md:h-[54px] xl:w-[160px] xl:h-[64px] ml-auto mr-auto lg:ml-0 lg:mr-0 overflow-hidden rounded-md"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <Image
                  src="/domov/brown_black_logo_zrubko.png"
                  alt="Zrubko.sk"
                  fill
                  className={`object-contain transition-opacity duration-500 ease-in-out ${isLogoHovered ? "opacity-0" : "opacity-100"}`}
                  priority
                />
                <Image
                  src="/domov/black_black_logo_hover.png"
                  alt="Zrubko.sk Hover"
                  fill
                  className={`object-contain transition-opacity duration-500 ease-in-out ${isLogoHovered ? "opacity-100" : "opacity-0"}`}
                  priority
                />
              </div>
            </LocalizedClientLink>

            {/* E-shop navigation s pevnými kategóriami - TABLET & DESKTOP */}
            <div className="items-center justify-center flex-1 hidden md:flex gap-x-4 lg:gap-x-6">
              
              {/* 1. Obklady */}
              <div className="relative dropdown-container">
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer text-ebony hover:text-mahogany ${activeDropdown === 'obklady' ? 'text-mahogany underline' : ''}`}
                  onClick={() => handleClick('obklady')}
                >
                  Drevené Obklady
                  <ChevronDown className="w-3 h-3 ml-1" />
                </span>
                
                {activeDropdown === 'obklady' && (
                  <div 
                    className="absolute z-50 mt-4 transform -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg w-[500px] left-1/2 top-full"
                  >
                      <div className="flex">
                        {/* Ľavá strana - kategórie */}
                        <div className="flex flex-col flex-1 py-6 space-y-2">
                          <LocalizedClientLink 
                            href="/categories/tatransky-profil"
                            className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                          >
                            Tatranský profil
                          </LocalizedClientLink>
                          
                          <LocalizedClientLink 
                            href="/categories/tatransky-profil-soft"
                            className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                          >
                            Tatranský profil soft
                          </LocalizedClientLink>

                          <LocalizedClientLink 
                            href="/categories/drevene-obklady-termodrevo"
                            className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                          >
                            Drevené obklady Termodrevo
                          </LocalizedClientLink>
                        </div>
                        
                        {/* Pravá strana - obrázok na celú výšku */}
                        <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg">
                          <Image
                            src="/shou-sugi-ban-1.jpg"
                            alt="Drevené obklady"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                )}
              </div>

              {/* 2. Podlahy */}
              <div className="relative dropdown-container">
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer text-ebony hover:text-mahogany ${activeDropdown === 'podlahy' ? 'text-mahogany underline' : ''}`}
                  onClick={() => handleClick('podlahy')}
                >
                   Drevené Podlahy
                  <ChevronDown className="w-3 h-3 ml-1" />
                </span>
                
                {activeDropdown === 'podlahy' && (
                  <div 
                    className="absolute z-50 mt-4 transform -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg w-[500px] left-1/2 top-full"
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-2">
                        <LocalizedClientLink 
                          href="/categories/drevene-podlahy"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          Drevené podlahy
                        </LocalizedClientLink>
                        
                        <LocalizedClientLink 
                          href="/categories/drevene-podlahy-termodrevo"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          Drevené podlahy Termodrevo
                        </LocalizedClientLink>
                      </div>
                      
                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg">
                        <Image
                          src="/drevo.jpeg"
                          alt="Drevené podlahy"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Exteriér */}
              <div className="relative dropdown-container">
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer text-ebony hover:text-mahogany ${activeDropdown === 'exterior' ? 'text-mahogany underline' : ''}`}
                  onClick={() => handleClick('exterior')}
                >
                  Exteriér a Interiér
                  <ChevronDown className="w-3 h-3 ml-1" />
                </span>
                
                {activeDropdown === 'exterior' && (
                  <div 
                    className="absolute z-50 mt-4 transform -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg w-[500px] left-1/2 top-full"
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-2">
                        <LocalizedClientLink 
                          href="/categories/terasove-dosky"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          Terásové dosky
                        </LocalizedClientLink>
                        
                        <LocalizedClientLink 
                          href="/categories/drevo-do-sauny"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          Drevo do sauny
                        </LocalizedClientLink>
                      </div>
                      
                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg">
                        <Image
                          src="/chata.jpg"
                          alt="Exteriér a Interiér"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Konštrukčné drevo */}
              <div className="relative dropdown-container">
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer text-ebony hover:text-mahogany ${activeDropdown === 'konstrukcne-drevo' ? 'text-mahogany underline' : ''}`}
                  onClick={() => handleClick('konstrukcne-drevo')}
                >
                  Konštrukčné drevo
                  <ChevronDown className="w-3 h-3 ml-1" />
                </span>
                
                {activeDropdown === 'konstrukcne-drevo' && (
                  <div 
                    className="absolute z-50 mt-4 transform -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg w-[500px] left-1/2 top-full"
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-2">
                        <LocalizedClientLink 
                          href="/categories/drevene-hranoldy-a-listy"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          Drevené hranoly a lišty
                        </LocalizedClientLink>
                        
                        <LocalizedClientLink 
                          href="/categories/kvh-hranoly"
                          className="block px-6 py-4 font-sans text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-50 hover:underline"
                        >
                          KVH hranoly
                        </LocalizedClientLink>
                      </div>
                      
                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg">
                        <Image
                          src="/lightwoodinteriordiningroom26041710904800x533_1.jpg"
                          alt="Konštrukčné drevo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
          <div className="flex items-center gap-3">
                        {/* Region Switcher - Hidden on mobile */}
            <div className="hidden md:block">
              <RegionSwitcher regions={regions} currentRegion={currentRegion} />
            </div>

            {/* Account - Hidden on mobile */}
            <LocalizedClientLink
              href="/prihlasit-sa"
              className="items-center hidden gap-2 mx-2 transition-all duration-200 rounded-lg md:flex text-ebony border-gold hover:bg-gold-light hover:border-ebony hover:text-ebony-dark"
              aria-label="Prihlásiť sa"
            >
              <User size={20} />
            </LocalizedClientLink>
            
            {/* Cart - Always visible */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center gap-2 mx-2 text-white transition-all duration-200 transform rounded-lg shadow-md bg-gradient-to-r from-mahogany to-mahogany-dark hover:from-mahogany-dark hover:to-mahogany hover:shadow-lg hover:scale-105"
                >
                  <ShoppingCart size={20} />
                  <span className="font-medium">(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
        </div>

        {/* Mobilné menu */}
        <HlavneMobilneMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
          regions={regions}
          currentRegion={currentRegion}
        />

        {/* SECOND NAV hidden since content moved to header */}

      </header>
    </div>
  )
}

