"use client"

import { useEffect, useState, useTransition } from "react"
import { PencilSquare as Edit, Trash, MapPin, Phone, Buildings } from "@medusajs/icons"
import { X as XIcon } from "lucide-react"
import { Button } from "@medusajs/ui"

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
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import { useTranslations } from "next-intl"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const tForm = useTranslations("forms")
  const tAcc = useTranslations("account")
  const tCommon = useTranslations("common")

  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState(false)

  // Prevent body scroll when modal is open
  usePreventBodyScroll(state)

  const [formState, setFormState] = useState<{
    success: boolean
    error: string | null
    addressId: string
  }>({
    success: false,
    error: null,
    addressId: address.id,
  })

  // Form field states
  const [firstName, setFirstName] = useState(address.first_name || "")
  const [lastName, setLastName] = useState(address.last_name || "")
  const [company, setCompany] = useState(address.company || "")
  const [address1, setAddress1] = useState(address.address_1 || "")
  const [address2, setAddress2] = useState(address.address_2 || "")
  const [postalCode, setPostalCode] = useState(address.postal_code || "")
  const [city, setCity] = useState(address.city || "")
  const [province, setProvince] = useState(address.province || "")
  const [countryCode, setCountryCode] = useState(address.country_code || "")
  const [phone, setPhone] = useState(address.phone || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('company', company)
    formData.append('address_1', address1)
    formData.append('address_2', address2)
    formData.append('postal_code', postalCode)
    formData.append('city', city)
    formData.append('province', province)
    formData.append('country_code', countryCode)
    formData.append('phone', phone)

    const result = await updateCustomerAddress(formState, formData)

    if (result?.error) {
      setFormState({
        ...formState,
        success: false,
        error: result.error,
      })
    } else {
      setFormState({
        ...formState,
        success: true,
        error: null,
      })
      setSuccessState(true)
    }
  }

  const handleDelete = async () => {
    setRemoving(true)
    try {
      await deleteCustomerAddress(address.id)
      // Address deleted successfully, close modal
      setState(false)
    } catch (error) {
      console.error("Failed to delete address:", error)
    } finally {
      setRemoving(false)
    }
  }

  const close = () => {
    setSuccessState(false)
    setFormState({
      success: false,
      error: null,
      addressId: address.id,
    })
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

  // Address card display
  if (!state) {
    return (
      <div
        className={`bg-white border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
          isActive ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
        }`}
        data-testid="address-card"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900">
              {address.first_name} {address.last_name}
            </h3>
            {address.is_default_shipping && (
              <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                {tAcc.has("defaultShipping") ? tAcc("defaultShipping") : "Predvolená"}
              </span>
            )}
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setState(true)}
            data-testid="edit-address-button"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        {/* Address Details */}
        <div className="space-y-2 text-sm text-gray-600">
          {address.company && (
            <div className="flex items-center gap-2">
              <Buildings className="w-4 h-4 text-gray-400" />
              <span>{address.company}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <div>{address.address_1}</div>
              {address.address_2 && <div>{address.address_2}</div>}
              <div>{address.postal_code} {address.city}</div>
              {address.province && <div>{address.province}</div>}
              <div>{address.country_code}</div>
            </div>
          </div>
          {address.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{address.phone}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Edit modal
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
                {tAcc.has("editAddress") ? tAcc("editAddress") : "Upraviť adresu"}
              </h2>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base leading-tight">
                {tAcc.has("editAddressDescription") ? tAcc("editAddressDescription") : "Aktualizujte údaje vašej dodacej adresy"}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center p-4 sm:p-8 bg-gray-50 rounded-b-2xl sm:rounded-b-3xl border-t border-gray-100 flex-shrink-0 z-10">
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDelete}
                  disabled={removing}
                  className="w-full sm:w-auto"
                  data-testid="delete-button"
                >
                  {removing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {tAcc.has("deleting") ? tAcc("deleting") : "Odstraňujem..."}
                    </>
                  ) : (
                    <>
                      <Trash className="w-4 h-4 mr-2" />
                      {tAcc.has("deleteAddress") ? tAcc("deleteAddress") : "Odstrániť"}
                    </>
                  )}
                </Button>

                <div className="flex gap-3 sm:gap-4">
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
                    {isPending ? "Ukladám..." : (tAcc.has("saveAddress") ? tAcc("saveAddress") : "Uložiť zmeny")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditAddress