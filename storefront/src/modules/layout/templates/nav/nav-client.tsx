"use client"

import { Suspense, useState, useRef, useEffect } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import {
  Phone,
  Mail,
  Truck,
  MapPin,
  User,
  Search,
  ShoppingCart,
  ChevronDown,
  Home,
  Building,
  TreePine,
  Waves,
  Fence,
  Calculator,
  Star,
  ArrowRight,
  Paintbrush,
  Layers,
  Square,
  Thermometer,
  Building2,
  Triangle,
  Waves as WavesIcon,
  Tent,
  Grid3x3,
  Menu,
  X,
  ChevronRight,
  Package,
  Hammer,
  Ruler,
  Wrench,
  Zap,
  ShoppingBag,
  Facebook,
  Instagram,
} from "lucide-react"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import SearchBar from "@modules/search/components/SearchBar"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"
import ModernNavbar from "@modules/layout/components/modern-navbar"
import MobileCategoryMenu from "@modules/layout/components/mobile-category-menu"

type NavClientProps = {
  regions: StoreRegion[]
  categories: HttpTypes.StoreProductCategory[]
}

// Helper functions to get categories from backend data
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: any } = {
    "Obklad stien": Paintbrush,
    "Podbitie stropov": Layers,
    "Podlaha": Square,
    "Sauna": Thermometer,
    "Fasáda": Building2,
    "Podbitie strechy": Triangle,
    "Terasa": WavesIcon,
    "Prístrešok": Tent,
    "Plot": Grid3x3,
  }
  return iconMap[categoryName] || Package
}

const getUsageCategories = (categories: HttpTypes.StoreProductCategory[]) => {
  const interiorCategory = categories.find(cat => cat.name === "Interiér")
  const exteriorCategory = categories.find(cat => cat.name === "Exteriér")

  // If main categories don't exist, create fallback using existing categories
  let interiorSubcategories = interiorCategory?.category_children || []
  let exteriorSubcategories = exteriorCategory?.category_children || []

  // Fallback: if no Interiér/Exteriér categories exist, use existing categories as subcategories
  if (!interiorCategory && !exteriorCategory) {
    
    // Interior-like categories
    const interiorCategoryNames = ["Obklad stien", "Podbitie stropov", "Podlaha", "Sauna", "Podlahové dosky"]
    interiorSubcategories = categories.filter(cat => 
      interiorCategoryNames.some(name => cat.name.includes(name) || name.includes(cat.name))
    )
    
    // Exterior-like categories  
    const exteriorCategoryNames = ["Fasáda", "Podbitie strechy", "Terasa", "Prístrešok", "Plot", "Fasádne dosky", "Terásové dosky", "Tatranský profil"]
    exteriorSubcategories = categories.filter(cat => 
      exteriorCategoryNames.some(name => cat.name.includes(name) || name.includes(cat.name))
    )
  }

  return {
    interior: {
      category: interiorCategory,
      subcategories: interiorSubcategories
    },
    exterior: {
      category: exteriorCategory,
      subcategories: exteriorSubcategories
    }
  }
}

// Mobilný komponent pre navigáciu
const MobileSideMenu = ({ regions, categories }: { regions: StoreRegion[], categories: HttpTypes.StoreProductCategory[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<'products' | 'usage' | null>(null)
  const [expandedUsage, setExpandedUsage] = useState<'interior' | 'exterior' | null>(null)
  const [expandedProducts, setExpandedProducts] = useState<'wood' | 'construction' | null>(null)
  
  // Get dynamic usage categories
  const usageCategories = getUsageCategories(categories)

  const toggleMobile = (section: 'products' | 'usage') => {
    setExpandedMobile(expandedMobile === section ? null : section)
    if (section !== 'usage') {
      setExpandedUsage(null)
    }
    if (section !== 'products') {
      setExpandedProducts(null)
    }
  }

  const toggleUsage = (section: 'interior' | 'exterior') => {
    setExpandedUsage(expandedUsage === section ? null : section)
  }

  const toggleProducts = (section: 'wood' | 'construction') => {
    setExpandedProducts(expandedProducts === section ? null : section)
  }

  const closeMobile = () => {
    setIsOpen(false)
    setExpandedMobile(null)
    setExpandedUsage(null)
    setExpandedProducts(null)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center w-12 h-12 rounded-lg border transition-all duration-200 text-ebony lg:hidden hover:bg-gold-light border-gold hover:border-ebony"
        aria-label="Otvoriť menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobile} />
          
          {/* Mobile menu panel */}
          <div className="overflow-y-auto fixed top-0 left-0 w-full max-w-sm h-full bg-white shadow-xl">
            <div className="p-4">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-gold">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ebony to-ebony-light">Menu</h2>
                <button 
                  onClick={closeMobile} 
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-gold-light text-ebony hover:text-ebony-dark"
                  aria-label="Zavrieť menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-3">
                {/* Produkty */}
                <div className="overflow-hidden rounded-lg border border-amber-200 shadow-sm">
                  <button
                    onClick={() => toggleMobile('products')}
                    className={`flex items-center justify-between w-full p-4 text-left transition-all duration-200 ${
                      expandedMobile === 'products' 
                        ? 'bg-amber-50 border-amber-300' 
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center w-10 h-10 bg-amber-100 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="font-semibold text-gray-900">Produkty</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${
                        expandedMobile === 'products' ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedMobile === 'products' && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="p-4 space-y-4">
                        {/* Drevené profily a dosky */}
                        <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => toggleProducts('wood')}
                            className="flex justify-between items-center p-3 w-full text-left transition-colors hover:bg-gray-50"
                          >
                            <div className="flex gap-3 items-center">
                              <TreePine className="w-5 h-5 text-amber-600" />
                              <span className="text-sm font-medium text-gray-700">Drevené profily a dosky</span>
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                expandedProducts === 'wood' ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {expandedProducts === 'wood' && (
                            <div className="p-3 space-y-2 bg-gray-50 border-t border-gray-200">
                              <LocalizedClientLink
                                href="/kategorie/tatransky-profil"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-amber-600 hover:bg-amber-50"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-amber-100 rounded-lg">
                                  <TreePine className="w-4 h-4 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Tatranský profil</span>
                                  <p className="text-xs text-gray-500">Na steny a stropy</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/terasove-dosky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-blue-600 hover:bg-blue-50"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-blue-100 rounded-lg">
                                  <Waves className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Terásové dosky</span>
                                  <p className="text-xs text-gray-500">Pre terasy a balkóny</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/fasadne-dosky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-green-600 hover:bg-green-50"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-green-100 rounded-lg">
                                  <Building2 className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Fasádne dosky</span>
                                  <p className="text-sm text-ebony-light">Obklady vonkajších stien</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/podlahove-dosky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-purple-600 hover:bg-purple-50"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-purple-100 rounded-lg">
                                  <Square className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Podlahové dosky</span>
                                  <p className="text-xs text-gray-500">Masívne drevené podlahy</p>
                                </div>
                              </LocalizedClientLink>
                            </div>
                          )}
                        </div>

                        {/* Konštrukčné prvky a doplnky */}
                        <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => toggleProducts('construction')}
                            className="flex justify-between items-center p-3 w-full text-left transition-colors hover:bg-gray-50"
                          >
                            <div className="flex gap-3 items-center">
                              <Hammer className="w-5 h-5 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Konštrukčné prvky</span>
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                expandedProducts === 'construction' ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {expandedProducts === 'construction' && (
                            <div className="p-3 space-y-2 bg-gray-50 border-t border-gray-200">
                              <LocalizedClientLink
                                href="/kategorie/hranoly"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-100"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Package className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Hranoly</span>
                                  <p className="text-xs text-gray-500">Konštrukčné prvky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/plotovky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-100"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Fence className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Plotovky</span>
                                  <p className="text-xs text-gray-500">Plotové dosky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/stlpiky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-100"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Ruler className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Stĺpiky</span>
                                  <p className="text-xs text-gray-500">Plotové stĺpiky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/latky"
                                className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-100"
                                onClick={closeMobile}
                              >
                                <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Wrench className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Latky</span>
                                  <p className="text-xs text-gray-500">Pomocné latky</p>
                                </div>
                              </LocalizedClientLink>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Miesto použitia */}
                <div className="overflow-hidden rounded-lg border border-orange-200 shadow-sm">
                  <button
                    onClick={() => toggleMobile('usage')}
                    className={`flex items-center justify-between w-full p-4 text-left transition-all duration-200 ${
                      expandedMobile === 'usage' 
                        ? 'bg-orange-50 border-orange-300' 
                        : 'bg-white hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center w-10 h-10 bg-orange-100 rounded-lg">
                        <Home className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-gray-900">Miesto použitia</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${
                        expandedMobile === 'usage' ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedMobile === 'usage' && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="p-4 space-y-3">
                        {/* Interiér */}
                        <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => toggleUsage('interior')}
                            className="flex justify-between items-center p-3 w-full text-left transition-colors hover:bg-blue-50"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="flex overflow-hidden justify-center items-center w-16 h-12 bg-blue-100 rounded-lg">
                                {usageCategories.interior.category?.metadata?.image_url ? (
                                  <Image
                                    src={usageCategories.interior.category.metadata.image_url as string}
                                    alt="Interiér"
                                    width={64}
                                    height={48}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <Home className="w-6 h-6 text-blue-600" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-gray-700">Interiér</span>
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                expandedUsage === 'interior' ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {expandedUsage === 'interior' && (
                            <div className="p-3 space-y-2 bg-blue-50 border-t border-blue-200">
                              {usageCategories.interior.subcategories.map((category: HttpTypes.StoreProductCategory) => {
                                const CategoryIcon = getCategoryIcon(category.name)
                                return (
                                  <LocalizedClientLink
                                    key={category.id}
                                    href={`/categories/${category.handle}`}
                                    className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-blue-600 hover:bg-blue-100"
                                    onClick={closeMobile}
                                  >
                                    <div className="flex overflow-hidden justify-center items-center w-16 h-12 bg-blue-100 rounded-lg">
                                      {category.metadata?.image_url ? (
                                        <Image
                                          src={category.metadata.image_url as string}
                                          alt={category.name}
                                          width={64}
                                          height={48}
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        <CategoryIcon className="w-6 h-6 text-blue-600" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <span className="font-medium">{category.name}</span>
                                      <p className="text-xs text-gray-500">{category.description}</p>
                                    </div>
                                  </LocalizedClientLink>
                                )
                              })}
                            </div>
                          )}
                        </div>

                        {/* Exteriér */}
                        <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => toggleUsage('exterior')}
                            className="flex justify-between items-center p-3 w-full text-left transition-colors hover:bg-green-50"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="flex overflow-hidden justify-center items-center w-16 h-12 bg-green-100 rounded-lg">
                                {usageCategories.exterior.category?.metadata?.image_url ? (
                                  <Image
                                    src={usageCategories.exterior.category.metadata.image_url as string}
                                    alt="Exteriér"
                                    width={64}
                                    height={48}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <Building className="w-12 h-12 text-green-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Exteriér</h3>
                                <p className="text-sm text-gray-600">Drevo do vonkajších priestorov</p>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                                {usageCategories.exterior.subcategories.length} kategórií
                              </span>
                              <ChevronDown 
                                className={`w-5 h-5 text-green-600 transition-transform duration-300 ${
                                  expandedUsage === 'exterior' ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </button>
                          
                          {expandedUsage === 'exterior' && (
                            <div className="p-3 space-y-2 bg-green-50 border-t border-green-200">
                              {usageCategories.exterior.subcategories.map((category: HttpTypes.StoreProductCategory) => {
                                const CategoryIcon = getCategoryIcon(category.name)
                                return (
                                  <LocalizedClientLink
                                    key={category.id}
                                    href={`/categories/${category.handle}`}
                                    className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:text-green-600 hover:bg-green-100"
                                    onClick={closeMobile}
                                  >
                                    <div className="flex overflow-hidden justify-center items-center w-16 h-12 bg-green-100 rounded-lg">
                                      {category.metadata?.image_url ? (
                                        <Image
                                          src={category.metadata.image_url as string}
                                          alt={category.name}
                                          width={64}
                                          height={48}
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        <CategoryIcon className="w-6 h-6 text-green-600" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <span className="font-medium">{category.name}</span>
                                      <p className="text-xs text-gray-500">{category.description}</p>
                                    </div>
                                  </LocalizedClientLink>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ostatné linky */}
                <div className="space-y-3">
                  <LocalizedClientLink
                    href="/kalkulacka"
                    className="inline-flex gap-2 items-center px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
                  >
                    <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                    Kalkulačka
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/poradca"
                    className="inline-flex gap-2 items-center px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
                  >
                    <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                    Poradca
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/najpredavanejsie"
                    className="inline-flex gap-2 items-center px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
                  >
                    <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                    Najpredávanejšie
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/kontakt"
                    className="inline-flex gap-2 items-center px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
                  >
                    <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                    Kontakt
                  </LocalizedClientLink>
                </div>

                {/* Pomocné linky */}
                <div className="pt-4 mt-6 space-y-2 border-t border-gray-200">
                  <LocalizedClientLink
                    href="/purchase-advisor"
                    className="flex gap-3 items-center p-3 text-sm text-amber-600 rounded-lg transition-colors hover:bg-amber-50"
                    onClick={closeMobile}
                  >
                    <div className="flex justify-center items-center w-8 h-8 bg-amber-100 rounded-lg">
                      <Zap className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-medium">Poradca nákupu</span>
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/najpredavanejsie"
                    className="flex gap-3 items-center p-3 text-sm text-gray-600 rounded-lg transition-colors hover:bg-gray-50"
                    onClick={closeMobile}
                  >
                    <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-lg">
                      <Star className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="font-medium">Najpredávanejšie</span>
                  </LocalizedClientLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function NavClient({ regions, categories }: NavClientProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<'interior' | 'exterior' | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const usageMenuRef = useRef<HTMLDivElement>(null)
  const productsMenuRef = useRef<HTMLDivElement>(null)
  
  // Get dynamic usage categories
  const usageCategories = getUsageCategories(categories)

  // Miesto použitia – click-away
  useEffect(() => {
    if (!isUsageOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        usageMenuRef.current &&
        !usageMenuRef.current.contains(target) &&
        !(target as HTMLElement).closest("#usage-menu-button")
      ) {
        setIsUsageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUsageOpen]);

  // Produkty – click-away
  useEffect(() => {
    if (!isProductsOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(target) &&
        !(target as HTMLElement).closest("#products-menu-button")
      ) {
        setIsProductsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductsOpen]);

  return (
    <div className="sticky inset-x-0 top-0 z-50 group">
      {/* TOPBAR – static pages */}
      <div className="py-2 w-full text-sm text-white bg-primary">
        <div className="flex gap-4 justify-center items-center px-4 mx-auto w-full lg:justify-between max-w-8xl">
          {/* Static pages navigation */}
          <div className="hidden gap-6 items-center whitespace-nowrap lg:flex">
            <LocalizedClientLink href="/" className="transition-colors hover:text-gray-300">Domov</LocalizedClientLink>
            <LocalizedClientLink href="/about" className="transition-colors hover:text-gray-300">O&nbsp;nás</LocalizedClientLink>
            <LocalizedClientLink href="/vizualizacie" className="transition-colors hover:text-gray-300">Vizualizácie</LocalizedClientLink>
            <LocalizedClientLink href="/projekty" className="transition-colors hover:text-gray-300">Projekty</LocalizedClientLink>
            <LocalizedClientLink href="/sluzby" className="transition-colors hover:text-gray-300">Služby</LocalizedClientLink>
            <LocalizedClientLink href="/spolupraca" className="transition-colors hover:text-gray-300">Spolupráca</LocalizedClientLink>
            <LocalizedClientLink href="/blog" className="transition-colors hover:text-gray-300">Blog</LocalizedClientLink>
            <LocalizedClientLink href="/kontakt" className="transition-colors hover:text-gray-300">Kontakt</LocalizedClientLink>
          </div>

          {/* Searchbar in the center (desktop) */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          {/* Contact + socials */}
          <div className="flex flex-wrap gap-4 justify-center items-center text-xs shrink-0 md:text-sm">
            <a href="mailto:info@zrubko.sk" className="flex gap-1 items-center transition-colors hover:text-gray-300">
              <Mail size={14} /> info@zrubko.sk
            </a>
            <a href="tel:+421907695363" className="flex gap-1 items-center transition-colors hover:text-gray-300">
              <Phone size={14} /> +421&nbsp;907&nbsp;695&nbsp;363
            </a>
            <a href="#" aria-label="Facebook" className="p-1 transition-colors hover:text-gray-300">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="p-1 transition-colors hover:text-gray-300">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative mx-auto bg-white border-b border-gray-100 shadow-sm min-h-20">
        <nav className="flex relative justify-between items-center px-6 py-2 w-full min-h-20 text-small-regular text-ebony">
          <div className="flex items-center lg:hidden">
            <MobileCategoryMenu regions={regions} categories={categories} />
          </div>
          <div className="flex flex-1 gap-6 items-center lg:gap-8">
            {/* Logo */}
            <LocalizedClientLink
              href="/"
              className="mr-auto ml-auto text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r transition-all duration-300 from-primary-dark to-primary hover:from-primary to-primary-light lg:ml-0 lg:mr-0"
            >
              Zrubko.sk
            </LocalizedClientLink>

            {/* E-shop navigation (desktop) */}
            <div className="hidden flex-wrap gap-y-1 gap-x-2 items-center ml-1 lg:flex xl:gap-x-3">
              <ModernNavbar categories={categories} />

              <button
                id="usage-menu-button"
                onClick={() => {
                  setIsUsageOpen((prev) => {
                    if (!prev) setIsProductsOpen(false);
                    return !prev;
                  });
                }}
                className={`flex gap-1 items-center px-0 py-1 text-base font-semibold rounded-lg transition-all duration-200 ${
                  isUsageOpen
                    ? "bg-gold text-ebony"
                    : "text-ebony hover:text-ebony-dark hover:bg-gold-light"
                }`}
              >
                <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-8 h-8 rounded xl:w-12 xl:h-12" />
                Miesto použitia
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isUsageOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Additional static links */}
              <LocalizedClientLink s
                href="/kalkulacka" 
                className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
              >
                <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                Kategoria1
                <ChevronDown size={14} />
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/poradca" 
                className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
              >
                <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                Kategoria2
                <ChevronDown size={14} />
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/najpredavanejsie" 
                className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
              >
                <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                Kategoria3
                <ChevronDown size={14} />
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/kontakt" 
                className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
              >
                <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
                Kategoria4
                <ChevronDown size={14} />
              </LocalizedClientLink>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <LocalizedClientLink
              href="/account"
              className="flex gap-2 items-center px-4 py-2 rounded-lg border transition-all duration-200 text-ebony border-gold hover:bg-gold-light hover:border-ebony hover:text-ebony-dark"
              aria-label="Účet"
            >
              <User size={20} />
              <span className="hidden font-medium md:inline">Účet</span>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2 items-center px-4 py-2 text-white bg-gradient-to-r rounded-lg shadow-md transition-all duration-200 transform from-mahogany to-mahogany-dark hover:from-mahogany-dark hover:to-mahogany hover:shadow-lg hover:scale-105"
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

        {/* SECOND NAV hidden since content moved to header */}
        <nav className="hidden">
          <div className="flex gap-8 items-center content-container">
            <ModernNavbar categories={categories} />

            <button
              id="usage-menu-button"
              onClick={() => {
                setIsUsageOpen((prev) => {
                  if (!prev) setIsProductsOpen(false)
                  return !prev
                })
              }}
              className={`flex gap-1 items-center px-0 py-1 text-base font-semibold rounded-lg transition-all duration-200 ${
                isUsageOpen 
                  ? "shadow-sm bg-gold text-ebony" 
                  : "text-ebony hover:text-ebony-dark hover:bg-gold-light"
              }`}
            >
              <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-8 h-8 rounded xl:w-12 xl:h-12" />
              Miesto použitia
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isUsageOpen ? "rotate-180" : ""}`}
              />
            </button>

            <LocalizedClientLink 
              href="/kalkulacka" 
              className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
            >
              <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
              Kalkulačka
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/poradca" 
              className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
            >
              <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
              Poradca
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/najpredavanejsie" 
              className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
            >
              <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
              Najpredávanejšie
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/kontakt" 
              className="inline-flex gap-1 items-center px-0 text-base font-semibold rounded-lg transition-all duration-200 text-ebony hover:text-ebony-dark hover:bg-gold-light"
            >
              <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="object-cover w-12 h-12 rounded" />
              Kontakt
            </LocalizedClientLink>
          </div>
        </nav>

        {/* Mega Menu for Produkty */}
        {isProductsOpen && (
          <div
            ref={productsMenuRef}
            className="flex z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in"
          >
            <div className="w-full max-w-7xl">
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-ebony">Produkty</h2>
                <p className="max-w-2xl text-base text-ebony-light">
                  Prehliadajte naše produkty podľa kategórií. Prejdite myšou nad kategóriou pre zobrazenie detailov.
                </p>
              </div>
              
              {/* Desktop Layout - 2 columns */}
              <div className="hidden gap-8 mb-8 lg:grid lg:grid-cols-5">
                {/* Left Column - Product Types (40%) */}
                <div className="space-y-2 lg:col-span-2">
                  <h3 className="mb-4 text-lg font-semibold text-ebony">Kategórie produktov</h3>
                  
                  {/* Tatranský profil */}
                  <div className="relative">
                    <LocalizedClientLink
                      href="/kategorie/tatransky-profil"
                      className="flex gap-3 items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer border-gold/30 hover:border-ebony hover:bg-gold-light"
                      onMouseEnter={() => setHoveredProduct('tatransky')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold hover:bg-gold-dark">
                        <span className="text-xl">🪵</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony hover:text-ebony-dark">Tatranský profil</h4>
                        <p className="text-sm text-ebony-light">Klasický profil na steny a stropy</p>
                      </div>
                    </LocalizedClientLink>
                  </div>

                  {/* Terásové dosky */}
                  <div className="relative">
                    <LocalizedClientLink
                      href="/kategorie/terasove-dosky"
                      className="flex gap-3 items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer border-gold/30 hover:border-ebony hover:bg-gold-light"
                      onMouseEnter={() => setHoveredProduct('terasove')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold hover:bg-gold-dark">
                        <span className="text-xl">🌊</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony hover:text-ebony-dark">Terásové dosky</h4>
                        <p className="text-sm text-ebony-light">Dosky pre terasy a balkóny</p>
                      </div>
                    </LocalizedClientLink>
                  </div>

                  {/* Fasádne dosky */}
                  <div className="relative">
                    <LocalizedClientLink
                      href="/kategorie/fasadne-dosky"
                      className="flex gap-3 items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer border-gold/30 hover:border-ebony hover:bg-gold-light"
                      onMouseEnter={() => setHoveredProduct('fasadne')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold hover:bg-gold-dark">
                        <span className="text-xl">🧱</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony hover:text-ebony-dark">Fasádne dosky</h4>
                        <p className="text-sm text-ebony-light">Obklady vonkajších stien</p>
                      </div>
                    </LocalizedClientLink>
                  </div>

                  {/* Podlahové dosky */}
                  <div className="relative">
                    <LocalizedClientLink
                      href="/kategorie/podlahove-dosky"
                      className="flex gap-3 items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer border-gold/30 hover:border-ebony hover:bg-gold-light"
                      onMouseEnter={() => setHoveredProduct('podlahove')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold hover:bg-gold-dark">
                        <span className="text-xl">🔲</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony hover:text-ebony-dark">Podlahové dosky</h4>
                        <p className="text-sm text-ebony-light">Masívne drevené podlahy</p>
                      </div>
                    </LocalizedClientLink>
                  </div>

                  {/* Konštrukčné prvky */}
                  <div className="mt-6">
                    <h4 className="mb-3 font-medium text-md text-ebony">Konštrukčné prvky</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <LocalizedClientLink
                        href="/kategorie/hranoly"
                        className="flex gap-2 items-center p-3 rounded-lg transition-colors hover:bg-gold-light"
                      >
                        <span className="text-sm">🧱</span>
                        <span className="text-sm font-medium text-ebony">Hranoly</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/plotovky"
                        className="flex gap-2 items-center p-3 rounded-lg transition-colors hover:bg-gold-light"
                      >
                        <span className="text-sm">🪚</span>
                        <span className="text-sm font-medium text-ebony">Plotovky</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/stlpiky"
                        className="flex gap-2 items-center p-3 rounded-lg transition-colors hover:bg-gold-light"
                      >
                        <span className="text-sm">📏</span>
                        <span className="text-sm font-medium text-ebony">Stĺpiky</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/latky"
                        className="flex gap-2 items-center p-3 rounded-lg transition-colors hover:bg-gold-light"
                      >
                        <span className="text-sm">🔧</span>
                        <span className="text-sm font-medium text-ebony">Latky</span>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dynamic Preview Panel (60%) */}
                <div className="p-6 bg-gradient-to-br rounded-xl lg:col-span-3 from-champagne to-champagne-light">
                  {hoveredProduct === 'tatransky' && (
                    <div className="animate-fade-in">
                      <div className="flex justify-center items-center mb-4 w-full h-48 bg-gradient-to-br rounded-lg from-gold to-gold-dark">
                        <img 
                          src="https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png" 
                          alt="Tatranský profil - SHOU SUGI BAN" 
                          className="object-cover w-full h-full rounded-lg"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const nextElement = target.nextElementSibling as HTMLElement;
                            target.style.display = 'none';
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden justify-center items-center w-full h-full bg-gradient-to-br rounded-lg from-gold to-gold-dark">
                          <span className="text-6xl">🪵</span>
                        </div>
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-ebony">Tatranský profil</h4>
                      <p className="mb-4 text-ebony-light">Klasický drevený profil ideálny na obklady stien a stropov. Vytvára útulnú atmosféru v interiéri.</p>
                      
                      <div className="mb-6 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Smrek</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Borovica</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">AB</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">BC</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="mt-1 text-sm text-ebony-light">12,5 x 96 mm, 15 x 96 mm, 19 x 96 mm</p>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 w-full font-medium text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'terasove' && (
                    <div className="animate-fade-in">
                      <div className="flex justify-center items-center mb-4 w-full h-48 bg-gradient-to-br rounded-lg from-gold to-gold-dark">
                        <span className="text-6xl">🌊</span>
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-ebony">Terásové dosky</h4>
                      <p className="mb-4 text-ebony-light">Kvalitné dosky určené pre stavbu terás a balkónov. Odolné voči poveternostným vplyvom.</p>
                      
                      <div className="mb-6 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Smrek</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Céder</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">A</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">AB</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="mt-1 text-sm text-ebony-light">28 x 142 mm, 32 x 142 mm</p>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 w-full font-medium text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'fasadne' && (
                    <div className="animate-fade-in">
                      <div className="flex justify-center items-center mb-4 w-full h-48 bg-gradient-to-br rounded-lg from-gold to-gold-dark">
                        <span className="text-6xl">🧱</span>
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-ebony">Fasádne dosky</h4>
                      <p className="mb-4 text-ebony-light">Dosky určené na obklady vonkajších stien. Poskytujú ochranu a estetický vzhľad budovy.</p>
                      
                      <div className="mb-6 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Smrek</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Borovica</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">AB</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">BC</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="mt-1 text-sm text-ebony-light">15 x 121 mm, 19 x 121 mm</p>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 w-full font-medium text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'podlahove' && (
                    <div className="animate-fade-in">
                      <div className="flex justify-center items-center mb-4 w-full h-48 bg-gradient-to-br rounded-lg from-gold to-gold-dark">
                        <span className="text-6xl">🔲</span>
                      </div>
                      <h4 className="mb-2 text-2xl font-bold text-ebony">Podlahové dosky</h4>
                      <p className="mb-4 text-ebony-light">Masívne drevené dosky na podlahy. Vytvoria teplý a prirodzený vzhľad interiéru.</p>
                      
                      <div className="mb-6 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Dub</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gold-light text-ebony">Smrek</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">A</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">AB</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="mt-1 text-sm text-ebony-light">20 x 140 mm, 25 x 140 mm</p>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 w-full font-medium text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {!hoveredProduct && (
                    <div className="text-center">
                      <div className="flex justify-center items-center mx-auto mb-4 w-24 h-24 bg-gradient-to-br rounded-full from-ebony to-ebony-dark">
                        <span className="text-3xl text-gold">🪵</span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-ebony">Kvalitné drevené produkty</h3>
                      <p className="mx-auto mb-6 max-w-md text-ebony-light">
                        Prejdite myšou nad kategóriou v ľavom stĺpci pre zobrazenie detailných informácií o produktoch.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
                        <div className="p-4 bg-white rounded-lg border border-gold/30">
                          <div className="mb-2 text-2xl">🌲</div>
                          <h4 className="mb-1 font-semibold text-ebony">Prírodné materiály</h4>
                          <p className="text-sm text-ebony-light">Smrek, borovica, dub a ďalšie kvalitné druhy dreva</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gold/30">
                          <div className="mb-2 text-2xl">⭐</div>
                          <h4 className="mb-1 font-semibold text-ebony">Rôzne kvality</h4>
                          <p className="text-sm text-ebony-light">Klasifikácia A, AB, BC podľa kvality a vzhľadu</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gold/30">
                          <div className="mb-2 text-2xl">📏</div>
                          <h4 className="mb-1 font-semibold text-ebony">Rôzne rozmery</h4>
                          <p className="text-sm text-ebony-light">Široký výber rozmerov pre rôzne účely použitia</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gold/30">
                          <div className="mb-2 text-2xl">🚚</div>
                          <h4 className="mb-1 font-semibold text-ebony">Doprava zdarma</h4>
                          <p className="text-sm text-ebony-light">Pri objednávke nad 30 bežných metrov</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 justify-center sm:flex-row">
                        <LocalizedClientLink
                          href="/kalkulacka"
                          className="px-6 py-3 font-medium text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark"
                        >
                          Kalkulačka spotreby
                        </LocalizedClientLink>
                        <LocalizedClientLink
                          href="/poradca"
                          className="px-6 py-3 font-medium rounded-lg transition-colors bg-gold text-ebony hover:bg-gold-dark"
                        >
                          Poradca výberu
                        </LocalizedClientLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Layout - Vertical Stack */}
              <div className="space-y-4 lg:hidden">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <LocalizedClientLink
                    href="/kategorie/tatransky-profil"
                    className="p-4 bg-white rounded-lg border transition-all duration-200 group border-gold/30 hover:border-ebony hover:bg-gold-light"
                  >
                    <div className="flex gap-3 items-center mb-3">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold group-hover:bg-gold-dark">
                        <span className="text-xl">🪵</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Tatranský profil</h4>
                        <p className="text-sm text-ebony-light">Na steny a stropy</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">AB</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">BC</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Borovica</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/terasove-dosky"
                    className="p-4 bg-white rounded-lg border transition-all duration-200 group border-gold/30 hover:border-ebony hover:bg-gold-light"
                  >
                    <div className="flex gap-3 items-center mb-3">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold group-hover:bg-gold-dark">
                        <span className="text-xl">🌊</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Terásové dosky</h4>
                        <p className="text-sm text-ebony-light">Pre terasy a balkóny</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">A</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">AB</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Céder</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/fasadne-dosky"
                    className="p-4 bg-white rounded-lg border transition-all duration-200 group border-gold/30 hover:border-ebony hover:bg-gold-light"
                  >
                    <div className="flex gap-3 items-center mb-3">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold group-hover:bg-gold-dark">
                        <span className="text-xl">🧱</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Fasádne dosky</h4>
                        <p className="text-sm text-ebony-light">Obklady vonkajších stien</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">AB</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">BC</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Borovica</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/podlahove-dosky"
                    className="p-4 bg-white rounded-lg border transition-all duration-200 group border-gold/30 hover:border-ebony hover:bg-gold-light"
                  >
                    <div className="flex gap-3 items-center mb-3">
                      <div className="flex justify-center items-center w-12 h-12 rounded-lg transition-colors bg-gold group-hover:bg-gold-dark">
                        <span className="text-xl">🔲</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Podlahové dosky</h4>
                        <p className="text-sm text-ebony-light">Masívne drevené podlahy</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold text-ebony">A</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-light text-ebony">AB</span>
                    </div>
                    <p className="text-xs text-ebony-light">Dub, Smrek</p>
                  </LocalizedClientLink>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <LocalizedClientLink
                    href="/kalkulacka"
                    className="flex-1 px-4 py-3 font-medium text-center text-white rounded-lg transition-colors bg-mahogany hover:bg-mahogany-dark"
                  >
                    Kalkulačka spotreby
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/poradca"
                    className="flex-1 px-4 py-3 font-medium text-center text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
                  >
                    Poradca výberu
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mega Menu for Miesto použitia */}
        {isUsageOpen && (
          <div
            ref={usageMenuRef}
            className="flex relative z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in"
          >
            <div className="relative w-full max-w-7xl">
              {/* Jednoduché absolute tlačidlá vpravo hore */}
              <div className="flex absolute top-0 right-0 gap-2">
                <LocalizedClientLink
                  href="/purchase-advisor"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg transition-colors hover:bg-amber-600"
                >
                  Poradca nákupu
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/najpredavanejsie"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200"
                >
                  Najpredávanejšie
                </LocalizedClientLink>
              </div>

              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold">Miesto použitia</h2>
              </div>

              {/* Základná úroveň - Interiér a Exteriér */}
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {/* Interiér sekcia */}
                <div 
                  className={`relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    expandedSection === 'interior' 
                      ? 'border-blue-300 shadow-lg' 
                      : 'border-blue-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setExpandedSection(expandedSection === 'interior' ? null : 'interior')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="flex overflow-hidden justify-center items-center w-32 h-24 bg-blue-100 rounded-lg">
                        {usageCategories.interior.category?.metadata?.image_url ? (
                          <Image
                            src={usageCategories.interior.category.metadata.image_url as string}
                            alt="Interiér"
                            width={128}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Home className="w-12 h-12 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Interiér</h3>
                        <p className="text-sm text-gray-600">Drevo do vnútorných priestorov</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-200 rounded-full">
                        {usageCategories.interior.subcategories.length} kategórií
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                          expandedSection === 'interior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                  
                  {/* Rýchly náhľad kategórií */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {usageCategories.interior.subcategories.map((category: HttpTypes.StoreProductCategory) => (
                      <span key={category.id} className="px-2 py-1 text-xs text-blue-800 bg-blue-200 rounded-full">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exteriér sekcia */}
                <div 
                  className={`relative p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    expandedSection === 'exterior' 
                      ? 'border-green-300 shadow-lg' 
                      : 'border-green-200 hover:border-green-300 hover:shadow-md'
                  }`}
                  onClick={() => setExpandedSection(expandedSection === 'exterior' ? null : 'exterior')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="flex overflow-hidden justify-center items-center w-32 h-24 bg-green-100 rounded-lg">
                        {usageCategories.exterior.category?.metadata?.image_url ? (
                          <Image
                            src={usageCategories.exterior.category.metadata.image_url as string}
                            alt="Exteriér"
                            width={128}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Building className="w-12 h-12 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Exteriér</h3>
                        <p className="text-sm text-gray-600">Drevo do vonkajších priestorov</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                        {usageCategories.exterior.subcategories.length} kategórií
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-green-600 transition-transform duration-300 ${
                          expandedSection === 'exterior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                  
                  {/* Rýchly náhľad kategórií */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {usageCategories.exterior.subcategories.map((category: HttpTypes.StoreProductCategory) => (
                      <span key={category.id} className="px-2 py-1 text-xs text-green-800 bg-green-200 rounded-full">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailná úroveň - Rozklikaná sekcia */}
              {expandedSection && (
                <div className="overflow-hidden transition-all duration-500 ease-in-out animate-fade-in">
                  <div className={`p-6 rounded-xl border-2 ${
                    expandedSection === 'interior' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex justify-between items-center mb-6">
                      <h4 className={`text-lg font-bold ${
                        expandedSection === 'interior' ? 'text-blue-900' : 'text-green-900'
                      }`}>
                        {expandedSection === 'interior' ? 'Interiérové kategórie' : 'Exteriérové kategórie'}
                      </h4>
                      <button
                        onClick={() => setExpandedSection(null)}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                          expandedSection === 'interior' 
                            ? 'bg-blue-200 text-blue-800 hover:bg-blue-300' 
                            : 'bg-green-200 text-green-800 hover:bg-green-300'
                        }`}
                      >
                        Zavrieť
                      </button>
                    </div>
                    
                    <div className={`grid grid-cols-1 gap-4 ${
                      expandedSection === 'interior' 
                        ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'
                    }`}>
                      {(expandedSection === 'interior' ? usageCategories.interior.subcategories : usageCategories.exterior.subcategories).map((category: HttpTypes.StoreProductCategory) => {
                        const CategoryIcon = getCategoryIcon(category.name)
                        const categoryImage = category.metadata?.image_url as string
                        return (
                          <LocalizedClientLink
                            key={category.id}
                            href={`/categories/${category.handle}`}
                            className={`group relative flex items-start p-4 bg-white rounded-xl border-2 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                              expandedSection === 'interior' 
                                ? 'border-blue-200 hover:bg-blue-50 hover:border-blue-300' 
                                : 'border-green-200 hover:bg-green-50 hover:border-green-300'
                            }`}
                          >
                            {/* Obrázok alebo ikona vľavo */}
                            <div className={`flex items-center justify-center w-24 h-20 rounded-lg mr-3 transition-all duration-300 flex-shrink-0 overflow-hidden ${
                              expandedSection === 'interior' 
                                ? 'bg-blue-100 group-hover:bg-blue-200' 
                                : 'bg-green-100 group-hover:bg-green-200'
                            }`}>
                              {categoryImage ? (
                                <Image
                                  src={categoryImage}
                                  alt={category.name}
                                  width={96}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <CategoryIcon className={`w-10 h-10 ${
                                  expandedSection === 'interior' ? 'text-blue-600' : 'text-green-600'
                                }`} />
                              )}
                            </div>
                            
                            {/* Obsah vpravo */}
                            <div className="flex-1 min-w-0">
                              {/* Názov kategórie */}
                              <h4 className="mb-1 text-base font-semibold text-gray-900">{category.name}</h4>
                              
                              {/* Popis */}
                              <p className="mb-2 text-sm leading-snug text-gray-500 line-clamp-2">{category.description}</p>
                              
                              {/* Badge s počtom produktov alebo iné info */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                  Produkty
                                </span>
                              </div>
                              
                              {/* Iba jeden univerzálny badge */}
                              <div className="flex gap-1">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-blue-100 text-blue-800 border-blue-200">
                                  Dostupné
                                </span>
                              </div>
                            </div>
                            
                            {/* CTA šípka */}
                            <div className="flex flex-col justify-center items-center ml-2">
                              <div className="flex justify-center items-center w-6 h-6 bg-gray-100 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100">
                                <ArrowRight className="w-3 h-3 text-gray-600" />
                              </div>
                            </div>
                          </LocalizedClientLink>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

