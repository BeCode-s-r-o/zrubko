"use client"

import React, { useEffect } from "react"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { useFormState } from "react-dom"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const [state, formAction] = useFormState((() => {}) as any, {
    customer,
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Súčasné heslo</h3>
            <Input
              label=""
              name="old_password"
              required
              type="password"
              data-testid="old-password-input"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Nové heslo</h3>
            <Input
              label=""
              type="password"
              name="new_password"
              required
              data-testid="new-password-input"
            />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium text-gray-700">Potvrdenie hesla</h3>
            <Input
              label=""
              type="password"
              name="confirm_password"
              required
              data-testid="confirm-password-input"
            />
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
