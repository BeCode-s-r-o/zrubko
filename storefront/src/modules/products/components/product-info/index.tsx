"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, region }) => {
  // Get the first variant for base price display
  const firstVariant = product.variants?.[0]
  const priceInfo = firstVariant ? getProductPrice({ product, variantId: firstVariant.id }) : null
  const basePrice = priceInfo?.variantPrice?.calculated_price_number || 0

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="mb-2 text-4xl font-bold leading-tight bg-clip-text from-accent-dark to-accent md:mb-3">
          {product.title}
        </h1>
        <p className="text-base text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Base Price Display */}
      {basePrice > 0 && (
        <div className="flex gap-4 items-center">
          <div className="text-2xl text-accent-dark">
            Od {basePrice.toFixed(2)} €
          </div>
          <div className="text-base">
            za m²
          </div>
        </div>
      )}

    

      {/* Quick Product Stats */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="text-center">
        
          <div className="text-base text-gray-600">Dostupné</div>
        </div>
        <div className="text-center">
          
          <div className="text-base text-gray-600">Doprava zdarma od XY </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo 