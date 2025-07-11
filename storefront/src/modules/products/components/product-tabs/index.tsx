"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { Crown, Sparkles, Star, Shield, Clock, Heart, Truck, Package, RefreshCw } from "lucide-react"

import { HttpTypes } from "@medusajs/types"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "O technike SHOU SUGI BAN",
      icon: <Crown className="w-5 h-5 text-gold" />,
      component: <ShouSugiBanInfoTab />,
    },
    {
      label: "Technické parametre",
      icon: <Star className="w-5 h-5 text-gold" />,
      component: <TechnicalSpecsTab product={product} />,
    },
    {
      label: "Inštalácia a údržba",
      icon: <Shield className="w-5 h-5 text-gold" />,
      component: <InstallationTab />,
    },
    {
      label: "Doprava a vrátenie",
      icon: <Truck className="w-5 h-5 text-gold" />,
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Luxusný nadpis - rovnaký štýl ako na homepage */}
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-ebony via-ebony-light to-gold bg-clip-text text-transparent mb-6 leading-tight">
          Detailné Informácie
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-gold via-mahogany to-ebony rounded-full mx-auto mb-8"></div>
        <p className="text-xl text-ebony-light max-w-3xl mx-auto leading-relaxed">
          Všetko, čo potrebujete vedieť o našich luxusných produktoch
        </p>
      </div>
      
      {/* Accordion v štýle homepage */}
      <div className="space-y-4">
        {tabs.map((tab, i) => (
          <div key={i} className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-mahogany/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 overflow-hidden">
                <Accordion type="multiple">
                  <Accordion.Item
                    key={i}
                    title={tab.label}
                    headingSize="medium"
                    value={tab.label}
                    className="border-none"
                  >
                    {tab.component}
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShouSugiBanInfoTab = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-gold" />
              <h4 className="font-bold text-xl text-ebony">Čo je SHOU SUGI BAN?</h4>
            </div>
            <div className="space-y-4 text-ebony-light">
              <p className="leading-relaxed">
                SHOU SUGI BAN je tradičná japonská technika spracования dreva pomocou ohňa. 
                Drevo sa kontrolovane spáli, čím sa vytvorí ochranná uhľová vrstva na povrchu.
              </p>
              <p className="leading-relaxed">
                Táto technika poskytuje prirodzenú ochranu proti hmyzu, hnilobě a ohňu, 
                pričom vytvorí jedinečný estetický vzhľad s hlbokou čiernou farbou.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-gold" />
              <h4 className="font-bold text-xl text-ebony">Výhody techniky</h4>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Shield className="w-4 h-4 text-mahogany" />, text: "Prirodzená ochrana proti škodcom" },
                { icon: <Clock className="w-4 h-4 text-mahogany" />, text: "Dlhá životnosť - až 80 rokov" },
                { icon: <Crown className="w-4 h-4 text-mahogany" />, text: "Unikátny estetický vzhľad" },
                { icon: <Shield className="w-4 h-4 text-mahogany" />, text: "Požiarny odpor" },
                { icon: <Heart className="w-4 h-4 text-mahogany" />, text: "Environmentálne šetrná metóda" },
                { icon: <Star className="w-4 h-4 text-mahogany" />, text: "Minimálna údržba" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-ebony-light">
                  {item.icon}
                  <span className="leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TechnicalSpecsTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
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

  // Get available options from the product for additional specs
  const availableOptions = product.options || []
  const availableVariants = product.variants || []
  
  // Extract unique values for each option
  const getUniqueOptionValues = (optionTitle: string): string[] => {
    const option = availableOptions.find(opt => opt.title === optionTitle)
    if (!option) return []
    
    // Get values from variants
    const values = availableVariants.map(variant => {
      const variantOption = variant.options?.find(opt => opt.option?.title === optionTitle)
      return variantOption?.value
    }).filter(Boolean) as string[]
    
    return Array.from(new Set(values))
  }

  const availableSizes = getUniqueOptionValues("Rozmer")
  const availableMaterials = getUniqueOptionValues("Materiál")
  const availableTypes = getUniqueOptionValues("Typ")
  const availableAvailability = getUniqueOptionValues("Dostupnosť")

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Základné parametre</h4>
          </div>
          <div className="space-y-4">
            {[
              { label: "Výška", value: getAttributeValue("height") },
              { label: "Šírka", value: getAttributeValue("width") },
              { label: "Dĺžka", value: getAttributeValue("length") },
              { label: "Hmotnosť", value: getAttributeValue("weight") },
              { label: "MID kód", value: getAttributeValue("mid_code") },
              { label: "HS kód", value: getAttributeValue("hs_code") },
              { label: "Krajina pôvodu", value: getAttributeValue("origin_country") },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gold/20 last:border-b-0">
                <span className="text-ebony-light">{item.label}:</span>
                <span className="font-semibold text-ebony bg-gold/10 px-3 py-1 rounded-full text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Varianty produktu</h4>
          </div>
          <div className="space-y-4">
            {availableMaterials.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gold/20">
                <span className="text-ebony-light">Materiál:</span>
                <span className="font-semibold text-ebony bg-gold/10 px-3 py-1 rounded-full text-sm">{availableMaterials.join(", ")}</span>
              </div>
            )}
            {availableSizes.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gold/20">
                <span className="text-ebony-light">Dostupné rozmery:</span>
                <span className="font-semibold text-ebony bg-gold/10 px-3 py-1 rounded-full text-sm">{availableSizes.join(", ")}</span>
              </div>
            )}
            {availableTypes.length > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gold/20">
                <span className="text-ebony-light">Typ:</span>
                <span className="font-semibold text-ebony bg-gold/10 px-3 py-1 rounded-full text-sm">{availableTypes.join(", ")}</span>
              </div>
            )}
            {availableAvailability.length > 0 && (
              <div className="mt-6">
                <h5 className="font-bold text-lg text-ebony mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-mahogany" />
                  Dostupnosť
                </h5>
                <div className="space-y-3">
                  {availableAvailability.map((availability, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gold/10 p-3 rounded-xl">
                      <div className={`w-3 h-3 rounded-full ${
                        availability === "Na sklade" ? "bg-green-500" :
                        availability === "Do mesiaca" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}></div>
                      <span className="font-medium text-ebony">{availability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const InstallationTab = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Inštalácia</h4>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Príprava podkladu",
                content: "Podklad musí byť suchý, čistý a rovný. Odporúčame použiť latovanie pre zabezpečenie vetrania.",
                icon: <Package className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Montáž",
                content: "Dosky sa montujú horizontálne alebo vertikálne pomocou nerezových skrutiek alebo klincov. Zachovajte rozstup 2-3 mm medzi doskami.",
                icon: <Shield className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Ochrana",
                content: "Pri inštalácii používajte ochranné pomôcky. Uhľová vrstva môže zafarbovať oblečenie.",
                icon: <Crown className="w-5 h-5 text-mahogany" />
              },
            ].map((item, index) => (
              <div key={index} className="bg-gold/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h5 className="font-bold text-ebony mb-2">{item.title}:</h5>
                    <p className="text-ebony-light leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Údržba</h4>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Čistenie",
                content: "Dosky čistite jemným kefovaním a oplachovaním vodou. Nepoužívajte chemické čistidlá.",
                icon: <Sparkles className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Ochrana",
                content: "Raz za 2-3 roky aplikujte ochranný olej na udržanie pôvodného vzhľadu a ochrany.",
                icon: <Shield className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Opravy",
                content: "Poškodené miesta môžete opraviť jemným brúsením a aplikáciou ochranného oleja.",
                icon: <Heart className="w-5 h-5 text-mahogany" />
              },
            ].map((item, index) => (
              <div key={index} className="bg-gold/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h5 className="font-bold text-ebony mb-2">{item.title}:</h5>
                    <p className="text-ebony-light leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Doprava</h4>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Štandardná doprava",
                content: "2-3 pracovné dni po odoslaní. Dopravné náklady sa počítajú podľa hmotnosti a objemu.",
                icon: <Package className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Expresná doprava",
                content: "Doručenie do 24 hodín v rámci SR. Dostupné pre objednávky do 15:00.",
                icon: <Clock className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Osobný odber",
                content: "Možnosť odberu v našom sklade v Poprade. Predchádzajúce objednanie je povinné.",
                icon: <Shield className="w-5 h-5 text-mahogany" />
              },
            ].map((item, index) => (
              <div key={index} className="bg-gold/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h5 className="font-bold text-ebony mb-2">{item.title}:</h5>
                    <p className="text-ebony-light leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-champagne/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-6 h-6 text-gold" />
            <h4 className="font-bold text-xl text-ebony">Vrátenie</h4>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Lehota",
                content: "14 dní od doručenia na vrátenie tovaru v pôvodnom stave a balení.",
                icon: <Clock className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Podmienky",
                content: "Tovar nesmie byť poškodený, znečistený alebo použitý. Originálne balenie je povinné.",
                icon: <Shield className="w-5 h-5 text-mahogany" />
              },
              {
                title: "Náklady",
                content: "Náklady za vrátenie hradí kupujúci, okrem prípadov reklamácie alebo chyby dodávateľa.",
                icon: <Crown className="w-5 h-5 text-mahogany" />
              },
            ].map((item, index) => (
              <div key={index} className="bg-gold/10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h5 className="font-bold text-ebony mb-2">{item.title}:</h5>
                    <p className="text-ebony-light leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
