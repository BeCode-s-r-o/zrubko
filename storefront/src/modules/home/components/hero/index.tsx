"use client"

import { Github } from "@medusajs/icons"
import LightButton from "../../../layout/components/ui/LightButton"
import PrimaryButton from "../../../layout/components/ui/PrimaryButton"

import { Button, Heading } from "@medusajs/ui"
import { CirclePlay } from "lucide-react"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    '/9pdbmtzg5xvsirgyplj6la120080.jpg',
    '/lightwoodinteriordiningroom26041710904800x533_1.jpg'
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
          {/* Background images with transition */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 text-left px-8 py-12 lg:px-12 lg:py-16">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
              Staviate alebo Obkladáte? Zrubko  <br />má drevo na mieru
            </h1>
            <p className="mb-10 text-xl text-gray-200">
              Vyberiete, vypočítate, objednáte – doručíme až k vám domov.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <LightButton href="/vyber" icon={<CirclePlay size={18} />}>Začať s výberom</LightButton>
              <PrimaryButton href="/showroom">Navštíviť showroom</PrimaryButton>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
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
