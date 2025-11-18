"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { Crown, Sparkles, Star, Shield, Clock, Heart, Truck, Package, RefreshCw, ChevronDown, Info, Settings, Wrench } from "lucide-react"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type ProductDescriptionProps = {
  product: HttpTypes.StoreProduct
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const tabs = [
    {
      label: "O produkte",
      icon: <Info className="w-5 h-5" />,
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Technické parametre",
      icon: <Settings className="w-5 h-5" />,
      component: <TechnicalSpecsTab product={product} />,
    },
    {
      label: "Inštalácia a údržba",
      icon: <Wrench className="w-5 h-5" />,
      component: <InstallationTab product={product} />,
    },
    {
      label: "Doprava",
      icon: <Truck className="w-5 h-5" />,
      component: <ShippingInfoTab product={product} />,
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden mt-0 space-y-0 rounded-lg border border-gray-200">
        {tabs.map((tab, i) => (
          <div key={i} className="border-b border-gray-200 last:border-b-0">
            <button
              className={`w-full text-left px-6 py-4 font-medium text-lg text-black focus:outline-none flex items-center justify-between transition-colors duration-200 ${openIndex === i ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <div className="flex gap-3 items-center">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-6 pt-4 pb-6 text-base text-gray-700 animate-fadeIn">
                {tab.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const ProductInfoTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  // Helper function to get metadata value
  const getMetadataValue = (key: string, defaultValue: string = "") => {
    return product.metadata?.[key] as string || defaultValue
  }

  const productInfo = getMetadataValue("product_info")

  // If no metadata is provided, show only heading
  if (!productInfo) {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">O produkte</h4>
      </div>
    )
  }

  // Render metadata content
  return (
    <div className="space-y-4 text-gray-700">
      <div 
        className="max-w-none leading-relaxed prose prose-sm"
        dangerouslySetInnerHTML={{ __html: productInfo }}
      />
    </div>
  )
}

const TechnicalSpecsTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
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

  // Get available options from the product for additional specs
  const availableOptions = product.options || []
  const availableVariants = product.variants || []
  
  // Extract unique values for each option
  const getUniqueOptionValues = (optionTitle: string): string[] => {
    const option = availableOptions.find(opt => opt.title === optionTitle)
    if (!option) return []
    
    // Get values from variants
    const values = availableVariants.map(variant => {
      const variantOption = variant.options?.find(opt => opt.option?.title === optionTitle)
      return variantOption?.value
    }).filter(Boolean) as string[]
    
    return Array.from(new Set(values))
  }

  const availableSizes = getUniqueOptionValues("Rozmer")
  const availableMaterials = getUniqueOptionValues("Materiál")
  const availableTypes = getUniqueOptionValues("Typ")
  const availableAvailability = getUniqueOptionValues("Dostupnosť")

  // Metadata key mapping for proper labels
  const metadataKeyMapping: Record<string, string> = {
    'spoj': 'Spoj',
    'zobrazenie_spoju': 'Zobrazenie spoja',
    'trieda': 'Trieda',
    'AB': 'AB',
    'pouzitie': 'Použitie',
    'typ_dreva': 'Typ dreva',
    'rozmery_mm': 'Rozmery (mm)',
    'product_type': 'Typ produktu',
    'opracovanie_dreva': 'Opracovanie dreva'
  }

  // Get all metadata keys for technical specs (excluding special keys)
  const metadataKeys = Object.keys(product.metadata || {})
  const technicalMetadata = metadataKeys.filter(key => 
    !['product_info', 'installation_and_maintenance', 'shipping_and_returns'].includes(key)
  )

  // If no technical metadata is provided, show only heading
  if (technicalMetadata.length === 0) {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Technické parametre</h4>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Show all metadata as technical specs */}
      <div className="space-y-4">

        <div className="space-y-3">
          {technicalMetadata.map((key, index) => {
            const displayLabel = metadataKeyMapping[key] || key
            const value = product.metadata![key] as string
            
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <h3 className="text-gray-600">{displayLabel}:</h3>
                <h3 className="font-medium text-gray-900">{value}</h3>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Show variant information if available */}
      {(availableMaterials.length > 0 || availableSizes.length > 0 || availableTypes.length > 0 || availableAvailability.length > 0) && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Varianty produktu</h4>
          <div className="space-y-3">
            {availableMaterials.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Materiál:</span>
                <span className="font-medium text-gray-900">{availableMaterials.join(", ")}</span>
              </div>
            )}
            {availableSizes.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Dostupné rozmery:</span>
                <span className="font-medium text-gray-900">{availableSizes.join(", ")}</span>
              </div>
            )}
            {availableTypes.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Typy spracovania:</span>
                <span className="font-medium text-gray-900">{availableTypes.join(", ")}</span>
              </div>
            )}
            {availableAvailability.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Dostupnosť:</span>
                <span className="font-medium text-gray-900">{availableAvailability.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const InstallationTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const getMetadataValue = (key: string, defaultValue: string = "") => {
    return product.metadata?.[key] as string || defaultValue
  }

  const installationInfo = getMetadataValue("installation_and_maintenance")

  // If no metadata is provided, show only heading
  if (!installationInfo) {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Inštalácia a údržba</h4>
      </div>
    )
  }

  // Render metadata content
  return (
    <div className="space-y-4 text-gray-700">
      <div 
        className="max-w-none leading-relaxed prose prose-sm"
        dangerouslySetInnerHTML={{ __html: installationInfo }}
      />
    </div>
  )
}

const ShippingInfoTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const getMetadataValue = (key: string, defaultValue: string = "") => {
    return product.metadata?.[key] as string || defaultValue
  }

  const shippingInfo = getMetadataValue("shipping_and_returns")

  // If no metadata is provided, show only heading
  if (!shippingInfo) {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Doprava</h4>
      </div>
    )
  }

  // Render metadata content
  return (
    <div className="space-y-4 text-gray-700">
      <div 
        className="max-w-none leading-relaxed prose prose-sm"
        dangerouslySetInnerHTML={{ __html: shippingInfo }}
      />
    </div>
  )
}

export default ProductDescription 