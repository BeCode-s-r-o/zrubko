"use client"

import { MessageCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useState, useEffect, useCallback, useMemo } from "react"

interface CategoryBannerProps {
  category: HttpTypes.StoreProductCategory
}

// Constants
const FALLBACK_IMAGE = "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
const DEFAULT_IMAGES = [
  FALLBACK_IMAGE,
  "https://img.freepik.com/free-photo/wood-texture-background_1232-2888.jpg",
  FALLBACK_IMAGE
] as const

const AUTO_SLIDE_INTERVAL = 5000

export default function CategoryBanner({ category }: CategoryBannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Helper function to safely extract metadata
  const getMetadataString = useCallback((key: string): string | undefined => {
    const metadata = category.metadata || {}
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }, [category.metadata])

  // Memoized gallery images
  const galleryImages = useMemo(() => {
    const images = [
      getMetadataString('img_1') || DEFAULT_IMAGES[0],
      getMetadataString('img_2') || DEFAULT_IMAGES[1],
      getMetadataString('img_3') || DEFAULT_IMAGES[2]
    ].filter(Boolean)

    return images.length > 0 ? images : [DEFAULT_IMAGES[0]]
  }, [getMetadataString])

  // Content data
  const title = category.name || "Názov kategórie"
  const description = category.description || "Popis kategórie"

  // Enhanced auto-switch with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(interval)
  }, [galleryImages.length])

  // Image navigation with smooth transitions
  const navigateToImage = useCallback((index: number) => {
    if (index === currentImageIndex) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 150)
  }, [currentImageIndex])

  const nextImage = useCallback(() => {
    navigateToImage((currentImageIndex + 1) % galleryImages.length)
  }, [currentImageIndex, galleryImages.length, navigateToImage])

  const prevImage = useCallback(() => {
    navigateToImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length)
  }, [currentImageIndex, galleryImages.length, navigateToImage])

  // Image loading handlers
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }))
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    const target = e.currentTarget
    if (target.src !== FALLBACK_IMAGE) {
      target.src = FALLBACK_IMAGE
    }
    handleImageLoad(index)
  }, [handleImageLoad])

  return (
    <div className="overflow-hidden relative bg-gray-900" role="region" aria-label="Category banner">
      {/* Main Gallery Container */}
      <div className="relative px-6 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="space-y-4 text-white">
            <header className="space-y-3">
              <h1 className="text-3xl font-bold tracking-wide leading-tight lg:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="max-w-lg text-base leading-relaxed text-gray-200 lg:text-lg">
                  {description}
                </p>
              )}
            </header>

            {/* Action buttons with improved accessibility */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button
                size="small"
                className="px-6 py-2 text-sm font-medium text-black bg-white shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-md focus:ring-2 focus:ring-white/50"
                onClick={() => {
                  const element = document.getElementById('category-metadata')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                aria-label="Scroll to product selection guide"
              >
                Ako vybrať správny produkt?
              </Button>

              <Button
                variant="secondary"
                size="small"
                className="px-6 py-2 text-sm font-medium text-white bg-transparent border transition-all duration-300 border-white/30 hover:border-white hover:bg-white hover:text-black focus:ring-2 focus:ring-white/50"
                onClick={() => {
                  console.log("Opening chat...")
                }}
                aria-label="Open customer chat"
              >
                <MessageCircle className="mr-2 w-4 h-4" aria-hidden="true" />
                Spustiť chat
              </Button>
            </div>
          </div>

          {/* Right side - Enhanced Gallery */}
          <div className="relative" role="region" aria-label="Product gallery">
            <div className="overflow-hidden relative rounded-lg">
              {/* Main Image with loading state */}
              <div className="relative">
                {!imagesLoaded[currentImageIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1} of ${galleryImages.length}`}
                  className={`object-cover w-full h-64 transition-all duration-500 md:h-80 lg:h-96 ${
                    isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                  onLoad={() => handleImageLoad(currentImageIndex)}
                  onError={(e) => handleImageError(e, currentImageIndex)}
                  loading="lazy"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/40 rounded-lg" />

              {/* Enhanced Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 p-2 text-white rounded-full transition-all duration-200 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:scale-110 focus:ring-2 focus:ring-white/50"
                aria-label="Previous image"
                disabled={galleryImages.length <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 p-2 text-white rounded-full transition-all duration-200 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:scale-110 focus:ring-2 focus:ring-white/50"
                aria-label="Next image"
                disabled={galleryImages.length <= 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Enhanced Image indicators */}
              {galleryImages.length > 1 && (
                <div className="flex absolute bottom-4 left-1/2 gap-2 -translate-x-1/2" role="tablist">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-white/50 ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      aria-selected={index === currentImageIndex}
                      role="tab"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Thumbnail gallery */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 mt-4" role="tablist" aria-label="Image thumbnails">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToImage(index)}
                    className={`flex-1 h-16 overflow-hidden rounded-md transition-all duration-300 focus:ring-2 focus:ring-white/50 ${
                      index === currentImageIndex
                        ? 'opacity-100 ring-2 ring-white scale-105'
                        : 'opacity-60 hover:opacity-80 hover:scale-102'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-selected={index === currentImageIndex}
                    role="tab"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1} of ${galleryImages.length}`}
                      className="object-cover w-full h-full"
                      onError={(e) => handleImageError(e, index)}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 