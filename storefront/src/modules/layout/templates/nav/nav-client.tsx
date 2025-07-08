"use client"

import { Suspense, useState, useRef, useEffect } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import {
  Phone,
  Mail,
  Truck,
  MapPin,
  User,
  Search,
  ShoppingCart,
  ChevronDown,
  Home,
  Building,
  TreePine,
  Waves,
  Fence,
  Calculator,
  Star,
  ArrowRight,
  Paintbrush,
  Layers,
  Square,
  Thermometer,
  Building2,
  Triangle,
  Waves as WavesIcon,
  Tent,
  Grid3x3,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { StoreRegion } from "@medusajs/types"
import SearchBar from "@modules/search/components/SearchBar"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"

type NavClientProps = {
  regions: StoreRegion[]
}

// Definícia kategórií pre interiér a exteriér
const interiorCategories = [
  {
    title: "Obklad stien",
    icon: Paintbrush,
    description: "Dekoratívny obklad vnútorných stien",
    profiles: ["Tatranský profil", "Smrekovec"],
    quality: ["AB", "BC"],
    image: "/images/wood-previews/interior-wall.jpg",
    href: "/kategorie/obklad-stien"
  },
  {
    title: "Podbitie stropov",
    icon: Layers,
    description: "Elegantné riešenie pre stropy",
    profiles: ["Smrekovec", "Lambris"],
    quality: ["AB"],
    image: "/test-category.png",
    href: "/kategorie/podbitie-stropov"
  },
  {
    title: "Podlaha",
    icon: Square,
    description: "Pevná drevená podlaha",
    profiles: ["Masívne dosky", "Parkety"],
    quality: ["A", "AB"],
    image: "/images/wood-previews/flooring.jpg",
    href: "/kategorie/podlaha"
  },
  {
    title: "Sauna",
    icon: Thermometer,
    description: "Špeciálne drevo do sauny",
    profiles: ["Abachi", "Céder"],
    quality: ["A"],
    image: "/images/wood-previews/sauna.jpg",
    href: "/kategorie/sauna"
  }
]

const exteriorCategories = [
  {
    title: "Fasáda",
    icon: Building2,
    description: "Obklad vonkajšej steny",
    profiles: ["Tatranský profil", "Rhombus"],
    quality: ["AB", "BC"],
    image: "/images/wood-previews/facade.jpg",
    href: "/kategorie/fasada"
  },
  {
    title: "Podbitie strechy",
    icon: Triangle,
    description: "Ochrana a úprava podstefí",
    profiles: ["Smrekovec", "Tatranský profil"],
    quality: ["AB", "BC"],
    image: "/images/wood-previews/roof-soffit.jpg",
    href: "/kategorie/podbitie-strechy"
  },
  {
    title: "Terasa",
    icon: WavesIcon,
    description: "Terásové dosky a konštrukcie",
    profiles: ["Terásové dosky", "WPC"],
    quality: ["A", "AB"],
    image: "/images/wood-previews/deck.jpg",
    href: "/kategorie/terasa"
  },
  {
    title: "Prístrešok",
    icon: Tent,
    description: "Konštrukčné drevo pre prístrešky",
    profiles: ["Hranoly", "Latky"],
    quality: ["AB", "BC"],
    image: "/images/wood-previews/shelter.jpg",
    href: "/kategorie/pristresok"
  },
  {
    title: "Plot",
    icon: Grid3x3,
    description: "Plotové dosky a stĺpiky",
    profiles: ["Plotovky", "Stĺpiky"],
    quality: ["BC", "C"],
    image: "/images/wood-previews/fence.jpg",
    href: "/kategorie/plot"
  }
]

const topProducts = [
  { title: "Tatranský profil AB", href: "/produkty/tatransky-profil-ab" },
  { title: "Terásové dosky", href: "/produkty/terasove-dosky" },
  { title: "Plotovky smrek", href: "/produkty/plotovky-smrek" }
]

// Mobilný komponent pre navigáciu
const MobileSideMenu = ({ regions }: { regions: StoreRegion[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<'products' | 'usage' | null>(null)
  const [expandedUsage, setExpandedUsage] = useState<'interior' | 'exterior' | null>(null)

  const toggleMobile = (section: 'products' | 'usage') => {
    setExpandedMobile(expandedMobile === section ? null : section)
    if (section !== 'usage') {
      setExpandedUsage(null)
    }
  }

  const toggleUsage = (section: 'interior' | 'exterior') => {
    setExpandedUsage(expandedUsage === section ? null : section)
  }

  const closeMobile = () => {
    setIsOpen(false)
    setExpandedMobile(null)
    setExpandedUsage(null)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 text-gray-700 lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobile} />
          
          {/* Mobile menu panel */}
          <div className="fixed top-0 left-0 w-full max-w-sm h-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={closeMobile} className="p-2">
                  <X size={24} />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2">
                {/* Produkty */}
                <div>
                  <button
                    onClick={() => toggleMobile('products')}
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold">Produkty</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        expandedMobile === 'products' ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedMobile === 'products' && (
                    <div className="pl-4 mt-2 space-y-2">
                      <LocalizedClientLink
                        href="/kategorie/terasove-dosky"
                        className="block p-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={closeMobile}
                      >
                        Terásové dosky
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/fasadne-dosky"
                        className="block p-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={closeMobile}
                      >
                        Fasádne dosky
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/konstrukcne-drevo"
                        className="block p-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={closeMobile}
                      >
                        Konštrukčné drevo
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/kategorie/plotove-dosky"
                        className="block p-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={closeMobile}
                      >
                        Plotové dosky
                      </LocalizedClientLink>
                    </div>
                  )}
                </div>

                {/* Miesto použitia */}
                <div>
                  <button
                    onClick={() => toggleMobile('usage')}
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold">Miesto použitia</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        expandedMobile === 'usage' ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedMobile === 'usage' && (
                    <div className="pl-4 mt-2 space-y-2">
                      {/* Interiér */}
                      <div>
                        <button
                          onClick={() => toggleUsage('interior')}
                          className="flex items-center justify-between w-full p-2 text-left hover:bg-blue-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">Interiér</span>
                          </div>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform ${
                              expandedUsage === 'interior' ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                        
                        {expandedUsage === 'interior' && (
                          <div className="pl-6 mt-2 space-y-1">
                            {interiorCategories.map((category, index) => (
                              <LocalizedClientLink
                                key={index}
                                href={category.href}
                                className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                onClick={closeMobile}
                              >
                                <category.icon className="w-4 h-4" />
                                <span>{category.title}</span>
                              </LocalizedClientLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Exteriér */}
                      <div>
                        <button
                          onClick={() => toggleUsage('exterior')}
                          className="flex items-center justify-between w-full p-2 text-left hover:bg-green-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Exteriér</span>
                          </div>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform ${
                              expandedUsage === 'exterior' ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                        
                        {expandedUsage === 'exterior' && (
                          <div className="pl-6 mt-2 space-y-1">
                            {exteriorCategories.map((category, index) => (
                              <LocalizedClientLink
                                key={index}
                                href={category.href}
                                className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                onClick={closeMobile}
                              >
                                <category.icon className="w-4 h-4" />
                                <span>{category.title}</span>
                              </LocalizedClientLink>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ostatné linky */}
                <LocalizedClientLink
                  href="/kalkulacka"
                  className="block p-3 font-semibold hover:bg-gray-50 rounded-lg"
                  onClick={closeMobile}
                >
                  Kalkulačka
                </LocalizedClientLink>
                
                <LocalizedClientLink
                  href="/kontakt"
                  className="block p-3 font-semibold hover:bg-gray-50 rounded-lg"
                  onClick={closeMobile}
                >
                  Kontakt
                </LocalizedClientLink>

                {/* Pomocné linky */}
                <div className="pt-4 mt-6 border-t border-gray-200">
                  <LocalizedClientLink
                    href="/purchase-advisor"
                    className="block p-3 text-sm text-amber-600 hover:bg-amber-50 rounded-lg"
                    onClick={closeMobile}
                  >
                    🛒 Poradca nákupu
                  </LocalizedClientLink>
                  
                  <LocalizedClientLink
                    href="/najpredavanejsie"
                    className="block p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={closeMobile}
                  >
                    ⭐ Najpredávanejšie
                  </LocalizedClientLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function NavClient({ regions }: NavClientProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<'interior' | 'exterior' | null>(null)

  const usageMenuRef = useRef<HTMLDivElement>(null)
  const productsMenuRef = useRef<HTMLDivElement>(null)

  // Miesto použitia – click-away
  useEffect(() => {
    if (!isUsageOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        usageMenuRef.current &&
        !usageMenuRef.current.contains(target) &&
        !(target as HTMLElement).closest("#usage-menu-button")
      ) {
        setIsUsageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUsageOpen]);

  // Produkty – click-away
  useEffect(() => {
    if (!isProductsOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(target) &&
        !(target as HTMLElement).closest("#products-menu-button")
      ) {
        setIsProductsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductsOpen]);

  return (
    <div className="sticky inset-x-0 top-0 z-50 group">
      {/* TOPBAR */}
      <div className="px-4 py-2 w-full text-xs text-white bg-gray">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[13px] gap-y-2 text-center md:text-left">
          <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start">
            <a href="tel:+421907695363" className="flex gap-1 items-center hover:underline">
              <Phone size={18} /> <strong>+421 907 695 363</strong>
            </a>
            <a href="mailto:info@zrubko.sk" className="flex gap-1 items-center hover:underline">
              <Mail size={18} /> <strong>info@zrubko.sk</strong>
            </a>
          </div>
          <div className="flex justify-center">
            <a
              href="/doprava"
              className="flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-300"
            >
              <Truck size={16} /> Doprava zdarma po Slovensku od 30m
            </a>
          </div>
          <div className="hidden gap-1 justify-center items-center hide-store:flex hide-store:justify-end">
            <MapPin size={18} />
            <span>
              <a
                href="https://www.google.com/maps?q=Predajňa+Zrubko,+Žilina"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <strong>Predajňa</strong> <strong>Žilina</strong>
              </a>{" "}
              Po–Pi <strong>8:00–16:00</strong>
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative mx-auto h-20 bg-white border-b border-ui-border-base">
        <nav className="flex relative justify-between items-center w-full h-full content-container text-small-regular text-ui-fg-subtle">
          <div className="flex items-center lg:hidden">
            <MobileSideMenu regions={regions} />
          </div>
          <div className="flex flex-1 justify-center lg:justify-start">
            <LocalizedClientLink
              href="/"
              className="text-lg font-bold text-ui-fg-base hover:text-ui-fg-base"
            >
              Zrubko.sk
            </LocalizedClientLink>
          </div>
          <div className="hidden absolute left-1/2 w-full max-w-md -translate-x-1/2 lg:flex">
            <div className="relative w-full">
              <SearchBar />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <LocalizedClientLink
              href="/account"
              className="flex gap-2 items-center px-3 py-2 text-gray-600 rounded-md border hover:bg-ui-button-neutral-hover"
              aria-label="Účet"
            >
              <User size={20} />
              <span className="hidden md:inline">Účet</span>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2 items-center px-3 py-2 text-white rounded-md bg-cart hover:bg-cart-hover"
                >
                  <ShoppingCart size={20} />
                  <span>(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* SECOND NAV: DESKTOP MENU BAR */}
        <nav className="hidden items-center w-full h-full bg-white border-t lg:flex border-ui-border-base">
          <div className="flex gap-10 items-center content-container">
            <button
              id="products-menu-button"
              onClick={() => {
                setIsProductsOpen((prev) => {
                  if (!prev) setIsUsageOpen(false)
                  return !prev
                })
              }}
              className="flex gap-1 items-center text-base font-semibold hover:text-ui-fg-base"
            >
              Produkty
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <button
              id="usage-menu-button"
              onClick={() => {
                setIsUsageOpen((prev) => {
                  if (!prev) setIsProductsOpen(false)
                  return !prev
                })
              }}
              className="flex gap-1 items-center text-base font-semibold hover:text-ui-fg-base"
            >
              Miesto použitia
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isUsageOpen ? "rotate-180" : ""}`}
              />
            </button>

            <LocalizedClientLink href="/kalkulacka" className="text-base font-semibold hover:text-ui-fg-base">
              Kalkulačka
            </LocalizedClientLink>
            <LocalizedClientLink href="/kontakt" className="text-base font-semibold hover:text-ui-fg-base">
              Kontakt
            </LocalizedClientLink>
          </div>
        </nav>

        {/* Mega Menu for Produkty */}
        {isProductsOpen && (
          <div
            ref={productsMenuRef}
            className="flex z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in"
          >
             <div className="w-full max-w-6xl">
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold">Produkty</h2>
                <p className="max-w-2xl text-base text-ui-fg-muted">
                  Prehliadajte naše produkty podľa kategórií a nájdite to, čo potrebujete pre váš projekt.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a href="/kategorie/terasove-dosky" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terásové dosky" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terásové dosky</h3>
                    <p className="text-sm text-ui-fg-muted">Kvalitné dosky pre terasy a balkóny.</p>
                  </div>
                </a>
                
                <a href="/kategorie/fasadne-dosky" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Fasádne dosky" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Fasádne dosky</h3>
                    <p className="text-sm text-ui-fg-muted">Obklady pre vonkajšie steny.</p>
                  </div>
                </a>

                <a href="/kategorie/konstrukcne-drevo" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Konštrukčné drevo" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Konštrukčné drevo</h3>
                    <p className="text-sm text-ui-fg-muted">Hranoly a latky pre stavbu.</p>
                  </div>
                </a>

                <a href="/kategorie/plotove-dosky" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Plotové dosky" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Plotové dosky</h3>
                    <p className="text-sm text-ui-fg-muted">Dosky a stĺpiky pre ploty.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mega Menu for Miesto použitia */}
        {isUsageOpen && (
          <div
            ref={usageMenuRef}
            className="flex z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in relative"
          >
            <div className="w-full max-w-7xl relative">
              {/* Jednoduché absolute tlačidlá vpravo hore */}
              <div className="absolute top-0 right-0 flex gap-2">
                <LocalizedClientLink
                  href="/purchase-advisor"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Poradca nákupu
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/najpredavanejsie"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Najpredávanejšie
                </LocalizedClientLink>
              </div>

              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold">Miesto použitia</h2>
                <p className="max-w-3xl text-base text-ui-fg-muted">
                  Vyberte si produkty podľa miesta použitia. Kliknite na sekciu pre zobrazenie detailov.
                </p>
              </div>

              {/* Základná úroveň - Interiér a Exteriér */}
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {/* Interiér sekcia */}
                <div 
                  className={`relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    expandedSection === 'interior' 
                      ? 'border-blue-300 shadow-lg' 
                      : 'border-blue-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setExpandedSection(expandedSection === 'interior' ? null : 'interior')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg">
                        <Home className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Interiér</h3>
                        <p className="text-sm text-gray-600">Drevo do vnútorných priestorov</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded-full">
                        {interiorCategories.length} kategórií
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                          expandedSection === 'interior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                  
                  {/* Rýchly náhľad kategórií */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {interiorCategories.map((category, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded-full">
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exteriér sekcia */}
                <div 
                  className={`relative p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    expandedSection === 'exterior' 
                      ? 'border-green-300 shadow-lg' 
                      : 'border-green-200 hover:border-green-300 hover:shadow-md'
                  }`}
                  onClick={() => setExpandedSection(expandedSection === 'exterior' ? null : 'exterior')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-lg">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Exteriér</h3>
                        <p className="text-sm text-gray-600">Drevo do vonkajších priestorov</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full">
                        {exteriorCategories.length} kategórií
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-green-600 transition-transform duration-300 ${
                          expandedSection === 'exterior' ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                  
                  {/* Rýchly náhľad kategórií */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exteriorCategories.map((category, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-green-200 text-green-800 rounded-full">
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailná úroveň - Rozklikaná sekcia */}
              {expandedSection && (
                <div className="overflow-hidden transition-all duration-500 ease-in-out animate-fade-in">
                  <div className={`p-6 rounded-xl border-2 ${
                    expandedSection === 'interior' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className={`text-lg font-bold ${
                        expandedSection === 'interior' ? 'text-blue-900' : 'text-green-900'
                      }`}>
                        {expandedSection === 'interior' ? 'Interiérové kategórie' : 'Exteriérové kategórie'}
                      </h4>
                      <button
                        onClick={() => setExpandedSection(null)}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                          expandedSection === 'interior' 
                            ? 'bg-blue-200 text-blue-800 hover:bg-blue-300' 
                            : 'bg-green-200 text-green-800 hover:bg-green-300'
                        }`}
                      >
                        Zavrieť
                      </button>
                    </div>
                    
                    <div className={`grid grid-cols-1 gap-4 ${
                      expandedSection === 'interior' 
                        ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'
                    }`}>
                      {(expandedSection === 'interior' ? interiorCategories : exteriorCategories).map((category, index) => (
                        <LocalizedClientLink
                          key={index}
                          href={category.href}
                          className={`group relative flex items-start p-4 bg-white rounded-xl border-2 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                            expandedSection === 'interior' 
                              ? 'border-blue-200 hover:bg-blue-50 hover:border-blue-300' 
                              : 'border-green-200 hover:bg-green-50 hover:border-green-300'
                          }`}
                        >
                          {/* Ikona vľavo */}
                          <div className={`flex items-center justify-center w-12 h-12 rounded-lg mr-3 transition-all duration-300 flex-shrink-0 ${
                            expandedSection === 'interior' 
                              ? 'bg-blue-100 group-hover:bg-blue-200' 
                              : 'bg-green-100 group-hover:bg-green-200'
                          }`}>
                            <category.icon className={`w-6 h-6 ${
                              expandedSection === 'interior' ? 'text-blue-600' : 'text-green-600'
                            }`} />
                          </div>
                          
                          {/* Obsah vpravo */}
                          <div className="flex-1 min-w-0">
                            {/* Názov kategórie */}
                            <h4 className="text-base font-semibold text-gray-900 mb-1">{category.title}</h4>
                            
                            {/* Popis */}
                            <p className="text-sm text-gray-500 mb-2 leading-snug line-clamp-2">{category.description}</p>
                            
                            {/* Profily */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              {category.profiles.slice(0, 2).map((profile, idx) => (
                                <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                  {profile}
                                </span>
                              ))}
                            </div>
                            
                            {/* Kvality */}
                            <div className="flex gap-1">
                              {category.quality.map((quality, idx) => (
                                <span 
                                  key={idx} 
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                                    quality === 'A'
                                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                                      : quality === 'AB'
                                      ? 'bg-orange-100 text-orange-800 border-orange-200'
                                      : quality === 'BC'
                                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                                      : quality === 'C'
                                      ? 'bg-gray-100 text-gray-800 border-gray-200'
                                      : 'bg-gray-100 text-gray-800 border-gray-200'
                                  }`}
                                >
                                  {quality}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* CTA šípka a mini náhľad */}
                          <div className="flex flex-col items-center gap-2 ml-2">
                            <div className={`w-8 h-8 rounded-lg border opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${
                              expandedSection === 'interior' 
                                ? 'bg-gradient-to-br from-amber-200 to-amber-300 border-amber-300' 
                                : 'bg-gradient-to-br from-green-200 to-green-300 border-green-300'
                            }`}>
                              <div className={`w-full h-full rounded-lg opacity-60 ${
                                expandedSection === 'interior' 
                                  ? 'bg-gradient-to-br from-amber-100 to-amber-200' 
                                  : 'bg-gradient-to-br from-green-100 to-green-200'
                              }`}></div>
                            </div>
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <ArrowRight className="w-3 h-3 text-gray-600" />
                            </div>
                          </div>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
