import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer
  const tAcc = useTranslations("account")

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {tAcc.has("addressBook") ? tAcc("addressBook") : "Adresár"}
        </h2>
        <p className="text-gray-600">
          {tAcc.has("addressBookDescription") ? tAcc("addressBookDescription") : "Spravujte svoje dodacie adresy"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <AddAddress region={region} addresses={addresses || []} />
        {addresses && addresses.length > 0 && addresses.map((address) => {
          return (
            <EditAddress region={region} address={address} key={address.id} />
          )
        })}
      </div>

      {(!addresses || addresses.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {tAcc.has("noAddresses") ? tAcc("noAddresses") : "Žiadne adresy"}
          </h3>
          <p className="text-gray-600">
            {tAcc.has("noAddressesDescription") ? tAcc("noAddressesDescription") : "Začnite pridaním vašej prvej dodacej adresy"}
          </p>
        </div>
      )}
    </div>
  )
}

export default AddressBook