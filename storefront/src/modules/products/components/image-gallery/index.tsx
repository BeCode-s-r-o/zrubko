"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    "shou-sugi-ban": true
  })
  
  if (!images || images.length === 0) {
    return (
      <div className="flex w-full">
        <div className="aspect-[29/34] w-full bg-ui-bg-subtle rounded-lg"></div>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  // Toggle funkcia pre sekcie - každá sekcia má vlastný stav
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Definícia obsahu pre každú sekciu
  const infoSections = [
    {
      id: "shou-sugi-ban",
      title: "O technike SHOU SUGI BAN",
      content: (
        <div className="text-sm py-4">
          <p className="mb-4">
            <strong>SHOU SUGI BAN</strong> je tradičná japonská technika ošetrenia dreva, ktorá vznikla pred stovkami rokov. 
            Pôvodne sa používala na ochranu drevených domov pred ohňom, hmyzom a počasím.
          </p>
          
          <h5 className="font-semibold mb-2">Proces výroby</h5>
          <ul className="list-disc pl-4 space-y-1 mb-4 text-xs">
            <li>Kontrolované spálenie povrchu dreva pri vysokej teplote</li>
            <li>Vytvorenie ochrannej uhlíkovej vrstvy</li>
            <li>Kartácovanie pre odstránenie voľných částíc</li>
            <li>Ošetrenie olejom pre zvýšenú odolnosť</li>
          </ul>

          <h5 className="font-semibold mb-2">Výhody</h5>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Vysoká odolnosť proti poveternostným vplyvom</li>
            <li>Prirodzená ochrana proti škodcom</li>
            <li>Požiarna odolnosť a minimálna údržba</li>
            <li>Jedinečný vizuálny efekt a dlhá životnosť 50+ rokov</li>
          </ul>
        </div>
      )
    },
    {
      id: "technical-specs",
      title: "Technické parametre",
      content: (
        <div className="text-sm py-4">
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Materiálové vlastnosti</h5>
              <div className="space-y-1 text-xs">
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
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Rozmery a balenie</h5>
              <div className="space-y-1 text-xs">
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
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "installation",
      title: "Inštalácia a údržba",
      content: (
        <div className="text-sm py-4">
          <h5 className="font-semibold mb-2">Inštalácia</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h6 className="font-medium text-xs mb-1">Príprava podkladu</h6>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Rovný a suchý podklad</li>
                <li>Parozábrana (pre interiér)</li>
                <li>Vetracia medzera (pre exteriér)</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-xs mb-1">Montáž</h6>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Neviditeľné uchytenie na skoby</li>
                <li>Spoj pero-drážka</li>
                <li>Dilatačná medzera 2-3 mm</li>
              </ul>
            </div>
          </div>

          <h5 className="font-semibold mb-2">Údržba</h5>
          <div className="space-y-2">
            <div>
              <h6 className="font-medium text-xs">Prvý rok</h6>
              <p className="text-xs">Bez potreby údržby. Drevo si zachováva svoju prirodzenú ochranu.</p>
            </div>
            <div>
              <h6 className="font-medium text-xs">Dlhodobá údržba (5-10 rokov)</h6>
              <p className="text-xs">Možné obnovenie olejem pre zachovanie farby a lesku (nie je povinné).</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "shipping",
      title: "Doprava a vrátenie",
      content: (
        <div className="text-sm py-4">
          <div className="space-y-3">
            <div>
              <h6 className="font-semibold text-xs mb-1">Doprava</h6>
              <p className="text-xs">
                Profesionálna doprava dreveného materiálu. Doručenie do 5-7 pracovných dní po objednaní.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-xs mb-1">Vrátenie</h6>
              <p className="text-xs">
                Vrátenie nepoškodeného tovaru do 14 dní. Pri custom rozmeroch nie je možné vrátenie.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-xs mb-1">Reklamácie</h6>
              <p className="text-xs">
                Reklamácie vadného tovaru riešime do 24 hodín s bezplatnou výmenou.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="flex w-full gap-4">
      {/* Vľavo - malé náhľady */}
      <div className="flex flex-col gap-3 w-20 md:w-24">
        {images.slice(0, 4).map((image, index) => (
          <Container
            key={image.id}
            className={`relative aspect-square w-full overflow-hidden bg-ui-bg-subtle cursor-pointer transition-opacity ${
              selectedImageIndex === index 
                ? 'ring-2 ring-ui-fg-interactive opacity-100' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            {image.url && (
              <Image
                src={image.url}
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 80px, 96px"
                style={{
                  objectFit: "cover",
                }}
                className="rounded-lg"
              />
            )}
          </Container>
        ))}
      </div>

      {/* V strede - hlavný obrázok a informácie */}
      <div className="flex-1">
        {/* Hlavný obrázok */}
        <Container
          className="relative aspect-[5/4] w-full overflow-hidden bg-ui-bg-subtle mb-6"
          id={selectedImage?.id}
        >
          {selectedImage?.url && (
            <Image
              src={selectedImage.url}
              priority={selectedImageIndex <= 2}
              className="absolute inset-0 rounded-lg"
              alt={`Product image ${selectedImageIndex + 1}`}
              fill
              sizes="(max-width: 576px) 320px, (max-width: 768px) 500px, 700px"
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </Container>

        {/* Informačné sekcie pod obrázkom - Accordion */}
        <div className="space-y-2">
          {infoSections.map((section) => (
            <div key={section.id} className="border border-ui-border-base rounded-lg">
              {/* Klikateľný header */}
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full text-left px-4 py-3 text-sm text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 flex justify-between items-center"
              >
                <span>{section.title}</span>
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
    </div>
  )
}

export default ImageGallery
