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
      return { text: "Na sklade", color: "text-green-600", bgColor: "bg-green-100", icon: "●" }
    case "available_soon":
      return { text: "Do mesiaca", color: "text-orange-600", bgColor: "bg-orange-100", icon: "◐" }
    case "unavailable":
      return { text: "Nedostupné", color: "text-red-600", bgColor: "bg-red-100", icon: "○" }
    default:
      return { text: "Neznáme", color: "text-gray-600", bgColor: "bg-gray-100", icon: "?" }
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
        "border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
        {
          "border-ui-border-interactive bg-ui-bg-interactive/10 shadow-sm": isSelected,
          "border-ui-border-base bg-ui-bg-base hover:border-ui-border-strong": !isSelected,
          "opacity-50 cursor-not-allowed": variant.availability === "unavailable"
        }
      )}
    >
      <div className="flex items-center justify-between">
        {/* Základné info */}
        <div className="flex-1">
          <h4 className="font-semibold text-base mb-1">
            {variant.size} mm – SHOU SUGI BAN + {variant.treatment}
          </h4>
          <p className="text-sm text-ui-fg-subtle mb-2">
            {variant.material}
          </p>
          
          {/* Technické údaje */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-ui-fg-subtle">Dĺžka:</span>
              <p className="font-medium">{variant.length} m</p>
            </div>
            <div>
              <span className="text-ui-fg-subtle">Cena/m²:</span>
              <p className="font-medium">{variant.pricePerM2.toFixed(2)} €</p>
            </div>
            <div>
              <span className="text-ui-fg-subtle">M² v 1 ks:</span>
              <p className="font-medium">{variant.m2PerPiece} m²</p>
            </div>
            <div>
              <span className="text-ui-fg-subtle">Dostupnosť:</span>
              <div className="flex items-center gap-1">
                <span className={`${availabilityInfo.color} text-lg leading-none`}>
                  {availabilityInfo.icon}
                </span>
                <span className={`text-xs font-medium ${availabilityInfo.color}`}>
                  {availabilityInfo.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Výber indikátor */}
        <div className="ml-4">
          <div
            className={clx(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center",
              {
                "border-ui-border-interactive bg-ui-bg-interactive": isSelected,
                "border-ui-border-base": !isSelected
              }
            )}
          >
            {isSelected && (
              <div className="w-3 h-3 rounded-full bg-white"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariantCard 