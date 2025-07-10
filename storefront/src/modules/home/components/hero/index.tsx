"use client"

import { Github } from "@medusajs/icons"
import LightButton from "../../../layout/components/ui/LightButton"
import PrimaryButton from "../../../layout/components/ui/PrimaryButton"

import { Button, Heading } from "@medusajs/ui"
import { CirclePlay, ArrowRight, Star, Heart, Crown, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Luxusné obrázky zamerané na Tatranský profil - drevný dom, horizontálne profily, drevené materiály
  const images = [
    // 1. Luxusný drevený dom - moderná drevená architektúra s horizontálnymi profilmi
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // 2. Tatranský profil - horizontálne drevené dosky na fasáde
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // 3. Luxusné drevené profily a dosky - kvalita a remeselníctvo
    "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000) // Pomalší prechod pre luxusný pocit

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative overflow-hidden pt-16 lg:pt-20 pb-4">
      <div className="px-0 sm:px-1 lg:px-2 xl:px-4">
        <div className="relative rounded-3xl overflow-hidden min-h-[650px] flex items-center shadow-2xl border border-gold/30 max-w-[2024px] mx-auto">
          {/* Tmavé pozadie obrázky s prechodovými efektmi */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
          
          {/* Ešte tmavší gradient overlay pre lepší kontrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-ebony/90 via-ebony/75 to-ebony/60"></div>
          
          {/* Dekoratívne elementy */}
          <div className="absolute top-8 right-8 opacity-20">
            <Crown className="w-16 h-16 text-gold" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-15">
            <Sparkles className="w-12 h-12 text-champagne" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-left px-12 py-16 lg:px-16 lg:py-20 max-w-4xl">
            {/* Prémiový badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-gradient-to-r from-gold/20 to-gold/30 backdrop-blur-sm rounded-full border border-gold/40">
              <Star className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-champagne tracking-wide">PRÉMIOVÉ DREVENÉ RIEŠENIA</span>
            </div>
            
            <h1 className="mb-8 text-5xl lg:text-7xl font-bold leading-tight text-white">
              Staviate alebo <br />
              <span className="bg-gradient-to-r from-gold via-champagne to-gold bg-clip-text text-transparent">
                Obkladáte?
              </span>
            </h1>
            
            <p className="mb-12 text-2xl text-champagne leading-relaxed font-light max-w-2xl">
              Zrubko má luxusné drevo na mieru – vyberiete, vypočítate, objednáte. 
              <span className="text-gold font-medium">Doručíme až k vám domov.</span>
            </p>

            {/* Štatistiky */}
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gold to-gold-dark rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">15 000+</div>
                  <div className="text-sm text-champagne">Spokojných zákazníkov</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-mahogany to-mahogany-dark rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">25+ rokov</div>
                  <div className="text-sm text-champagne">Skúseností</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row">
              <button className="group bg-gradient-to-r from-gold via-gold-dark to-mahogany hover:from-gold-dark hover:to-mahogany-dark text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center border border-gold/20 hover:border-white/20">
                <CirclePlay size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                Začať s výberom
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-champagne/30 hover:border-champagne px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center group">
                <Crown size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                Navštíviť showroom
              </button>
            </div>
          </div>

          {/* Vylepšené carousel indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 border-2 ${
                  index === currentImageIndex 
                    ? 'bg-gold border-gold shadow-lg scale-125' 
                    : 'bg-white/20 border-white/40 hover:bg-white/40 hover:scale-110'
                }`}
              />
            ))}
          </div>
          
          {/* Jemný shadow overlay na spodku */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ebony/40 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
