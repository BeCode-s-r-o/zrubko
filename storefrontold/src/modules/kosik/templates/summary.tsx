"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <Heading level="h2" className="text-lg font-bold text-gray-900 mb-1">
            Súhrn objednávky
          </Heading>
          <p className="text-xs text-gray-600">
            Skontrolujte si svoju objednávku
          </p>
        </div>

        {/* Discount Code */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-gray-900">Zľavový kód</h3>
          <DiscountCode cart={cart} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Cart Totals */}
        <div className="space-y-3">
          <CartTotals totals={cart} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Checkout Button */}
        <div className="space-y-2">
          <LocalizedClientLink
            href={"/checkout?step=" + step}
            data-testid="checkout-button"
          >
            <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm">
              Pokračovať k platbe
            </Button>
          </LocalizedClientLink>

          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>SSL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
