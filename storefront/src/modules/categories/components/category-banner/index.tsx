"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CategoryBannerProps {
  title: string
  subtitle: string
  description?: string
}

export default function CategoryBanner({ title, subtitle, description }: CategoryBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background obrázok - skutočný SHOU SUGI BAN */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/shou-sugi-ban-main.jpg')`
        }}
      />
      
      {/* Gradient overlay - tmavší pre lepší kontrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/60 to-black/70" />
      
      <div className="relative content-container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Ľavá strana - text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium">
                {subtitle}
              </p>
              {description && (
                <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="large"
                className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => {
                  document.getElementById('shou-sugi-ban-info')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Viac o technike
              </Button>
              
              <Button 
                variant="secondary"
                size="large"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
                onClick={() => {
                  // Tu by mohla byť integrácia s chat systémom
                  console.log("Opening chat...")
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat
              </Button>
            </div>
          </div>
          
          {/* Pravá strana - skutočný SHOU SUGI BAN obrázok */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-700">
              <img
                src="/burnt-wood.jpg"
                alt="SHOU SUGI BAN - Skutočné spálené drevo"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  // Fallback ak sa obrázok nenačíta
                  const target = e.currentTarget;
                  target.src = "/shou-sugi-ban-main.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating element - japonské znaky pre ohňom pálené */}
            <div className="absolute -top-6 -right-6 bg-gray-900 border border-gray-600 rounded-xl shadow-lg p-4 transform -rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">火</div>
                <div className="text-sm text-gray-300">Ohňom</div>
              </div>
            </div>
            
            {/* Floating element 2 - pálené */}
            <div className="absolute -bottom-4 -left-4 bg-black border border-gray-700 rounded-xl shadow-lg p-3 transform rotate-12">
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