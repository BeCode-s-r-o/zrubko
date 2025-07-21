"use client"

import React, { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LiveChat from "@modules/common/components/live-chat"
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  return (
    <div className="flex-1" data-testid="account-page">
      <div className="flex flex-col flex-1 mx-auto max-w-5xl h-full bg-white content-container">
        <div
          className={customer
            ? "grid grid-cols-1 psmall:grid-cols-[240px_1fr]"
            : "flex justify-center p"}
        >
          {customer ? (
            <div><AccountNav customer={customer} /></div>
          ) : null}
          <div className="flex-1">{children}</div>
        </div>
      
      </div>


    </div>
  )
}

export default AccountLayout
