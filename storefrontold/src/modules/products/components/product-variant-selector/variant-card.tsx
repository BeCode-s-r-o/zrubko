import React from "react"
import { clx } from "@medusajs/ui"
import { useInventory } from "@lib/hooks/use-inventory"

// Konfigurácia pre rôzne typy produktov
const PRODUCT_TYPE_CONFIGS = {
  'podlaha': {
    primaryFields: ['typ_dreva', 'trieda', 'spoj'],
    technicalFields: ['dlzka_m', 'cena_m2_s_dph', 'kusov_v_baliku', 'pouzitie', 'opracovanie_dreva'],
    fieldStyles: {
      typ_dreva: { color: 'text-gray-600', hoverColor: 'text-accent-dark' },
      trieda: { color: 'text-amber-600', hoverColor: 'text-amber-700' },
      spoj: { color: 'text-blue-600', hoverColor: 'text-blue-700' }
    }
  },
  'default': {
    primaryFields: ['typ_dreva', 'trieda'],
    technicalFields: ['dlzka_m', 'cena_m2_s_dph', 'kusov_v_baliku', 'pouzitie', 'opracovanie_dreva'],
    fieldStyles: {
      typ_dreva: { color: 'text-gray-600', hoverColor: 'text-accent-dark' },
      trieda: { color: 'text-amber-600', hoverColor: 'text-amber-700' }
    }
  }
}

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

// Helper function to get field labels
const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    'dlzka_m': 'Dĺžka',
    'cena_m2_s_dph': '€/m²',
    'kusov_v_baliku': 'V balíku',
    'pouzitie': 'Použitie',
    'opracovanie_dreva': 'Opracovanie dreva',
    'typ_dreva': 'Typ dreva',
    'trieda': 'Trieda',
    'spoj': 'Spoj'
  }
  return labels[field] || field
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

  // Get product type configuration
  const productType = (variant.metadata.typ_produktu as string) || 'default'
  const config = PRODUCT_TYPE_CONFIGS[productType as keyof typeof PRODUCT_TYPE_CONFIGS] || PRODUCT_TYPE_CONFIGS.default

  return (
    <div
      onClick={onSelect}
      className={clx(
        "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-101 relative overflow-hidden",
        {
          "border-accent  from-accent/5 to-accent-light/10 shadow-sm ring-1 ring-accent/20": isSelected,
          "border-gray-200 bg-white hover:border-accent/40 hover:shadow-sm": !isSelected,
          "opacity-50 cursor-not-allowed": inventoryStatus.status === "unavailable"
        }
      )}
    >
      {/* Gradient pozadie pre selected */}
      {isSelected && (
        <div className="absolute inset-0 via-transparent pointer-events-none from-accent/3 to-accent-light/3"></div>
      )}

      <div className="flex relative justify-between items-start">
        {/* Základné info - kompaktnejšie */}
        <div className="flex-1">
          <div className="flex flex-col mb-3 sm:flex-row sm:justify-between sm:items-start">
            <div className="mb-2 sm:mb-0">
              <h2 className="text-2xl font-bold leading-tight sm:text-xl text-accent-dark">
                {variant.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-600">
                {config.primaryFields.map((field, index) => {
                  const value = variant.metadata[field]
                  if (!value) return null
                  
                  const fieldStyle = config.fieldStyles[field as keyof typeof config.fieldStyles]
                  const colorClass = fieldStyle?.color || 'text-gray-600'
                  const hoverColorClass = fieldStyle?.hoverColor || 'hover:text-accent-dark'
                  
                  return (
                    <span 
                      key={field}
                      className={`${index > 0 ? 'ml-1' : ''} ${colorClass} transition-colors duration-200 cursor-pointer ${hoverColorClass}`}
                    >
                      {value}
                    </span>
                  )
                })}
              </p>
            </div>
            
            
          </div>
          
          {/* Technické údaje z metadata - mobile responsive */}
          {/* Only render the grid if at least one value is present */}
          {config.technicalFields.some(field => variant.metadata[field]) ? (
            <div className="mb-3 space-y-2">
              {/* Dynamické technical fields */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {config.technicalFields.slice(0, 3).map(field => {
                  const value = variant.metadata[field]
                  if (!value) return null
                  
                  return (
                    <div key={field} className="p-2 text-center bg-white rounded border border-accent/10">
                      <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                        {getFieldLabel(field)}
                      </span>
                      <p className="font-bold text-accent-dark text-xs mt-0.5">{value}</p>
                    </div>
                  )
                })}
              </div>
              
              {/* Druhý riadok ak sú ďalšie polia */}
              {config.technicalFields.length > 3 && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {config.technicalFields.slice(3, 5).map(field => {
                    const value = variant.metadata[field]
                    if (!value) return null
                    
                    return (
                      <div key={field} className="p-2 text-center bg-white rounded border border-accent/10">
                        <span className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                          {getFieldLabel(field)}
                        </span>
                        <p className="font-bold text-accent-dark text-xs mt-0.5">{value}</p>
                      </div>
                    )
                  })}
                </div>
              )}
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

       
        </div>

        {/* Kompaktný výber indikátor */}
        <div className="flex-shrink-0 ml-3 sm:ml-4">
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