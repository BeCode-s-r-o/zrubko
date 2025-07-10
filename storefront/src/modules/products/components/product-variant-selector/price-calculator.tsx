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
  metadata: {
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

type PriceCalculatorProps = {
  variant: Variant
  packages: number // Zmenené z quantity na packages
  totalPrice: number
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  variant,
  packages,
  totalPrice,
}) => {
  // Vypočítané hodnoty na základe počtu balíkov
  const totalPieces = packages * (parseFloat(variant.metadata.kalk_kusy_v_baliku || "0") || 0)
  const totalArea = packages * (parseFloat(variant.metadata.kalk_plocha_balika_m2 || "0") || 0)
  const totalLength = packages * (parseFloat(variant.metadata.kalk_dlzka_m || "0") || 0)

  return (
    <div className="bg-white border border-accent/20 rounded-lg p-4 shadow-sm">
      <h5 className="font-semibold text-base mb-3 text-accent-dark">Výpočet ceny</h5>
      
      <div className="space-y-2 text-sm">
        {/* Počet balíkov */}
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-600">Počet balíkov:</span>
          <span className="font-semibold text-accent-dark">{packages} ks</span>
        </div>
        
        {/* Kalkulačné údaje */}
        {variant.metadata.kalk_kusy_v_baliku && (
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Celkom kusov:</span>
            <span className="font-semibold text-accent-dark">{totalPieces.toFixed(0)} ks</span>
          </div>
        )}
        
        {variant.metadata.kalk_plocha_balika_m2 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Celková plocha:</span>
            <span className="font-semibold text-accent-dark">{totalArea.toFixed(2)} m²</span>
          </div>
        )}
        
        {variant.metadata.kalk_dlzka_m && (
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Celková dĺžka:</span>
            <span className="font-semibold text-accent-dark">{totalLength.toFixed(2)} m</span>
          </div>
        )}
        
        {/* Deliac čiara */}
        <div className="border-t border-accent/20 my-2"></div>
        
        {/* Celková suma */}
        <div className="flex justify-between items-center py-2 bg-gradient-to-r from-accent/5 to-accent-light/5 rounded-lg px-3">
          <span className="font-bold text-accent-dark">Celková cena:</span>
          <span className="font-bold text-xl text-accent">
            {totalPrice.toFixed(2)} €
          </span>
        </div>
      </div>
    </div>
  )
}

export default PriceCalculator 