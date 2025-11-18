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
    <div className="overflow-hidden w-full bg-secondary border-y border-secondary/30">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
      <div className="flex items-center py-6 whitespace-nowrap animate-marquee">
        {Array.from({ length: 3 }).map((_, i) => (
          <React.Fragment key={i}>
            {messages.map((msg, j) => {
              const IconComponent = msg.icon
              return (
                <span
                  key={j}
                  className="mx-8 text-base font-medium text-white tracking-wide md:text-lg hover:text-secondary transition-colors duration-300 flex items-center gap-3"
                >
                  <IconComponent size={20} className="text-secondary flex-shrink-0" />
                  {msg.text}
                </span>
              )
            })}
            {i < 2 && (
              <span className="mx-8 text-secondary text-xl font-medium">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ScrollingBar 