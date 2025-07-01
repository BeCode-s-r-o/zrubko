"use client"

import { Suspense, useState } from "react"
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
} from "lucide-react"
import { StoreRegion } from "@medusajs/types"

type NavClientProps = {
  regions: StoreRegion[]
}

export default function NavClient({ regions }: NavClientProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)

  return (
    <div className="sticky inset-x-0 top-0 z-50 group">
      {/* TOPBAR */}
      <div className="px-4 py-2 w-full text-xs text-white bg-gray">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[13px] gap-y-2 text-center md:text-left">
          {/* LEFT SIDE */}
          <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start">
            <a href="tel:+421907695363" className="flex gap-1 items-center hover:underline">
              <Phone size={18} /> <strong>+421 907 695 363</strong>
            </a>
            <a href="mailto:info@zrubko.sk" className="flex gap-1 items-center hover:underline">
              <Mail size={18} /> <strong>info@zrubko.sk</strong>
            </a>
          </div>

          {/* MIDDLE */}
          <div className="flex justify-center">
            <a
              href="/doprava"
              className="flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-300"
            >
              <Truck size={16} /> Doprava zdarma po Slovensku od 30m
            </a>
          </div>

          {/* RIGHT SIDE */}
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
        {/* FIRST NAV: LOGO + SEARCH + ICONS */}
        <nav className="flex relative justify-between items-center w-full h-full content-container text-small-regular text-ui-fg-subtle">
          {/* LEFT - MOBILE MENU */}
          <div className="flex items-center lg:hidden">
            <SideMenu regions={regions} />
          </div>

          {/* LOGO */}
          <div className="flex flex-1 justify-center lg:justify-start">
            <LocalizedClientLink
              href="/"
              className="text-lg font-bold text-ui-fg-base hover:text-ui-fg-base"
            >
              Zrubko.sk
            </LocalizedClientLink>
          </div>

          {/* CENTER - SEARCH BAR (absolute center on desktop) */}
          <div className="hidden absolute left-1/2 w-full max-w-md -translate-x-1/2 lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-ui-fg-muted" />
              <input
                type="text"
                placeholder="Zadajte názov produktu"
                className="px-9 py-2 w-full text-sm bg-white rounded-md border border-ui-border-base placeholder:text-ui-fg-muted focus:outline-none focus:ring-1 focus:ring-ui-fg-muted"
              />
            </div>
          </div>

          {/* RIGHT - IKONY */}
          <div className="flex gap-2 items-center">
            <LocalizedClientLink
              href="/account"
              className="p-2 rounded-md border hover:bg-ui-button-neutral-hover"
              aria-label="Účet"
            >
              <User size={18} />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2 items-center px-3 py-2 text-white rounded-md bg-ui-button hover:bg-ui-button-hover"
                >
                  <ShoppingCart size={16} />
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* SECOND NAV: DESKTOP MENU BAR */}
 {/* DESKTOP NAVIGATION */} 
<nav className="hidden items-center w-full h-full bg-white border-t lg:flex border-ui-border-base">
  <div className="flex gap-10 items-center content-container pl-[170px]">
    {/* Menu položky */}
    <button
      onClick={() => setIsProductsOpen(!isProductsOpen)}
      className="flex gap-1 items-center text-base font-semibold hover:text-ui-fg-base"
    >
      Produkty
      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
      />
    </button>

    <button
      onClick={() => setIsUsageOpen(!isUsageOpen)}
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

      </header>
    </div>
  )
}
