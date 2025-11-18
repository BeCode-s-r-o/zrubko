"use client"

import { Plus } from "@medusajs/icons"
import { X as XIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useFormState } from "react-dom"

// Hook to prevent body scroll when modal is open
const usePreventBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Store original values
      const originalOverflow = document.body.style.overflow
      const originalPosition = document.body.style.position
      const originalTop = document.body.style.top
      const originalWidth = document.body.style.width
      const scrollY = window.scrollY

      // Prevent scroll by fixing body position
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.position = originalPosition
        document.body.style.top = originalTop
        document.body.style.width = originalWidth

        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])
}

import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import AccountInfo from "@modules/account/components/account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"
import Checkbox from "@modules/common/components/checkbox"
import { Button } from "@medusajs/ui"
import { useTranslations } from "next-intl"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [state, setState] = useState(false)

  // Prevent body scroll when modal is open
  usePreventBodyScroll(state)

  const tForm = useTranslations("forms")
  const tAcc = useTranslations("account")
  const tCheckout = useTranslations("checkout")
  const tCommon = useTranslations("common")

  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    try {
      const billingAddress = {
        first_name: formData.get("billing_first_name") as string,
        last_name: formData.get("billing_last_name") as string,
        company: formData.get("billing_company") as string,
        address_1: formData.get("billing_address_1") as string,
        address_2: formData.get("billing_address_2") as string,
        city: formData.get("billing_city") as string,
        postal_code: formData.get("billing_postal_code") as string,
        province: formData.get("billing_province") as string,
        country_code: formData.get("billing_country_code") as string,
        phone: formData.get("billing_phone") as string,
      }

      await updateCustomer({
        metadata: {
          ...customer.metadata,
          billing_address: billingAddress
        }
      })

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }, {
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  const close = () => {
    setSuccessState(false)
    setIsCompany(false)
    setState(false)
  }

  useEffect(() => {
    if (successState) {
      close()
    }
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  // Get billing address from customer metadata
  const billingAddress = customer.metadata?.billing_address as any

  // Check if customer has company data when modal opens
  useEffect(() => {
    if (state && customer?.metadata) {
      const hasCompanyData = (customer.metadata as any)?.ico ||
                           (customer.metadata as any)?.dic ||
                           (customer.metadata as any)?.ic_dph ||
                           billingAddress?.company
      if (hasCompanyData) {
        setIsCompany(true)
      }
    }
  }, [state, customer, billingAddress])

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return (
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
          <div className="text-primary mb-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            {tAcc.has("noBillingAddress") ? tAcc("noBillingAddress") : "Žiadna fakturačná adresa"}
          </h4>
          <p className="text-xs text-gray-500 text-center">
            {tAcc.has("addBillingAddress") ? tAcc("addBillingAddress") : "Pridajte svoju fakturačnú adresu"}
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <div className="font-medium text-gray-900">
          {billingAddress.first_name} {billingAddress.last_name}
        </div>
        {billingAddress.company && (
          <div className="text-gray-600">{billingAddress.company}</div>
        )}
        <div className="text-gray-600">
          {billingAddress.address_1}
          {billingAddress.address_2 && `, ${billingAddress.address_2}`}
        </div>
        <div className="text-gray-600">
          {billingAddress.postal_code} {billingAddress.city}
          {billingAddress.province && `, ${billingAddress.province}`}
        </div>
        <div className="text-gray-600">
          {billingAddress.country_code}
        </div>
        {billingAddress.phone && (
          <div className="text-gray-600">{billingAddress.phone}</div>
        )}
      </div>
    )
  }, [billingAddress, tAcc])

  if (!state) {
    return (
      <AccountInfo
        label={tAcc.has("billingAddress") ? tAcc("billingAddress") : "Fakturačná adresa"}
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!formState.error}
        errorMessage={formState.error || ""}
        clearState={clearState}
        data-testid="billing-address-editor"
      >
        <button
          onClick={() => setState(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          {billingAddress
            ? (tAcc.has("editBillingAddress") ? tAcc("editBillingAddress") : "Upraviť fakturačnú adresu")
            : (tAcc.has("addBillingAddress") ? tAcc("addBillingAddress") : "Pridať fakturačnú adresu")
          }
        </button>
      </AccountInfo>
    )
  }

  // Modal for editing billing address
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] flex justify-center items-center p-2 sm:p-4 modal-open"
        onClick={close}
      >
        {/* Blurred backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-200 transform transition-all duration-300 ease-out mx-2 sm:mx-4 flex flex-col max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-4rem)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start sm:items-center p-3 sm:p-4 lg:p-8 border-b border-gray-100 flex-shrink-0 bg-white rounded-t-2xl sm:rounded-t-3xl z-10">
            <div className="flex-1 pr-2 sm:pr-4 min-w-0">
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                {billingAddress
                  ? (tAcc.has("editBillingAddress") ? tAcc("editBillingAddress") : "Upraviť fakturačnú adresu")
                  : (tAcc.has("addBillingAddress") ? tAcc("addBillingAddress") : "Pridať fakturačnú adresu")
                }
              </h2>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base leading-tight">
                {tAcc.has("billingAddressDescription") ? tAcc("billingAddressDescription") : "Nastavte svoju fakturačnú adresu pre faktúry"}
              </p>
            </div>
            <button
              onClick={close}
              className="group p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-red-50 hover:scale-110 flex-shrink-0 border border-gray-200 hover:border-red-300 hover:shadow-lg active:scale-95"
              data-testid="close-modal-button"
              aria-label="Zatvoriť"
            >
              <XIcon
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-red-600 transition-all duration-300 group-active:text-red-700"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Form */}
          <form action={formAction} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto modal-scroll" style={{ minHeight: '200px' }}>
              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* Company Checkbox */}
                <div className="flex items-center space-x-3">
                  <Checkbox
                    label={tAcc.has("companyBilling") ? tAcc("companyBilling") : "Fakturačná adresa pre spoločnosť"}
                    name="is_company_billing"
                    checked={isCompany}
                    onChange={() => setIsCompany(!isCompany)}
                    data-testid="company-billing-checkbox"
                  />
                </div>

                {/* Personal Information */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Meno</h3>
                      <Input
                        label=""
                        name="billing_first_name"
                        defaultValue={billingAddress?.first_name || ""}
                        required
                        autoComplete="given-name"
                        data-testid="billing-first-name-input"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Priezvisko</h3>
                      <Input
                        label=""
                        name="billing_last_name"
                        defaultValue={billingAddress?.last_name || ""}
                        required
                        autoComplete="family-name"
                        data-testid="billing-last-name-input"
                      />
                    </div>
                  </div>

                  {isCompany && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Spoločnosť</h3>
                      <Input
                        label=""
                        name="billing_company"
                        defaultValue={billingAddress?.company || ""}
                        autoComplete="organization"
                        data-testid="billing-company-input"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Telefón</h3>
                    <Input
                      label=""
                      name="billing_phone"
                      defaultValue={billingAddress?.phone || ""}
                      autoComplete="tel"
                      data-testid="billing-phone-input"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {tAcc.has("billingAddressHeader") ? tAcc("billingAddressHeader") : "Fakturačná adresa"}
                  </h3>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Ulica a číslo</h3>
                    <Input
                      label=""
                      name="billing_address_1"
                      defaultValue={billingAddress?.address_1 || ""}
                      required
                      autoComplete="address-line1"
                      data-testid="billing-address-1-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Byt, budova, atď.</h3>
                    <Input
                      label=""
                      name="billing_address_2"
                      defaultValue={billingAddress?.address_2 || ""}
                      autoComplete="address-line2"
                      data-testid="billing-address-2-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">PSČ</h3>
                    <Input
                      label=""
                      name="billing_postal_code"
                      defaultValue={billingAddress?.postal_code || ""}
                      required
                      autoComplete="postal-code"
                      data-testid="billing-postal-code-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Mesto</h3>
                    <Input
                      label=""
                      name="billing_city"
                      defaultValue={billingAddress?.city || ""}
                      required
                      autoComplete="locality"
                      data-testid="billing-city-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Kraj</h3>
                    <Input
                      label=""
                      name="billing_province"
                      defaultValue={billingAddress?.province || ""}
                      autoComplete="address-level1"
                      data-testid="billing-province-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Krajina</h3>
                    <CountrySelect
                      region={regions?.[0] || undefined}
                      name="billing_country_code"
                      placeholder={tForm.has("country") ? tForm("country") : "Vyberte krajinu"}
                      autoComplete="country"
                      data-testid="billing-country-select"
                      required={true}
                      defaultValue={billingAddress?.country_code || "sk"}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {formState.error && (
                  <div className="p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm text-red-800" data-testid="billing-address-error">
                          {formState.error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-stretch sm:items-center p-4 sm:p-8 bg-gray-50 rounded-b-2xl sm:rounded-b-3xl border-t border-gray-100 flex-shrink-0 z-10">
              <Button
                type="button"
                variant="secondary"
                onClick={close}
                data-testid="cancel-button"
              >
                {tCommon.has("cancel") ? tCommon("cancel") : "Zrušiť"}
              </Button>
              <button
                type="submit"
                className="text-base w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                data-testid="save-billing-button"
              >
                {tAcc.has("saveBillingAddress") ? tAcc("saveBillingAddress") : "Uložiť fakturačnú adresu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileBillingAddress