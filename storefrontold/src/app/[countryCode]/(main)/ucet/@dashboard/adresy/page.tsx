import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"

import { headers } from "next/headers"
import { getRegion, listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Adresy",
  description: "Spravujte svoje dodacie a fakturačné adresy",
}

export default async function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)
  const regions = await listRegions()

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Správa adries</h1>
        <p className="text-base-regular">
          Prezrite si a aktualizujte svoje dodacie adresy. Môžete pridať koľko adries chcete.
          Uložené adresy budú k dispozícii pri dokončení objednávky.
        </p>
      </div>

      {/* Shipping Addresses Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Dodacie adresy</h2>
        <AddressBook customer={customer} region={region} />
      </div>

      {/* Billing Address Section */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">Fakturačná adresa</h2>
        <div className="max-w-2xl">
          <ProfileBillingAddress customer={customer} regions={regions} />
        </div>
      </div>
    </div>
  )
}
