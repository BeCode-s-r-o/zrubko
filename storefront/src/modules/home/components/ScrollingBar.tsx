"use client"
import React from "react"

const messages = [
  "Tentez votre chance",
  "400€ à gagner",
  "1 commande = 1 participation"
]

const ScrollingBar = () => {
  return (
    <div className="overflow-hidden mt-4 w-full bg-accent">
      <div className="flex items-center pt-1 pb-1 whitespace-nowrap animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <React.Fragment key={i}>
            {messages.map((msg, j) => (
              <span
                key={j}
                className="mx-8 text-xl italic font-semibold text-white font-heading md:text-2xl"
              >
                {msg}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ScrollingBar 