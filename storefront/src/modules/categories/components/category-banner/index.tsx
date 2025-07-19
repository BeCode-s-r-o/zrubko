"use client"

import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useState, useEffect } from "react"

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
  const title = category.name || "Názov kategórie"
  const description = category.description || "Popis kategórie"
  
  // Gallery images from metadata - img_1 is always main
  const galleryImages = [
    getMetadataString('img_1') || "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png",
    getMetadataString('img_2') || "https://img.freepik.com/free-photo/wood-texture-background_1232-2888.jpg",
    getMetadataString('img_3') || "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
  ].filter(img => img) // Remove empty/undefined images

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [galleryImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="overflow-hidden relative bg-gray-900">
      {/* Main Gallery Container */}
      <div className="relative px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          {/* Ľavá strana - text */}
          <div className="space-y-6 text-white">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-wide leading-tight lg:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="max-w-xl text-base leading-relaxed text-gray-200 lg:text-lg">
                  {description}
                </p>
              )}
            </div>
            
            {/* Action buttons - smaller and more compact */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button 
                size="small"
                className="px-6 py-2 text-sm font-medium text-black bg-white shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-md"
                onClick={() => {
                  document.getElementById('category-metadata')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Ako vybrať správny produkt?
              </Button>
              
              <Button 
                variant="secondary"
                size="small"
                className="px-6 py-2 text-sm font-medium text-white bg-transparent border transition-all duration-300 border-white/30 hover:border-white hover:bg-white hover:text-black"
                onClick={() => {
                  console.log("Opening chat...")
                }}
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Spustiť chat
              </Button>
            </div>
          </div>
          
          {/* Pravá strana - Gallery */}
          <div className="relative">
            <div className="overflow-hidden relative rounded-lg">
              {/* Main Image */}
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="object-cover w-full h-64 transition-opacity duration-500 md:h-80 lg:h-96"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png";
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/40" />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 p-2 text-white rounded-full transition-colors -translate-y-1/2 bg-black/50 hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 p-2 text-white rounded-full transition-colors -translate-y-1/2 bg-black/50 hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image indicators */}
              <div className="flex absolute bottom-4 left-1/2 gap-2 -translate-x-1/2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail gallery below main image */}
            <div className="flex gap-2 mt-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-1 h-16 overflow-hidden rounded-md transition-opacity ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 