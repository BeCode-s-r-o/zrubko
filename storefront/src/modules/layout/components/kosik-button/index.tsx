"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCart } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { useRegion } from "@lib/context/region-context"

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState<{amount: number; currency_code: string} | null>(null)
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
    <LocalizedClientLink
      href="/cart"
      className="flex gap-1 items-center px-2 py-1 text-white rounded-md bg-cta hover:bg-cta-hover text-sm md:gap-2 md:px-3 md:py-2 md:text-base"
    >
      <ShoppingCart size={16} className="md:size-5" />
      <span>({itemCount})</span>
      {total && (
        <span className="hidden pl-2 ml-2 border-l md:inline border-white/30">
          {convertToLocale({
            amount: total.amount,
            currency_code: total.currency_code
          })}
        </span>
      )}
    </LocalizedClientLink>
  )
}
