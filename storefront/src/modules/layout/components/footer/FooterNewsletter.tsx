"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check, Star } from "lucide-react"

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
    <div className="py-16 relative border-b border-gold/20">
      {/* Luxusné dekoratívne pozadie */}
      <div className="absolute inset-0 bg-gradient-to-r from-ebony-light/50 via-transparent to-ebony-light/50"></div>
      
      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        {/* Luxusný header */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-gold-dark/30 rounded-2xl blur-xl"></div>
            <div className="relative p-4 bg-gradient-to-br from-gold to-gold-dark rounded-2xl shadow-2xl shadow-gold/25">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
            Exkluzívny Newslettér
          </h3>
          
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-current" />
            ))}
            <span className="text-champagne/80 ml-2 font-medium">Prémiový obsah</span>
          </div>
        </div>
        
        <p className="text-xl text-champagne/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Získajte exkluzívny prístup k luxusným novinkám, limitovaným edíciám a odborným radám 
          od našich majstrov remesla.
        </p>
        
        {/* Luxusný formulár */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold-dark/20 rounded-2xl blur-sm"></div>
            <div className="relative flex gap-3 p-2 bg-gradient-to-r from-ebony-light/80 to-ebony/80 rounded-2xl border border-gold/30 backdrop-blur-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš exkluzívny email"
                className="flex-1 px-6 py-4 rounded-xl border-0 bg-champagne/10 text-champagne placeholder-champagne/60 focus:bg-champagne/20 focus:ring-2 focus:ring-gold/50 focus:outline-none transition-all backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-ebony rounded-xl hover:from-gold-dark hover:to-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed font-bold hover:scale-105 transform"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-5 h-5" />
                    Hotovo
                  </>
                ) : (
                  <>
                    Pripojiť sa
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        
        {/* Prémiové benefity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-3 h-3 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-champagne/80">Exkluzívne zľavy až 20%</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-champagne/80">Prvé informácie o novinkách</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-champagne/80">Poradca od majstrov remesla</p>
          </div>
        </div>
        
        <p className="text-xs text-champagne/60">
          Žiadny spam. Luxusný obsah. Odhlásenie jedným klikom.
        </p>
      </div>
    </div>
  )
} 