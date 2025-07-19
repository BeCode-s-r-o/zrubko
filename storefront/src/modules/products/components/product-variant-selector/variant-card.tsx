import React from "react"
import { clx } from "@medusajs/ui"
import { useInventory } from "@lib/hooks/use-inventory"

type Variant = {
  id: string
  title: string
  size: string
  treatment: string
  material: string
  length: number
  pricePerM2: number
  m2PerPiece: number
  availability: "in_stock" | "available_soon" | "unavailable"
  image: string
  sku?: string
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
    opracovanie_dreva?: string

    
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
  allVariants?: Variant[] // Pass all variants for inventory fetching
}

const getAvailabilityInfo = (availability: string, availableQuantity?: number) => {
  switch (availability) {
    case "in_stock":
      return { 
        text: availableQuantity ? `${availableQuantity} ks na sklade` : "Na sklade", 
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
  allVariants = []
}) => {
  // Use inventory hook to get real inventory data
  const { getInventoryStatus, loading: inventoryLoading } = useInventory(allVariants)
  
  // Get inventory status for this specific variant
  const inventoryStatus = getInventoryStatus(variant.sku)
  
  // Use real inventory status instead of static availability
  const availabilityInfo = getAvailabilityInfo(
    inventoryStatus.status, 
    inventoryStatus.available_quantity
  )

  return (
    <div
      onClick={onSelect}
      className={clx(
        "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-101 relative overflow-hidden",
        {
          "border-accent bg-gradient-to-br from-accent/5 to-accent-light/10 shadow-sm ring-1 ring-accent/20": isSelected,
          "border-gray-200 bg-white hover:border-accent/40 hover:shadow-sm": !isSelected,
          "opacity-50 cursor-not-allowed": inventoryStatus.status === "unavailable"
        }
      )}
    >
      {/* Gradient pozadie pre selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br via-transparent pointer-events-none from-accent/3 to-accent-light/3"></div>
      )}

      <div className="flex relative justify-between items-center">
        {/* Základné info - kompaktnejšie */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="mb-1 text-xl font-bold text-accent-dark">
                {variant.title}
              </h2>
              <p className="text-sm font-medium text-gray-600">
                {variant.metadata.typ_dreva} {variant.metadata.trieda && (
                  <span className="text-amber-600">{variant.metadata.trieda}</span>
                )}
              </p>
            </div>
            
            {/* Kompaktný dostupnosť badge s loading stavom */}
            <div className="flex gap-1 items-center">
              {inventoryLoading ? (
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                    Načítavam...
                  </span>
                </div>
              ) : (
                <>
                  <div className={`w-2 h-2 rounded-full ${availabilityInfo.badgeColor}`}></div>
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${availabilityInfo.bgColor} ${availabilityInfo.color}`}>
                    {availabilityInfo.text}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Technické údaje z metadata */}
          {/* Only render the grid if at least one value is present */}
          {(variant.metadata.dlzka_m || variant.metadata.cena_m2_s_dph || variant.metadata.kusov_v_baliku || variant.metadata.pouzitie || variant.metadata.opracovanie_dreva) ? (
            <div className="mb-3 space-y-2">
              {/* Prvý riadok - 3 polia */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 text-center bg-white rounded border border-accent/10">
                  <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">Dĺžka</span>
                  <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.dlzka_m || ''}</p>
                </div>
                <div className="p-2 text-center bg-white rounded border border-accent/10">
                  <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">€/m²</span>
                  <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.cena_m2_s_dph || ''}</p>
                </div>
                <div className="p-2 text-center bg-white rounded border border-accent/10">
                  <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">V balíku</span>
                  <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.kusov_v_baliku || ''}</p>
                </div>
              </div>
              
              {/* Druhý riadok - 2 polia */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 text-center bg-white rounded border border-accent/10">
                  <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">Použitie</span>
                  <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.pouzitie || ''}</p>
                </div>
                <div className="p-2 text-center bg-white rounded border border-accent/10">
                  <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">Opracovanie dreva</span>
                  <p className="font-bold text-accent-dark text-xs mt-0.5">{variant.metadata.opracovanie_dreva || ''}</p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Inventory details - show when available */}
          {!inventoryLoading && inventoryStatus.available_quantity > 0 && (
            <div className="p-2 mb-3 bg-green-50 rounded border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-green-700">Dostupné množstvo:</span>
                <span className="text-sm font-bold text-green-800">{inventoryStatus.available_quantity} ks</span>
              </div>
              {inventoryStatus.incoming_quantity > 0 && (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-medium text-orange-700">Prichádza:</span>
                  <span className="text-sm font-bold text-orange-800">{inventoryStatus.incoming_quantity} ks</span>
                </div>
              )}
            </div>
          )}

          {/* Metadata section */}
          {Object.keys(variant.metadata).length > 0 && (
            <div className="space-y-2">
              <h6 className="text-xs font-semibold text-accent-dark">Metadata</h6>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(variant.metadata).map(([key, value]) => (
                  value && (
                    <div key={key} className="p-2 text-center bg-gray-50 rounded border border-gray-200">
                      <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">{key}</span>
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
              "flex justify-center items-center w-6 h-6 rounded-full border-2 shadow-sm transition-all duration-200",
              {
                "bg-gradient-to-br border-accent from-accent to-accent-light shadow-accent/20": isSelected,
                "bg-white border-gray-300 hover:border-accent/50": !isSelected
              }
            )}
          >
            {isSelected && (
              <div className="w-3 h-3 bg-white rounded-full"></div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle hover overlay */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br rounded-lg transition-all duration-200 pointer-events-none from-accent/0 to-accent-light/0 hover:from-accent/2 hover:to-accent-light/2"></div>
      )}
    </div>
  )
}

export default VariantCard 