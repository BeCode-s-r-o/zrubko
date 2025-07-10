"use client"
import React, { useState } from "react"

const items = [
  {
    title: "Kde dodávate a za ako dlho?",
    content: "Dodávame po celom Slovensku. Štandardná dodacia doba je 2-5 pracovných dní, v závislosti od lokality a dostupnosti materiálu."
  },
  {
    title: "Aké sú možnosti platby?",
    content: "Akceptujeme bankový prevod, platbu kartou a platbu na dobierku. Pri väčších objednávkach je možná aj zálohová platba."
  },
  {
    title: "Môžem si materiál pozrieť osobne?",
    content: "Áno, radi vás privítame v našej predajni v Žiline, kde si môžete pozrieť vzorky materiálov a poradiť sa s našimi odborníkmi."
  },
  {
    title: "Poskytujete poradenstvo pri výbere?",
    content: "Áno, naši odborníci vám radi poradia s výberom vhodného materiálu, pomôžu s výpočtom potrebného množstva a odpovedia na všetky vaše otázky."
  }
]

const HomepageAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl">
      <h2 className="mb-8 text-3xl text-center md:text-4xl font-heading text-ebony">
        Máte otázky? Tu nájdete odpovede!
      </h2>
      <div className="border-t border-b border-gold/30 divide-y divide-gold/30">
        {items.map((item, idx) => (
          <div key={idx}>
            <button
              className="flex justify-between items-center px-2 py-5 w-full text-lg text-left md:px-6 font-heading focus:outline-none text-ebony hover:text-gold transition-colors"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`accordion-content-${idx}`}
            >
              <span>{item.title}</span>
              <span className="text-2xl text-gold">{openIndex === idx ? '-' : '+'}</span>
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
        <button className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-all duration-300 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold hover:scale-105 border border-gold/30">
          Viac informácií <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}

export default HomepageAccordion 