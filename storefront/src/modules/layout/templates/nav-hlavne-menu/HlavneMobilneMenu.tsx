"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronRight, User, Search, ShoppingBag, Home, Phone, Mail, Grid3X3, Menu as MenuIcon } from "lucide-react"
import LocalizedClientLink from "../../../common/components/localized-client-link"
import RegionSwitcher from "./prepinanie-regionu"
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"

type MobilneMenuProps = {
  isOpen: boolean
  onClose: () => void
  regions: StoreRegion[]
  currentRegion: StoreRegion
}

type ExpandedSections = {
  [key: string]: boolean
}

export default function HlavneMobilneMenu({ isOpen, onClose, regions, currentRegion }: MobilneMenuProps) {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({})
  const [activeTab, setActiveTab] = useState<'categories' | 'search' | 'account'>('categories')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  // Touch handlers for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isRightSwipe = distance < -75 // Increased sensitivity for easier closing

    // Swipe right to close (common mobile pattern)
    if (isRightSwipe) {
      onClose()
    }
  }

  // Prevent background scroll and keyboard navigation when menu opens
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      // Prevent background scroll
      document.body.style.overflow = 'hidden'
      // Add keyboard listener
      document.addEventListener('keydown', handleKeyDown)
    } else {
      // Restore scroll when menu closes
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const menuSections = [
    {
      key: 'obklady',
      title: 'Drevené Obklady',
      image: '/shou-sugi-ban-1.jpg',
      links: [
        { href: '/categories/tatransky-profil', title: 'Tatranský profil' },
        { href: '/categories/tatransky-profil-soft', title: 'Tatranský profil soft' },
        { href: '/categories/drevene-obklady-termodrevo', title: 'Drevené obklady Termodrevo' }
      ]
    },
    {
      key: 'podlahy',
      title: 'Drevené Podlahy',
      image: '/drevo.jpeg',
      links: [
        { href: '/categories/drevene-podlahy', title: 'Drevené podlahy' },
        { href: '/categories/drevene-podlahy-termodrevo', title: 'Drevené podlahy Termodrevo' }
      ]
    },
    {
      key: 'exterior',
      title: 'Exteriér a Interiér',
      image: '/chata.jpg',
      links: [
        { href: '/categories/terasove-dosky', title: 'Terásové dosky' },
        { href: '/categories/drevo-do-sauny', title: 'Drevo do sauny' }
      ]
    },
    {
      key: 'konstrukcne',
      title: 'Konštrukčné drevo',
      image: '/lightwoodinteriordiningroom26041710904800x533_1.jpg',
      links: [
        { href: '/categories/drevene-hranoly-a-listy', title: 'Drevené hranoly a lišty' },
        { href: '/categories/kvh-hranoly', title: 'KVH hranoly' }
      ]
    }
  ]

  const staticPages = [
    { href: '/', title: 'Domov' },
    { href: '/o-nas', title: 'O nás' },
    { href: '/projekty', title: 'Realizácie' },
    { href: '/sluzby', title: 'Doprava a Služby' },
    { href: '/spolupraca', title: 'Spolupráca' },
    { href: '/blog', title: 'Blog' },
    { href: '/kontakt', title: 'Kontakt' }
  ]

  const additionalLinks = [
    { href: '/produkty', title: 'Všetky produkty', icon: '🛍️' },
    { href: '/search', title: 'Vyhľadávanie', icon: '🔍' },
    { href: '/kosik', title: 'Košík', icon: '🛒' },
    { href: '/prihlasit-sa', title: 'Prihlásiť sa', icon: '👤' },
    { href: '/registrovat-sa', title: 'Registrovať sa', icon: '📝' },
    { href: '/cookies', title: 'Cookies', icon: '🍪' },
    { href: '/privacy', title: 'Ochrana súkromia', icon: '🔒' },
    { href: '/terms', title: 'Obchodné podmienky', icon: '📋' }
  ]

  const socialLinks = [
    { href: 'https://facebook.com', title: 'Facebook', icon: '📘' },
    { href: 'https://instagram.com', title: 'Instagram', icon: '📷' },
    { href: 'https://linkedin.com', title: 'LinkedIn', icon: '💼' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 transition-all duration-300 z-[105] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modern Menu Panel */}
      <div
        className={`fixed inset-0 left-0 w-full max-w-sm bg-white shadow-2xl z-[110] transform transition-all duration-300 ease-out h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full">

          {/* Modern Header with Logo and Close */}
          <div className="relative flex items-center justify-center p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="relative w-[100px] h-[40px]">
                <Image
                  src="/domov/brown_black_logo_zrubko.png"
                  alt="Zrubko.sk"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Zavrieť menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: 'categories', label: 'ESHOP' },
              { id: 'account', label: 'Menu' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center py-4 px-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-gray-50 h-full">

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="p-6">
                <div className="space-y-4">
                  {menuSections.map((section) => (
                    <div
                      key={section.key}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <LocalizedClientLink
                        href={section.links[0]?.href || '#'}
                        onClick={onClose}
                        className="block"
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={section.image}
                              alt={section.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {section.links.length} produkt{section.links.length > 1 ? 'ov' : section.links.length === 0 ? '' : 'a'}
                            </p>
                          </div>
                          <ChevronRight size={20} className="text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </LocalizedClientLink>

                      {expandedSections[section.key] && section.links.length > 1 && (
                        <div className="border-t border-gray-100 bg-gray-50">
                          {section.links.slice(1).map((link, index) => (
                            <LocalizedClientLink
                              key={index}
                              href={link.href}
                              onClick={onClose}
                              className="block px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-white transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              {link.title}
                            </LocalizedClientLink>
                          ))}
                        </div>
                      )}

                      {section.links.length > 1 && (
                        <button
                          onClick={() => toggleSection(section.key)}
                          className="w-full px-4 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                        >
                          {expandedSections[section.key] ? 'Menej' : 'Viac'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Vyhľadávanie v ESHOP */}
                <div className="mt-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Čo hľadáte..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="p-6">
                <div className="space-y-6">
                  {/* Custom Search Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Čo hľadáte..."
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base shadow-sm"
                    />
                  </div>

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-4">Populárne vyhľadávania</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Drevené obklady', 'Podlahy', 'Terásové dosky', 'Sauna'].map((term) => (
                        <button
                          key={term}
                          className="px-4 py-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-all duration-200 border border-gray-200"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Tab */}
            {activeTab === 'account' && (
              <div className="p-6">
                <div className="space-y-6">
                  {/* Hlavné stránky */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Hlavné stránky</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {staticPages.slice(0, 6).map((page) => (
                        <LocalizedClientLink
                          key={page.href}
                          href={page.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-4 bg-white hover:bg-primary hover:text-white rounded-xl transition-all duration-200 group border border-gray-200"
                        >
                          <Home size={18} className="text-primary group-hover:text-white" />
                          <span className="text-sm font-medium">{page.title}</span>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>

                  {/* Login/Register */}
                  <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Prihláste sa</h3>
                    <p className="text-sm opacity-90 mb-4">Pre prístup k vašim objednávkam a preferenciám</p>
                    <LocalizedClientLink
                      href="/prihlasit-sa"
                      onClick={onClose}
                      className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Prihlásiť sa
                    </LocalizedClientLink>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <LocalizedClientLink
                      href="/kosik"
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 bg-white hover:bg-primary hover:text-white rounded-xl transition-all duration-200 group border border-gray-200"
                    >
                      <ShoppingBag size={20} className="text-primary group-hover:text-white" />
                      <div>
                        <div className="font-semibold">Košík</div>
                        <div className="text-sm text-gray-500 group-hover:text-white/80">Zobraziť položky</div>
                      </div>
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/produkty"
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 bg-white hover:bg-primary hover:text-white rounded-xl transition-all duration-200 group border border-gray-200"
                    >
                      <Grid3X3 size={20} className="text-primary group-hover:text-white" />
                      <div>
                        <div className="font-semibold">Všetky produkty</div>
                        <div className="text-sm text-gray-500 group-hover:text-white/80">Prehľad ponuky</div>
                      </div>
                    </LocalizedClientLink>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontaktujte nás</h3>
                    <div className="space-y-3">
                      <a
                        href="tel:+421 911 869 777"
                        className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                      >
                        <Phone size={20} />
                        <span>+421 911 869 777</span>
                      </a>
                      <a
                        href="mailto:info@zrubko.sk"
                        className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                      >
                        <Mail size={20} />
                        <span>info@zrubko.sk</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}
