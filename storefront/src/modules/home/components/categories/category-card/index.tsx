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
        <div className="aspect-[3/5] relative overflow-hidden rounded-t-lg">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </div>
        
        <div className="p-2 flex-1 flex flex-col justify-between min-h-[60px]">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Text className="transition-colors duration-200 text-sm font-bold group-hover:text-[#1a2e1a] text-ebony line-clamp-1">
                {category.name}
              </Text>
            </div>
            
            {category.description && (
              <Text className="text-sm text-gray-600 line-clamp-1 mb-2">
                {category.description}
              </Text>
            )}
          </div>
          
          {category.category_children && category.category_children.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto overflow-hidden">
              {category.category_children.slice(0, 2).map((child: any) => (
                <span 
                  key={child.id}
                  className="inline-block px-1.5 py-0.5 text-xs text-[#1a2e1a] bg-[#1a2e1a]/10 rounded-full border border-[#1a2e1a]/20 truncate max-w-[80px] group-hover:bg-[#1a2e1a]/20 group-hover:border-[#1a2e1a]/40 transition-all duration-300"
                >
                  {child.name}
                </span>
              ))}
              {category.category_children.length > 2 && (
                <span className="inline-block px-1.5 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full">
                  +{category.category_children.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </LocalizedClientLink>
    </div>
  )
} 