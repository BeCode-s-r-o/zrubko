import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCustomer } from "@lib/data/customer"
import ForgotPassword from "@modules/account/components/forgot-password"
import AccountBreadcrumbs from "@modules/common/components/breadcrumbs/account-breadcrumbs"

export const metadata: Metadata = {
  title: "Zabudnuté heslo",
  description: "Obnovte svoje heslo",
}

type Params = {
  countryCode: string
}

export default async function ForgotPasswordPage({ params }: { params: Params }) {
  const { countryCode } = params
  const customer = await getCustomer()

  // If user is already logged in, they don't need password reset
  if (customer) {
    // You could redirect to account here
  }

  return (
    <div className="flex-1" data-testid="account-page">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="py-4 px-4">
          <AccountBreadcrumbs currentPage="Zabudnuté heslo" />
        </div>

        {/* Main Content */}
        <div className="px-4">
          <div className="flex justify-center items-center py-12">
            <div className="w-full max-w-md">
              <ForgotPassword standalone={true} countryCode={countryCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
