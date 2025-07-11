'use client'

import { useState } from 'react'
import { Crown, Sparkles, Send, User, Mail, MessageCircle } from 'lucide-react'
import ProductFAQ, { contactFAQItems } from "@modules/common/components/product-faq"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({
    type: null,
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [showErrors, setShowErrors] = useState(false)

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowErrors(true)
    setTouched({
      name: true,
      email: true,
      message: true,
    })
    
    if (!formData.name || !formData.email || !formData.message || !validateEmail(formData.email)) {
      return
    }
    
    setLoading(true)
    setStatus({ type: null, message: '' })
    
    try {
      const response = await fetch('/api/store/custom/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus({
        type: 'success',
        message: 'Ďakujeme za vašu správu. Budeme vás kontaktovať čo najskôr.',
      })
      setFormData({ name: '', email: '', message: '' })
      setShowErrors(false)
      setTouched({
        name: false,
        email: false,
        message: false,
      })
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error?.message || 'Niečo sa pokazilo. Skúste to prosím znova.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Luxusný formulár */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-champagne-light via-champagne to-champagne-dark p-8 shadow-2xl border border-gold/20">
        {/* Dekoratívne pozadie */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-mahogany/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-mahogany/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Meno */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-ebony font-heading mb-3">
                <User className="w-4 h-4 text-gold" />
                Vaše meno *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                    setTouched(prev => ({ ...prev, name: true }))
                  }}
                  className={`w-full px-6 py-4 text-base bg-white/90 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 ${
                    touched.name && showErrors && !formData.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony/50 text-ebony shadow-lg focus:shadow-xl`}
                  required
                  placeholder="Vaše meno"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {touched.name && showErrors && !formData.name && (
                <p className="mt-2 text-sm text-red-600 font-medium">Prosím, vyplňte vaše meno</p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-ebony font-heading mb-3">
                <Mail className="w-4 h-4 text-gold" />
                Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                    setTouched(prev => ({ ...prev, email: true }))
                  }}
                  className={`w-full px-6 py-4 text-base bg-white/90 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 ${
                    touched.email && showErrors && (!formData.email || !validateEmail(formData.email))
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony/50 text-ebony shadow-lg focus:shadow-xl`}
                  required
                  placeholder="vas@email.sk"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {touched.email && showErrors && !formData.email && (
                <p className="mt-2 text-sm text-red-600 font-medium">Prosím, vyplňte váš email</p>
              )}
              {touched.email && showErrors && formData.email && !validateEmail(formData.email) && (
                <p className="mt-2 text-sm text-red-600 font-medium">Prosím, zadajte platný email</p>
              )}
            </div>

            {/* Správa */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-ebony font-heading mb-3">
                <MessageCircle className="w-4 h-4 text-gold" />
                Povedzte nám viac o vašom projekte... *
              </label>
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                    setTouched(prev => ({ ...prev, message: true }))
                  }}
                  className={`w-full px-6 py-4 text-base bg-white/90 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 ${
                    touched.message && showErrors && !formData.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony/50 text-ebony shadow-lg focus:shadow-xl resize-none`}
                  required
                  rows={5}
                  placeholder="Napríklad: Chcem si postaviť zrubovú chatu s rozmermi 8x6m, s terasou a podkrovím..."
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {touched.message && showErrors && !formData.message && (
                <p className="mt-2 text-sm text-red-600 font-medium">Prosím, napíšte nám správu</p>
              )}
            </div>

            {/* Status správy */}
            {status.message && (
              <div
                className={`p-4 rounded-2xl border-2 ${
                  status.type === 'success'
                    ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800'
                    : 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800'
                } backdrop-blur-sm shadow-lg`}
              >
                                 <div className="flex items-center gap-2">
                   {status.type === 'success' ? (
                     <Crown className="w-5 h-5 text-green-600" />
                   ) : (
                     <Crown className="w-5 h-5 text-red-600" />
                   )}
                   <p className="font-medium">{status.message}</p>
                 </div>
              </div>
            )}

            {/* Luxusné tlačidlo */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden rounded-2xl bg-gradient-to-r from-gold via-mahogany to-gold-dark p-1 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="relative rounded-2xl bg-gradient-to-r from-gold via-mahogany to-gold-dark px-8 py-4 transition-all duration-300 group-hover:from-gold-dark group-hover:via-mahogany-dark group-hover:to-gold">
                  <div className="flex items-center justify-center gap-3 text-white">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span className="text-lg font-bold font-heading">Odosielanie...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5" />
                        <span className="text-lg font-bold font-heading">Začať projekt so Zrubko</span>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ sekcia */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gold/20">
        <ProductFAQ items={contactFAQItems} />
      </div>
    </div>
  )
}

export default ContactForm 