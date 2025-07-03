"use client"
import React, { useState } from "react"

const items = [
  {
    title: "Où livrez-vous et en combien de temps ?",
    content: "Nous livrons partout en France métropolitaine sous 2 à 5 jours ouvrés."
  },
  {
    title: "A quoi correspondent les prix barrés ?",
    content: "Les prix barrés correspondent au prix de référence habituel, avant promotion."
  },
  {
    title: "Quand dois-je consommer les produits ?",
    content: "La date limite de consommation est indiquée sur chaque produit."
  },
  {
    title: "Qu'est-ce qu'une DDM ?",
    content: "La DDM (Date de Durabilité Minimale) est la date jusqu'à laquelle le produit conserve ses propriétés."
  }
]

const HomepageAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl">
      <h2 className="mb-8 text-3xl text-center md:text-4xl font-heading">
        Une question ? C'est par ici ! <span className="inline-block text-2xl align-middle text-accent">✨</span>
      </h2>
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        {items.map((item, idx) => (
          <div key={idx}>
            <button
              className="flex justify-between items-center px-2 py-5 w-full text-lg text-left md:px-6 font-heading focus:outline-none"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`accordion-content-${idx}`}
            >
              <span>{item.title}</span>
              <span className="text-2xl">{openIndex === idx ? '-' : '+'}</span>
            </button>
            <div
              id={`accordion-content-${idx}`}
              className={`overflow-hidden transition-all duration-300 px-2 md:px-6 ${openIndex === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
              aria-hidden={openIndex !== idx}
            >
              <p className="font-sans text-base text-gray-700">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow transition-colors bg-accent hover:bg-accent/90">
          En savoir plus <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}

export default HomepageAccordion 