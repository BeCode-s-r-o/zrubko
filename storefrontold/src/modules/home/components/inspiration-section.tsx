"use client"

import { ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useRef, useEffect } from "react"

const galleryImages = [
  { src: "/inspiration.jpg", alt: "Inšpirácia pre váš projekt" },
  { src: "/drevo.jpeg", alt: "Drevené materiály" },
  { src: "/shou-sugi-ban-1.jpg", alt: "Shou sugi ban technika" },
  { src: "/lightwoodinteriordiningroom26041710904800x533_1.jpg", alt: "Moderný interiér" },
  { src: "/shou-sugi-ban-hero.jpg", alt: "Shou sugi ban dizajn" },
]

export default function InspirationSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Navigation functions
  const nextImage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevImage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }

  // Optional: Manual navigation only (no auto-advance)
  // Removed auto-advance pulsing animation for cleaner reveal effects

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAnimating])

  return (
    <section className="py-8 md:py-12 lg:py-20 w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">
          {/* Interactive 3D Photo Gallery */}
          <div
            className="relative h-96 lg:h-[500px]"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >


            {/* Background images with subtle 3D effect - reveal animation */}
            <div className="absolute inset-0 transform rotate-[-6deg] translate-x-3 translate-y-3 opacity-50 transition-all duration-700 ease-out">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg transition-all duration-700 ease-out">
                <img
                  src={galleryImages[(currentImageIndex - 1 + galleryImages.length) % galleryImages.length]?.src}
                  alt={galleryImages[(currentImageIndex - 1 + galleryImages.length) % galleryImages.length]?.alt}
                  className="object-cover w-full h-full transition-all duration-700 ease-out"
                />
              </div>
            </div>

            <div className="absolute inset-0 transform rotate-[4deg] -translate-x-1 translate-y-1 opacity-70 transition-all duration-700 ease-out">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg transition-all duration-700 ease-out">
                <img
                  src={galleryImages[(currentImageIndex + 1) % galleryImages.length]?.src}
                  alt={galleryImages[(currentImageIndex + 1) % galleryImages.length]?.alt}
                  className="object-cover w-full h-full transition-all duration-700 ease-out"
                />
              </div>
            </div>

            {/* Main foreground image with reveal animation */}
            <div
              className={`relative z-10 transform transition-all duration-700 ease-out group ${isAnimating ? 'opacity-80 scale-98' : 'opacity-100 hover:scale-[1.02]'}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out">
                <img
                  src={galleryImages[currentImageIndex]?.src}
                  alt={galleryImages[currentImageIndex]?.alt}
                  className="object-cover w-full h-full group-hover:scale-[1.05] transition-all duration-700 ease-out"
                />
                {/* Subtle overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>

            {/* Image indicator dots with reveal */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return
                    setIsAnimating(true)
                    setCurrentImageIndex(index)
                    setTimeout(() => setIsAnimating(false), 700)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out ${
                    index === currentImageIndex
                      ? 'bg-white scale-110 shadow-md opacity-100'
                      : 'bg-white/60 hover:bg-white/90 opacity-80'
                  }`}
                  aria-label={`Prejsť na obrázok ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="mt-10 sm:mt-14 mb-6 text-3xl font-light leading-tight text-black lg:text-4xl">
                Premeníme víziu na realitu
              </h2>
              <div className="mb-6 w-24 h-px bg-black"></div>
            </div>

            <div className="space-y-6 text-lg font-light leading-relaxed text-black/70">
              <p>
                Objavte nekonečné možnosti drevených materiálov v našej galérii realizovaných projektov. 
                Každý projekt je jedinečný a môže byť inšpiráciou pre váš vlastný.
              </p>
              <p>
                Od moderných interiérov po tradičné exteriéry, naša kolekcia obsahuje rôzne štýly a riešenia, 
                ktoré vám pomôžu vizualizovať potenciál drevených materiálov vo vašom priestore.
              </p>
              <p>
                Nechajte sa inšpirovať skutočnými príkladmi a vytvorte si vlastný jedinečný dizajn s našimi 
                kvalitnými drevenými produktmi.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <LocalizedClientLink href="/vizualizacie">
                <button className="flex gap-3 items-center px-8 py-4 text-white rounded-lg transition-all duration-300 bg-primary hover:bg-primary-dark group">
                  Realizácie
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
              
              <LocalizedClientLink href="/projekty">
                <button className="flex gap-3 items-center px-8 py-4 rounded-lg border transition-all duration-300 border-primary text-primary hover:bg-primary hover:text-white group">
                  Použité materiály
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">500+</div>
                <div className="text-sm font-light text-black/60">Realizovaných projektov</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">50+</div>
                <div className="text-sm font-light text-black/60">Dizajnových štýlov</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">100%</div>
                <div className="text-sm font-light text-black/60">Spokojnosť klientov</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 