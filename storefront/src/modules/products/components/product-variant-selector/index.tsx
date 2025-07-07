"use client"

import React, { useState } from "react"
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import VariantCard from "./variant-card"
import QuantitySelector from "./quantity-selector"
import PriceCalculator from "./price-calculator"

type ProductVariantSelectorProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

// Simulované dáta pre varianty (neskôr z API)
const mockVariants = [
  {
    id: "var_1",
    size: "20×140",
    treatment: "kartáč + olej",
    material: "Sibírsky smrek AB",
    length: 6,
    pricePerM2: 46.00,
    m2PerPiece: 0.88,
    availability: "in_stock",
    image: "/wood-1.jpg"
  },
  {
    id: "var_2", 
    size: "20×146",
    treatment: "kartáč + olej",
    material: "Sibírsky smrek AB",
    length: 6,
    pricePerM2: 49.00,
    m2PerPiece: 0.88,
    availability: "available_soon",
    image: "/wood-2.jpg"
  },
  {
    id: "var_3",
    size: "20×140",
    treatment: "extra + olej", 
    material: "Sibírsky smrekovec",
    length: 3.9,
    pricePerM2: 65.90,
    m2PerPiece: 0.55,
    availability: "in_stock",
    image: "/wood-3.jpg"
  }
]

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  product,
  region,
  countryCode,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(mockVariants[0])
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  // Výpočty
  const totalM2 = selectedVariant.m2PerPiece * quantity
  const totalPrice = totalM2 * selectedVariant.pricePerM2

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Simulácia pridania do košíka
    // await addToCart({
    //   variantId: selectedVariant.id,
    //   quantity: quantity,
    //   countryCode,
    // })
    
    setTimeout(() => {
      setIsAdding(false)
      // Zobrazenie notifikácie o úspešnom pridaní
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Nadpis produktu */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-ui-fg-base mb-2">
          SHOU SUGI BAN + kartáč + olej
        </h1>
        <p className="text-base text-ui-fg-subtle">
          Tradičná japonská technika spracowania dreva
        </p>
      </div>

      {/* Varianty */}
      <div className="grid grid-cols-1 gap-4">
        {mockVariants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            isSelected={selectedVariant.id === variant.id}
            onSelect={() => setSelectedVariant(variant)}
          />
        ))}
      </div>

      {/* Vybraný variant - detail a objednávka */}
      {selectedVariant && (
        <div className="bg-ui-bg-subtle rounded-lg p-6">
          <h4 className="font-semibold text-lg mb-4">Vybraný variant</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detaily variantu */}
            <div>
              <h5 className="font-medium text-base mb-2">
                {selectedVariant.size} mm – SHOU SUGI BAN + {selectedVariant.treatment}
              </h5>
              <p className="text-sm text-ui-fg-subtle mb-3">
                {selectedVariant.material}
              </p>
              
              <div className="space-y-2 text-sm mb-8">
                <div className="flex justify-between">
                  <span>Dĺžka:</span>
                  <span>{selectedVariant.length} m</span>
                </div>
                <div className="flex justify-between">
                  <span>Cena za m²:</span>
                  <span className="font-medium">{selectedVariant.pricePerM2.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>M² v 1 ks:</span>
                  <span>{selectedVariant.m2PerPiece} m²</span>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={selectedVariant.availability === "unavailable" || isAdding}
                variant="primary"
                className="w-full h-12"
                isLoading={isAdding}
              >
                {selectedVariant.availability === "unavailable" 
                  ? "Nedostupné"
                  : `Pridať do košíka - ${totalPrice.toFixed(2)} €`
                }
              </Button>
            </div>

            {/* Kalkulačka */}
            <div>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                availability={selectedVariant.availability}
              />
              
              <PriceCalculator
                variant={selectedVariant}
                quantity={quantity}
                totalM2={totalM2}
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