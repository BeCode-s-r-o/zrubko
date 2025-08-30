"use client"

import React, { useEffect, useState, useTransition } from "react";

import Input from "@modules/common/components/input"
import AccountInfo from "@modules/account/components/account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileICDph: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const [isPending, startTransition] = useTransition()

  const [state, setState] = useState({
    error: false,
    success: false,
  })

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const ic_dph = formData.get("ic_dph") as string
        await updateCustomer({
          metadata: {
            ...customer.metadata,
            ic_dph: ic_dph || undefined
          }
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

  const currentICDph = customer.metadata?.ic_dph || "Nie je nastavené"

  return (
    <form action={handleSubmit} className="overflow-visible w-full">
      <AccountInfo
        label="IČ DPH"
        currentInfo={currentICDph}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-icdph-editor"
      >
        <div className="grid grid-cols-1 gap-y-1">
          <Input
            label="IČ DPH"
            name="ic_dph"
            defaultValue={customer.metadata?.ic_dph || ""}
            data-testid="icdph-input"
            placeholder="SK1234567890"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileICDph

