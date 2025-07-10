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
                {variant.metadata.rozmery} – {variant.metadata.povrch}
              </h4>
              <p className="text-gray-600 font-medium text-sm">
                {variant.metadata.typ_dreva} {variant.metadata.trieda && (
                  <span className="text-amber-600">{variant.metadata.trieda}</span>
                )}
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
          
          {/* Technické údaje z metadata */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">Dĺžka</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.dlzka_m || "-"}</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">€/m²</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.cena_m2_s_dph || "-"}</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">V balíku</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.kusov_v_baliku || "-"}</p>
            </div>
            <div className="bg-white rounded p-2 border border-accent/10 text-center">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">Použitie</span>
              <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.pouzitie || "-"}</p>
            </div>
          </div>

          {/* Metadata section */}
          {Object.keys(variant.metadata).length > 0 && (
            <div className="space-y-2">
              <h6 className="font-semibold text-accent-dark text-xs">Metadata</h6>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(variant.metadata).map(([key, value]) => (
                  value && (
                    <div key={key} className="bg-gray-50 rounded p-2 border border-gray-200 text-center">
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">{key}</span>
                      <p className="font-bold text-accent-dark text-xs mt-0.5">
                        {String(value)}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
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