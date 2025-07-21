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
      className="flex gap-2 items-center px-3 py-2 text-white rounded-md bg-cta hover:bg-cta-hover"
    >
      <ShoppingCart size={20} />
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
