"use client"

import { useState, useTransition, useEffect } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import CountrySelect from "@modules/checkout/components/country-select"
import Checkbox from "@modules/common/components/checkbox"
import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Input from "@modules/common/components/input"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null)
  const router = useRouter()

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regions = await listRegions()
        // Use the first region or find Slovakia region
        const defaultRegion = regions.find(r => r.countries?.some(c => c.iso_2 === 'sk')) || regions[0]
        setRegion(defaultRegion || null)
      } catch (error) {
        console.error("Failed to fetch regions:", error)
      }
    }

    fetchRegions()
  }, [])

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

          // Refresh the page to update all components with new auth state
          router.refresh()

          // Redirect to homepage after 3 seconds
          setTimeout(() => {
            router.push('/')
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
    <div className="w-full" data-testid="register-page">
      {/* Form */}
      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1">
              <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Meno *</label>
              <Input
                type="text"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
                className="form-control"
                style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                placeholder="Vaše meno"
                onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div className="flex-1">
              <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Priezvisko *</label>
              <Input
                type="text"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
                className="form-control"
                style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                placeholder="Vaše priezvisko"
                onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>E-mailová adresa *</label>
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              data-testid="email-input"
              className="form-control"
              style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
              placeholder="vas@email.com"
              onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Heslo *</label>
            <Input
              type="password"
              name="password"
              required
              autoComplete="new-password"
              data-testid="password-input"
              className="form-control"
              style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
              placeholder="Heslo"
              onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Telefónne číslo</label>
            <Input
              type="tel"
              name="phone"
              autoComplete="tel"
              data-testid="phone-input"
              className="form-control"
              style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
              placeholder="+421 xxx xxx xxx"
              onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Company Checkbox */}
          <div className="mb-6">
            <Checkbox
              label="Firma / Podnikateľ"
              name="is_company"
              checked={isCompany}
              onChange={() => setIsCompany(!isCompany)}
              data-testid="company-checkbox"
            />
          </div>

          {/* Company Fields - Conditional */}
          {isCompany && (
            <div className="p-4 space-y-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Údaje spoločnosti</h3>

              <div className="mb-4">
                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Názov spoločnosti *</label>
                <Input
                  type="text"
                  name="company"
                  required
                  autoComplete="organization"
                  data-testid="company-input"
                  className="form-control"
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                  placeholder="Názov spoločnosti"
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>IČO *</label>
                <Input
                  type="text"
                  name="ico"
                  required
                  data-testid="ico-input"
                  className="form-control"
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                  placeholder="12345678"
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>DIČ *</label>
                <Input
                  type="text"
                  name="dic"
                  required
                  data-testid="dic-input"
                  className="form-control"
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                  placeholder="SK1234567890"
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>IČ DPH</label>
                <Input
                  type="text"
                  name="ic_dph"
                  data-testid="icdph-input"
                  className="form-control"
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                  placeholder="SK1234567890"
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Address Section for Companies */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="mb-4 text-lg font-semibold text-gray-900">Adresa spoločnosti *</h4>

                <div className="mb-4">
                  <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Ulica a číslo *</label>
                  <Input
                    type="text"
                    name="address_1"
                    required
                    autoComplete="address-line1"
                    data-testid="address-1-input"
                    className="form-control"
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                    placeholder="Hlavná ulica 123"
                    onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Apartmán, budova, atď.</label>
                  <Input
                    type="text"
                    name="address_2"
                    autoComplete="address-line2"
                    data-testid="address-2-input"
                    className="form-control"
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                    placeholder="Byt 5, 2. poschodie"
                    onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>PSČ *</label>
                    <Input
                      type="text"
                      name="postal_code"
                      required
                      autoComplete="postal-code"
                      data-testid="postal-code-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="811 01"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Mesto *</label>
                    <Input
                      type="text"
                      name="city"
                      required
                      autoComplete="locality"
                      data-testid="city-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Bratislava"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Štát/Kraj</label>
                    <Input
                      type="text"
                      name="province"
                      autoComplete="address-level1"
                      data-testid="province-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Bratislavský kraj"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Krajina *</label>
                    <CountrySelect
                      region={region || undefined}
                      name="country_code"
                      placeholder="Vyberte krajinu"
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
                <Checkbox
                  label="Fakturačná adresa rovnaká ako dodacia adresa"
                  name="same_as_billing"
                  checked={sameAsBilling}
                  onChange={() => setSameAsBilling(!sameAsBilling)}
                  data-testid="billing-address-checkbox"
                />
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

                  <div className="mb-4">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Meno *</label>
                    <Input
                      type="text"
                      name="billing_first_name"
                      required
                      autoComplete="given-name"
                      data-testid="billing-first-name-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Vaše meno"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Priezvisko *</label>
                    <Input
                      type="text"
                      name="billing_last_name"
                      required
                      autoComplete="family-name"
                      data-testid="billing-last-name-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Vaše priezvisko"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Ulica a číslo *</label>
                    <Input
                      type="text"
                      name="billing_address_1"
                      required
                      autoComplete="address-line1"
                      data-testid="billing-address-1-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Hlavná ulica 123"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Apartmán, budova, atď.</label>
                    <Input
                      type="text"
                      name="billing_address_2"
                      autoComplete="address-line2"
                      data-testid="billing-address-2-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="Byt 5, 2. poschodie"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>PSČ *</label>
                      <Input
                        type="text"
                        name="billing_postal_code"
                        required
                        autoComplete="postal-code"
                        data-testid="billing-postal-code-input"
                        className="form-control"
                        style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                        placeholder="811 01"
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Mesto *</label>
                      <Input
                        type="text"
                        name="billing_city"
                        required
                        autoComplete="locality"
                        data-testid="billing-city-input"
                        className="form-control"
                        style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                        placeholder="Bratislava"
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Štát/Kraj</label>
                      <Input
                        type="text"
                        name="billing_province"
                        autoComplete="address-level1"
                        data-testid="billing-province-input"
                        className="form-control"
                        style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                        placeholder="Bratislavský kraj"
                        onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Krajina *</label>
                      <CountrySelect
                        region={region || undefined}
                        name="billing_country_code"
                        placeholder="Vyberte krajinu"
                        autoComplete="country"
                        data-testid="billing-country-select"
                        required={true}
                        defaultValue="sk"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>Telefón</label>
                    <Input
                      type="tel"
                      name="billing_phone"
                      autoComplete="tel"
                      data-testid="billing-phone-input"
                      className="form-control"
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #ddd", borderRadius: "0.5rem", transition: "all 0.3s ease" }}
                      placeholder="+421 xxx xxx xxx"
                      onFocus={(e) => { e.target.style.borderColor = "var(--primary-color)"; e.target.style.boxShadow = "0 0 0 3px rgba(254, 191, 46, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
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
          Máte už účet?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="font-semibold underline transition-colors text-primary-500 hover:text-primary-600"
          >
            Prihlásiť sa
          </button>
          .
        </p>
      </div>
    </div>
  )
}

export default Register

