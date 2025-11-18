"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"
import { Button } from "@medusajs/ui"

interface WoodProductCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function WoodProductCard({ product, region, sourceCategory }: WoodProductCardProps & { sourceCategory?: string }) {
  // Extraktuj metadata z produktu a pretypuj na string
  const metadata = product.metadata || {}
  const getMetadataString = (key: string): string | undefined => {
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }

  // Get official product price from backend
  const { cheapestPrice } = getProductPrice({ product })
  const hasPrice = cheapestPrice && cheapestPrice.calculated_price_number > 0
  
  // Get badge from product tags or other backend field
  const badge = product.tags?.find(tag => tag.value)?.value || getMetadataString('stitka')
  
  // Build product URL with source category if provided
  const productUrl = sourceCategory 
    ? `/products/${product.handle}?sourceCategory=${sourceCategory}`
    : `/products/${product.handle}`

  return (
    <LocalizedClientLink 
      href={productUrl}
      className="block overflow-hidden bg-white transition-all duration-200 group hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Price badge from backend */}
        {badge && (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded">
            {badge}
          </div>
        )}
      </div>
      
      {/* Product Content */}
      <div className="p-4">
        {/* Product Title */}
        <h2 className="text-lg  mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h2>
        
        {/* Price Information from official backend price */}
        {hasPrice && (
          <div className="mb-4">
            <div className="flex gap-2 items-center mb-2">
              <span className="text-sm">
                Od {cheapestPrice?.calculated_price_number} €
              </span>
              {cheapestPrice?.price_type === "sale" && (
                <span className="text-sm text-gray-400 line-through">
                  {cheapestPrice?.original_price_number} €
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Key Metadata - Compact */}
        <div className="mb-4 space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Rozmery</span>
            <span className="font-medium text-gray-900">{getMetadataString('rozmery_mm') || '-'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Trieda</span>
            <span className="font-medium text-gray-900">{getMetadataString('trieda') || '-'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Opracovanie</span>
            <span className="font-medium text-gray-900">{getMetadataString('opracovanie_dreva') || '-'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Použitie</span>
            <span className="font-medium text-gray-900">{getMetadataString('pouzitie') || '-'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Typ dreva</span>
            <span className="font-medium text-gray-900">{getMetadataString('typ_dreva') || '-'}</span>
          </div>
        </div>
        
        {/* Action Button - now part of clickable card */}
        <div className="px-4 py-2 w-full font-medium text-center text-white bg-amber-600 rounded transition-colors duration-200 hover:bg-amber-700">
          Zobraziť rozmery
        </div>
      </div>
    </LocalizedClientLink>
  )
} 