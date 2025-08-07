"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronRight, User } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
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

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

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
    { href: '/about', title: 'O nás' },
    { href: '/projekty', title: 'Realizácie' },
    { href: '/sluzby', title: 'Doprava a Služby' },
    { href: '/spolupraca', title: 'Spolupráca' },
    { href: '/blog', title: 'Blog' },
    { href: '/kontakt', title: 'Kontakt' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Panel - Slide from left, responsive width */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary">
            <div className="relative w-[120px] h-[48px]">
              <Image
                src="/domov/brown_black_logo_zrubko.png"
                alt="Zrubko.sk"
                fill
                className="object-contain"
                priority
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white transition-colors hover:text-gray-300"
              aria-label="Zavrieť menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Static Pages Section */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="mb-3 font-sans text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Navigácia
              </h3>
              <div className="space-y-1">
                {staticPages.map((page) => (
                  <LocalizedClientLink
                    key={page.href}
                    href={page.href}
                    onClick={onClose}
                    className="block px-3 py-2 font-sans text-base text-ebony transition-colors rounded-lg hover:bg-gray-50 hover:text-mahogany"
                  >
                    {page.title}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>

            {/* Product Categories Section */}
            <div className="p-4">
              <h3 className="mb-3 font-sans text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Produkty
              </h3>
              <div className="space-y-2">
                {menuSections.map((section) => (
                  <div key={section.key} className="border border-gray-100 rounded-lg overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded overflow-hidden">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-sans text-sm font-medium text-ebony">
                          {section.title}
                        </span>
                      </div>
                      {expandedSections[section.key] ? (
                        <ChevronDown size={18} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-500" />
                      )}
                    </button>

                    {/* Section Links */}
                    {expandedSections[section.key] && (
                      <div className="bg-white">
                        {section.links.map((link, index) => (
                          <LocalizedClientLink
                            key={index}
                            href={link.href}
                            onClick={onClose}
                            className="block px-6 py-3 font-sans text-sm text-gray-700 border-t border-gray-100 transition-colors hover:bg-gray-50 hover:text-mahogany"
                          >
                            {link.title}
                          </LocalizedClientLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            {/* Region Switcher */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="mb-2 font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Región
              </h4>
              <RegionSwitcher regions={regions} currentRegion={currentRegion} />
            </div>

            {/* Account Link */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <LocalizedClientLink
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3 p-3 font-sans text-base text-ebony transition-colors rounded-lg hover:bg-gray-100 hover:text-mahogany"
              >
                <User size={20} />
                <span>Môj účet</span>
              </LocalizedClientLink>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <a 
                href="mailto:info@zrubko.sk" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 hover:text-mahogany transition-colors"
              >
                <span>📧</span> info@zrubko.sk
              </a>
              <a 
                href="tel:+421907695363" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 hover:text-mahogany transition-colors"
              >
                <span>📞</span> +421 907 695 363
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
