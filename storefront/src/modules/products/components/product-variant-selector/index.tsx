"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"
import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import VariantCard from "./variant-card"
import QuantitySelector from "./quantity-selector"
import PriceCalculator from "./price-calculator"

type ProductVariantSelectorProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

type DisplayVariant = {
  id: string
  title: string
  size: string
  treatment: string
  material: string
  length: number
  pricePerM2: number
  m2PerPiece: number
  availability: "in_stock" | "available_soon" | "unavailable"
  inventoryQuantity: number
  image: string
  sku?: string
  variantData: HttpTypes.StoreProductVariant
  availability_text: string
  metadata: {
    // Základné metadata
    dlzka?: string
    obklad?: string
    povrch?: string
    trieda?: string
    rozmery?: string
    pouzitie?: string
    v_baliku?: string
    typ_dreva?: string
    cena_za_m_2?: string
    
    // Nové variant metadata
    dlzka_m?: string
    cena_m2_s_dph?: string
    kusov_v_baliku?: string
    opracovanie_dreva?: string
    
    // Kalkulačné polia pre výpočty
    kalk_dlzka?: string
    kalk_plocha?: string
    kalk_kusov?: string
    systemova_cena_baliku?: string
    kalk_kusy_v_baliku?: string
    kalk_dlzka_m?: string
    kalk_plocha_balika_m2?: string
    
    [key: string]: any
  }
}

// Helper function to get option value from variant
const getOptionValue = (variant: HttpTypes.StoreProductVariant, optionTitle: string) => {
  const option = variant.options?.find(opt => opt.option?.title === optionTitle)
  return option?.value || ""
}

// Helper function to get availability status - fixed to not change after adding to cart
const getAvailabilityStatus = (variant: HttpTypes.StoreProductVariant): "in_stock" | "available_soon" | "unavailable" => {
  // If inventory is not managed, always show as in stock
  if (!variant.manage_inventory) return "in_stock"
  
  // If backorder is allowed, show as available soon
  if (variant.allow_backorder) return "available_soon"
  
  // If inventory is managed and no backorder, check if there's any inventory
  if ((variant.inventory_quantity || 0) > 0) return "in_stock"
  
  return "unavailable"
}

// ProductHeader component removed - now handled by ProductInfo component

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  product,
  region,
  countryCode,
}) => {
  // Transform real variants to display format
  const displayVariants = useMemo(() => {
    if (!product.variants) return []
    
    return product.variants.map(variant => {
      const priceInfo = getProductPrice({ product, variantId: variant.id })
      const pricePerUnit = priceInfo.variantPrice?.calculated_price_number || 0
      
      const rozmer = getOptionValue(variant, "Rozmer")
      const typ = getOptionValue(variant, "Typ")
      const title = variant.title || `${rozmer} ${typ}`.trim()
      
      console.log("Debug - Variant title creation:", {
        variantId: variant.id,
        variantTitle: variant.title,
        rozmer,
        typ,
        finalTitle: title
      })
      
      return {
        id: variant.id,
        title: title,
        variantData: variant,
        size: getOptionValue(variant, "Rozmer"),
        treatment: getOptionValue(variant, "Typ"),
        material: getOptionValue(variant, "Materiál"),
        availability: getAvailabilityStatus(variant),
        inventoryQuantity: variant.inventory_quantity || 0,
        pricePerM2: pricePerUnit,
        availability_text: getOptionValue(variant, "Dostupnosť"),
        length: 0,
        m2PerPiece: 0,
        image: variant.product?.images?.[0]?.url || "",
        sku: variant.sku || undefined, // Add SKU for inventory lookup, handle null case
        metadata: {
          dlzka: (variant.metadata?.dlzka as string) || (product.metadata?.dlzka as string) || undefined,
          obklad: (variant.metadata?.obklad as string) || (product.metadata?.obklad as string) || undefined,
          povrch: (variant.metadata?.povrch as string) || (product.metadata?.povrch as string) || undefined,
          trieda: (variant.metadata?.trieda as string) || (product.metadata?.trieda as string) || undefined,
          rozmery: (variant.metadata?.rozmery as string) || (product.metadata?.rozmery as string) || undefined,
          pouzitie: (variant.metadata?.pouzitie as string) || (product.metadata?.pouzitie as string) || undefined,
          v_baliku: (variant.metadata?.v_baliku as string) || (product.metadata?.v_baliku as string) || undefined,
          typ_dreva: (variant.metadata?.typ_dreva as string) || (product.metadata?.typ_dreva as string) || undefined,
          cena_za_m_2: (variant.metadata?.cena_za_m_2 as string) || (product.metadata?.cena_za_m_2 as string) || undefined,
          opracovanie_dreva: (variant.metadata?.opracovanie_dreva as string) || (product.metadata?.opracovanie_dreva as string) || undefined,
          ...variant.metadata
        }
      }
    })
  }, [product])

  const [selectedVariant, setSelectedVariant] = useState<DisplayVariant | null>(displayVariants[0] || null)
  const [packages, setPackages] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  // Calculations - now using backend price multiplied by packages
  const totalPrice = selectedVariant ? 
    (selectedVariant.pricePerM2 * packages) : 0

  const handleAddToCart = async () => {
    if (!selectedVariant?.variantData?.id) return
    
    setIsAdding(true)
    
    try {
      await addToCart({
        variantId: selectedVariant.variantData.id,
        quantity: packages,
        countryCode,
      })
      // TODO: Add success notification
    } catch (error) {
      console.error("Error adding to cart:", error)
      // TODO: Add error notification
    } finally {
      setIsAdding(false)
    }
  }

  if (!displayVariants.length) {
    return (
      <div className="flex flex-col gap-6 h-full">
        <div className="p-8 text-center bg-amber-50 rounded-lg border border-amber-200">
          <p className="mb-2 font-medium text-amber-800">Žiadne varianty nie sú k dispozícii</p>
          <p className="text-sm text-amber-600">
            Tento produkt nemá nakonfigurované varianty. Kontaktujte nás pre viac informácií.
          </p>
          {/* Debug info - remove in production */}
          <details className="mt-4 text-left">
            <summary className="text-sm text-gray-600 cursor-pointer">Debug info (pre vývojárov)</summary>
            <pre className="overflow-auto p-2 mt-2 text-xs bg-gray-100 rounded">
              {JSON.stringify({
                productId: product.id,
                hasVariants: !!product.variants,
                variantsLength: product.variants?.length || 0,
                variants: product.variants,
                hasOptions: !!product.options,
                optionsLength: product.options?.length || 0,
                options: product.options
              }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Variant selector - ALWAYS FIRST on mobile */}
      <div className="">
        <div className="my-2">
          <p className="text-xl lg:text-2xl">Dostupné varianty</p>
          <p className="mt-1 text-sm text-gray-600 lg:text-base">Vyberte si rozmer a typ spracovania</p>
        </div>
        
        <div className="">
          {displayVariants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              isSelected={selectedVariant?.id === variant.id}
              onSelect={() => setSelectedVariant(variant)}
              allVariants={displayVariants}
            />
          ))}
        </div>
      </div>

      {/* Selected variant details */}
      {selectedVariant && (
        <div className="overflow-hidden bg-white rounded-2xl border shadow-xl border-accent/10">
          {/* Professional header with enhanced design */}
          <div className="relative px-6 py-4 bg-gradient-to-r from-accent-dark via-accent to-accent-light">
            {/* Subtle pattern overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-dark/20 to-accent-light/20"></div>
            
            {/* Content with proper layering */}
            <div className="relative z-10">
              {/* Vybraný variant: [title] on one row with enhanced typography */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xl tracking-tight text-white">
                    Vybraný variant:
                  </span>
                  <span className="ml-3 max-w-xs text-xl font-bold truncate text-white/95">
                    {selectedVariant.title}
                  </span>
                </div>
                {/* Professional badge/indicator */}
                <div className="hidden items-center px-3 py-1 rounded-full backdrop-blur-sm sm:flex bg-white/20">
                  <div className="mr-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-white">Aktívny</span>
                </div>
              </div>
              
            
             
            </div>
          </div>
          
          {/* Enhanced content area */}
          <div className="p-6 lg:p-8">
            <div className="space-y-6">
              {/* Quantity selector with integrated Add to cart button */}
              <QuantitySelector
                quantity={packages}
                onQuantityChange={setPackages}
                availability={selectedVariant.availability}
                variantTitle={selectedVariant.title}
                onAddToCart={handleAddToCart}
                isAdding={isAdding}
                totalPrice={totalPrice}
              />

              {/* Price calculator below for better UX */}
              <PriceCalculator
                variant={selectedVariant}
                packages={packages}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductVariantSelector 