"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCart } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { useRegion } from "@lib/context/region-context"
import MiniCart from "../mini-cart"


export default function CartButton() {
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState<{amount: number; currency_code: string} | null>(null)
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)
  const { currentCountryCode } = useRegion()

  useEffect(() => {
    const getCart = async () => {
      const cart = await retrieveCart()
      setItemCount(cart?.items?.length || 0)
      if (cart?.total && cart?.region?.currency_code) {
        setTotal({
          amount: cart.total,
          currency_code: cart.region.currency_code
        })
      }
    }

    getCart()

    // Set up an interval to check cart updates
    const interval = setInterval(getCart, 2000)

    return () => clearInterval(interval)
  }, [currentCountryCode]) // Re-run when country code changes

  return (
    <>
      <button
        onClick={() => setIsMiniCartOpen(true)}
        className="flex gap-2 items-center px-3 py-2 text-white rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm md:gap-3 md:px-4 md:py-3 md:text-base font-medium"
        aria-label={`Košík s ${itemCount} položkami`}
      >
        <ShoppingCart
          size={18}
          className="md:size-5 text-secondary-foreground transition-colors duration-300"
        />
        <span className="font-semibold">({itemCount})</span>
        {total && (
          <span className="hidden pl-3 ml-3 border-l md:inline border-white/30 text-sm">
            {convertToLocale({
              amount: total.amount,
              currency_code: total.currency_code
            })}
          </span>
        )}
      </button>

      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
        itemCount={itemCount}
        onItemCountChange={setItemCount}
      />
    </>
  )
}
