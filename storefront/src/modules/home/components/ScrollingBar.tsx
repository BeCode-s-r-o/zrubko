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
    <div className="overflow-hidden w-full bg-[#1a2e1a] border-y border-[#2d4a2d]/30">
      <div className="flex items-center py-6 whitespace-nowrap animate-marquee">
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            {messages.map((msg, j) => {
              const IconComponent = msg.icon
              return (
                <span
                  key={j}
                  className="mx-12 text-base font-medium text-white tracking-wide md:text-lg hover:text-[#4a6741] transition-colors duration-300 flex items-center gap-3"
                >
                  <IconComponent size={20} className="text-[#4a6741] flex-shrink-0" />
                  {msg.text}
                </span>
              )
            })}
            {i < 5 && (
              <span className="mx-12 text-[#4a6741] text-xl font-medium">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ScrollingBar 