"use client"

import { useState, useTransition, useEffect } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup, addCustomerAddress, updateCustomer } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import CountrySelect from "@modules/checkout/components/country-select"
import Checkbox from "@modules/common/components/checkbox"
import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Input from "@modules/common/components/input"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
  standalone?: boolean
  regions?: any[]
  countryCode?: string
}

const Register = ({ setCurrentView, standalone = false, regions, countryCode }: Props) => {
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null)
  const router = useRouter()

  const tAuth = useTranslations("auth")
  const tForm = useTranslations("forms")
  const tCommon = useTranslations("common")

  // Fetch regions on component mount (only if not provided via props)
  useEffect(() => {
    if (regions && regions.length > 0) {
      // Use regions from props
      const defaultRegion = regions.find((r: HttpTypes.StoreRegion) => r.countries?.some((c: any) => c.iso_2 === 'sk')) || regions[0]
      setRegion(defaultRegion || null)
    } else if (!standalone) {
      // Fetch regions if not in standalone mode and not provided
      const fetchRegions = async () => {
        try {
          const fetchedRegions = await listRegions()
          const defaultRegion = fetchedRegions.find((r: HttpTypes.StoreRegion) => r.countries?.some((c: any) => c.iso_2 === 'sk')) || fetchedRegions[0]
          setRegion(defaultRegion || null)
        } catch (error) {
          console.error("Failed to fetch regions:", error)
        }
      }
      fetchRegions()
    }
  }, [regions, standalone])

  const handleSubmit = async (formData: FormData) => {
    setMessage(null) // Clear previous error messages
    setIsSuccess(false) // Reset success state

    // Debug: Log form data
    console.log("Registration form data:")
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })

    startTransition(async () => {
      try {
        const result = await signup(null, formData)
        if (result && typeof result === 'object' && 'error' in result) {
          // Handle specific error messages in Slovak
          const errorString = result.error.toString().toLowerCase()
          if (errorString.includes("already exists") || errorString.includes("duplicate") || errorString.includes("409")) {
            setMessage("Účet s týmto emailom už existuje. Skúste sa prihlásiť alebo použite iný email.")
          } else if (errorString.includes("invalid") || errorString.includes("validation")) {
            setMessage("Neplatné údaje. Skontrolujte prosím všetky polia a skúste to znovu.")
          } else if (errorString.includes("password") && errorString.includes("weak")) {
            setMessage("Heslo je príliš slabé. Heslo musí obsahovať aspoň 8 znakov.")
          } else if (errorString.includes("email") && errorString.includes("invalid")) {
            setMessage("Neplatný formát emailu. Skontrolujte prosím emailovú adresu.")
          } else if (errorString.includes("network") || errorString.includes("connection")) {
            setMessage("Chyba pripojenia. Skontrolujte svoje internetové pripojenie a skúste to znovu.")
          } else {
            setMessage("Nastala chyba pri registrácii. Skúste to prosím znovu.")
          }
        } else if (result && typeof result === 'object' && 'success' in result && result.success) {
          // Successful registration
          setIsSuccess(true)

          // Create addresses automatically after successful registration
          try {
            // Wait a moment for the customer to be fully created
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Create shipping address if company registration
            if (formData.get("is_company") === "on" || isCompany) {
              const shippingAddress = {
                first_name: formData.get("first_name") as string,
                last_name: formData.get("last_name") as string,
                company: formData.get("company") as string || "",
                address_1: formData.get("address_1") as string,
                address_2: formData.get("address_2") as string || "",
                city: formData.get("city") as string,
                postal_code: formData.get("postal_code") as string,
                province: formData.get("province") as string || "",
                country_code: formData.get("country_code") as string,
                phone: formData.get("phone") as string || "",
              }

              const shippingFormData = new FormData()
              Object.entries(shippingAddress).forEach(([key, value]) => {
                if (value) shippingFormData.append(key, value)
              })

              await addCustomerAddress({ isDefaultShipping: true }, shippingFormData)

              // If same as billing is checked, also store shipping address as billing address
              if (sameAsBilling) {
                await updateCustomer({
                  metadata: {
                    billing_address: shippingAddress
                  }
                })
              }
            }

            // Create billing address if different from shipping
            if (!sameAsBilling && formData.get("billing_first_name")) {
              const billingAddress = {
                first_name: formData.get("billing_first_name") as string,
                last_name: formData.get("billing_last_name") as string,
                company: formData.get("company") as string || "",
                address_1: formData.get("billing_address_1") as string,
                address_2: formData.get("billing_address_2") as string || "",
                city: formData.get("billing_city") as string,
                postal_code: formData.get("billing_postal_code") as string,
                province: formData.get("billing_province") as string || "",
                country_code: formData.get("billing_country_code") as string,
                phone: formData.get("phone") as string || "",
              }

              // Store billing address in customer metadata
              await updateCustomer({
                metadata: {
                  billing_address: billingAddress
                }
              })
            }
          } catch (addressError) {
            console.error("Error creating addresses after registration:", addressError)
            // Don't fail the registration if address creation fails
          }

          // Refresh the page to update all components with new auth state
          router.refresh()

          // Redirect to account page after 3 seconds
          setTimeout(() => {
            if (standalone && countryCode) {
              router.push(`/${countryCode}/ucet`)
            } else {
              router.push('/')
            }
          }, 3000)
        } else {
          // Unexpected result format
          setMessage("Nastala neočakávaná chyba pri registrácii. Skúste to prosím znovu.")
        }
      } catch (error) {
        setMessage("Nastala neočakávaná chyba pri registrácii. Skúste to prosím znovu.")
      }
    })
  }

  return (
    <div className={`w-full ${standalone ? 'max-w-2xl' : ''}`} data-testid="register-page">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light text-primary mb-2">
          {tAuth.has("registerTitle") ? tAuth("registerTitle") : "Vytvorte si účet"}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          {tAuth.has("registerDescription") ? tAuth("registerDescription") : "Zaregistrujte sa a získajte prístup k naším exkluzívnym ponukám."}
        </p>
      </div>

      {/* Form */}
      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Meno</h3>
              <Input
                label=""
                type="text"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Priezvisko</h3>
              <Input
                label=""
                type="text"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">E-mail</h3>
              <Input
                label=""
                type="email"
                name="email"
                required
                autoComplete="email"
                data-testid="email-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Heslo</h3>
              <Input
                label=""
                type="password"
                name="password"
                required
                autoComplete="new-password"
                data-testid="password-input"
                className="w-full px-3 py-2 pr-10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Telefónne číslo</h3>
            <Input
              label=""
              type="tel"
              name="phone"
              autoComplete="tel"
              data-testid="phone-input"
              className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
            />
          </div>

          {/* Company Checkbox */}
          <div className="mb-6">
            <div className="relative">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="is_company"
                    checked={isCompany}
                    onChange={() => setIsCompany(!isCompany)}
                    data-testid="company-checkbox"
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                    isCompany
                      ? 'bg-primary border-primary shadow-md'
                      : 'border-gray-300 bg-white hover:border-primary/50'
                  }`}>
                    {isCompany && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${
                  isCompany ? 'text-primary' : 'text-gray-700 group-hover:text-primary'
                }`}>
                  Firma / Podnikateľ
                </span>
              </label>

              {/* Optional description */}
              <p className="mt-2 text-xs text-gray-500 ml-8">
                Zaškrtnite, ak sa registrujete ako firma alebo podnikateľ
              </p>
            </div>
          </div>

          {/* Company Fields - Conditional */}
          {isCompany && (
            <div className="p-4 space-y-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Údaje spoločnosti</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Názov spoločnosti</h3>
                  <Input
                    label=""
                    type="text"
                    name="company"
                    required
                    autoComplete="organization"
                    data-testid="company-input"
                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">IČO</h3>
                  <Input
                    label=""
                    type="text"
                    name="ico"
                    required
                    data-testid="ico-input"
                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">DIČ</h3>
                  <Input
                    label=""
                    type="text"
                    name="dic"
                    required
                    data-testid="dic-input"
                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">IČ DPH</h3>
                  <Input
                    label=""
                    type="text"
                    name="ic_dph"
                    data-testid="icdph-input"
                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                  />
                </div>
              </div>

              {/* Address Section for Companies */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="mb-4 text-lg font-semibold text-gray-900">Adresa spoločnosti *</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Ulica a číslo</h3>
                    <Input
                      label=""
                      type="text"
                      name="address_1"
                      required
                      autoComplete="address-line1"
                      data-testid="address-1-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mt-2">Apartmán, budova, atď.</h3>
                    <Input
                      label=""
                      type="text"
                      name="address_2"
                      autoComplete="address-line2"
                      data-testid="address-2-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mt-2">PSČ</h3>
                    <Input
                      label=""
                      type="text"
                      name="postal_code"
                      required
                      autoComplete="postal-code"
                      data-testid="postal-code-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mt-2">Mesto</h3>
                    <Input
                      label=""
                      type="text"
                      name="city"
                      required
                      autoComplete="locality"
                      data-testid="city-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Štát/Kraj</h3>
                    <Input
                      label=""
                      type="text"
                      name="province"
                      autoComplete="address-level1"
                      data-testid="province-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Krajina</h3>
                    <CountrySelect
                      region={region || undefined}
                      name="country_code"
                      autoComplete="country"
                      data-testid="country-select"
                      required={true}
                      defaultValue="sk"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address Checkbox */}
              <div className="mt-6">
                <div className="relative">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="same_as_billing"
                        checked={sameAsBilling}
                        onChange={() => setSameAsBilling(!sameAsBilling)}
                        data-testid="billing-address-checkbox"
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        sameAsBilling
                          ? 'bg-green-600 border-green-600 shadow-md'
                          : 'border-gray-300 bg-white hover:border-green-500'
                      }`}>
                        {sameAsBilling && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${
                      sameAsBilling ? 'text-green-600' : 'text-gray-700 group-hover:text-green-600'
                    }`}>
                      Fakturačná adresa rovnaká ako dodacia adresa
                    </span>
                  </label>

                  {/* Optional description */}
                  <p className="mt-2 text-xs text-gray-500 ml-8">
                    {sameAsBilling
                      ? 'Fakturačná adresa bude rovnaká ako dodacia adresa'
                      : 'Vyplňte rozdielnu fakturačnú adresu'
                    }
                  </p>
                </div>

                {/* Hidden input to track checkbox state */}
                <input
                  type="hidden"
                  name="same_as_billing"
                  value={sameAsBilling ? "true" : "false"}
                />
              </div>

              {/* Billing Address Section */}
              {!sameAsBilling && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">Fakturačná adresa *</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Meno</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_first_name"
                        required
                        autoComplete="given-name"
                        data-testid="billing-first-name-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Priezvisko</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_last_name"
                        required
                        autoComplete="family-name"
                        data-testid="billing-last-name-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mt-2">Ulica a číslo</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_address_1"
                        required
                        autoComplete="address-line1"
                        data-testid="billing-address-1-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mt-2">Apartmán, budova, atď.</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_address_2"
                        autoComplete="address-line2"
                        data-testid="billing-address-2-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mt-2">PSČ</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_postal_code"
                        required
                        autoComplete="postal-code"
                        data-testid="billing-postal-code-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mt-2">Mesto</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_city"
                        required
                        autoComplete="locality"
                        data-testid="billing-city-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Štát/Kraj</h3>
                      <Input
                        label=""
                        type="text"
                        name="billing_province"
                        autoComplete="address-level1"
                        data-testid="billing-province-input"
                        className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Krajina</h3>
                      <CountrySelect
                        region={region || undefined}
                        name="billing_country_code"
                        autoComplete="country"
                        data-testid="billing-country-select"
                        required={true}
                        defaultValue="sk"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Telefón</h3>
                    <Input
                      label=""
                      type="tel"
                      name="billing_phone"
                      autoComplete="tel"
                      data-testid="billing-phone-input"
                      className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {message && (
          <div
            className="p-4 mb-4 text-base text-red-700 bg-red-100 rounded-lg border border-red-400"
            data-testid="register-error"
          >
            {message}
          </div>
        )}

        {isSuccess && (
          <div
            className="p-4 mb-4 text-base text-green-700 bg-green-100 rounded-lg border border-green-400"
            data-testid="register-success"
          >
            <div className="flex items-center">
              <svg className="mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Účet úspešne vytvorený! Prevedenie na domovskú stránku za 3 sekundy.</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isSuccess}
          data-testid="register-button"
        >
          {isPending ? "Vytváram účet..." : "Vytvoriť účet"}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-dark">
          {tAuth.has("haveAccount") ? tAuth("haveAccount") : "Máte už účet?"}{" "}
          {standalone ? (
            <a
              href={`/${countryCode}/prihlasit-sa`}
              className="font-semibold underline transition-colors text-primary-500 hover:text-primary-600"
            >
              {tAuth.has("signIn") ? tAuth("signIn") : "Prihlásiť sa"}
            </a>
          ) : (
            <button
              onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="font-semibold underline transition-colors text-primary-500 hover:text-primary-600"
            >
              {tAuth.has("signIn") ? tAuth("signIn") : "Prihlásiť sa"}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

export default Register
