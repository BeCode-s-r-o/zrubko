"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Minimalistické obrázky zamerané na čistý drevený dizajn
  const images = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 8000) // Pomalší, luxusnejší prechod

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative overflow-hidden pt-20 lg:pt-24 pb-8">
      <div className="px-0 sm:px-2 lg:px-4">
        <div className="relative rounded-2xl overflow-hidden min-h-[700px] flex items-center max-w-[2024px] mx-auto">
          {/* Obrázky s jemným prechodom */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          
          {/* Minimalistický gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          
          {/* Content */}
          <div className="relative z-10 text-left px-8 py-20 lg:px-16 lg:py-24 max-w-4xl">
            <h1 className="mb-6 text-4xl lg:text-6xl xl:text-7xl font-light leading-tight text-white tracking-tight">
              Staviate alebo <br />
              <span className="font-medium text-white">
                Obkladáte?
              </span>
            </h1>
            
            <p className="mb-16 text-xl lg:text-2xl text-white/80 leading-relaxed font-light max-w-2xl">
              Luxusné drevo na mieru – vyberiete, vypočítate, objednáte. 
              <span className="text-white font-normal">Doručíme až k vám domov.</span>
            </p>

            {/* Minimalistické štatistiky */}
            <div className="flex flex-wrap gap-12 mb-16">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">15 000+</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">Spokojných zákazníkov</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-white mb-2">25+</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">Rokov skúseností</div>
              </div>
            </div>

            {/* Čisté buttony */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <button className="group bg-white text-black px-8 py-4 font-medium text-base transition-all duration-300 hover:bg-white/90 flex items-center justify-center">
                Začať s výberom
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-transparent text-white border border-white/30 hover:border-white px-8 py-4 font-medium text-base transition-all duration-300 flex items-center justify-center group">
                Navštíviť showroom
              </button>
            </div>
          </div>

          {/* Minimalistické carousel indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/30 hover:bg-white/60'
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
