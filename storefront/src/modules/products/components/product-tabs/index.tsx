"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

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
      component: <TechnicalSpecsTab />,
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
      <div className="prose max-w-none">
        <p className="text-base mb-4">
          <strong>SHOU SUGI BAN</strong> je tradičná japonská technika ošetrenia dreva, ktorá vznikla pred stovkami rokov. 
          Pôvodne sa používala na ochranu drevených domov pred ohňom, hmyzom a počasím.
        </p>
        
        <h4 className="font-semibold text-lg mb-3">Proces výroby</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Kontrolované spálenie povrchu dreva pri vysokej teplote</li>
          <li>Vytvorenie ochrannej uhlíkovej vrstvy</li>
          <li>Kartácovanie pre odstránenie voľných častíc</li>
          <li>Ošetrenie olejom pre zvýšenú odolnosť</li>
        </ul>

        <h4 className="font-semibold text-lg mb-3">Výhody SHOU SUGI BAN</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vysoká odolnosť proti poveternostným vplyvom</li>
              <li>Prirodzená ochrana proti škodcom</li>
              <li>Požiarna odolnosť</li>
              <li>Minimálna údržba</li>
            </ul>
          </div>
          <div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Jedinečný vizuálny efekt</li>
              <li>Ekologická technika bez chemikálií</li>
              <li>Dlhá životnosť 50+ rokov</li>
              <li>Moderný dizajn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const TechnicalSpecsTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4">Materiálové vlastnosti</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Drevina:</span>
              <span className="font-medium">Sibírsky smrek/smrekovec</span>
            </div>
            <div className="flex justify-between">
              <span>Vlhkosť dreva:</span>
              <span className="font-medium">8-12%</span>
            </div>
            <div className="flex justify-between">
              <span>Trieda kvality:</span>
              <span className="font-medium">AB</span>
            </div>
            <div className="flex justify-between">
              <span>Povrchová úprava:</span>
              <span className="font-medium">Spálené + kartáč/extra + olej</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Rozmery a balenie</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Hrúbka × šírka:</span>
              <span className="font-medium">20×140 mm, 20×146 mm</span>
            </div>
            <div className="flex justify-between">
              <span>Štandardné dĺžky:</span>
              <span className="font-medium">3.9 m, 6.0 m</span>
            </div>
            <div className="flex justify-between">
              <span>Spoj:</span>
              <span className="font-medium">Pero-drážka</span>
            </div>
            <div className="flex justify-between">
              <span>Balenie:</span>
              <span className="font-medium">Individuálne zabalené</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InstallationTab = () => {
  return (
    <div className="text-small-regular py-8">
      <h4 className="font-semibold text-lg mb-4">Inštalácia</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h5 className="font-medium mb-2">Príprava podkladu</h5>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Rovný a suchý podklad</li>
            <li>Parozábrana (pre interiér)</li>
            <li>Vetracia medzera (pre exteriér)</li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-2">Montáž</h5>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Neviditeľné uchytenie na skoby</li>
            <li>Spoj pero-drážka</li>
            <li>Dilatačná medzera 2-3 mm</li>
          </ul>
        </div>
      </div>

      <h4 className="font-semibold text-lg mb-4">Údržba</h4>
      <div className="space-y-4">
        <p>SHOU SUGI BAN vyžaduje minimálnu údržbu vďaka svojej prirodzenej ochrane.</p>
        
        <div>
          <h5 className="font-medium mb-2">Prvý rok</h5>
          <p className="text-sm">Bez potreby údržby. Drevo si zachováva svoju prirodzenú ochranu.</p>
        </div>
        
        <div>
          <h5 className="font-medium mb-2">Dlhodobá údržba (5-10 rokov)</h5>
          <p className="text-sm">Možné obnovenie olejem pre zachovanie farby a lesku (nie je povinné).</p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Doprava</span>
            <p className="max-w-sm">
              Profesionálna doprava dreveného materiálu. Doručenie do 5-7 pracovných dní po objednaní.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Vrátenie</span>
            <p className="max-w-sm">
              Vrátenie nepoškodeného tovaru do 14 dní. Pri custom rozmeroch nie je možné vrátenie.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Reklamácie</span>
            <p className="max-w-sm">
              Reklamácie vadného tovaru riešime do 24 hodín s bezplatnou výmenou.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
