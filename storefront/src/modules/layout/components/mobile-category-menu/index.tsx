"use client"

import { useState, useEffect } from "react"
import { 
  Menu, X, ChevronDown, ChevronRight, Package, ShoppingBag, 
  Star, ArrowRight, Loader2, Grid3X3, Home, Building,
  Paintbrush, Layers, Square, Thermometer, Building2, 
  Triangle, Waves as WavesIcon, Tent
} from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import Image from "next/image"
import { useParams } from "next/navigation"

interface MobileCategoryMenuProps {
  regions: StoreRegion[]
  categories: HttpTypes.StoreProductCategory[]
}

interface ProductsState {
  [categoryId: string]: HttpTypes.StoreProduct[]
}

// Helper function to get image URL from category metadata
const getCategoryImageUrl = (category: HttpTypes.StoreProductCategory): string | null => {
  if (category.metadata && typeof category.metadata === 'object' && category.metadata !== null) {
    const metadata = category.metadata as { image_url?: string }
    return metadata.image_url || null
  }
  return null
}

// Helper function to get product price
const getProductPrice = (product: HttpTypes.StoreProduct): string => {
  if (product.variants && product.variants.length > 0) {
    const variant = product.variants[0]
    if (variant.calculated_price && variant.calculated_price.calculated_amount) {
      return `€${(variant.calculated_price.calculated_amount / 100).toFixed(2)}`
    }
  }
  return 'Cena na dotaz'
}

// Function to fetch products for a category
const fetchProductsForCategory = async (categoryId: string, countryCode: string): Promise<HttpTypes.StoreProduct[]> => {
  try {
    const response = await fetch(`/api/products?category_id=${categoryId}&country_code=${countryCode}&limit=4`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Helper functions for usage categories
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
    "Plot": Grid3X3,
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

export default function MobileCategoryMenu({ regions, categories }: MobileCategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [categoryProducts, setCategoryProducts] = useState<ProductsState>({})
  const [loadingProducts, setLoadingProducts] = useState<Set<string>>(new Set())
  const [expandedUsageSection, setExpandedUsageSection] = useState<'interior' | 'exterior' | null>(null)
  const { countryCode } = useParams() as { countryCode: string }

  // Get dynamic usage categories
  const usageCategories = getUsageCategories(categories)

  // Filter out parent categories (main categories)
  const mainCategories = categories?.filter(cat => !cat.parent_category) || []

  // Get subcategories for a specific parent category
  const getSubcategories = (parentId: string) => {
    return categories?.filter(cat => cat.parent_category?.id === parentId) || []
  }

  // Load products for category when needed
  const loadProductsForCategory = async (categoryId: string) => {
    if (categoryProducts[categoryId] || loadingProducts.has(categoryId)) {
      return // Already loaded or loading
    }

    setLoadingProducts(prev => new Set(prev).add(categoryId))
    
    try {
      const products = await fetchProductsForCategory(categoryId, countryCode)
      setCategoryProducts(prev => ({
        ...prev,
        [categoryId]: products
      }))
    } catch (error) {
      console.error('Error loading products for category:', categoryId, error)
    } finally {
      setLoadingProducts(prev => {
        const newSet = new Set(prev)
        newSet.delete(categoryId)
        return newSet
      })
    }
  }

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
      return
    }
    
    setExpandedCategory(categoryId)
    
    // Load products if category has no subcategories
    const subcategories = getSubcategories(categoryId)
    if (subcategories.length === 0) {
      loadProductsForCategory(categoryId)
    }
  }

  const closeMobile = () => {
    setIsOpen(false)
    setExpandedCategory(null)
    setExpandedUsageSection(null)
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
                <h2 className="text-xl font-bold bg-gradient-to-r from-ebony to-ebony-light bg-clip-text text-transparent">
                  Menu
                </h2>
                <button 
                  onClick={closeMobile} 
                  className="p-2 hover:bg-gold-light text-ebony hover:text-ebony-dark rounded-lg transition-all duration-200"
                  aria-label="Zavrieť menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Categories Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Grid3X3 size={20} className="text-gold" />
                  <h3 className="text-lg font-bold text-ebony">Produkty</h3>
                </div>

                {/* Horizontal Scrollable Categories */}
                <div className="overflow-x-auto pb-2 -mx-4 px-4">
                  <div className="flex gap-3 min-w-max">
                    {mainCategories.map((category) => {
                      const subcategories = getSubcategories(category.id)
                      const hasSubcategories = subcategories.length > 0
                      const imageUrl = getCategoryImageUrl(category)
                      const isExpanded = expandedCategory === category.id

                      return (
                        <div key={category.id} className="flex-shrink-0 w-32">
                          {/* Category Card */}
                          <button
                            onClick={() => handleCategoryClick(category.id)}
                            className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                              isExpanded
                                ? 'border-gold bg-gold-light shadow-lg scale-105'
                                : 'border-gold/20 bg-white hover:border-gold/50 hover:shadow-md'
                            }`}
                          >
                            {/* Category Image */}
                            <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden bg-gold-light">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={category.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package size={24} className="text-gold-dark" />
                                </div>
                              )}
                            </div>
                            
                            {/* Category Name */}
                            <h4 className="font-semibold text-sm text-ebony line-clamp-2 text-center leading-tight">
                              {category.name}
                            </h4>
                            
                            {/* Category Indicator */}
                            <div className="flex items-center justify-center mt-2">
                              {hasSubcategories ? (
                                <div className="flex items-center gap-1">
                                  <Star size={12} className="text-gold" />
                                  <span className="text-xs text-gold-dark font-medium">
                                    {subcategories.length}
                                  </span>
                                </div>
                              ) : (
                                <ShoppingBag size={14} className="text-gold" />
                              )}
                            </div>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Expanded Category Details */}
                {expandedCategory && (
                  <div className="mt-4 p-4 bg-champagne-light/30 rounded-xl border border-gold/20">
                    {(() => {
                      const category = mainCategories.find(cat => cat.id === expandedCategory)
                      const subcategories = getSubcategories(expandedCategory)
                      const hasSubcategories = subcategories.length > 0
                      const products = categoryProducts[expandedCategory] || []
                      const isLoadingProducts = loadingProducts.has(expandedCategory)

                      if (!category) return null

                      return (
                        <>
                          {/* Category Header */}
                          <div className="text-center mb-4">
                            <h4 className="text-lg font-bold text-ebony">{category.name}</h4>
                            {category.description && (
                              <p className="text-sm text-ebony-light mt-1">{category.description}</p>
                            )}
                          </div>

                          {/* View All Button */}
                          <div className="mb-4 text-center">
                            <LocalizedClientLink
                              href={`/categories/${category.handle}`}
                              onClick={closeMobile}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mahogany to-mahogany-dark text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300"
                            >
                              Zobraziť všetko
                              <ArrowRight size={14} />
                            </LocalizedClientLink>
                          </div>

                          {/* Subcategories or Products */}
                          {hasSubcategories ? (
                            <div>
                              <h5 className="text-sm font-semibold text-ebony mb-3 flex items-center gap-2">
                                <Star size={14} />
                                Podkategórie
                              </h5>
                              <div className="space-y-2">
                                {subcategories.map((subcategory) => {
                                  const subcategoryImageUrl = getCategoryImageUrl(subcategory)
                                  
                                  return (
                                    <LocalizedClientLink
                                      key={subcategory.id}
                                      href={`/categories/${subcategory.handle}`}
                                      onClick={closeMobile}
                                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gold/10 hover:border-gold/30 hover:shadow-sm transition-all duration-200"
                                    >
                                      {/* Subcategory Image */}
                                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-gold-light flex-shrink-0">
                                        {subcategoryImageUrl ? (
                                          <Image
                                            src={subcategoryImageUrl}
                                            alt={subcategory.name}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center">
                                            <Package size={16} className="text-gold-dark" />
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex-1">
                                        <h6 className="font-medium text-ebony text-sm">
                                          {subcategory.name}
                                        </h6>
                                        {subcategory.description && (
                                          <p className="text-xs text-ebony-light line-clamp-1">
                                            {subcategory.description}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <ChevronRight size={16} className="text-gold" />
                                    </LocalizedClientLink>
                                  )
                                })}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="text-sm font-semibold text-ebony mb-3 flex items-center gap-2">
                                <ShoppingBag size={14} />
                                Produkty
                              </h5>
                              
                              {/* Loading State */}
                              {isLoadingProducts && (
                                <div className="flex items-center justify-center py-6">
                                  <Loader2 size={24} className="animate-spin text-gold" />
                                </div>
                              )}
                              
                              {/* Products */}
                              {!isLoadingProducts && products.length > 0 && (
                                <div className="space-y-2">
                                  {products.map((product) => (
                                    <LocalizedClientLink
                                      key={product.id}
                                      href={`/products/${product.handle}`}
                                      onClick={closeMobile}
                                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gold/10 hover:border-gold/30 hover:shadow-sm transition-all duration-200"
                                    >
                                      {/* Product Image */}
                                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gold-light flex-shrink-0">
                                        {product.thumbnail ? (
                                          <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center">
                                            <Package size={20} className="text-gold-dark" />
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex-1">
                                        <h6 className="font-medium text-ebony text-sm line-clamp-1">
                                          {product.title}
                                        </h6>
                                        <p className="text-xs text-gold-dark font-semibold">
                                          {getProductPrice(product)}
                                        </p>
                                      </div>
                                      
                                      <ChevronRight size={16} className="text-gold" />
                                    </LocalizedClientLink>
                                  ))}
                                </div>
                              )}
                              
                              {/* No Products State */}
                              {!isLoadingProducts && products.length === 0 && (
                                <div className="text-center py-6 text-ebony-light">
                                  <Package size={24} className="mx-auto mb-2 text-gold" />
                                  <p className="text-sm">Žiadne produkty</p>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>

              {/* Miesto použitia Section */}
              <div className="mb-6 pt-4 border-t border-gold/20">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={20} className="text-orange-600" />
                  <h3 className="text-lg font-bold text-ebony">Miesto použitia</h3>
                </div>

                <div className="space-y-3">
                  {/* Interiér */}
                  <div className="border border-blue-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedUsageSection(expandedUsageSection === 'interior' ? null : 'interior')}
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
                          expandedUsageSection === 'interior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {expandedUsageSection === 'interior' && (
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
                  <div className="border border-green-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedUsageSection(expandedUsageSection === 'exterior' ? null : 'exterior')}
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
                          expandedUsageSection === 'exterior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {expandedUsageSection === 'exterior' && (
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

              {/* Other Navigation Links */}
              <div className="space-y-3">
                <LocalizedClientLink
                  href="/kalkulacka"
                  onClick={closeMobile}
                  className="flex items-center gap-3 p-3 text-ebony hover:text-ebony-dark hover:bg-gold-light rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gold-light rounded-lg">
                    <Package className="w-4 h-4 text-gold-dark" />
                  </div>
                  <span className="font-medium">Kalkulačka</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink
                  href="/kontakt"
                  onClick={closeMobile}
                  className="flex items-center gap-3 p-3 text-ebony hover:text-ebony-dark hover:bg-gold-light rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gold-light rounded-lg">
                    <Package className="w-4 h-4 text-gold-dark" />
                  </div>
                  <span className="font-medium">Kontakt</span>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 