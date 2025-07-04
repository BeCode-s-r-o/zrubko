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
} from "lucide-react"
import { StoreRegion } from "@medusajs/types"
import SearchBar from "@modules/search/components/SearchBar"
import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"

type NavClientProps = {
  regions: StoreRegion[]
}

export default function NavClient({ regions }: NavClientProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)

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
            <SideMenu regions={regions} />
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
                <h2 className="mb-1 text-2xl font-bold">Miesto použitia</h2>
                <p className="max-w-2xl text-base text-ui-fg-muted">
                  Vyberte si produkty podľa miesta použitia. Každá kategória obsahuje špeciálne produkty vhodné pre dané prostredie.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>
      

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
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
            className="flex z-40 justify-center px-8 py-8 w-full bg-white border-t shadow-lg border-ui-border-base animate-fade-in"
            style={{ minHeight: 320 }}
          >
            <div className="w-full max-w-6xl">
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold">Miesto použitia</h2>
                <p className="max-w-2xl text-base text-ui-fg-muted">
                  Vyberte si produkty podľa miesta použitia. Každá kategória obsahuje špeciálne produkty vhodné pre dané prostredie.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>
      

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>

                <a href="/miesto/terasa" className="block overflow-hidden rounded-lg border transition group hover:shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Terasa" className="object-cover w-full h-32 transition-transform group-hover:scale-105" width={400} height={128} />
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold">Terasa</h3>
                    <p className="text-sm text-ui-fg-muted">Produkty vhodné na ochranu a úrčbu terás.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
