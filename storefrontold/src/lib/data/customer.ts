"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getAuthHeaders, removeAuthToken, setAuthToken } from "./cookies"

export const getCustomer = cache(async function () {
  return await sdk.store.customer
    .retrieve({}, { next: { tags: ["customer"] }, ...getAuthHeaders() })
    .then(({ customer }) => customer)
    .catch(() => null)
})

// Client-side function to get JWT token from cookies
const getClientAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === '_medusa_jwt') {
      return value
    }
  }
  return null
}

export const retrieveCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
  const token = getClientAuthToken()

  if (!token) return null

  try {
    // Use fetch directly to get customer data
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}/store/customers/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data.customer
    } else {
      return null
    }
  } catch (error) {
    console.error("Error retrieving customer:", error)
    return null
  }
}

export const updateCustomer = cache(async function (
  body: HttpTypes.StoreUpdateCustomer
) {
  const updateRes = await sdk.store.customer
    .update(body, {}, getAuthHeaders())
    .then(({ customer }) => customer)
    .catch(medusaError)

  revalidateTag("customer")
  return updateRes
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const isCompany = formData.get("is_company") === "on"

  // Basic customer data
  const customerForm: any = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  // Add company data if registering as company
  if (isCompany) {
    const metadata: any = {}

    // Company basic info
    const company = formData.get("company") as string
    const ico = formData.get("ico") as string
    const dic = formData.get("dic") as string
    const ic_dph = formData.get("ic_dph") as string

    if (company) metadata.company_name = company
    if (ico) metadata.ico = ico
    if (dic) metadata.dic = dic
    if (ic_dph) metadata.ic_dph = ic_dph

    customerForm.metadata = metadata
  }

  try {
    // Step 1: Register the user
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    // Step 2: Create the customer
    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      customHeaders
    )

    // Step 3: If company registration, add addresses as separate entries
    if (isCompany) {
      console.log("Creating company addresses for registration...")

      // Create company address directly using the SDK with proper authentication
      const company = formData.get("company") as string
      const countryCode = formData.get("country_code") as string || "sk" // Default to Slovakia if not provided

      const addressData = {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        company: company || undefined,
        address_1: formData.get("address_1") as string,
        address_2: formData.get("address_2") as string || undefined,
        city: formData.get("city") as string,
        postal_code: formData.get("postal_code") as string,
        province: formData.get("province") as string || undefined,
        country_code: countryCode,
        phone: formData.get("phone") as string || undefined,
        is_default_shipping: true,
      }

      console.log("Company address data:", addressData)

      try {
        const addressResult = await sdk.store.customer.createAddress(addressData, {}, customHeaders)
        console.log("Company address created successfully:", addressResult)
      } catch (addressError) {
        console.error("Failed to add company address:", addressError)
        // Continue with registration even if address creation fails
      }

      // Add billing address if different from shipping
      const sameAsBilling = formData.get("same_as_billing") === "true"
      console.log("Same as billing:", sameAsBilling)

      if (!sameAsBilling) {
        const billingCountryCode = formData.get("billing_country_code") as string || "sk" // Default to Slovakia if not provided

        const billingAddressData = {
          first_name: formData.get("billing_first_name") as string,
          last_name: formData.get("billing_last_name") as string,
          company: company || undefined,
          address_1: formData.get("billing_address_1") as string,
          address_2: formData.get("billing_address_2") as string || undefined,
          city: formData.get("billing_city") as string,
          postal_code: formData.get("billing_postal_code") as string,
          province: formData.get("billing_province") as string || undefined,
          country_code: billingCountryCode,
          phone: formData.get("billing_phone") as string || undefined,
          is_default_shipping: false,
        }

        console.log("Billing address data:", billingAddressData)

        try {
          const billingResult = await sdk.store.customer.createAddress(billingAddressData, {}, customHeaders)
          console.log("Billing address created successfully:", billingResult)
        } catch (billingAddressError) {
          console.error("Failed to add billing address:", billingAddressError)
          // Continue with registration even if billing address creation fails
        }
      }
    }

    // Step 4: Login the user
    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    setAuthToken(typeof loginToken === 'string' ? loginToken : loginToken.location)

    revalidateTag("customer")
    return { success: true, customer: createdCustomer }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await sdk.auth
      .login("customer", "emailpass", { email, password })
      .then((token) => {
        setAuthToken(typeof token === 'string' ? token : token.location)
        revalidateTag("customer")
      })

    // Return success to indicate successful login
    return { success: true }
  } catch (error: any) {
    return error.toString()
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  removeAuthToken()
  revalidateTag("auth")
  revalidateTag("customer")
  redirect(`/${countryCode}/ucet`)
}

export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .createAddress(address, {}, getAuthHeaders())
    .then(({ customer }) => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  await sdk.store.customer
    .deleteAddress(addressId, getAuthHeaders())
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, getAuthHeaders())
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
