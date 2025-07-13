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
  size: string
  treatment: string
  material: string
  length: number
  pricePerM2: number
  m2PerPiece: number
  availability: "in_stock" | "available_soon" | "unavailable"
  image: string
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

// Helper function to get availability status
const getAvailabilityStatus = (variant: HttpTypes.StoreProductVariant): "in_stock" | "available_soon" | "unavailable" => {
  if (!variant.manage_inventory) return "in_stock"
  if (variant.allow_backorder) return "available_soon"
  if ((variant.inventory_quantity || 0) > 0) return "in_stock"
  return "unavailable"
}

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
      // Use backend price directly without conversion
      
      return {
        id: variant.id,
        variantData: variant,
        size: getOptionValue(variant, "Rozmer"),
        treatment: getOptionValue(variant, "Typ"),
        material: getOptionValue(variant, "Materiál"),
        availability: getAvailabilityStatus(variant),
        pricePerM2: pricePerUnit,
        availability_text: getOptionValue(variant, "Dostupnosť"),
        length: 0,
        m2PerPiece: 0,
        image: variant.product?.images?.[0]?.url || "",
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
          ...variant.metadata
        }
      }
    })
  }, [product])

  const [selectedVariant, setSelectedVariant] = useState<DisplayVariant | null>(displayVariants[0] || null)
  const [packages, setPackages] = useState(1) // Zmenené z quantity na packages
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
        quantity: packages, // Changed to packages
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
        {/* Dynamic product title and description */}
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent mb-2 md:mb-3 leading-tight">
            {product.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 md:mt-4"></div>
        </div>


        
        <div className="text-center p-8 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 font-medium mb-2">Žiadne varianty nie sú k dispozícii</p>
          <p className="text-amber-600 text-sm">
            Tento produkt nemá nakonfigurované varianty. Kontaktujte nás pre viac informácií.
          </p>
          {/* Debug info - remove in production */}
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-600">Debug info (pre vývojárov)</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
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
      {/* Dynamic product title and description */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent mb-2 md:mb-3 leading-tight">
          {product.title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
          {product.description}
        </p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 md:mt-4"></div>
      </div>

      {/* Variant selector */}
      <div className="bg-white rounded-xl shadow-md border border-accent/10 overflow-hidden flex-1">
        <div className="bg-gradient-to-r from-accent/5 to-accent-light/5 px-6 py-4 border-b border-accent/10">
          <h3 className="text-xl lg:text-2xl font-semibold text-accent-dark">Dostupné varianty</h3>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Vyberte si rozmer a typ spracovania</p>
        </div>
        
        <div className="p-6 space-y-4">
          {displayVariants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              isSelected={selectedVariant?.id === variant.id}
              onSelect={() => setSelectedVariant(variant)}
            />
          ))}
        </div>
      </div>

      {/* Selected variant details */}
      {selectedVariant && (
        <div className="bg-gradient-to-br from-white to-accent-light/10 rounded-xl shadow-md border border-accent/20 overflow-hidden">
          <div className="bg-gradient-to-r from-accent to-accent-light px-6 py-4">
            <h4 className="font-semibold text-xl lg:text-2xl text-white">Vybraný variant</h4>
            <p className="text-white text-sm lg:text-base mt-1">Finalizujte svoju objednávku</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Variant details */}
              {/* Only render the variant details card if at least one of rozmer or povrch is present */}
              {(selectedVariant.metadata.rozmery || selectedVariant.metadata.povrch) && (
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-accent/10">
                  <h5 className="font-bold text-lg md:text-xl lg:text-2xl text-accent-dark mb-3 md:mb-4 leading-tight">
                    {selectedVariant.metadata.rozmery || ''}{selectedVariant.metadata.rozmery && selectedVariant.metadata.povrch ? ' – ' : ''}{selectedVariant.metadata.povrch || ''}
                  </h5>
                </div>
              )}

              {/* Quantity and price calculator */}
              {/* Always vertical layout for quantity selector and price calculator */}
              <div className="flex flex-col gap-6">
                <QuantitySelector
                  quantity={packages}
                  onQuantityChange={setPackages}
                  availability={selectedVariant.availability}
                />
                <PriceCalculator
                  variant={selectedVariant}
                  packages={packages}
                  totalPrice={totalPrice}
                />
              </div>

              {/* Add to cart button */}
              <Button
                onClick={handleAddToCart}
                disabled={selectedVariant.availability === "unavailable" || isAdding}
                className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                isLoading={isAdding}
              >
                {isAdding ? "Pridávam..." : 
                 selectedVariant.availability === "unavailable" ? "Nedostupné" :
                 `Pridať do košíka - ${totalPrice.toFixed(2)} €`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductVariantSelector 