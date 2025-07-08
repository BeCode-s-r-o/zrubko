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
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        {/* Moderná Q&A sekcia */}
        <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-accent-light/20 rounded-3xl p-8 mt-8 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0 bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Ľavá strana - Hlavný obsah */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="bg-gradient-to-r from-accent to-accent-dark p-3 rounded-2xl shadow-lg">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-accent-dark via-accent to-amber-600 bg-clip-text text-transparent">
                  Máte otázky?
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Napíšte nám priamo cez live chat a dostanete okamžitú odpoveď od našich expertov na drevo.
              </p>
              
              {/* Kontaktné možnosti */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={openChat}
                  className="bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Spustiť live chat
                </button>
                
                <a 
                  href="tel:+421123456789"
                  className="bg-white/90 border-2 border-accent text-accent hover:bg-accent/5 font-semibold px-6 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Zavolať
                </a>
              </div>
            </div>
            
            {/* Pravá strana - Rýchle kontakty */}
            <div className="lg:max-w-sm w-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Live chat výhody
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Okamžité odpovede</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Expertné poradenstvo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Dostupné 8:00 - 17:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Prepojené s Messenger</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Component */}
      <LiveChat isOpen={isChatOpen} onClose={closeChat} />
    </div>
  )
}

export default AccountLayout
