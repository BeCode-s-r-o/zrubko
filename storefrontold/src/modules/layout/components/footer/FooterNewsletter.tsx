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
    <div className="py-12 border-b border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-white" />
          <h3 className="text-xl font-medium text-white">
            Newsletter
          </h3>
        </div>
        
        <p className="text-sm text-white/70 mb-8 max-w-2xl mx-auto">
          Získajte informácie o novinkách, tipoch a špeciálnych ponukách priamo do vašej schránky
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Váš email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-colors text-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="px-6 py-3 bg-white text-[#1a2e1a] rounded-lg hover:bg-white/90 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Hotovo
                </>
              ) : (
                <>
                  Prihlásiť
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-white/70">Špeciálne zľavy</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/70">Nové produkty</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/70">Odborné rady</p>
          </div>
        </div>
        
        <p className="text-xs text-white/50">
          Žiadny spam. Odhlásenie jedným klikom.
        </p>
      </div>
    </div>
  )
} 