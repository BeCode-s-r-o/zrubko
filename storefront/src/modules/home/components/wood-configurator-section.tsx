"use client"

import { Home, Trees, Waves, Flame, Grid3X3, ChevronRight, Sparkles, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { listCategories } from "@lib/data/categories"
import { getProductsListWithSort } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRegion } from "@lib/context/region-context"
import { HttpTypes } from "@medusajs/types"

type Category = HttpTypes.StoreProductCategory
type Product = HttpTypes.StoreProduct

const WoodConfiguratorSection = () => {
  const { currentCountryCode } = useRegion()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<'interior' | 'exterior' | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        const fetchedCategories = await listCategories()
        setCategories(fetchedCategories || [])
      } catch (err) {
        console.error('Failed to load categories:', err)
        setError('Nepodarilo sa načítať kategórie')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Load products when category is selected
  useEffect(() => {
    const loadProducts = async () => {
      if (!selectedCategory) return

      try {
        const { response: { products: fetchedProducts } } = await getProductsListWithSort({
          page: 1,
          queryParams: {
            limit: 6,
            category_id: [selectedCategory.id]
          } as any,
          countryCode: currentCountryCode
        })
        setProducts(fetchedProducts || [])
      } catch (err) {
        console.error('Failed to load products:', err)
        setError('Nepodarilo sa načítať produkty')
      }
    }

    if (selectedCategory) {
      loadProducts()
    }
  }, [selectedCategory, currentCountryCode])

  // Filter categories by type
  const getCategoriesByType = (type: 'interior' | 'exterior') => {
    return categories.filter(category =>
      (category.metadata as any)?.type === type ||
      // Fallback: check category names for type identification
      (type === 'interior' && ['obklady', 'podlahy', 'sauna', 'stien', 'podlah'].some(keyword =>
        category.name.toLowerCase().includes(keyword)
      )) ||
      (type === 'exterior' && ['terasy', 'fasády', 'záhrada', 'exteriér', 'vonku'].some(keyword =>
        category.name.toLowerCase().includes(keyword)
      ))
    )
  }

  const handleTypeSelect = (type: 'interior' | 'exterior') => {
    setSelectedType(type)
    setCurrentStep(2)
    setError(null)
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setCurrentStep(3)
    setError(null)
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setSelectedType(null)
    setSelectedCategory(null)
    setError(null)
  }

  const getIconForType = (type: 'interior' | 'exterior') => {
    return type === 'interior' ? Home : Trees
  }

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('obklady') || name.includes('stien')) return Grid3X3
    if (name.includes('podlah')) return Home
    if (name.includes('sauna')) return Flame
    if (name.includes('terasy')) return Waves
    if (name.includes('fasád')) return Home
    if (name.includes('záhrad')) return Trees
    return Grid3X3
  }

  const formatPrice = (product: Product) => {
    const variant = product.variants?.[0]
    if (variant?.calculated_price) {
      const amount = variant.calculated_price.calculated_amount
      const currency = variant.calculated_price.currency_code
      if (amount && currency) {
        return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`
      }
    }
    return 'Cena na vyžiadanie'
  }

  const getCategoryDescription = (categoryName: string) => {
    const name = categoryName.toLowerCase()

    if (name.includes('obklady') || name.includes('stien')) {
      return 'dub • borovica • smrek • thermo'
    }
    if (name.includes('podlah')) {
      return 'masívne • trojvrstvé • parkety'
    }
    if (name.includes('sauna') || name.includes('saunov')) {
      return 'cédrové • smrekové • thermo'
    }
    if (name.includes('terasy') || name.includes('terasa')) {
      return 'teak • bangkirai • smrek • thermo'
    }
    if (name.includes('fasád') || name.includes('fasady')) {
      return 'cédrové • smrekové • thermo'
    }
    if (name.includes('záhrad') || name.includes('zahrada')) {
      return 'akácie • borovica • smrek'
    }
    if (name.includes('hranoly') || name.includes('lišty')) {
      return 'dub • borovica • smrek • thermo'
    }

    return 'kvalitné drevené materiály'
  }

  if (error) {
    return (
      <section className="py-16 w-full bg-slate-50">
        <div className="px-6 mx-auto max-w-4xl text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-normal text-red-800 mb-2">Nastala chyba</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-normal transition-colors duration-200"
            >
              Skúsiť znovu
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 lg:py-12 w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-6 lg:mb-8 text-center">
          <h2 className="mb-3 text-xl sm:text-2xl lg:text-3xl font-light leading-tight text-black">
            Výber materiálov
          </h2>

          <div className="mx-auto mb-3 w-12 h-px bg-secondary"></div>

          <p className="mx-auto max-w-xl text-sm sm:text-base font-light leading-relaxed text-black/70">
            Jednoduchý 3-krokový proces pre výber materiálov.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 lg:mb-10">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-normal text-xs sm:text-sm transition-all duration-500 ${
                  currentStep >= step
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : currentStep === step - 1 && currentStep > 0
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    step
                  )}
                </div>

                {step < 3 && (
                  <div className={`w-8 sm:w-12 lg:w-16 h-1 mx-1 sm:mx-2 lg:mx-3 rounded-full transition-all duration-500 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mx-auto max-w-8xl">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-secondary animate-spin mb-3" />
              <p className="text-sm text-black/60">Načítavam kategórie...</p>
            </div>
          )}

          {/* Step 1: Interior/Exterior Selection */}
          {currentStep === 1 && !loading && (
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <div className="text-center">
                <h3 className="mb-3 text-xl sm:text-2xl font-normal text-black">Vyberte typ projektu</h3>
                <p className="text-base text-black/60">Kde plánujete použiť drevené materiály?</p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
                {[
                  {
                    type: 'interior' as const,
                    title: 'Interiér',
                    description: 'Prémiové drevené obklady, podlahy a saunové materiály',
                    icon: Home,
                    iconColor: 'text-slate-600'
                  },
                  {
                    type: 'exterior' as const,
                    title: 'Exteriér',
                    description: 'Odolné terasy, fasády a záhradné riešenia',
                    icon: Trees,
                    iconColor: 'text-slate-600'
                  }
                ].map((option) => {
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.type}
                      onClick={() => handleTypeSelect(option.type)}
                      className="group bg-white border-2 border-slate-200 hover:border-secondary hover:bg-slate-50 transition-all duration-300 p-6 sm:p-8 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 ${option.iconColor} flex items-center justify-center group-hover:text-secondary transition-colors duration-300`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg sm:text-xl font-normal text-slate-900 mb-2 group-hover:text-secondary transition-colors duration-300">
                            {option.title}
                          </h4>
                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            {option.description}
                          </p>
                        </div>

                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-4 h-4 text-secondary" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Category Selection */}
          {currentStep === 2 && selectedType && (
            <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
              <div className="text-center">
                <button
                  onClick={resetWizard}
                  className="inline-flex items-center gap-1 mb-4 px-3 py-1 text-xs font-normal text-black/60 hover:text-black hover:bg-black/5 rounded-md transition-all duration-200"
                >
                  <ChevronRight className="w-3 h-3 rotate-180" />
                  Späť na výber typu
                </button>
                <h3 className="mb-3 text-xl sm:text-2xl font-normal text-black">
                  Vyberte kategóriu ({selectedType === 'interior' ? 'Interiér' : 'Exteriér'})
                </h3>
                <p className="text-sm text-black/60">Pre aký účel potrebujete drevo?</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getCategoriesByType(selectedType).map((category, index) => {
                  const IconComponent = getIconForCategory(category.name)
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="group p-4 sm:p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-secondary hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] animate-in fade-in-50 duration-300"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="text-center">
                        <div className="aspect-[4/3] w-full bg-gray-100 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                          {(category.metadata as any)?.image_url ? (
                            <img
                              src={(category.metadata as any).image_url}
                              alt={category.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/api/placeholder/400/400'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-base sm:text-lg font-normal text-black group-hover:text-secondary transition-colors">
                          {category.name}
                        </h4>
                        <div className="mt-1 text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
                          {getCategoryDescription(category.name)}
                        </div>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-4 h-4 mx-auto text-secondary" />
                        </div>
                      </div>
                    </button>
                  )
                })}

                {getCategoriesByType(selectedType).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <div className="text-4xl mb-3">🏗️</div>
                    <h4 className="text-lg font-normal text-black/60 mb-2">
                      Žiadne kategórie pre {selectedType === 'interior' ? 'interiér' : 'exteriér'}
                    </h4>
                    <p className="text-sm text-black/40">
                      Kategórie sa načítavajú alebo nie sú dostupné
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Product Preview */}
          {currentStep === 3 && selectedCategory && (
            <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
              <div className="text-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 mb-4 px-3 py-1 text-xs font-normal text-black/60 hover:text-black hover:bg-black/5 rounded-md transition-all duration-200"
                >
                  <ChevronRight className="w-3 h-3 rotate-180" />
                  Späť na kategórie
                </button>
                <h3 className="mb-3 text-xl sm:text-2xl font-normal text-black">
                  Odporúčané produkty
                </h3>
                <p className="text-sm text-black/60">
                  Vyberte si z našich najlepších produktov pre kategóriu "{selectedCategory.name}"
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <LocalizedClientLink
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl border-2 border-gray-100 hover:border-secondary hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] overflow-hidden animate-in fade-in-50 duration-300"
                         style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.thumbnail || '/api/placeholder/400/400'}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/api/placeholder/400/400'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-4">
                        <h4 className="mb-2 text-base sm:text-lg font-normal text-black group-hover:text-secondary transition-colors line-clamp-2">
                          {product.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-lg sm:text-xl font-normal text-secondary">
                            {formatPrice(product)}
                          </p>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                            <ArrowRight className="w-4 h-4 text-secondary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </LocalizedClientLink>
                ))}

                {products.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <div className="text-4xl mb-3">📦</div>
                    <h4 className="text-lg font-normal text-black/60 mb-2">
                      Žiadne produkty v tejto kategórii
                    </h4>
                    <p className="text-sm text-black/40 mb-4">
                      Produkty sa načítavajú alebo nie sú dostupné
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-md font-normal transition-colors duration-200 text-sm"
                    >
                      <ChevronRight className="w-3 h-3 rotate-180" />
                      Späť na kategórie
                    </button>
                  </div>
                )}
              </div>

              {products.length > 0 && (
                <div className="pt-6 text-center">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <LocalizedClientLink
                      href={`/categories/${selectedCategory.handle}`}
                      className="inline-flex items-center gap-1 px-6 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-normal transition-all duration-200 hover:shadow-md text-sm"
                    >
                      Zobraziť všetky produkty
                      <ArrowRight className="w-3 h-3" />
                    </LocalizedClientLink>

                    <button
                      onClick={resetWizard}
                      className="px-6 py-2 font-normal text-black bg-white rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm"
                    >
                      Začať znovu
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default WoodConfiguratorSection 