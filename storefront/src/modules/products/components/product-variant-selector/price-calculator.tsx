import React from "react"

type Variant = {
  id: string
  size: string
  treatment: string
  material: string
  length: number
  pricePerM2: number
  m2PerPiece: number
  availability: "in_stock" | "available_soon" | "unavailable"
  image: string
}

type PriceCalculatorProps = {
  variant: Variant
  quantity: number
  totalM2: number
  totalPrice: number
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  variant,
  quantity,
  totalM2,
  totalPrice,
}) => {
  return (
    <div className="bg-white border border-accent/20 rounded-lg p-4 shadow-sm">
      <h5 className="font-semibold text-base mb-3 text-accent-dark">Výpočet ceny</h5>
      
      <div className="space-y-2 text-sm">
        {/* Výpočet po kusoch */}
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-600">
            {quantity} ks × {variant.m2PerPiece} m²/ks
          </span>
          <span className="font-semibold text-accent-dark">
            {totalM2.toFixed(2)} m²
          </span>
        </div>
        
        {/* Výpočet ceny */}
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-600">
            {totalM2.toFixed(2)} m² × {variant.pricePerM2.toFixed(2)} €/m²
          </span>
          <span className="font-semibold text-accent-dark">
            {totalPrice.toFixed(2)} €
          </span>
        </div>
        
        {/* Deliac čiara */}
        <div className="border-t border-accent/20 my-2"></div>
        
        {/* Celková suma */}
        <div className="flex justify-between items-center py-2 bg-gradient-to-r from-accent/5 to-accent-light/5 rounded-lg px-3">
          <span className="font-bold text-accent-dark">Celková cena:</span>
          <span className="font-bold text-xl text-accent">
            {totalPrice.toFixed(2)} €
          </span>
        </div>
        
        {/* Dodatočné informácie - kompaktné */}
        <div className="mt-3 pt-3 border-t border-accent/10 text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Celkový obsah:</span>
            <span className="font-medium">{totalM2.toFixed(2)} m²</span>
          </div>
          <div className="flex justify-between">
            <span>Cena za m²:</span>
            <span className="font-medium">{variant.pricePerM2.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span>Počet kusov:</span>
            <span className="font-medium">{quantity} ks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceCalculator 