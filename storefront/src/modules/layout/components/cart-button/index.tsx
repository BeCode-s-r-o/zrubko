"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCart } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState<{amount: number; currency_code: string} | null>(null)

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
  }, [])

  return (
    <LocalizedClientLink
      href="/cart"
      className="flex gap-2 items-center px-3 py-2 text-white rounded-md bg-cart hover:bg-cart-hover"
    >
      <ShoppingCart size={20} />
      <span>({itemCount})</span>
      {total && (
        <span className="hidden md:inline border-l border-white/30 ml-2 pl-2">
          {convertToLocale({
            amount: total.amount,
            currency_code: total.currency_code
          })}
        </span>
      )}
    </LocalizedClientLink>
  )
}
