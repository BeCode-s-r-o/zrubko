"use client"

import { Plus } from "@medusajs/icons"
import { X as XIcon } from "lucide-react"
import { useEffect, useState, useTransition } from "react"

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
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"
import { Button } from "@medusajs/ui"
import { useTranslations } from "next-intl"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState(false)

  const [formState, setFormState] = useState({
    success: false,
    error: null as string | null,
  })

  // Individual form state variables
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address1, setAddress1] = useState("")
  const [company, setCompany] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [province, setProvince] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address2, setAddress2] = useState("")

  // Prevent body scroll when modal is open
  usePreventBodyScroll(state)

  const tForm = useTranslations("forms")
  const tAcc = useTranslations("account")
  const tCommon = useTranslations("common")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('address_1', address1)
      formData.append('address_2', address2)
      formData.append('company', company)
      formData.append('postal_code', postalCode)
      formData.append('city', city)
      formData.append('country_code', countryCode)
      formData.append('province', province)
      formData.append('phone', phoneNumber)

      const result = await addCustomerAddress({ isDefaultShipping: addresses.length === 0 }, formData)

      if (result?.error) {
        setFormState({
          success: false,
          error: result.error,
        })
      } else {
        setFormState({
          success: true,
          error: null,
        })
        setSuccessState(true)
      }
    } catch (error) {
      setFormState({
        success: false,
        error: "An error occurred while adding address",
      })
    }
  }

  const close = () => {
    setSuccessState(false)
    setFormState({
      success: false,
      error: null,
    })
    // Reset all form fields
    setFirstName("")
    setLastName("")
    setAddress1("")
    setAddress2("")
    setCompany("")
    setPostalCode("")
    setCity("")
    setCountryCode("")
    setProvince("")
    setPhoneNumber("")
    setState(false)
  }

  useEffect(() => {
    if (successState) {
      close()
    }
  }, [successState])

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (state) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [state])

  // Button to open modal
  if (!state) {
    return (
      <button
        className="group relative border-2 border-dashed border-gray-300 hover:border-primary rounded-xl p-8 min-h-[220px] h-full w-full flex flex-col justify-center items-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        onClick={() => setState(true)}
        data-testid="add-address-button"
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center items-center w-12 h-12 rounded-full transition-colors duration-300 bg-primary/10 group-hover:bg-primary/20">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              {tAcc.has("addNewAddress") ? tAcc("addNewAddress") : "Pridať novú adresu"}
            </h3>
            <p className="text-base text-gray-500">
              {tAcc.has("clickToAddAddress") ? tAcc("clickToAddAddress") : "Kliknite pre pridanie novej dodacej adresy"}
            </p>
          </div>
        </div>
      </button>
    )
  }

  // Modal
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
              <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                {tAcc.has("addNewAddress") ? tAcc("addNewAddress") : "Pridať novú adresu"}
              </h2>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base leading-tight">
                {tAcc.has("fillNewShipping") ? tAcc("fillNewShipping") : "Vyplňte údaje pre novú dodaciu adresu"}
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto modal-scroll" style={{ minHeight: '200px' }}>
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col gap-6 sm:flex-row">
                      <div className="flex-1 space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Meno</h3>
                        <Input
                          label=""
                          name="first_name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          autoComplete="given-name"
                          data-testid="first-name-input"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Priezvisko</h3>
                        <Input
                          label=""
                          name="last_name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          autoComplete="family-name"
                          data-testid="last-name-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Spoločnosť</h3>
                      <Input
                        label=""
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="organization"
                        data-testid="company-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Telefón</h3>
                      <Input
                        label=""
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        autoComplete="tel"
                        data-testid="phone-input"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {tAcc.has("addressHeader") ? tAcc("addressHeader") : "Adresa"}
                    </h3>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Ulica a číslo</h3>
                      <Input
                        label=""
                        name="address_1"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        required
                        autoComplete="address-line1"
                        data-testid="address-1-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Byt, bytový dom, atď.</h3>
                      <Input
                        label=""
                        name="address_2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        autoComplete="address-line2"
                        data-testid="address-2-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">PSČ</h3>
                      <Input
                        label=""
                        name="postal_code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        autoComplete="postal-code"
                        data-testid="postal-code-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Mesto</h3>
                      <Input
                        label=""
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        autoComplete="locality"
                        data-testid="city-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Kraj</h3>
                      <Input
                        label=""
                        name="province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        autoComplete="address-level1"
                        data-testid="state-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Krajina</h3>
                      <CountrySelect
                        region={region}
                        name="country_code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                        autoComplete="country"
                        data-testid="country-select"
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
                          <p className="text-xs sm:text-sm text-red-800" data-testid="address-error">
                            {formState.error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer inside form */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end items-stretch sm:items-center p-4 sm:p-8 bg-gray-50 rounded-b-2xl sm:rounded-b-3xl border-t border-gray-100 flex-shrink-0 z-10">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={close}
                  data-testid="cancel-button"
                  className="w-full sm:w-auto"
                >
                  {tCommon.has("cancel") ? tCommon("cancel") : "Zrušiť"}
                </Button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="text-base w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  data-testid="save-button"
                >
                  {isPending ? "Ukladám..." : (tAcc.has("saveAddress") ? tAcc("saveAddress") : "Uložiť adresu")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAddress