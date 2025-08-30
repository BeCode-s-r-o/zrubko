"use client"

import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useFormState(updateCustomerName, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Meno</h3>
            <Input
              label=""
              name="first_name"
              required
              defaultValue={customer.first_name ?? ""}
              data-testid="first-name-input"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Priezvisko</h3>
            <Input
              label=""
              name="last_name"
              required
              defaultValue={customer.last_name ?? ""}
              data-testid="last-name-input"
            />
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
