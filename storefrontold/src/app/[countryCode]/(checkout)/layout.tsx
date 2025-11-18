import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import CheckoutNav from "@modules/layout/templates/checkout-nav"
import StepIndicator from "@modules/checkout/components/step-indicator"
import { Suspense } from "react"

export default function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    countryCode: string
  }
}) {
  return (
    <>
      {/* Simplified Checkout Navigation */}
      <CheckoutNav countryCode={params.countryCode} />

      {/* Checkout-specific navigation */}
      <div className="w-full bg-white relative small:min-h-screen">
        <div className="h-16 bg-white border-b ">
          <nav className="flex h-full items-center content-container justify-between">
            <LocalizedClientLink
              href="/kosik"
              className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
              data-testid="back-to-cart-link"
            >
              <ChevronDown className="rotate-90" size={16} />
              <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
                Back to shopping cart
              </span>
              <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
                Back
              </span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              data-testid="store-link"
            >
              Zrubko.sk
            </LocalizedClientLink>
            <div className="flex-1 basis-0" />
          </nav>
        </div>

        {/* Step Indicator - Lazy loaded */}
        <Suspense fallback={
          <div className="w-full bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded mt-3 animate-pulse"></div>
                    </div>
                    {num < 3 && <div className="w-16 h-0.5 bg-gray-200 mx-4 animate-pulse" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <StepIndicator />
        </Suspense>

        <div className="relative" data-testid="checkout-container">{children}</div>
        <div className="py-4 w-full flex items-center justify-center">
          <MedusaCTA />
        </div>
      </div>
    </>
  )
}
