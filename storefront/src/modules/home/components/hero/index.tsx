"use client"

import { ArrowRight, Home, Square, Box, Layers } from "lucide-react"
import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Background images
  const images = [
    "/landing_banner_1.png",
    "/landing_banner.png",
  ]

  // Content for each slide
  const slidesContent = [
    {
      headline: "Obklad - Podlaha - Terasovky",
      subheadline: "Všetko na jednom mieste.",
      description: "Vyberiete, vypočítate, objednáte. Doručíme až k vám domov.",
      buttonText: "Začať s výberom",
      buttonLink: "/categories",
      showCategories: true,
      categoriesTitle: "Čo predávame:"
    },
    {
      headline: "Kvalitné drevené materiály",
      subheadline: "Tradičná remeselná kvalita.",
      description: "Objavte našu širokú ponuku prémiových drevených materiálov pre váš domov.",
      buttonText: "Prezrieť produkty",
      buttonLink: "/categories",
      showCategories: true,
      categoriesTitle: "Naše produkty:"
    }
  ]

  // Product categories
  const productCategories = [
    {
      name: "Drevený obklad",
      icon: Home,
      href: "/categories/dreveny-obklad"
    },
    {
      name: "Drevená podlaha",
      icon: Layers,
      href: "/categories/drevena-podlaha"
    },
    {
      name: "Terasové dosky",
      icon: Square,
      href: "/categories/terasove-dosky"
    },
    {
      name: "Hranoly",
      icon: Box,
      href: "/categories/hranoly"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-full overflow-hidden sm:px-6 sm:pt-6 sm:pb-6 lg:px-8 lg:pt-8 lg:pb-8 xl:px-12 xl:pt-10 xl:pb-10 sm:rounded-2xl">
      {/* Hero Container */}
      <div className="relative h-[70vh] flex flex-col">
        {/* Background Carousel */}
        <div className="absolute inset-0 sm:rounded-2xl overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-in-out ${
                index === currentImageIndex
                  ? 'opacity-100 scale-100 blur-0'
                  : 'opacity-0 scale-105 blur-sm'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 sm:rounded-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto w-full">
            {/* Main Content */}
            <div className="text-center lg:text-left lg:max-w-4xl">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white leading-tight mb-3 sm:mb-4">
                {slidesContent[currentImageIndex].headline}
                <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium mt-2">
                  {slidesContent[currentImageIndex].subheadline}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 lg:mb-10">
                {slidesContent[currentImageIndex].description}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start mb-8 sm:mb-10 lg:mb-12">
                <LocalizedClientLink href={slidesContent[currentImageIndex].buttonLink}>
                  <button className="group bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 hover:bg-white/95 hover:shadow-xl active:scale-95 flex items-center gap-2">
                    {slidesContent[currentImageIndex].buttonText}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Product Categories */}
            {slidesContent[currentImageIndex].showCategories && (
              <div className="mt-auto">
                <p className="text-white/80 font-medium text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6 text-center lg:text-left">
                  {slidesContent[currentImageIndex].categoriesTitle}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto lg:mx-0">
                  {productCategories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <LocalizedClientLink key={index} href={category.href}>
                        <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 hover:bg-white/15 hover:border-white/30 transition-all duration-300 active:scale-95 text-center">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-white font-medium text-xs sm:text-sm block">{category.name}</span>
                        </div>
                      </LocalizedClientLink>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute right-6 sm:right-8 lg:right-10 xl:right-14 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
