import React from "react"
import { clx } from "@medusajs/ui"

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

type VariantCardProps = {
  variant: Variant
  isSelected: boolean
  onSelect: () => void
}

const getAvailabilityInfo = (availability: string) => {
  switch (availability) {
    case "in_stock":
      return { 
        text: "Na sklade", 
        color: "text-green-600", 
        bgColor: "bg-green-100", 
        icon: "●",
        badgeColor: "bg-green-500"
      }
    case "available_soon":
      return { 
        text: "Do mesiaca", 
        color: "text-orange-600", 
        bgColor: "bg-orange-100", 
        icon: "◐",
        badgeColor: "bg-orange-500"
      }
    case "unavailable":
      return { 
        text: "Nedostupné", 
        color: "text-red-600", 
        bgColor: "bg-red-100", 
        icon: "○",
        badgeColor: "bg-red-500"
      }
    default:
      return { 
        text: "Neznáme", 
        color: "text-gray-600", 
        bgColor: "bg-gray-100", 
        icon: "?",
        badgeColor: "bg-gray-500"
      }
  }
}

const VariantCard: React.FC<VariantCardProps> = ({
  variant,
  isSelected,
  onSelect,
}) => {
  const availabilityInfo = getAvailabilityInfo(variant.availability)

  return (
    <div
      onClick={onSelect}
      className={clx(
        "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-101 relative overflow-hidden",
        {
          "border-accent bg-gradient-to-br from-accent/5 to-accent-light/10 shadow-sm ring-1 ring-accent/20": isSelected,
          "border-gray-200 bg-white hover:border-accent/40 hover:shadow-sm": !isSelected,
          "opacity-50 cursor-not-allowed": variant.availability === "unavailable"
        }
      )}
    >
      {/* Gradient pozadie pre selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent-light/3 pointer-events-none"></div>
      )}

      <div className="relative flex items-center justify-between">
        {/* Základné info - kompaktnejšie */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-bold text-base text-accent-dark mb-1">
                {variant.size} mm – SHOU SUGI BAN + {variant.treatment}
              </h4>
              <p className="text-gray-600 font-medium text-sm">
                {variant.material}
              </p>
            </div>
            
            {/* Kompaktný dostupnosť badge */}
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${availabilityInfo.badgeColor}`}></div>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${availabilityInfo.bgColor} ${availabilityInfo.color}`}>
                {availabilityInfo.text}
              </span>
            </div>
          </div>
          
          {/* Kompaktné technické údaje */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">Dĺžka</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.length} m</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">€/m²</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.pricePerM2.toFixed(0)} €</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">m²/ks</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.m2PerPiece}</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">€/ks</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{(variant.pricePerM2 * variant.m2PerPiece).toFixed(0)} €</p>
            </div>
          </div>
        </div>

        {/* Kompaktný výber indikátor */}
        <div className="ml-4">
          <div
            className={clx(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-sm",
              {
                "border-accent bg-gradient-to-br from-accent to-accent-light shadow-accent/20": isSelected,
                "border-gray-300 bg-white hover:border-accent/50": !isSelected
              }
            )}
          >
            {isSelected && (
              <div className="w-3 h-3 rounded-full bg-white"></div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle hover overlay */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-light/0 hover:from-accent/2 hover:to-accent-light/2 transition-all duration-200 pointer-events-none rounded-lg"></div>
      )}
    </div>
  )
}

export default VariantCard 