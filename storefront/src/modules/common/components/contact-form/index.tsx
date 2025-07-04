"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PrimaryButton from '../../../layout/components/ui/PrimaryButton'
import ProductFAQ, { contactFAQItems } from "@modules/common/components/product-faq"
import { medusaClient } from "@lib/config"

type FormValues = {
  name: string
  email: string
  message: string
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch("/api/store/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError("Niečo sa pokazilo. Skúste to prosím znova.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Meno
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className={`mt-1 block w-full rounded-md shadow-sm 
              ${errors.name || (touchedFields.name && !submitSuccess) 
                ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:border-amber-500 focus:ring-amber-500"}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">Meno je povinné</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { 
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Neplatná emailová adresa"
              }
            })}
            className={`mt-1 block w-full rounded-md shadow-sm 
              ${errors.email || (touchedFields.email && !submitSuccess)
                ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:border-amber-500 focus:ring-amber-500"}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.type === "required" 
                ? "Email je povinný" 
                : errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Správa
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message", { required: true })}
            className={`mt-1 block w-full rounded-md shadow-sm 
              ${errors.message || (touchedFields.message && !submitSuccess)
                ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:border-amber-500 focus:ring-amber-500"}`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">Správa je povinná</p>
          )}
        </div>

        {submitError && (
          <div className="text-red-600 text-sm">{submitError}</div>
        )}

        {submitSuccess && (
          <div className="text-green-600 text-sm">
            Ďakujeme za vašu správu. Budeme vás kontaktovať čo najskôr.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white 
            bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-amber-500 ${isSubmitting ? "opacity-75" : ""}`}
        >
          {isSubmitting ? "Odosielam..." : "Odoslať správu"}
        </button>
      </form>
      <ProductFAQ 
        items={contactFAQItems} 
        title="Často kladené otázky"
      />
    </div>
  )
}

export default ContactForm 