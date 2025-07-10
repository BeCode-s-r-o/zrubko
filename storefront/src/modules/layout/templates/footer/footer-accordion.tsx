"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FooterAccordionProps {
  title: string
  children: React.ReactNode
}

const FooterAccordion = ({ title, children }: FooterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-accent-light/20 md:border-none">
      {/* Desktop Title */}
      <div className="hidden md:block mb-6">
        <h4 className="text-lg font-bold text-champagne mb-1">{title}</h4>
        <div className="w-8 h-0.5 bg-gradient-to-r from-gold to-gold/60"></div>
      </div>
      
      {/* Mobile Accordion Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center py-4 w-full md:hidden bg-gold/10 hover:bg-gold/20 rounded-lg px-4 transition-all duration-200"
      >
        <span className="text-base font-semibold text-champagne">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {/* Content */}
      <div className={`${isOpen ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-full'} overflow-hidden transition-all duration-300 md:block`}>
        {children}
      </div>
    </div>
  )
}

export default FooterAccordion 