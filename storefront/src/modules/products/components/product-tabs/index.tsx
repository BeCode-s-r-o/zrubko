"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import { HttpTypes } from "@medusajs/types"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "O technike SHOU SUGI BAN",
      component: <ShouSugiBanInfoTab />,
    },
    {
      label: "Technické parametre",
      component: <TechnicalSpecsTab product={product} />,
    },
    {
      label: "Inštalácia a údržba",
      component: <InstallationTab />,
    },
    {
      label: "Doprava a vrátenie",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ShouSugiBanInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Čo je SHOU SUGI BAN?</h4>
          <p className="text-gray-600 mb-4">
            SHOU SUGI BAN je tradičná japonská technika spracowania dreva pomocou ohňa. 
            Drevo sa kontrolovane spáli, čím sa vytvorí ochranná uhľová vrstva na povrchu.
          </p>
          <p className="text-gray-600 mb-4">
            Táto technika poskytuje prirodzenú ochranu proti hmyzu, hnilobě a ohňu, 
            pričom vytvorí jedinečný estetický vzhľad s hlbokou čiernou farbou.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4">Výhody techniky</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• Prirodzená ochrana proti škodcom</li>
            <li>• Dlhá životnosť - až 80 rokov</li>
            <li>• Unikátny estetický vzhľad</li>
            <li>• Požiarny odpor</li>
            <li>• Environmentálne šetrná metóda</li>
            <li>• Minimálna údržba</li>
          </ul>
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
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Základné parametre</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Výška:</span>
              <span className="font-medium">{getAttributeValue("height")}</span>
            </div>
            <div className="flex justify-between">
              <span>Šírka:</span>
              <span className="font-medium">{getAttributeValue("width")}</span>
            </div>
            <div className="flex justify-between">
              <span>Dĺžka:</span>
              <span className="font-medium">{getAttributeValue("length")}</span>
            </div>
            <div className="flex justify-between">
              <span>Hmotnosť:</span>
              <span className="font-medium">{getAttributeValue("weight")}</span>
            </div>
            <div className="flex justify-between">
              <span>MID kód:</span>
              <span className="font-medium">{getAttributeValue("mid_code")}</span>
            </div>
            <div className="flex justify-between">
              <span>HS kód:</span>
              <span className="font-medium">{getAttributeValue("hs_code")}</span>
            </div>
            <div className="flex justify-between">
              <span>Krajina pôvodu:</span>
              <span className="font-medium">{getAttributeValue("origin_country")}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4">Varianty produktu</h4>
          <div className="space-y-3">
            {availableMaterials.length > 0 && (
              <div className="flex justify-between">
                <span>Materiál:</span>
                <span className="font-medium">{availableMaterials.join(", ")}</span>
              </div>
            )}
            {availableSizes.length > 0 && (
              <div className="flex justify-between">
                <span>Dostupné rozmery:</span>
                <span className="font-medium">{availableSizes.join(", ")}</span>
              </div>
            )}
            {availableTypes.length > 0 && (
              <div className="flex justify-between">
                <span>Typ:</span>
                <span className="font-medium">{availableTypes.join(", ")}</span>
              </div>
            )}
            {availableAvailability.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold text-base mb-2">Dostupnosť</h5>
                <div className="space-y-2">
                  {availableAvailability.map((availability, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        availability === "Na sklade" ? "bg-green-500" :
                        availability === "Do mesiaca" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}></div>
                      <span className="text-sm font-medium">{availability}</span>
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
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Inštalácia</h4>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Príprava podkladu:</strong> Podklad musí byť suchý, čistý a rovný. 
              Odporúčame použiť latovanie pre zabezpečenie vetrania.
            </p>
            <p>
              <strong>Montáž:</strong> Dosky sa montujú horizontálne alebo vertikálne pomocou 
              nerezových skrutiek alebo klincov. Zachovajte rozstup 2-3 mm medzi doskami.
            </p>
            <p>
              <strong>Ochrana:</strong> Pri inštalácii používajte ochranné pomôcky. 
              Uhľová vrstva môže zafarbovať oblečenie.
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4">Údržba</h4>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Čistenie:</strong> Dosky čistite jemným kefovaním a oplachovaním vodou. 
              Nepoužívajte chemické čistidlá.
            </p>
            <p>
              <strong>Ochrana:</strong> Raz za 2-3 roky aplikujte ochranný olej na udržanie 
              pôvodného vzhľadu a ochrany.
            </p>
            <p>
              <strong>Opravy:</strong> Poškodené miesta môžete opraviť jemným brúsením 
              a aplikáciou ochranného oleja.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Doprava</h4>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Štandardná doprava:</strong> 2-3 pracovné dni po odoslaní. 
              Dopravné náklady sa počítajú podľa hmotnosti a objemu.
            </p>
            <p>
              <strong>Expresná doprava:</strong> Doručenie do 24 hodín v rámci SR. 
              Dostupné pre objednávky do 15:00.
            </p>
            <p>
              <strong>Osobný odber:</strong> Možnosť odberu v našom sklade v Poprade. 
              Predchádzajúce objednanie je povinné.
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4">Vrátenie</h4>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Lehota:</strong> 14 dní od doručenia na vrátenie tovaru 
              v pôvodnom stave a balení.
            </p>
            <p>
              <strong>Podmienky:</strong> Tovar nesmie byť poškodený, znečistený 
              alebo použitý. Originálne balenie je povinné.
            </p>
            <p>
              <strong>Náklady:</strong> Náklady za vrátenie hradí kupujúci, 
              okrem prípadov reklamácie alebo chyby dodávateľa.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
