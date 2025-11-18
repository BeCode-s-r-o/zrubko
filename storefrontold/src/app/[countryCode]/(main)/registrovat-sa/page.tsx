import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion, listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"
import Register from "@modules/account/components/register"
import AccountBreadcrumbs from "@modules/common/components/breadcrumbs/account-breadcrumbs"

export const metadata: Metadata = {
  title: "Registrovať sa",
  description: "Vytvorte si nový účet",
}

type Params = {
  countryCode: string
}

export default async function RegisterPage({ params }: { params: Params }) {
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)
  const regions = await listRegions()

  if (!region) {
    notFound()
  }

  // If user is already logged in, redirect to account
  if (customer) {
    // You could redirect here, but for now we'll show the register page anyway
    // This allows users to create additional accounts if needed
  }

  return (
    <div className="flex-1" data-testid="account-page">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="py-4 px-4">
          <AccountBreadcrumbs currentPage="Registrovať sa" />
        </div>

        {/* Main Content */}
        <div className="px-4">
          <div className="flex flex-col flex-1 h-full bg-white content-container">
            <div className="flex justify-center p">
              <div className="w-full max-w-2xl">
                {/* Hide asterisks for required fields */}
                <div className="[&_.text-rose-500]:hidden">
                  <Register standalone={true} regions={regions} countryCode={countryCode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
