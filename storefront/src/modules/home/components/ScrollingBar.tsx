"use client"
import React from "react"

const messages = [
  "🚚 Doprava ZDARMA od 150€",
  "🌲 Certifikované drevo z udržateľných zdrojov", 
  "⚡ Expresné dodanie do 24 hodín",
  "🎯 Presný výpočet materiálu online",
  "🏠 Profesionálne poradenstvo ZDARMA",
  "✨ Viac ako 15 rokov skúseností"
]

const ScrollingBar = () => {
  return (
    <div className="overflow-hidden w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 border-y border-amber-700 mt-8 mb-8">
      <div className="flex items-center py-3 whitespace-nowrap animate-marquee">
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            {messages.map((msg, j) => (
              <span
                key={j}
                className="mx-12 text-sm font-medium text-white tracking-wide md:text-base hover:text-amber-100 transition-colors duration-300"
              >
                {msg}
              </span>
            ))}
            {i < 5 && (
              <span className="mx-12 text-amber-200 text-lg">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ScrollingBar 