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
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div
          className={customer
            ? "grid grid-cols-1 small:grid-cols-[240px_1fr] py-12"
            : "flex justify-center py-12"}
        >
          {customer ? (
            <div><AccountNav customer={customer} /></div>
          ) : null}
          <div className="flex-1">{children}</div>
        </div>
        {/* Moderná Q&A sekcia */}
        <div className="border border-primary/10 rounded-xl p-6 mt-8 text-center">
          <p className="text-lg text-primary mb-2 font-medium">Potrebujete poradiť?</p>
          <p className="text-gray-700 mb-4">Napíšte nám cez live chat, radi vám pomôžeme.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openChat}
              className="bg-primary text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Spustiť live chat
            </button>
          </div>
        </div>
      </div>

      {/* Live Chat Component */}
      <LiveChat isOpen={isChatOpen} onClose={closeChat} />
    </div>
  )
}

export default AccountLayout
