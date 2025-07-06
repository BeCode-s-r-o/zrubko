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
    <div className="border-b border-ui-border-base md:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center py-4 w-full md:hidden"
      >
        <span className="text-base-semi text-ui-fg-base">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`${isOpen ? 'max-h-96' : 'max-h-0 md:max-h-full'} overflow-hidden transition-all duration-300 md:block`}>
        {children}
      </div>
    </div>
  )
}

export default FooterAccordion 