import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"
import Login from "@modules/account/components/login"
import AccountBreadcrumbs from "@modules/common/components/breadcrumbs/account-breadcrumbs"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Prihlásiť sa",
  description: "Prihláste sa do svojho účtu",
}

type Params = {
  countryCode: string
}

export default async function LoginPage({ params }: { params: Params }) {
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // If user is already logged in, redirect to account
  if (customer) {
    // You could redirect here, but for now we'll show the login page anyway
    // This allows users to switch accounts if needed
  }

  return (
    <div className="flex-1" data-testid="account-page">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="py-4 px-4">
          <AccountBreadcrumbs currentPage="Prihlásiť sa" />
        </div>

        {/* Main Content */}
        <div className="px-4">
          <div className="flex flex-col flex-1 h-full bg-white content-container">
            <div className="flex justify-center p">
              <div className="flex-1 max-w-md">
                {/* Hide asterisks for required fields */}
                <div className="[&_.text-rose-500]:hidden">
                  <Login standalone={true} countryCode={countryCode} />
                </div>

                {/* Registration Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Nemáte ešte účet?{" "}
                    <LocalizedClientLink
                      href="/registrovat-sa"
                      className="font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      Registrujte sa
                    </LocalizedClientLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
