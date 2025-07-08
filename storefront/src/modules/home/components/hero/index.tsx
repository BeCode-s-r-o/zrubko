"use client"

import { Github } from "@medusajs/icons"
import LightButton from "../../../layout/components/ui/LightButton"
import PrimaryButton from "../../../layout/components/ui/PrimaryButton"

import { Button, Heading } from "@medusajs/ui"
import { CirclePlay } from "lucide-react"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Skutočné SHOU SUGI BAN obrázky s jednoduchými názvami
  const images = [
    '/burnt-wood.jpg',
    '/shou-sugi-ban-main.jpg',
    '/shou-sugi-ban-hero.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="pt-6 lg:pt-20">
      <div className="content-container">
        <div className="relative rounded-xl overflow-hidden min-h-[500px] flex items-center">
          {/* SHOU SUGI BAN obrázky s prechodovými efektmi */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          
          {/* Tmavší overlay pre lepší kontrast s SHOU SUGI BAN témou */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Content */}
          <div className="relative z-10 text-left px-8 py-12 lg:px-12 lg:py-16">
            <h1 className="mb-6 text-4xl lg:text-6xl font-bold leading-tight text-white">
              Staviate alebo Obkladáte? 
              <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent"> Zrubko má drevo na mieru</span>
            </h1>
            <p className="mb-10 text-xl text-gray-200 leading-relaxed">
              Vyberiete, vypočítate, objednáte – doručíme až k vám domov.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="group bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center">
                <CirclePlay size={18} className="mr-2" />
                Začať s výberom
              </button>
              <button className="bg-white/90 hover:bg-white text-gray-800 border-2 border-white/50 hover:border-accent px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                Navštíviť showroom
              </button>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? 'bg-accent' : 'bg-accent bg-opacity-30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
