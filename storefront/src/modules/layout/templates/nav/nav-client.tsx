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
        className="flex items-center justify-center w-12 h-12 text-ebony lg:hidden hover:bg-gold-light rounded-lg transition-all duration-200 border border-gold hover:border-ebony"
        aria-label="Otvoriť menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobile} />
          
          {/* Mobile menu panel */}
          <div className="fixed top-0 left-0 w-full max-w-sm h-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold">
                <h2 className="text-xl font-bold bg-gradient-to-r from-ebony to-ebony-light bg-clip-text text-transparent">Menu</h2>
                <button 
                  onClick={closeMobile} 
                  className="p-2 hover:bg-gold-light text-ebony hover:text-ebony-dark rounded-lg transition-all duration-200"
                  aria-label="Zavrieť menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-3">
                {/* Produkty */}
                <div className="border border-amber-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleMobile('products')}
                    className={`flex items-center justify-between w-full p-4 text-left transition-all duration-200 ${
                      expandedMobile === 'products' 
                        ? 'bg-amber-50 border-amber-300' 
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
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
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => toggleProducts('wood')}
                            className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
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
                            <div className="bg-gray-50 border-t border-gray-200 p-3 space-y-2">
                              <LocalizedClientLink
                                href="/kategorie/tatransky-profil"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-lg">
                                  <TreePine className="w-4 h-4 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Tatranský profil</span>
                                  <p className="text-xs text-gray-500">Na steny a stropy</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/terasove-dosky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                  <Waves className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Terásové dosky</span>
                                  <p className="text-xs text-gray-500">Pre terasy a balkóny</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/fasadne-dosky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                                  <Building2 className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Fasádne dosky</span>
                                  <p className="text-xs text-gray-500">Obklady vonkajších stien</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/podlahove-dosky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
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
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => toggleProducts('construction')}
                            className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
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
                            <div className="bg-gray-50 border-t border-gray-200 p-3 space-y-2">
                              <LocalizedClientLink
                                href="/kategorie/hranoly"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Package className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Hranoly</span>
                                  <p className="text-xs text-gray-500">Konštrukčné prvky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/plotovky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Fence className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Plotovky</span>
                                  <p className="text-xs text-gray-500">Plotové dosky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/stlpiky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                                  <Ruler className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">Stĺpiky</span>
                                  <p className="text-xs text-gray-500">Plotové stĺpiky</p>
                                </div>
                              </LocalizedClientLink>
                              
                              <LocalizedClientLink
                                href="/kategorie/latky"
                                className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={closeMobile}
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
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
                <div className="border border-orange-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleMobile('usage')}
                    className={`flex items-center justify-between w-full p-4 text-left transition-all duration-200 ${
                      expandedMobile === 'usage' 
                        ? 'bg-orange-50 border-orange-300' 
                        : 'bg-white hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
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
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => toggleUsage('interior')}
                            className="flex items-center justify-between w-full p-3 text-left hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-16 h-12 bg-blue-100 rounded-lg overflow-hidden">
                                {usageCategories.interior.category?.metadata?.image_url ? (
                                  <Image
                                    src={usageCategories.interior.category.metadata.image_url as string}
                                    alt="Interiér"
                                    width={64}
                                    height={48}
                                    className="w-full h-full object-cover"
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
                            <div className="bg-blue-50 border-t border-blue-200 p-3 space-y-2">
                              {usageCategories.interior.subcategories.map((category: HttpTypes.StoreProductCategory) => {
                                const CategoryIcon = getCategoryIcon(category.name)
                                return (
                                  <LocalizedClientLink
                                    key={category.id}
                                    href={`/categories/${category.handle}`}
                                    className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                    onClick={closeMobile}
                                  >
                                    <div className="flex items-center justify-center w-16 h-12 bg-blue-100 rounded-lg overflow-hidden">
                                      {category.metadata?.image_url ? (
                                        <Image
                                          src={category.metadata.image_url as string}
                                          alt={category.name}
                                          width={64}
                                          height={48}
                                          className="w-full h-full object-cover"
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
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => toggleUsage('exterior')}
                            className="flex items-center justify-between w-full p-3 text-left hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-16 h-12 bg-green-100 rounded-lg overflow-hidden">
                                {usageCategories.exterior.category?.metadata?.image_url ? (
                                  <Image
                                    src={usageCategories.exterior.category.metadata.image_url as string}
                                    alt="Exteriér"
                                    width={64}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Building className="w-6 h-6 text-green-600" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-gray-700">Exteriér</span>
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                expandedUsage === 'exterior' ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {expandedUsage === 'exterior' && (
                            <div className="bg-green-50 border-t border-green-200 p-3 space-y-2">
                              {usageCategories.exterior.subcategories.map((category: HttpTypes.StoreProductCategory) => {
                                const CategoryIcon = getCategoryIcon(category.name)
                                return (
                                  <LocalizedClientLink
                                    key={category.id}
                                    href={`/categories/${category.handle}`}
                                    className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                    onClick={closeMobile}
                                  >
                                    <div className="flex items-center justify-center w-16 h-12 bg-green-100 rounded-lg overflow-hidden">
                                      {category.metadata?.image_url ? (
                                        <Image
                                          src={category.metadata.image_url as string}
                                          alt={category.name}
                                          width={64}
                                          height={48}
                                          className="w-full h-full object-cover"
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
                    className="flex items-center gap-3 p-4 font-semibold hover:bg-amber-50 hover:border-amber-300 rounded-lg transition-all duration-200 border border-amber-200 shadow-sm"
                    onClick={closeMobile}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                      <Calculator className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-gray-900">Kalkulačka</span>
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/kontakt"
                    className="flex items-center gap-3 p-4 font-semibold hover:bg-orange-50 hover:border-orange-300 rounded-lg transition-all duration-200 border border-orange-200 shadow-sm"
                    onClick={closeMobile}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-gray-900">Kontakt</span>
                  </LocalizedClientLink>
                </div>

                {/* Pomocné linky */}
                <div className="pt-4 mt-6 border-t border-gray-200 space-y-2">
                  <LocalizedClientLink
                    href="/purchase-advisor"
                    className="flex items-center gap-3 p-3 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    onClick={closeMobile}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-lg">
                      <Zap className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-medium">Poradca nákupu</span>
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/najpredavanejsie"
                    className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={closeMobile}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
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
      {/* TOPBAR */}
      <div className="px-4 py-3 w-full text-xs text-primary bg-gradient-to-r from-white via-secondary to-white shadow-sm border-b border-primary/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[13px] gap-y-2 text-center md:text-left">
          <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start">
            <a href="tel:+421907695363" className="flex gap-2 items-center hover:text-primary-dark transition-colors duration-200">
              <Phone size={18} className="text-primary" /> <strong>+421 907 695 363</strong>
            </a>
            <a href="mailto:info@zrubko.sk" className="flex gap-2 items-center hover:text-primary-dark transition-colors duration-200">
              <Mail size={18} className="text-primary" /> <strong>info@zrubko.sk</strong>
            </a>
          </div>
          <div className="flex justify-center">
            <a
              href="/doprava"
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 border border-primary/10 hover:border-primary/20"
            >
              <Truck size={16} className="text-primary" /> Doprava zdarma po Slovensku od 30m²
            </a>
          </div>
          <div className="hidden gap-2 justify-center items-center hide-store:flex hide-store:justify-end">
            <MapPin size={18} className="text-primary" />
            <span>
              <a
                href="https://www.google.com/maps?q=Predajňa+Zrubko,+Žilina"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-dark transition-colors duration-200"
              >
                <strong>Predajňa</strong> <strong>Žilina</strong>
              </a>{" "}
              Po–Pi <strong>8:00–16:00</strong>
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative mx-auto h-20 bg-primary border-b border-primary/20 shadow-sm">
        <nav className="flex relative justify-between items-center w-full h-full content-container text-small-regular text-white">
          <div className="flex items-center lg:hidden">
            <MobileCategoryMenu regions={regions} categories={categories} />
          </div>
          <div className="flex flex-1 justify-center lg:justify-start">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-ebony to-ebony-light bg-clip-text text-transparent hover:from-ebony-dark hover:to-ebony transition-all duration-300"
            >
              Zrubko.sk
            </LocalizedClientLink>
          </div>
          <div className="hidden absolute left-1/2 w-full max-w-md -translate-x-1/2 lg:flex">
            <div className="relative w-full">
              <SearchBar />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <LocalizedClientLink
              href="/account"
              className="flex gap-2 items-center px-4 py-2 text-ebony rounded-lg border border-gold hover:bg-gold-light hover:border-ebony hover:text-ebony-dark transition-all duration-200"
              aria-label="Účet"
            >
              <User size={20} />
              <span className="hidden md:inline font-medium">Účet</span>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2 items-center px-4 py-2 text-white rounded-lg bg-gradient-to-r from-mahogany to-mahogany-dark hover:from-mahogany-dark hover:to-mahogany shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
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

        {/* SECOND NAV: DESKTOP MENU BAR */}
        <nav className="hidden items-center w-full h-14 bg-gradient-to-r from-champagne-light to-champagne border-t lg:flex border-gold/30 shadow-sm">
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
              className={`flex gap-2 items-center px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 ${
                isUsageOpen 
                  ? "bg-gold text-ebony shadow-sm" 
                  : "text-ebony hover:text-ebony-dark hover:bg-gold-light"
              }`}
            >
              Miesto použitia
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isUsageOpen ? "rotate-180" : ""}`}
              />
            </button>

            <LocalizedClientLink 
              href="/kalkulacka" 
              className="px-4 py-2 text-base font-semibold text-ebony hover:text-ebony-dark hover:bg-gold-light rounded-lg transition-all duration-200"
            >
              Kalkulačka
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/kontakt" 
              className="px-4 py-2 text-base font-semibold text-ebony hover:text-ebony-dark hover:bg-gold-light rounded-lg transition-all duration-200"
            >
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
              <div className="hidden lg:grid lg:grid-cols-5 gap-8 mb-8">
                {/* Left Column - Product Types (40%) */}
                <div className="lg:col-span-2 space-y-2">
                  <h3 className="text-lg font-semibold text-ebony mb-4">Kategórie produktov</h3>
                  
                  {/* Tatranský profil */}
                  <div className="relative">
                    <LocalizedClientLink
                      href="/kategorie/tatransky-profil"
                      className="flex items-center gap-3 p-4 rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredProduct('tatransky')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg hover:bg-gold-dark transition-colors">
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
                      className="flex items-center gap-3 p-4 rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredProduct('terasove')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg hover:bg-gold-dark transition-colors">
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
                      className="flex items-center gap-3 p-4 rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredProduct('fasadne')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg hover:bg-gold-dark transition-colors">
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
                      className="flex items-center gap-3 p-4 rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredProduct('podlahove')}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg hover:bg-gold-dark transition-colors">
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
                    <h4 className="text-md font-medium text-ebony mb-3">Konštrukčné prvky</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <LocalizedClientLink
                        href="/kategorie/hranoly"
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gold-light transition-colors"
                      >
                        <span className="text-sm">🧱</span>
                        <span className="text-sm font-medium text-ebony">Hranoly</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/plotovky"
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gold-light transition-colors"
                      >
                        <span className="text-sm">🪚</span>
                        <span className="text-sm font-medium text-ebony">Plotovky</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/stlpiky"
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gold-light transition-colors"
                      >
                        <span className="text-sm">📏</span>
                        <span className="text-sm font-medium text-ebony">Stĺpiky</span>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/latky"
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gold-light transition-colors"
                      >
                        <span className="text-sm">🔧</span>
                        <span className="text-sm font-medium text-ebony">Latky</span>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dynamic Preview Panel (60%) */}
                <div className="lg:col-span-3 bg-gradient-to-br from-champagne to-champagne-light rounded-xl p-6">
                  {hoveredProduct === 'tatransky' && (
                    <div className="animate-fade-in">
                      <div className="w-full h-48 bg-gradient-to-br from-gold to-gold-dark rounded-lg mb-4 flex items-center justify-center">
                        <img 
                          src="https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png" 
                          alt="Tatranský profil - SHOU SUGI BAN" 
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const nextElement = target.nextElementSibling as HTMLElement;
                            target.style.display = 'none';
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-gold to-gold-dark rounded-lg items-center justify-center">
                          <span className="text-6xl">🪵</span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-ebony mb-2">Tatranský profil</h4>
                      <p className="text-ebony-light mb-4">Klasický drevený profil ideálny na obklady stien a stropov. Vytvára útulnú atmosféru v interiéri.</p>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Smrek</span>
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Borovica</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">AB</span>
                            <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">BC</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="text-sm text-ebony-light mt-1">12,5 x 96 mm, 15 x 96 mm, 19 x 96 mm</p>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'terasove' && (
                    <div className="animate-fade-in">
                      <div className="w-full h-48 bg-gradient-to-br from-gold to-gold-dark rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-6xl">🌊</span>
                      </div>
                      <h4 className="text-2xl font-bold text-ebony mb-2">Terásové dosky</h4>
                      <p className="text-ebony-light mb-4">Kvalitné dosky určené pre stavbu terás a balkónov. Odolné voči poveternostným vplyvom.</p>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Smrek</span>
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Céder</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">A</span>
                            <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">AB</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="text-sm text-ebony-light mt-1">28 x 142 mm, 32 x 142 mm</p>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'fasadne' && (
                    <div className="animate-fade-in">
                      <div className="w-full h-48 bg-gradient-to-br from-gold to-gold-dark rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-6xl">🧱</span>
                      </div>
                      <h4 className="text-2xl font-bold text-ebony mb-2">Fasádne dosky</h4>
                      <p className="text-ebony-light mb-4">Dosky určené na obklady vonkajších stien. Poskytujú ochranu a estetický vzhľad budovy.</p>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Smrek</span>
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Borovica</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">AB</span>
                            <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">BC</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="text-sm text-ebony-light mt-1">15 x 121 mm, 19 x 121 mm</p>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {hoveredProduct === 'podlahove' && (
                    <div className="animate-fade-in">
                      <div className="w-full h-48 bg-gradient-to-br from-gold to-gold-dark rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-6xl">🔲</span>
                      </div>
                      <h4 className="text-2xl font-bold text-ebony mb-2">Podlahové dosky</h4>
                      <p className="text-ebony-light mb-4">Masívne drevené dosky na podlahy. Vytvoria teplý a prirodzený vzhľad interiéru.</p>
                      
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="text-sm font-medium text-ebony">Materiály:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Dub</span>
                            <span className="px-2 py-1 text-xs bg-gold-light text-ebony rounded-full">Smrek</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Klasifikácia:</span>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">A</span>
                            <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">AB</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-ebony">Rozmery:</span>
                          <p className="text-sm text-ebony-light mt-1">20 x 140 mm, 25 x 140 mm</p>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium">
                        Zobraziť produkty
                      </button>
                    </div>
                  )}

                  {!hoveredProduct && (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-ebony to-ebony-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl text-gold">🪵</span>
                      </div>
                      <h3 className="text-2xl font-bold text-ebony mb-2">Kvalitné drevené produkty</h3>
                      <p className="text-ebony-light mb-6 max-w-md mx-auto">
                        Prejdite myšou nad kategóriou v ľavom stĺpci pre zobrazenie detailných informácií o produktoch.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border border-gold/30">
                          <div className="text-2xl mb-2">🌲</div>
                          <h4 className="font-semibold text-ebony mb-1">Prírodné materiály</h4>
                          <p className="text-sm text-ebony-light">Smrek, borovica, dub a ďalšie kvalitné druhy dreva</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gold/30">
                          <div className="text-2xl mb-2">⭐</div>
                          <h4 className="font-semibold text-ebony mb-1">Rôzne kvality</h4>
                          <p className="text-sm text-ebony-light">Klasifikácia A, AB, BC podľa kvality a vzhľadu</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gold/30">
                          <div className="text-2xl mb-2">📏</div>
                          <h4 className="font-semibold text-ebony mb-1">Rôzne rozmery</h4>
                          <p className="text-sm text-ebony-light">Široký výber rozmerov pre rôzne účely použitia</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gold/30">
                          <div className="text-2xl mb-2">🚚</div>
                          <h4 className="font-semibold text-ebony mb-1">Doprava zdarma</h4>
                          <p className="text-sm text-ebony-light">Pri objednávke nad 30 bežných metrov</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <LocalizedClientLink
                          href="/kalkulacka"
                          className="px-6 py-3 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium"
                        >
                          Kalkulačka spotreby
                        </LocalizedClientLink>
                        <LocalizedClientLink
                          href="/poradca"
                          className="px-6 py-3 bg-gold text-ebony rounded-lg hover:bg-gold-dark transition-colors font-medium"
                        >
                          Poradca výberu
                        </LocalizedClientLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Layout - Vertical Stack */}
              <div className="lg:hidden space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LocalizedClientLink
                    href="/kategorie/tatransky-profil"
                    className="group p-4 bg-white rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg group-hover:bg-gold-dark transition-colors">
                        <span className="text-xl">🪵</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Tatranský profil</h4>
                        <p className="text-sm text-ebony-light">Na steny a stropy</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">AB</span>
                      <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">BC</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Borovica</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/terasove-dosky"
                    className="group p-4 bg-white rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg group-hover:bg-gold-dark transition-colors">
                        <span className="text-xl">🌊</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Terásové dosky</h4>
                        <p className="text-sm text-ebony-light">Pre terasy a balkóny</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">A</span>
                      <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">AB</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Céder</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/fasadne-dosky"
                    className="group p-4 bg-white rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg group-hover:bg-gold-dark transition-colors">
                        <span className="text-xl">🧱</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Fasádne dosky</h4>
                        <p className="text-sm text-ebony-light">Obklady vonkajších stien</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">AB</span>
                      <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">BC</span>
                    </div>
                    <p className="text-xs text-ebony-light">Smrek, Borovica</p>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/kategorie/podlahove-dosky"
                    className="group p-4 bg-white rounded-lg border border-gold/30 hover:border-ebony hover:bg-gold-light transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-lg group-hover:bg-gold-dark transition-colors">
                        <span className="text-xl">🔲</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-ebony group-hover:text-ebony-dark">Podlahové dosky</h4>
                        <p className="text-sm text-ebony-light">Masívne drevené podlahy</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-gold text-ebony rounded-full">A</span>
                      <span className="px-2 py-1 text-xs font-medium bg-gold-light text-ebony rounded-full">AB</span>
                    </div>
                    <p className="text-xs text-ebony-light">Dub, Smrek</p>
                  </LocalizedClientLink>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <LocalizedClientLink
                    href="/kalkulacka"
                    className="flex-1 px-4 py-3 bg-mahogany text-white rounded-lg hover:bg-mahogany-dark transition-colors font-medium text-center"
                  >
                    Kalkulačka spotreby
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/poradca"
                    className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-center"
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
            className="flex z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in relative"
          >
            <div className="w-full max-w-7xl relative">
              {/* Jednoduché absolute tlačidlá vpravo hore */}
              <div className="absolute top-0 right-0 flex gap-2">
                <LocalizedClientLink
                  href="/purchase-advisor"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Poradca nákupu
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/najpredavanejsie"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-32 h-24 bg-blue-100 rounded-lg overflow-hidden">
                        {usageCategories.interior.category?.metadata?.image_url ? (
                          <Image
                            src={usageCategories.interior.category.metadata.image_url as string}
                            alt="Interiér"
                            width={128}
                            height={96}
                            className="w-full h-full object-cover"
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
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded-full">
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
                      <span key={category.id} className="px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded-full">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-32 h-24 bg-green-100 rounded-lg overflow-hidden">
                        {usageCategories.exterior.category?.metadata?.image_url ? (
                          <Image
                            src={usageCategories.exterior.category.metadata.image_url as string}
                            alt="Exteriér"
                            width={128}
                            height={96}
                            className="w-full h-full object-cover"
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
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
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
                      <span key={category.id} className="px-2 py-1 text-xs bg-green-200 text-green-800 rounded-full">
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
                    <div className="flex items-center justify-between mb-6">
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
                                  className="w-full h-full object-cover"
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
                              <h4 className="text-base font-semibold text-gray-900 mb-1">{category.name}</h4>
                              
                              {/* Popis */}
                              <p className="text-sm text-gray-500 mb-2 leading-snug line-clamp-2">{category.description}</p>
                              
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
                            <div className="flex flex-col items-center justify-center ml-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
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

