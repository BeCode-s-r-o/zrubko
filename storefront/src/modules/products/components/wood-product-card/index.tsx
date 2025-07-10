"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

interface WoodProductCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function WoodProductCard({ product, region }: WoodProductCardProps) {
  // Extraktuj metadata z produktu a pretypuj na string
  const metadata = product.metadata || {}
  const getMetadataString = (key: string): string | undefined => {
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }
  
  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group block bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Veľký štvorec obrázok produktu */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Názov a metadata pod obrázkom */}
      <div className="p-4">
        {/* Názov produktu */}
        <h3 className="font-semibold text-gray-900 text-lg mb-4">
          {product.title}
        </h3>
        
        {/* Metadata riadky - slovenské názvy */}
        <div className="space-y-2">
          {/* Rozmery */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Rozmery</span>
            <span className="text-gray-900">{getMetadataString('rozmery_mm') || '-'}</span>
          </div>
          
          {/* Trieda */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Trieda</span>
            <span className="text-gray-900">{getMetadataString('trieda') || '-'}</span>
          </div>
          
          {/* Opracovanie Dreva */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Opracovanie Dreva</span>
            <span className="text-gray-900">{getMetadataString('opracovanie_dreva') || '-'}</span>
          </div>
          
          {/* Použitie */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Použitie</span>
            <span className="text-gray-900">{getMetadataString('pouzitie') || '-'}</span>
          </div>
          
          {/* Typ Dreva */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Typ Dreva</span>
            <span className="text-gray-900">{getMetadataString('typ_dreva') || '-'}</span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
} 