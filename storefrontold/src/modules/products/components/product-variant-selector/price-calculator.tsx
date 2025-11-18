import React from "react"

type Variant = {
  id: string
  title: string // Add title to variant type
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
  const pricePerPackage = parseFloat(variant.metadata.systemova_cena_baliku || "0") || 0

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm border-accent/20">
      {/* Simple title and subtitle */}
      <div className="mb-4">

        <p className="mt-1 text-sm text-gray-600">
          Výpočet ceny
        </p>
      </div>
      
      {/* Divider */}
      <div className="mb-4 border-t border-accent/20"></div>
      
      {/* Simple calculation details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Počet balíkov:</span>
          <span className="font-medium text-accent-dark">{packages} balík</span>
        </div>
        
        {variant.metadata.kalk_kusy_v_baliku && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Celkom kusov:</span>
            <span className="font-medium text-accent-dark">{totalPieces.toFixed(0)} ks</span>
          </div>
        )}
        
        {variant.metadata.kalk_plocha_balika_m2 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Celková plocha:</span>
            <span className="font-medium text-accent-dark">{totalArea.toFixed(2)} m²</span>
          </div>
        )}
        
        {variant.metadata.kalk_dlzka_m && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Celková dĺžka:</span>
            <span className="font-medium text-accent-dark">{totalLength.toFixed(2)} m</span>
          </div>
        )}
        
        {pricePerPackage > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Cena za balík:</span>
            <span className="font-medium text-accent-dark">{pricePerPackage.toFixed(2)} €</span>
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className="my-4 border-t border-accent/20"></div>
      
      {/* Total price - prominent */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-accent-dark">Celková cena:</span>
        <span className="text-lg font-bold text-accent-dark">
          {totalPrice.toFixed(2)} €
        </span>
      </div>
    </div>
  )
}

export default PriceCalculator 