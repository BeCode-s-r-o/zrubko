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
  ChevronRight,
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
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Enhanced dropdown handling with hover support
  const handleClick = (dropdownId: string) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdownId)
    }
  }

  const handleMouseEnter = (dropdownId: string) => {
    // Only use hover on desktop, mobile uses click
    if (window.innerWidth >= 768) {
      setActiveDropdown(dropdownId)
    }
  }

  const handleMouseLeave = (dropdownId: string) => {
    // Only use hover on desktop
    if (window.innerWidth >= 768) {
      // Add delay before closing to prevent accidental closes
      setTimeout(() => {
        // Only close if we're still not hovering over the dropdown
        if (!document.querySelector('.dropdown-container:hover')) {
          setActiveDropdown(null)
        }
      }, 150) // 150ms delay
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

  // Enhanced scroll handling with auto-hide functionality
  useEffect(() => {
    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'
          const scrollDelta = Math.abs(currentScrollY - lastScrollY)

          // Update background change state
          setIsScrolled(currentScrollY > 10)

          // Auto-hide/show logic - only when scrolled past header height
          if (currentScrollY > 100 && scrollDelta > 10) {
            if (scrollDirection === 'down' && !isHeaderHidden) {
              setIsHeaderHidden(true)
            } else if (scrollDirection === 'up' && isHeaderHidden) {
              setIsHeaderHidden(false)
            }
          } else if (currentScrollY <= 100) {
            // Always show header when near top
            setIsHeaderHidden(false)
          }

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeaderHidden])

  return (
    <div className={`sticky inset-x-0 top-0 z-50 group transition-all duration-300 ease-in-out transform ${
      isScrolled ? 'border-b border-gray-200 shadow-lg backdrop-blur-sm bg-white/95' : 'bg-white'
    } ${isHeaderHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      {/* TOPBAR – static pages */}
      <div className="w-full py-3 text-xs text-white lg:text-sm bg-gradient-to-r from-primary to-primary-dark shadow-md">
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
      <header className="relative mx-auto bg-white border-b border-gray-100 shadow-lg min-h-20">
        <div className="mx-auto max-w-8xl">
          <nav className="relative flex items-center justify-between w-full px-2 xl:px-6 min-h-20 text-small-regular text-gray-800">
            {/* Mobile hamburger menu - Show when logo is centered */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-3 rounded-xl transition-all duration-300 text-white bg-secondary hover:bg-secondary/90 shadow-md hover:shadow-lg transform hover:scale-105"
                aria-label="Otvoriť menu"
              >
                <Menu size={20} />
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
                {/* Invisible hover area above the trigger */}
                <div
                  className="absolute -top-4 left-0 right-0 h-4"
                  onMouseEnter={() => handleMouseEnter('obklady')}
                />
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer text-ebony hover:text-mahogany hover:bg-gray-50 rounded-lg ${activeDropdown === 'obklady' ? 'text-mahogany bg-gray-50' : ''}`}
                  onClick={() => handleClick('obklady')}
                  onMouseEnter={() => handleMouseEnter('obklady')}
                  onMouseLeave={() => handleMouseLeave('obklady')}
                  role="button"
                  aria-expanded={activeDropdown === 'obklady'}
                  aria-haspopup="true"
                >
                  Drevené Obklady
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${activeDropdown === 'obklady' ? 'rotate-180' : ''}`} />
                </span>

                {activeDropdown === 'obklady' && (
                  <div
                    className="absolute z-50 mt-2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-[520px] left-1/2 top-full overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                    onMouseEnter={() => handleMouseEnter('obklady')}
                    onMouseLeave={() => handleMouseLeave('obklady')}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#d1d5db #f9fafb'
                    }}
                  >
                      <div className="flex">
                        {/* Ľavá strana - kategórie */}
                        <div className="flex flex-col flex-1 py-6 space-y-1">
                          <LocalizedClientLink
                            href="/categories/tatransky-profil"
                            className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="group-hover:underline decoration-2 underline-offset-2">Tatranský profil</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                          </LocalizedClientLink>

                          <LocalizedClientLink
                            href="/categories/tatransky-profil-soft"
                            className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="group-hover:underline decoration-2 underline-offset-2">Tatranský profil soft</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                          </LocalizedClientLink>

                          <LocalizedClientLink
                            href="/categories/drevene-obklady-termodrevo"
                            className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="group-hover:underline decoration-2 underline-offset-2">Drevené obklady Termodrevo</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                          </LocalizedClientLink>
                        </div>
                        
                        {/* Pravá strana - obrázok na celú výšku */}
                        <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src="/shou-sugi-ban-1.jpg"
                            alt="Drevené obklady"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                )}
              </div>

              {/* 2. Podlahy */}
              <div className="relative dropdown-container">
                {/* Invisible hover area above the trigger */}
                <div
                  className="absolute -top-4 left-0 right-0 h-4"
                  onMouseEnter={() => handleMouseEnter('podlahy')}
                />
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer text-ebony hover:text-mahogany hover:bg-gray-50 rounded-lg ${activeDropdown === 'podlahy' ? 'text-mahogany bg-gray-50' : ''}`}
                  onClick={() => handleClick('podlahy')}
                  onMouseEnter={() => handleMouseEnter('podlahy')}
                  onMouseLeave={() => handleMouseLeave('podlahy')}
                  role="button"
                  aria-expanded={activeDropdown === 'podlahy'}
                  aria-haspopup="true"
                >
                   Drevené Podlahy
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${activeDropdown === 'podlahy' ? 'rotate-180' : ''}`} />
                </span>

                {activeDropdown === 'podlahy' && (
                  <div
                    className="absolute z-50 mt-2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-[520px] left-1/2 top-full overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                    onMouseEnter={() => handleMouseEnter('podlahy')}
                    onMouseLeave={() => handleMouseLeave('podlahy')}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#d1d5db #f9fafb'
                    }}
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-1">
                        <LocalizedClientLink
                          href="/categories/drevene-podlahy"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">Drevené podlahy</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>

                        <LocalizedClientLink
                          href="/categories/drevene-podlahy-termodrevo"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">Drevené podlahy Termodrevo</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>
                      </div>

                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src="/drevo.jpeg"
                          alt="Drevené podlahy"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Exteriér */}
              <div className="relative dropdown-container">
                {/* Invisible hover area above the trigger */}
                <div
                  className="absolute -top-4 left-0 right-0 h-4"
                  onMouseEnter={() => handleMouseEnter('exterior')}
                />
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer text-ebony hover:text-mahogany hover:bg-gray-50 rounded-lg ${activeDropdown === 'exterior' ? 'text-mahogany bg-gray-50' : ''}`}
                  onClick={() => handleClick('exterior')}
                  onMouseEnter={() => handleMouseEnter('exterior')}
                  onMouseLeave={() => handleMouseLeave('exterior')}
                  role="button"
                  aria-expanded={activeDropdown === 'exterior'}
                  aria-haspopup="true"
                >
                  Exteriér a Interiér
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${activeDropdown === 'exterior' ? 'rotate-180' : ''}`} />
                </span>

                {activeDropdown === 'exterior' && (
                  <div
                    className="absolute z-50 mt-2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-[520px] left-1/2 top-full overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                    onMouseEnter={() => handleMouseEnter('exterior')}
                    onMouseLeave={() => handleMouseLeave('exterior')}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#d1d5db #f9fafb'
                    }}
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-1">
                        <LocalizedClientLink
                          href="/categories/terasove-dosky"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">Terásové dosky</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>

                        <LocalizedClientLink
                          href="/categories/drevo-do-sauny"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">Drevo do sauny</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>
                      </div>

                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src="/chata.jpg"
                          alt="Exteriér a Interiér"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Konštrukčné drevo */}
              <div className="relative dropdown-container">
                {/* Invisible hover area above the trigger */}
                <div
                  className="absolute -top-4 left-0 right-0 h-4"
                  onMouseEnter={() => handleMouseEnter('konstrukcne-drevo')}
                />
                <span
                  className={`flex items-center px-2 md:px-3 py-2 font-sans text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer text-ebony hover:text-mahogany hover:bg-gray-50 rounded-lg ${activeDropdown === 'konstrukcne-drevo' ? 'text-mahogany bg-gray-50' : ''}`}
                  onClick={() => handleClick('konstrukcne-drevo')}
                  onMouseEnter={() => handleMouseEnter('konstrukcne-drevo')}
                  onMouseLeave={() => handleMouseLeave('konstrukcne-drevo')}
                  role="button"
                  aria-expanded={activeDropdown === 'konstrukcne-drevo'}
                  aria-haspopup="true"
                >
                  Konštrukčné drevo
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${activeDropdown === 'konstrukcne-drevo' ? 'rotate-180' : ''}`} />
                </span>

                {activeDropdown === 'konstrukcne-drevo' && (
                  <div
                    className="absolute z-50 mt-2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-[520px] left-1/2 top-full overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                    onMouseEnter={() => handleMouseEnter('konstrukcne-drevo')}
                    onMouseLeave={() => handleMouseLeave('konstrukcne-drevo')}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#d1d5db #f9fafb'
                    }}
                  >
                    <div className="flex">
                      {/* Ľavá strana - kategórie */}
                      <div className="flex flex-col flex-1 py-6 space-y-1">
                        <LocalizedClientLink
                          href="/categories/drevene-hranoldy-a-listy"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">Drevené hranoly a lišty</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>

                        <LocalizedClientLink
                          href="/categories/kvh-hranoly"
                          className="group flex items-center px-6 py-4 font-sans text-base text-gray-700 transition-all duration-300 rounded-lg hover:text-mahogany hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="group-hover:underline decoration-2 underline-offset-2">KVH hranoly</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mahogany" />
                        </LocalizedClientLink>
                      </div>

                      {/* Pravá strana - obrázok na celú výšku */}
                      <div className="relative self-stretch w-48 overflow-hidden rounded-r-lg group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src="/lightwoodinteriordiningroom26041710904800x533_1.jpg"
                          alt="Konštrukčné drevo"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              className="items-center hidden gap-2 mx-2 px-3 py-2 transition-all duration-300 rounded-xl md:flex text-white bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
              aria-label="Prihlásiť sa"
            >
              <User size={18} className="text-primary-foreground" />
              <span className="text-sm">Prihlásiť sa</span>
            </LocalizedClientLink>
            
            {/* Cart - Always visible */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center gap-2 mx-2 px-3 py-2 text-white rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                >
                  <ShoppingCart size={20} className="text-secondary-foreground" />
                  <span className="font-semibold">(0)</span>
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

