"use client"

import React, { useState } from "react"
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"
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
    <div className="flex flex-col gap-6 h-full">
      {/* Roztiahnutý nadpis */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent mb-2 md:mb-3 leading-tight">
          SHOU SUGI BAN + kartáč + olej
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
          Tradičná japonská technika spracowania dreva
        </p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 md:mt-4"></div>
      </div>

      {/* Rozšírený variant selector */}
      <div className="bg-white rounded-xl shadow-md border border-accent/10 overflow-hidden flex-1">
        <div className="bg-gradient-to-r from-accent/5 to-accent-light/5 px-6 py-4 border-b border-accent/10">
          <h3 className="text-xl lg:text-2xl font-semibold text-accent-dark">Dostupné varianty</h3>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Vyberte si rozmer a typ spracovania</p>
        </div>
        
        <div className="p-6 space-y-4">
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

      {/* Rozšírený vybraný variant */}
      {selectedVariant && (
        <div className="bg-gradient-to-br from-white to-accent-light/10 rounded-xl shadow-md border border-accent/20 overflow-hidden">
          <div className="bg-gradient-to-r from-accent to-accent-light px-6 py-4">
            <h4 className="font-semibold text-xl lg:text-2xl text-white">Vybraný variant</h4>
            <p className="text-accent-light text-sm lg:text-base mt-1">Finalizujte svoju objednávku</p>
          </div>
          
          <div className="p-6">
            {/* Single column layout pre lepšie využitie priestoru */}
            <div className="space-y-6">
              {/* Rozšírené detaily variantu */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-accent/10">
                <h5 className="font-bold text-lg md:text-xl lg:text-2xl text-accent-dark mb-3 md:mb-4 leading-tight">
                  {selectedVariant.size} mm – SHOU SUGI BAN + {selectedVariant.treatment}
                </h5>
                <p className="text-gray-600 mb-4 md:mb-6 font-semibold text-base md:text-lg">
                  {selectedVariant.material.includes('AB') ? (
                    <>
                      Sibírsky smrek{' '}
                      <Link 
                        href="/kvalita-ab" 
                        className="text-amber-600 hover:text-amber-700 underline decoration-amber-300 hover:decoration-amber-500 transition-colors"
                        title="Dozvedieť sa viac o kvalite AB"
                      >
                        AB
                      </Link>
                    </>
                  ) : (
                    selectedVariant.material
                  )}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 md:mb-6">
                  <div className="bg-accent-light/10 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 text-center min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide block mb-1 sm:mb-2">Dĺžka</span>
                    <p className="text-accent-dark font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">{selectedVariant.length} m</p>
                  </div>
                  <div className="bg-accent-light/10 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 text-center min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide block mb-1 sm:mb-2">Cena za m²</span>
                    <p className="text-accent-dark font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">{selectedVariant.pricePerM2.toFixed(2)} €</p>
                  </div>
                  <div className="bg-accent-light/10 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 text-center min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide block mb-1 sm:mb-2">M² v 1 ks</span>
                    <p className="text-accent-dark font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">{selectedVariant.m2PerPiece} m²</p>
                  </div>
                  <div className={`rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 min-h-[80px] sm:min-h-[90px] flex flex-col items-center justify-center text-center ${
                    selectedVariant.availability === "in_stock" 
                      ? "bg-green-50 border border-green-200" 
                      : selectedVariant.availability === "available_soon"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-red-50 border border-red-200"
                  }`}>
                    <span className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2 text-center leading-tight">
                      Dostupnosť
                    </span>
                    <p className={`font-bold text-center leading-tight break-words max-w-full ${
                      selectedVariant.availability === "in_stock" 
                        ? "text-green-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg" 
                        : selectedVariant.availability === "available_soon"
                        ? "text-yellow-600 text-xs sm:text-sm md:text-base lg:text-sm xl:text-base"
                        : "text-red-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg"
                    }`}>
                      {selectedVariant.availability === "in_stock" && "Na sklade"}
                      {selectedVariant.availability === "available_soon" && (
                        <span className="block">
                          <span className="block sm:inline">Čoskoro</span>
                          <span className="block sm:inline sm:ml-1">dostupné</span>
                        </span>
                      )}
                      {selectedVariant.availability === "unavailable" && "Nedostupné"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rozšírená kalkulačka a množstvo na jednom riadku */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              {/* Rozšírené tlačidlo */}
              <Button
                onClick={handleAddToCart}
                disabled={selectedVariant.availability === "unavailable" || isAdding}
                className="w-full h-12 md:h-14 lg:h-16 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white font-bold text-base md:text-lg lg:text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                isLoading={isAdding}
              >
                {selectedVariant.availability === "unavailable" 
                  ? "Nedostupné"
                  : `Pridať do košíka - ${totalPrice.toFixed(2)} €`
                }
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductVariantSelector 