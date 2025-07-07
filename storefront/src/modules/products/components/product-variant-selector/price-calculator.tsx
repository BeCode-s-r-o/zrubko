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
    <div className="bg-ui-bg-base border rounded-lg p-4 mb-4">
      <h5 className="font-medium text-base mb-3">Výpočet ceny</h5>
      
      <div className="space-y-2 text-sm">
        {/* Výpočet po kusoch */}
        <div className="flex justify-between items-center">
          <span className="text-ui-fg-subtle">
            {quantity} ks × {variant.m2PerPiece} m²/ks
          </span>
          <span className="font-medium">
            {totalM2.toFixed(2)} m²
          </span>
        </div>
        
        {/* Výpočet ceny */}
        <div className="flex justify-between items-center">
          <span className="text-ui-fg-subtle">
            {totalM2.toFixed(2)} m² × {variant.pricePerM2.toFixed(2)} €/m²
          </span>
          <span className="font-medium">
            {totalPrice.toFixed(2)} €
          </span>
        </div>
        
        {/* Deliac čiara */}
        <div className="border-t border-ui-border-base my-2"></div>
        
        {/* Celková suma */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Celková cena:</span>
          <span className="font-bold text-lg text-ui-fg-interactive">
            {totalPrice.toFixed(2)} €
          </span>
        </div>
        
        {/* Dodatočné informácie */}
        <div className="mt-3 pt-3 border-t border-ui-border-base text-xs text-ui-fg-subtle">
          <div className="flex justify-between">
            <span>Celkový obsah:</span>
            <span>{totalM2.toFixed(2)} m²</span>
          </div>
          <div className="flex justify-between">
            <span>Cena za m²:</span>
            <span>{variant.pricePerM2.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span>Počet kusov:</span>
            <span>{quantity} ks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceCalculator 