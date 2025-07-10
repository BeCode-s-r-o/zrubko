"use client"
import React from "react"
import { Truck, Trees, Zap, Calculator, HeadphonesIcon, Award } from "lucide-react"

const messages = [
  { icon: Truck, text: "Doprava ZDARMA od 150€" },
  { icon: Trees, text: "Certifikované drevo z udržateľných zdrojov" }, 
  { icon: Zap, text: "Expresné dodanie do 24 hodín" },
  { icon: Calculator, text: "Presný výpočet materiálu online" },
  { icon: HeadphonesIcon, text: "Profesionálne poradenstvo ZDARMA" },
  { icon: Award, text: "Viac ako 15 rokov skúseností" }
]

const ScrollingBar = () => {
  return (
    <div className="overflow-hidden w-full bg-gradient-to-r from-ebony via-ebony-dark to-ebony border-y border-gold/30 shadow-lg relative">
      {/* Luxusný pattern pozadie */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10L50 30L30 50L10 30Z' fill='%23D4AF37' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="flex items-center py-4 whitespace-nowrap animate-marquee relative z-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            {messages.map((msg, j) => {
              const IconComponent = msg.icon
              return (
                <span
                  key={j}
                  className="mx-12 text-base font-semibold text-champagne tracking-wide md:text-lg hover:text-gold transition-colors duration-300 drop-shadow-sm flex items-center gap-3"
                >
                  <IconComponent size={20} className="text-gold flex-shrink-0" />
                  {msg.text}
                </span>
              )
            })}
            {i < 5 && (
              <span className="mx-12 text-gold text-xl font-bold drop-shadow-sm">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Jemný gradient overlay pre lepší kontrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ebony/20 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default ScrollingBar 