"use client"
import React, { useState } from "react"

export type FAQItem = {
  title: string
  content: string
}

export const defaultProductFAQItems: FAQItem[] = [
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

export const contactFAQItems: FAQItem[] = [
  {
    title: "Ako vás môžem kontaktovať?",
    content: "Môžete nás kontaktovať emailom na info@zrubko.sk, telefonicky na +421 907 695 363, alebo nás navštívte osobne v našej predajni v Žiline."
  },
  {
    title: "Aká je vaša otváracía doba?",
    content: "Naša predajňa je otvorená v pracovných dňoch od 8:00 do 16:00. Návštevu mimo otváracích hodín je možné dohodnúť individuálne."
  },
  {
    title: "Poskytujete technické poradenstvo?",
    content: "Áno, naši odborníci vám radi poradia s technickými otázkami ohľadom montáže, údržby a výberu vhodného materiálu."
  },
  {
    title: "Robíte aj cenové kalkulácie?",
    content: "Áno, na základe vašich požiadaviek vám vypracujeme detailnú cenovú kalkuláciu vrátane dopravy a prípadných doplnkových služieb."
  }
]

interface ProductFAQProps {
  items?: FAQItem[]
  title?: string
}

const ProductFAQ = ({ 
  items = defaultProductFAQItems,
  title = "Máte otázky? Tu nájdete odpovede!"
}: ProductFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="mx-auto mt-12 mb-12 w-full max-w-2xl">
      <h2 className="mb-8 text-3xl text-center md:text-4xl font-heading text-ebony hover:text-gold transition-colors">
        {title}
      </h2>
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        {items.map((item, idx) => (
          <div key={idx}>
            <button
              className="flex justify-between items-center px-2 py-5 w-full text-lg text-left md:px-6 font-heading focus:outline-none hover:bg-gray-50 transition-colors"
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
    </div>
  )
}

export default ProductFAQ 