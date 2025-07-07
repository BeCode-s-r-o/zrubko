"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

interface WoodProductCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function WoodProductCard({ product, region }: WoodProductCardProps) {

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group bg-white rounded-lg border border-ui-border-base hover:border-ui-border-interactive hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-ui-bg-subtle">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-ui-fg-base text-lg group-hover:text-ui-fg-interactive transition-colors">
          {product.title}
        </h3>
      </div>
    </LocalizedClientLink>
  )
} 