"use client"

import React, { useEffect, useState, useTransition } from "react";

import Input from "@modules/common/components/input"
import AccountInfo from "@modules/account/components/account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileICO: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const [isPending, startTransition] = useTransition()

  const [state, setState] = useState({
    error: false,
    success: false,
  })

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const ico = formData.get("ico") as string
        await updateCustomer({
          metadata: {
            ...customer.metadata,
            ico: ico || undefined
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

  const currentICO = customer.metadata?.ico || "Nie je nastavené"

  return (
    <form action={handleSubmit} className="overflow-visible w-full">
      <AccountInfo
        label="IČO"
        currentInfo={currentICO}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-ico-editor"
      >
        <div className="grid grid-cols-1 gap-y-1">
          <Input
            label="IČO"
            name="ico"
            defaultValue={customer.metadata?.ico || ""}
            data-testid="ico-input"
            placeholder="12345678"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileICO

