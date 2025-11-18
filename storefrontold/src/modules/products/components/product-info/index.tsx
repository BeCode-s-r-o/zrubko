"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Package from "@modules/common/icons/package"
import MapPin from "@modules/common/icons/map-pin"

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

      {/* Product Features with Icons */}
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
        {/* Doprava */}
        <a 
          href="/doprava" 
          className="flex flex-col items-center p-4 rounded-lg border transition-all duration-200 group border-accent/10 hover:border-accent/30 hover:bg-accent/5"
        >
          <div className="p-2 mb-2 rounded-full transition-colors bg-accent/10 group-hover:bg-accent/20">
            <FastDelivery size="24" color="#1f2937" />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold transition-colors text-accent-dark group-hover:text-accent">
              Doprava zdarma
            </div>
            <div className="mt-1 text-xs text-gray-600">
              od 150 €
            </div>
          </div>
        </a>

        {/* Dostupnosť */}
        <a 
          href="/sklad" 
          className="flex flex-col items-center p-4 rounded-lg border transition-all duration-200 group border-accent/10 hover:border-accent/30 hover:bg-accent/5"
        >
          <div className="p-2 mb-2 bg-green-100 rounded-full transition-colors group-hover:bg-green-200">
            <Package size="24" color="#059669" />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold transition-colors text-accent-dark group-hover:text-accent">
              Na sklade
            </div>
            <div className="mt-1 text-xs text-gray-600">
              okamžité odoslanie
            </div>
          </div>
        </a>

        {/* Lokácia/Služby */}
        <a 
          href="/kontakt" 
          className="flex flex-col items-center p-4 rounded-lg border transition-all duration-200 group border-accent/10 hover:border-accent/30 hover:bg-accent/5"
        >
          <div className="p-2 mb-2 bg-blue-100 rounded-full transition-colors group-hover:bg-blue-200">
            <MapPin size="24" color="#2563eb" />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold transition-colors text-accent-dark group-hover:text-accent">
              Poradenstvo
            </div>
            <div className="mt-1 text-xs text-gray-600">
              osobné konzultácie
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ProductInfo 