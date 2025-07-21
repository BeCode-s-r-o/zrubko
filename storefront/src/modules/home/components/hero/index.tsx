"use client"

import { ArrowRight, Star, Shield, Truck, Clock, CheckCircle, Home, Square, Box, Layers } from "lucide-react"
import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // public images
  const images = [
    "/landing_banner_1.png",
    "/landing_banner.png",
    "/chata.jpg"
  ]

  // Product categories with icons and links
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <div className="overflow-hidden relative">
        <div className="px-0 mx-auto w-full sm:px-6 sm:max-w-7xl lg:px-8">
          <div className="relative overflow-hidden h-[600px] sm:h-[450px] lg:h-[550px] lg:my-8 flex items-center w-full sm:rounded-2xl shadow-lg">
            {/* Background Images with Carousel */}
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/35 to-black/50"></div>
            
            {/* Content Container */}
            <div className="relative z-10 px-6 mx-auto w-full max-w-sm sm:max-w-4xl sm:px-8 lg:px-12">
              <div className="pt-12 pb-8 text-center lg:text-left sm:pt-0 sm:pb-0">
          

                {/* Main Headline */}
                <h1 className="mb-4 text-xl font-light tracking-tight leading-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-čxl">
                   Obklad - Podlaha - Terasovky
                  <br />
                  <span className="font-medium text-white">
                    Všetko na jednom mieste.
                  </span>
                </h1>
                
                {/* Value Proposition */}
                <p className="mx-auto mb-6 max-w-2xl text-base font-light leading-relaxed lg:mx-0 text-white/90 sm:text-lg md:text-xl">
                  Vyberiete, vypočítate, objednáte. 
                  <span className="font-normal text-white">Doručíme až k vám domov.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 justify-center sm:flex-row sm:gap-4 lg:justify-start">
                  <LocalizedClientLink href="/categories">
                    <button className="flex justify-center items-center px-4 py-2.5 w-full text-sm font-medium text-black bg-white rounded-lg shadow-md transition-all duration-300 group sm:px-6 sm:py-3 sm:text-base sm:w-auto hover:bg-white/95 hover:shadow-lg">
                      Začať s výberom
                      <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink href="/kontakt">
                    <button className="flex justify-center items-center px-4 py-2.5 w-full text-sm font-medium text-white rounded-lg border backdrop-blur-sm transition-all duration-300 group bg-white/10 sm:px-6 sm:py-3 sm:text-base sm:w-auto border-white/30 hover:border-white hover:bg-white/15">
                      Bezplatné poradenstvo
                      <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </LocalizedClientLink>
                </div>

                {/* Product Categories */}
                <div className="mt-6 sm:mt-8 lg:mt-12 lg:mb-8">
                  <p className="mb-4 text-sm font-medium tracking-wider uppercase text-white/80">Čo predávame:</p>
                  <div className="grid grid-cols-1 gap-3 max-w-xl sm:grid-cols-2">
                    {productCategories.map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <LocalizedClientLink key={index} href={category.href}>
                          <div className="flex gap-3 items-center p-3 text-white rounded-lg border backdrop-blur-sm transition-all duration-300 group bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30">
                            <IconComponent className="w-4 h-4 text-white/90" />
                            <span className="flex-1 text-sm font-medium">{category.name}</span>
                            <ArrowRight className="w-4 h-4 transition-colors duration-300 text-white/60 group-hover:text-white" />
                          </div>
                        </LocalizedClientLink>
                      )
                    })}
                  </div>
                </div>

              
               
              </div>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex absolute bottom-6 left-1/2 z-20 space-x-2 transform -translate-x-1/2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
