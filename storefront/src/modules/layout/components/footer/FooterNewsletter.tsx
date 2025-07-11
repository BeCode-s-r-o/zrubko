"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"

export default function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail("")
    }
  }

  return (
    <div className="py-8 bg-gradient-to-r from-champagne-light via-champagne to-champagne-light border-b border-gold/10">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-gold rounded-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-ebony">Newslettér</h3>
        </div>
        
        <p className="text-ebony-light mb-8 max-w-2xl mx-auto">
          Získajte ako prvý informácie o novinkách, zľavách a odborných radách pre prácu s drevom.
        </p>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Zadajte váš email"
              className="flex-1 px-4 py-3 rounded-lg border border-gold/20 bg-white text-ebony placeholder-ebony-light focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="px-6 py-3 bg-gradient-to-r from-gold to-mahogany text-white rounded-lg hover:from-gold-dark hover:to-mahogany-dark transition-all duration-300 hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Hotovo
                </>
              ) : (
                <>
                  Odoberať
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <p className="text-xs text-ebony-light mt-4">
          Žiadny spam. Odhlásenie kedykoľvek jedným klikom.
        </p>
      </div>
    </div>
  )
} 