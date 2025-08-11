"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronRight, User } from "lucide-react"
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
    { href: '/o-nas', title: 'O nás' },
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
        className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Panel - Slide from left, responsive width */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm transition-transform transform bg-white shadow-xl md:max-w-md lg:max-w-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center relative p-4 border-b border-gray-200 bg-primary">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button
                onClick={onClose}
                className="p-2 text-white transition-colors hover:text-gray-300"
                aria-label="Zavrieť menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mx-auto relative w-[120px] h-[48px]">
              <Image
                src="/domov/brown_black_logo_zrubko.png"
                alt="Zrubko.sk"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Product Categories Section FIRST */}
            <div className="p-4 border-b border-gray-100">
              <div className="space-y-2">
                {menuSections.map((section) => (
                  <div key={section.key} className="overflow-hidden border border-gray-100 rounded-lg">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="flex items-center justify-between w-full p-3 transition-colors bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 overflow-hidden rounded">
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
                            className="block px-6 py-3 font-sans text-sm text-gray-700 transition-colors border-t border-gray-100 hover:bg-gray-50 hover:text-mahogany"
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

            {/* Static Pages Section SECOND */}
            <div className="p-4">
              <div className="space-y-1">
                {staticPages.map((page) => (
                  <LocalizedClientLink
                    key={page.href}
                    href={page.href}
                    onClick={onClose}
                    className="block px-3 py-2 font-sans text-base transition-colors rounded-lg text-ebony hover:bg-gray-50 hover:text-mahogany"
                  >
                    {page.title}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            {/* Region Switcher */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <h4 className="mb-2 font-sans text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Región
              </h4>
              <RegionSwitcher regions={regions} currentRegion={currentRegion} />
            </div>

            {/* Account Link */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <LocalizedClientLink
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3 p-3 font-sans text-base transition-colors rounded-lg text-ebony hover:bg-gray-100 hover:text-mahogany"
              >
                <User size={20} />
                <span>Môj účet</span>
              </LocalizedClientLink>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <a 
                href="mailto:info@zrubko.sk" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 transition-colors hover:text-mahogany"
              >
                <span>📧</span> info@zrubko.sk
              </a>
              <a 
                href="tel:+421907695363" 
                className="flex items-center gap-2 font-sans text-sm text-gray-600 transition-colors hover:text-mahogany"
              >
                <span>📞</span> +421 907 695 3644
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
