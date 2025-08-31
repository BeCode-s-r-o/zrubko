"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import WoodProductCard from "@modules/products/components/wood-product-card"

interface ProductCarouselProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function ProductCarousel({ products, region }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Responsive settings
  const getResponsiveSettings = () => {
    if (windowWidth < 640) { // mobile
      return { visible: 1, cardWidth: 280, gap: 16 }
    } else if (windowWidth < 768) { // small tablet
      return { visible: 2, cardWidth: 240, gap: 20 }
    } else if (windowWidth < 1024) { // tablet
      return { visible: 3, cardWidth: 260, gap: 24 }
    } else { // desktop
      return { visible: 5, cardWidth: 280, gap: 24 } // Changed from 4 to 5 for desktop
    }
  }

  const { visible, cardWidth, gap } = getResponsiveSettings()
  const maxIndex = Math.max(0, products.length - visible)

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Reset to first slide when screen size changes
      setCurrentIndex(0)
    }

    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  // Touch/swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [maxIndex])

  // Don't render until we have window width
  if (windowWidth === 0) {
    return <div className="h-64 animate-pulse bg-gray-200 rounded-lg"></div>
  }

  return (
    <div className="relative">
      {/* Carousel container with proper width control */}
      <div className="relative overflow-hidden">
        {/* Navigation arrows - positioned inside the carousel container */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 z-10 hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 -translate-y-1/2 bg-white rounded-full shadow-lg border border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="absolute right-2 top-1/2 z-10 hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 -translate-y-1/2 bg-white rounded-full shadow-lg border border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>

        {/* Carousel content - no padding to maintain proper width */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <WoodProductCard product={product} region={region} />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators - only show if there are multiple slides */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 mb-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-secondary scale-125'
                  : 'bg-secondary/30 hover:bg-secondary/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 