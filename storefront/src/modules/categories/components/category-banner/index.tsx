"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

interface CategoryBannerProps {
  category: HttpTypes.StoreProductCategory
}

export default function CategoryBanner({ category }: CategoryBannerProps) {
  // Extraktuj metadata z kategórie
  const metadata = category.metadata || {}
  const getMetadataString = (key: string): string | undefined => {
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }

  // Použiť názov kategórie a default description
  const title = category.name || "SHOU SUGI BAN"
  const description = category.description || "Kvalitné drevené materiály pre stavbu, obklady a interiér. Široký výber rozmerov a druhov dreva."
  
  // Dynamický background obrázok z metadata
  const backgroundImage = getMetadataString('background_img') || 'https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png'

  return (
    <div className="overflow-hidden relative bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background obrázok - dynamický z metadata */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-40"
        style={{
          backgroundImage: `url('${backgroundImage}')`
        }}
      />
      
      {/* Gradient overlay - tmavší pre lepší kontrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/60 to-black/70" />
      
      <div className="relative px-4 py-12 mx-auto max-w-8xl sm:px-6 lg:px-8 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          {/* Ľavá strana - text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-wide leading-tight text-white md:text-5xl lg:text-6xl">
                {title}
              </h1>
              {description && (
                <p className="max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl">
                  {description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button 
                size="large"
                className="px-8 py-4 text-base font-medium text-black bg-white shadow-sm transition-all duration-300 hover:bg-black hover:text-white hover:shadow-md"
                onClick={() => {
                  document.getElementById('category-metadata')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Viac o technike
              </Button>
              
              <Button 
                variant="secondary"
                size="large"
                className="px-8 py-4 text-base font-medium text-white bg-transparent border transition-all duration-300 border-white/30 hover:border-white hover:bg-white hover:text-black"
                onClick={() => {
                  // Tu by mohla byť integrácia s chat systémom
                  console.log("Opening chat...")
                }}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat
              </Button>
            </div>
          </div>
          
          {/* Pravá strana - skutočný SHOU SUGI BAN obrázok */}
          <div className="relative">
            <div className="overflow-hidden relative rounded-2xl border border-gray-700 shadow-2xl transition-transform duration-500 transform rotate-3 hover:rotate-0">
              <img
                src="https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
                alt="SHOU SUGI BAN - Skutočné spálené drevo"
                className="object-cover w-full h-64 md:h-80 lg:h-96"
                onError={(e) => {
                  // Fallback ak sa obrázok nenačíta
                  const target = e.currentTarget;
                  target.src = "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/40" />
            </div>
            
            {/* Floating element - japonské znaky pre ohňom pálené */}
            <div className="absolute -top-6 -right-6 p-4 bg-gray-900 rounded-xl border border-gray-600 shadow-lg transform -rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">火</div>
                <div className="text-sm text-gray-300">Ohňom</div>
              </div>
            </div>
            
            {/* Floating element 2 - pálené */}
            <div className="absolute -bottom-4 -left-4 p-3 bg-black rounded-xl border border-gray-700 shadow-lg transform rotate-12">
              <div className="text-center">
                <div className="text-lg font-bold text-white">焼</div>
                <div className="text-xs text-gray-300">Pálené</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 