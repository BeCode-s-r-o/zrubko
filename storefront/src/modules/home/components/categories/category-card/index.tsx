"use client"

import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CategoryCard({
  category,
}: {
  category: any
}) {
  // Vždy použij obrázok z backendu, nikdy nie lokálny fallback
  // Ak nie je image, použij univerzálny obrázok z backendu
  const imageUrl = category.image || "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"


  return (
    <div className="h-full flex flex-col">
      <LocalizedClientLink href={`/categories/${category.handle}`} className="h-full flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          {/* Category image */}
          <img 
            src={imageUrl}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback na univerzálny obrázok z backendu
              const target = e.currentTarget;
              target.src = "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png";
            }}
          />
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ebony/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </div>
        
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Text className="transition-colors duration-200 text-lg font-bold group-hover:text-gold text-ebony">
                {category.name}
              </Text>
            </div>
            
            {category.description && (
              <Text className="text-sm text-gray-600 line-clamp-2 mb-3">
                {category.description}
              </Text>
            )}
          </div>
          
          {category.category_children && category.category_children.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {category.category_children.slice(0, 3).map((child: any) => (
                <span 
                  key={child.id}
                  className="inline-block px-2 py-1 text-xs text-ebony bg-champagne/50 rounded-full border border-gold/20"
                >
                  {child.name}
                </span>
              ))}
              {category.category_children.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                  +{category.category_children.length - 3} viac
                </span>
              )}
            </div>
          )}
        </div>
      </LocalizedClientLink>
    </div>
  )
} 