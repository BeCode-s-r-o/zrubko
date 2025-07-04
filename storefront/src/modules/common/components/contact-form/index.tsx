'use client'

import { useState } from 'react'
import PrimaryButton from '../../../layout/components/ui/PrimaryButton'
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
    <div className="flex flex-col gap-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6" noValidate>
        <div>
          <label className="text-sm text-gray-700">Vaše meno *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }))
              setTouched(prev => ({ ...prev, name: true }))
            }}
            className={`px-4 py-3 mt-1 w-full text-base bg-white rounded-lg border-2 ${
              touched.name && showErrors && !formData.name 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-200 focus:border-gray-900'
            } focus:ring-0 transition-colors`}
            required
            placeholder="Vaše meno"
          />
          {touched.name && showErrors && !formData.name && (
            <p className="mt-1 text-sm text-red-500">Prosím, vyplňte vaše meno</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }))
              setTouched(prev => ({ ...prev, email: true }))
            }}
            className={`px-4 py-3 mt-1 w-full text-base bg-white rounded-lg border-2 ${
              touched.email && showErrors && (!formData.email || !validateEmail(formData.email))
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-200 focus:border-gray-900'
            } focus:ring-0 transition-colors`}
            required
            placeholder="vas@email.sk"
          />
          {touched.email && showErrors && !formData.email && (
            <p className="mt-1 text-sm text-red-500">Prosím, vyplňte Váš email</p>
          )}
          {touched.email && showErrors && formData.email && !validateEmail(formData.email) && (
            <p className="mt-1 text-sm text-red-500">Prosím, zadajte platný email</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">Povedzte nám viac o vašom projekte... *</label>
          <textarea
            value={formData.message}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, message: e.target.value }))
              setTouched(prev => ({ ...prev, message: true }))
            }}
            className={`px-4 py-3 mt-1 w-full text-base bg-white rounded-lg border-2 ${
              touched.message && showErrors && !formData.message 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-200 focus:border-gray-900'
            } focus:ring-0 resize-none transition-colors`}
            required
            rows={4}
            placeholder="Napríklad: Chcem si postaviť zrubovú chatu s rozmermi 8x6m, s terasou a podkrovím..."
          />
          {touched.message && showErrors && !formData.message && (
            <p className="mt-1 text-sm text-red-500">Prosím, napíšte nám správu</p>
          )}
        </div>

        {status.message && (
          <div
            className={`p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <PrimaryButton type="submit" disabled={loading} className="w-full">
          {loading ? 'Odosielanie...' : "Začať projekt so Zrubko"}
        </PrimaryButton>
      </form>
      <ProductFAQ items={contactFAQItems} />
    </div>
  )
}

export default ContactForm 