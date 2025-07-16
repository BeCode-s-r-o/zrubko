"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ArrowRight, Package, Grid3X3, Star, ShoppingBag, Loader2 } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useParams } from "next/navigation"

interface ModernNavbarProps {
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
    const response = await fetch(`/api/products?category_id=${categoryId}&country_code=${countryCode}&limit=6`)
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

export default function ModernNavbar({ categories }: ModernNavbarProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categoryProducts, setCategoryProducts] = useState<ProductsState>({})
  const [loadingProducts, setLoadingProducts] = useState<Set<string>>(new Set())
  const menuRef = useRef<HTMLDivElement>(null)
  const { countryCode } = useParams() as { countryCode: string }

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setHoveredCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle category hover
  const handleCategoryHover = (categoryId: string) => {
    setHoveredCategory(categoryId)
    
    // Load products if category has no subcategories
    const subcategories = getSubcategories(categoryId)
    if (subcategories.length === 0) {
      loadProductsForCategory(categoryId)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={() => setIsMenuOpen(true)}
        className={`flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
          isMenuOpen 
            ? "bg-gradient-to-r from-gold to-gold-dark text-ebony" 
            : "text-ebony hover:text-ebony-dark hover:bg-gold-light"
        }`}
      >
        <img src="https://www.tatranskyprofil.sk/wp-content/uploads/2024/11/tatransky-profil-perodrazka.webp" alt="" className="w-12 h-12 object-cover rounded" />
        Produkty
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Mega Menu */}
      {isMenuOpen && (
        <div 
          className="absolute top-full left-0 z-50 mt-2 w-screen max-w-5xl bg-white shadow-2xl rounded-xl border border-gold/20 overflow-hidden max-h-[500px]"
          onMouseLeave={() => {
            setIsMenuOpen(false)
            setHoveredCategory(null)
          }}
        >
          <div className="flex">
            {/* Left Panel - Categories */}
            <div className="w-1/3 bg-gradient-to-br from-champagne-light to-champagne p-4 border-r border-gold/20 max-h-[500px] overflow-y-auto">
              <h3 className="text-base font-bold text-ebony mb-3 flex items-center gap-2">
                <Grid3X3 size={18} />
                Kategórie
              </h3>
              
              <div className="space-y-1">
                {mainCategories.map((category) => {
                  const subcategories = getSubcategories(category.id)
                  const hasSubcategories = subcategories.length > 0
                  const imageUrl = getCategoryImageUrl(category)
                  
                  return (
                                          <div
                        key={category.id}
                        className={`group relative rounded-lg transition-all duration-300 ${
                          hoveredCategory === category.id 
                            ? "bg-white shadow-md scale-[1.02]" 
                            : "hover:bg-white/50"
                        }`}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                      >
                        <div className="flex items-center p-3">
                          {/* Category Image */}
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gold-light flex-shrink-0">
                                                      {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={category.name}
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
                          
                          {/* Category Info */}
                          <div className="ml-3 flex-1">
                            <h4 className="font-medium text-sm text-ebony group-hover:text-ebony-dark transition-colors">
                              {category.name}
                            </h4>
                            {category.description && (
                              <p className="text-xs text-ebony-light line-clamp-1">
                                {category.description}
                              </p>
                            )}
                          </div>
                        
                        {/* Indicator */}
                        <div className="flex items-center gap-2">
                          {hasSubcategories ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-gold-dark">
                                {subcategories.length}
                              </span>
                              <ArrowRight size={16} className="text-gold-dark group-hover:text-ebony transition-colors" />
                            </div>
                          ) : (
                            <ShoppingBag size={16} className="text-gold-dark group-hover:text-ebony transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Panel - Category Details */}
            <div className="w-2/3 p-4 max-h-[500px] overflow-y-auto">
              {hoveredCategory ? (
                <CategoryDetails 
                  category={mainCategories.find(cat => cat.id === hoveredCategory)}
                  subcategories={getSubcategories(hoveredCategory)}
                  products={categoryProducts[hoveredCategory] || []}
                  isLoadingProducts={loadingProducts.has(hoveredCategory)}
                />
              ) : (
                <div className="flex items-center justify-center h-48 text-ebony-light">
                  <div className="text-center">
                    <Package size={36} className="mx-auto mb-3 text-gold" />
                    <p className="text-base font-medium">Prejdite myšou nad kategóriou</p>
                    <p className="text-sm">pre zobrazenie podkategórií alebo produktov</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Separate component for category details
function CategoryDetails({ 
  category, 
  subcategories,
  products,
  isLoadingProducts
}: { 
  category: HttpTypes.StoreProductCategory | undefined
  subcategories: HttpTypes.StoreProductCategory[]
  products: HttpTypes.StoreProduct[]
  isLoadingProducts: boolean
}) {
  if (!category) return null

  const imageUrl = getCategoryImageUrl(category)
  const hasSubcategories = subcategories.length > 0

  return (
    <div className="animate-fade-in">
      {/* Category Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          {imageUrl && (
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
              <Image
                src={imageUrl}
                alt={category.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-ebony">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-ebony-light mt-1">{category.description}</p>
            )}
          </div>
        </div>
        
        {/* View All Button */}
        <LocalizedClientLink
          href={`/categories/${category.handle}`}
          className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-mahogany to-mahogany-dark text-white rounded-lg hover:from-mahogany-dark hover:to-mahogany shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
        >
          Zobraziť všetko
          <ArrowRight size={14} />
        </LocalizedClientLink>
      </div>

      {/* Subcategories or Products */}
      {hasSubcategories ? (
        <div>
          <h4 className="text-base font-semibold text-ebony mb-3 flex items-center gap-2">
            <Star size={16} />
            Podkategórie
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {subcategories.map((subcategory) => {
              const subcategoryImageUrl = getCategoryImageUrl(subcategory)
              
              return (
                                  <LocalizedClientLink
                    key={subcategory.id}
                    href={`/categories/${subcategory.handle}`}
                    className="group p-3 bg-gradient-to-r from-champagne-light to-champagne rounded-lg border border-gold/20 hover:border-gold hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      {subcategoryImageUrl ? (
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={subcategoryImageUrl}
                            alt={subcategory.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gold-light rounded-lg flex items-center justify-center">
                          <Package size={16} className="text-gold-dark" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-ebony group-hover:text-ebony-dark transition-colors">
                          {subcategory.name}
                        </h5>
                        {subcategory.description && (
                          <p className="text-xs text-ebony-light line-clamp-1">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-base font-semibold text-ebony mb-3 flex items-center gap-2">
            <ShoppingBag size={16} />
            Produkty
          </h4>
          
          {/* Loading State */}
          {isLoadingProducts && (
            <div className="flex items-center justify-center h-24">
              <Loader2 size={28} className="animate-spin text-gold" />
            </div>
          )}
          
          {/* Products Grid */}
          {!isLoadingProducts && products.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {products.map((product) => (
                <LocalizedClientLink
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group p-2 bg-gradient-to-r from-champagne-light to-champagne rounded-lg border border-gold/20 hover:border-gold hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
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
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm text-ebony group-hover:text-ebony-dark transition-colors line-clamp-1">
                        {product.title}
                      </h5>
                      <p className="text-xs text-gold-dark font-semibold">
                        {getProductPrice(product)}
                      </p>
                    </div>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          )}
          
          {/* No Products State */}
          {!isLoadingProducts && products.length === 0 && (
            <div className="text-center py-6 text-ebony-light">
              <Package size={28} className="mx-auto mb-2 text-gold" />
              <p className="text-sm">Žiadne produkty v tejto kategórii</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 