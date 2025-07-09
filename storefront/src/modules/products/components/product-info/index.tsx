"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import {
  FlameIcon,
  ShieldIcon,
  BrushIcon,
  LeafIcon,
  WeatherIcon,
  BugIcon,
  SparkleIcon,
  HammerIcon,
  WrenchIcon,
  CheckIcon,
  RefreshIcon,
  TruckIcon,
  ReturnIcon,
  ProtectionIcon,
  RulerIcon,
  PackageIcon,
  LinkIcon,
  TreeIcon
} from "@modules/common/icons/wood-icons"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    "shou-sugi-ban": true
  })

  // Helper function to get attribute value from product
  const getAttributeValue = (key: string, defaultValue: string = "-") => {
    // Try from product metadata first
    if (product.metadata && product.metadata[key]) {
      return product.metadata[key] as string
    }
    
    // Try from product direct properties
    if ((product as any)[key]) {
      return (product as any)[key]
    }
    
    return defaultValue
  }

  // Toggle funkcia pre sekcie
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const infoSections = [
    {
      id: "product-attributes",
      title: "Atributy produktu",
      content: (
        <div className="text-sm py-5">
          <div className="bg-gradient-to-br from-accent/5 to-accent-light/5 rounded-lg p-4 mb-4 border border-accent/10">
            <p className="text-gray-600 mb-4">Technické parametre a špecifikácie</p>

          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Výška", value: getAttributeValue("height"), icon: <RulerIcon className="text-accent" /> },
              { label: "Šírka", value: getAttributeValue("width"), icon: <RulerIcon className="text-accent" /> },
              { label: "Dĺžka", value: getAttributeValue("length"), icon: <RulerIcon className="text-accent" /> },
              { label: "Hmotnosť", value: getAttributeValue("weight"), icon: <PackageIcon className="text-accent-dark" /> },
              { label: "Certifikácia", value: getAttributeValue("certification"), icon: <LeafIcon className="text-green-600" /> },
              { label: "MID kód", value: getAttributeValue("mid_code"), icon: <LinkIcon className="text-accent-light" /> },
              { label: "HS kód", value: getAttributeValue("hs_code"), icon: <LinkIcon className="text-accent-light" /> },
              { label: "Krajina pôvodu", value: getAttributeValue("origin_country"), icon: <TreeIcon className="text-green-600" /> }
            ].filter(attr => attr.value !== "-").map((attr, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-accent/10 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span>{attr.icon}</span>
                  <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                    {attr.label}
                  </span>
                </div>
                <p className="text-accent-dark font-bold text-lg ml-8">
                  {attr.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "shou-sugi-ban",
      title: "O technike SHOU SUGI BAN",
      content: (
        <div className="text-sm py-5">
          <div className="bg-gradient-to-br from-accent/5 to-accent-light/5 rounded-lg p-4 mb-4 border border-accent/10">
            <p className="mb-4 text-gray-700 leading-relaxed">
              <span className="font-bold text-accent-dark text-lg">SHOU SUGI BAN</span> je tradičná japonská technika ošetrenia dreva, ktorá vznikla pred stovkami rokov. 
              Pôvodne sa používala na ochranu drevených domov pred <span className="text-accent font-semibold">ohňom, hmyzom a počasím</span>.
            </p>
          </div>
          
          <div className="mb-5">
            <h5 className="font-bold text-accent-dark mb-3 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              Proces výroby
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: <FlameIcon className="text-accent" />, text: "Kontrolované spálenie povrchu dreva pri vysokej teplote" },
                { icon: <ShieldIcon className="text-accent-dark" />, text: "Vytvorenie ochrannej uhlíkovej vrstvy" },
                { icon: <BrushIcon className="text-accent-light" />, text: "Kartácovanie pre odstránenie voľných častíc" },
                { icon: <LeafIcon className="text-green-600" />, text: "Ošetrenie olejom pre zvýšenú odolnosť" }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors border border-accent/10">
                  <span className="mt-0.5">{step.icon}</span>
                  <span className="text-xs text-gray-600 leading-relaxed">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-accent-dark mb-3 flex items-center">
              <span className="w-2 h-2 bg-accent-light rounded-full mr-3"></span>
              Výhody techniky
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: <WeatherIcon className="text-blue-600" />, text: "Vysoká odolnosť proti poveternostným vplyvom" },
                { icon: <BugIcon className="text-amber-600" />, text: "Prirodzená ochrana proti škodcom" },
                { icon: <FlameIcon className="text-red-600" />, text: "Požiarna odolnosť a minimálna údržba" },
                { icon: <SparkleIcon className="text-accent" />, text: "Jedinečný vizuálny efekt a dlhá životnosť 50+ rokov" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent-light/5 transition-colors border border-accent-light/10">
                  <span className="mt-0.5">{benefit.icon}</span>
                  <span className="text-xs text-gray-600 leading-relaxed">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "installation",
      title: "Inštalácia a údržba",
      content: (
        <div className="text-sm py-5">
          <div className="mb-5">
            <h5 className="font-bold text-accent-dark mb-3 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              Inštalácia
            </h5>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-accent/5 to-accent-light/5 rounded-lg p-4 border border-accent/10">
                <h6 className="font-semibold text-accent-dark text-sm mb-3 flex items-center">
                  <HammerIcon className="text-accent mr-2" />
                  Príprava podkladu
                </h6>
                <ul className="space-y-2">
                  {["Rovný a suchý podklad", "Parozábrana (pre interiér)", "Vetracia medzera (pre exteriér)"].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-accent-light/5 to-accent/5 rounded-lg p-4 border border-accent-light/10">
                <h6 className="font-semibold text-accent-dark text-sm mb-3 flex items-center">
                  <WrenchIcon className="text-accent-dark mr-2" />
                  Montáž
                </h6>
                <ul className="space-y-2">
                  {["Neviditeľné uchytenie na skoby", "Spoj pero-drážka", "Dilatačná medzera 2-3 mm"].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent-light rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-accent-dark mb-3 flex items-center">
              <span className="w-2 h-2 bg-accent-light rounded-full mr-3"></span>
              Údržba
            </h5>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h6 className="font-semibold text-green-800 text-sm mb-2 flex items-center">
                  <CheckIcon className="mr-2 w-5 h-5" />
                  Prvý rok
                </h6>
                <p className="text-xs text-green-700 leading-relaxed">Bez potreby údržby. Drevo si zachováva svoju prirodzenú ochranu.</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h6 className="font-semibold text-amber-800 text-sm mb-2 flex items-center">
                  <RefreshIcon className="text-amber-600 mr-2 w-5 h-5" />
                  Dlhodobá údržba (5-10 rokov)
                </h6>
                <p className="text-xs text-amber-700 leading-relaxed">Možné obnovenie olejem pre zachovanie farby a lesku (nie je povinné).</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "shipping",
      title: "Doprava a vrátenie",
      content: (
        <div className="text-sm py-5">
          <div className="space-y-4">
            {[
              {
                icon: <TruckIcon className="text-blue-600 w-6 h-6" />,
                title: "Doprava",
                description: "Profesionálna doprava dreveného materiálu. Doručenie do 5-7 pracovných dní po objednaní.",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                titleColor: "text-blue-800",
                textColor: "text-blue-700"
              },
              {
                icon: <ReturnIcon className="text-orange-600 w-6 h-6" />,
                title: "Vrátenie",
                description: "Vrátenie nepoškodeného tovaru do 14 dní. Pri custom rozmeroch nie je možné vrátenie.",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                titleColor: "text-orange-800",
                textColor: "text-orange-700"
              },
              {
                icon: <ProtectionIcon className="text-green-600 w-6 h-6" />,
                title: "Reklamácie",
                description: "Reklamácie vadného tovaru riešime do 24 hodín s bezplatnou výmenou.",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                titleColor: "text-green-800",
                textColor: "text-green-700"
              }
            ].map((service, index) => (
              <div key={index} className={`${service.bgColor} ${service.borderColor} border rounded-lg p-4 hover:shadow-md transition-shadow`}>
                <h6 className={`font-semibold ${service.titleColor} text-sm mb-3 flex items-center`}>
                  <span className="mr-3">{service.icon}</span>
                  {service.title}
                </h6>
                <p className={`text-xs ${service.textColor} leading-relaxed ml-9`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-2 p-2">
        {infoSections.map((section) => (
          <div key={section.id} className="border border-ui-border-base rounded-lg bg-white">
            {/* Klikateľný header */}
            <button 
              onClick={() => toggleSection(section.id)}
              className="w-full text-left px-4 py-3 text-sm text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 flex justify-between items-center"
            >
              <span className="font-medium">{section.title}</span>
              <span className={`transform transition-transform duration-200 ${
                openSections[section.id] ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>
            
            {/* Obsah sekcie */}
            {openSections[section.id] && (
              <div className="px-4 pb-3 border-t border-ui-border-base animate-in slide-in-from-top-2 duration-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductInfo 