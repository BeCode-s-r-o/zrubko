'use client'

import { useState } from 'react'
import { Crown, Sparkles, Send, User, Mail, MessageCircle, Star } from 'lucide-react'
import ProductFAQ, { contactFAQItems } from "@modules/common/components/product-faq"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  })
  
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowErrors(true)
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message || !validateEmail(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Prosím, vyplňte všetky povinné polia správne'
      })
      return
    }

    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success
      setStatus({
        type: 'success',
        message: 'Ďakujeme za vašu správu! Ozveme sa vám čoskoro.'
      })
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setShowErrors(false)
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Nastala chyba pri odosielaní správy. Skúste to prosím znova.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Luxusný formulár s farbami z homepage */}
      <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-primary/10">
        <div className="relative z-10">
          {/* Luxusný nadpis - rovnaký štýl ako na homepage */}
          <div className="text-center mb-8">
            
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Meno */}
            <div className="group">
              <label className="text-sm font-semibold text-ebony mb-3">
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
                  className={`w-full px-6 py-4 text-base bg-white rounded-2xl border-2 transition-all duration-300 ${
                    touched.name && showErrors && !formData.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony-light text-ebony shadow-lg focus:shadow-xl`}
                  required
                  placeholder="Vaše meno"
                />
              </div>
              {touched.name && showErrors && !formData.name && (
                <p className="mt-2 text-sm text-red-600 font-medium">Prosím, vyplňte vaše meno</p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="text-sm font-semibold text-ebony mb-3">
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
                  className={`w-full px-6 py-4 text-base bg-white rounded-2xl border-2 transition-all duration-300 ${
                    touched.email && showErrors && (!formData.email || !validateEmail(formData.email))
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony-light text-ebony shadow-lg focus:shadow-xl`}
                  required
                  placeholder="vas@email.sk"
                />
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
              <label className="text-sm font-semibold text-ebony mb-3">
                Povedzte nám viac o vašom projekte... *
              </label>
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                    setTouched(prev => ({ ...prev, message: true }))
                  }}
                  className={`w-full px-6 py-4 text-base bg-white rounded-2xl border-2 transition-all duration-300 ${
                    touched.message && showErrors && !formData.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50'
                  } placeholder-ebony-light text-ebony shadow-lg focus:shadow-xl resize-none`}
                  required
                  rows={5}
                  placeholder="Napríklad: Chcem si postaviť zrubovú chatu s rozmermi 8x6m, s terasou a podkrovím..."
                />
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
                  <p className="font-medium">{status.message}</p>
                </div>
              </div>
            )}

            {/* Luxusné tlačidlo - rovnaké farby ako na homepage */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span className="font-medium">Odosielanie...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Začať projekt so Zrubko</span>
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ sekcia s farbami z homepage */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gold/20">
        <ProductFAQ items={contactFAQItems} />
      </div>
    </div>
  )
}

export default ContactForm 