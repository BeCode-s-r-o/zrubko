"use client"

import React, { useEffect, useState, useTransition } from "react";

import Input from "@modules/common/components/input"
import AccountInfo from "@modules/account/components/account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileCompany: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const [isPending, startTransition] = useTransition()

  const [state, setState] = useState({
    error: false,
    success: false,
  })

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const company = formData.get("company") as string
        await updateCustomer({
          company_name: company || undefined
        })
        setState({ success: true, error: false })
      } catch (error: any) {
        setState({ success: false, error: error.toString() })
      }
    })
  }

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  const currentCompany = customer.company_name || "Nie je nastavená"

  return (
    <form action={handleSubmit} className="overflow-visible w-full">
      <AccountInfo
        label="Spoločnosť"
        currentInfo={currentCompany}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-company-editor"
      >
        <div className="grid grid-cols-1 gap-y-1">
          <Input
            label="Spoločnosť"
            name="company"
            defaultValue={customer.company_name || ""}
            data-testid="company-input"
            placeholder="Názov spoločnosti"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileCompany

