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
      {/* Kompaktný nadpis s gradientom */}
      <div className="mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent mb-2">
          SHOU SUGI BAN + kartáč + olej
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Tradičná japonská technika spracowania dreva
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent-light rounded-full mt-3"></div>
      </div>

      {/* Kompaktný variant selector */}
      <div className="bg-white rounded-xl shadow-md border border-accent/10 overflow-hidden">
        <div className="bg-gradient-to-r from-accent/5 to-accent-light/5 px-5 py-3 border-b border-accent/10">
          <h3 className="text-lg font-semibold text-accent-dark">Dostupné varianty</h3>
          <p className="text-xs text-gray-600 mt-0.5">Vyberte si rozmer a typ spracovania</p>
        </div>
        
        <div className="p-4 space-y-3">
          {mockVariants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              isSelected={selectedVariant.id === variant.id}
              onSelect={() => setSelectedVariant(variant)}
            />
          ))}
        </div>
      </div>

      {/* Kompaktný vybraný variant */}
      {selectedVariant && (
        <div className="bg-gradient-to-br from-white to-accent-light/10 rounded-xl shadow-md border border-accent/20 overflow-hidden">
          <div className="bg-gradient-to-r from-accent to-accent-light px-5 py-3">
            <h4 className="font-semibold text-lg text-white">Vybraný variant</h4>
            <p className="text-accent-light text-xs mt-0.5">Finalizujte svoju objednávku</p>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Detaily variantu - kompaktnejšie */}
              <div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-accent/10 mb-4">
                  <h5 className="font-semibold text-base text-accent-dark mb-2">
                    {selectedVariant.size} mm – SHOU SUGI BAN + {selectedVariant.treatment}
                  </h5>
                  <p className="text-gray-600 mb-3 font-medium text-sm">
                    {selectedVariant.material}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-accent-light/10 rounded-lg p-2.5">
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Dĺžka</span>
                      <p className="text-accent-dark font-bold text-base">{selectedVariant.length} m</p>
                    </div>
                    <div className="bg-accent-light/10 rounded-lg p-2.5">
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Cena za m²</span>
                      <p className="text-accent-dark font-bold text-base">{selectedVariant.pricePerM2.toFixed(2)} €</p>
                    </div>
                    <div className="bg-accent-light/10 rounded-lg p-2.5">
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">M² v 1 ks</span>
                      <p className="text-accent-dark font-bold text-base">{selectedVariant.m2PerPiece} m²</p>
                    </div>
                    <div className="bg-accent-light/10 rounded-lg p-2.5">
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Dostupnosť</span>
                      <p className="text-green-600 font-bold text-sm">Na sklade</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={selectedVariant.availability === "unavailable" || isAdding}
                  className="w-full h-12 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  isLoading={isAdding}
                >
                  {selectedVariant.availability === "unavailable" 
                    ? "Nedostupné"
                    : `Pridať do košíka - ${totalPrice.toFixed(2)} €`
                  }
                </Button>
              </div>

              {/* Kalkulačka - kompaktnejšia */}
              <div className="space-y-4">
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
        </div>
      )}
    </div>
  )
}

export default ProductVariantSelector 