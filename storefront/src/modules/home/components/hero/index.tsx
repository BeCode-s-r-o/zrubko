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
    <section className="overflow-hidden relative pb-6 w-full lg:pt-16">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[500px] flex items-center w-full">
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
          <div className="relative z-10 px-6 py-10 max-w-4xl text-left md:px-8 md:py-12">
            <h1 className="mb-4 text-3xl font-light tracking-tight leading-tight text-white md:text-5xl lg:text-6xl">
              Staviate alebo <br />
              <span className="font-medium text-white">
                Obkladáte?
              </span>
            </h1>
            
            <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed md:text-xl lg:text-2xl text-white/80">
              Luxusné drevo na mieru – vyberiete, vypočítate, objednáte. 
              <span className="font-normal text-white">Doručíme až k vám domov.</span>
            </p>

            {/* Minimalistické štatistiky */}
            <div className="hidden flex-wrap gap-12 mb-12 md:flex">
              <div className="text-center">
                <div className="mb-2 text-3xl font-light text-white lg:text-4xl">15 000+</div>
                <div className="text-sm tracking-wide uppercase text-white/60">Spokojných zákazníkov</div>
              </div>
              
              <div className="text-center">
                <div className="mb-2 text-3xl font-light text-white lg:text-4xl">25+</div>
                <div className="text-sm tracking-wide uppercase text-white/60">Rokov skúseností</div>
              </div>
            </div>

            {/* Čisté buttony */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <button className="flex justify-center items-center px-8 py-4 text-base font-medium text-black bg-white transition-all duration-300 group hover:bg-white/90">
                Začať s výberom
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="flex justify-center items-center px-8 py-4 text-base font-medium text-white bg-transparent border transition-all duration-300 border-white/30 hover:border-white group">
                Navštíviť showroom
              </button>
            </div>
          </div>

          {/* Minimalistické carousel indicators */}
          <div className="flex absolute bottom-6 left-1/2 z-20 space-x-2 transform -translate-x-1/2">
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
