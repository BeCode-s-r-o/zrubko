"use client"

import { HttpTypes } from "@medusajs/types"
import {
  SparkleIcon,
  HammerIcon,
  RulerIcon,
  PackageIcon,
  LinkIcon,
  TreeIcon,
  ShieldIcon
} from "@modules/common/icons/wood-icons"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Helper function to get attribute value from product
  const getAttributeValue = (key: string, defaultValue: string = "-") => {
    // Try from product metadata first
    if (product.metadata && product.metadata[key]) {
      return product.metadata[key] as string
    }
    
    // Try from product direct properties
    if ((product as any)[key]) {
      return (product as any)[key]
    }
    
    return defaultValue
  }

  // Helper function to get inventory status
  const getInventoryStatus = () => {
    if (!product.variants || product.variants.length === 0) {
      return { status: "unknown", text: "Neznáme", color: "text-gray-600", bgColor: "bg-gray-100" }
    }

    // Check inventory across all variants
    const totalInventory = product.variants.reduce((total, variant) => {
      if (!variant.manage_inventory) return total + 999 // If not managing inventory, assume available
      return total + (variant.inventory_quantity || 0)
    }, 0)

    if (totalInventory > 10) {
      return { status: "in_stock", text: "Na sklade", color: "text-green-600", bgColor: "bg-green-100" }
    } else if (totalInventory > 0) {
      return { status: "low_stock", text: "Posledné kusy", color: "text-orange-600", bgColor: "bg-orange-100" }
    } else {
      return { status: "out_of_stock", text: "Vypredané", color: "text-red-600", bgColor: "bg-red-100" }
    }
  }

  const inventoryStatus = getInventoryStatus()

  return (
    <div className="w-full">
      {/* Product Specifications Card - Same style as variant cards */}
      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-bold text-base text-accent-dark mb-1">
              {getAttributeValue("rozmery")} – {getAttributeValue("povrch")}
            </h4>
            <p className="text-gray-600 font-medium text-sm">
              {getAttributeValue("typ_dreva")} {getAttributeValue("trieda") && (
                <span className="text-amber-600">{getAttributeValue("trieda")}</span>
              )}
            </p>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              inventoryStatus.status === 'in_stock' ? 'bg-green-500' :
              inventoryStatus.status === 'low_stock' ? 'bg-orange-500' :
              inventoryStatus.status === 'out_of_stock' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${inventoryStatus.bgColor} ${inventoryStatus.color}`}>
              {inventoryStatus.text}
            </span>
          </div>
        </div>
        
        {/* Technical data grid - same as variant cards */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white rounded p-2 border border-accent/10 text-center">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">Obklad</span>
            <p className="font-bold text-accent-dark text-xs mt-0.5">{getAttributeValue("obklad")}</p>
          </div>
          <div className="bg-white rounded p-2 border border-accent/10 text-center">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">Použitie</span>
            <p className="font-bold text-accent-dark text-xs mt-0.5">{getAttributeValue("pouzitie")}</p>
          </div>
          <div className="bg-white rounded p-2 border border-accent/10 text-center">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">V balíku</span>
            <p className="font-bold text-accent-dark text-xs mt-0.5">{getAttributeValue("v_baliku")}</p>
          </div>
          <div className="bg-white rounded p-2 border border-accent/10 text-center">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide block">€/m²</span>
            <p className="font-bold text-accent-dark text-xs mt-0.5">{getAttributeValue("cena_za_m_2")}</p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ProductInfo 