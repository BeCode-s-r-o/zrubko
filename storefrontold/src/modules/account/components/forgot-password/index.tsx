"use client"

import { useFormState } from "react-dom"
import { useState } from "react"
import Link from "next/link"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { Mail, ArrowLeft, Key, CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
  standalone?: boolean
  countryCode?: string
}

// Simulácia forgot password action - v reálnej aplikácii by to bola backend funkcia
const forgotPasswordAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string
  
  // Simulácia API volania
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (!email || !email.includes("@")) {
    return "Prosím, zadajte platnú e-mailovú adresu."
  }
  
  return null // null znamená úspech
}

const ForgotPassword = ({ setCurrentView, standalone = false, countryCode }: Props) => {
  const tAuth = useTranslations("auth")
  const tForm = useTranslations("forms")
  const tCommon = useTranslations("common")
  const [message, formAction] = useFormState(forgotPasswordAction, null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (formData: FormData) => {
    formAction(formData)
    setTimeout(() => {
      if (!message) {
        setIsSubmitted(true)
      }
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md p-2">
          <div className="bg-white border border-primary/10 rounded-xl p-6">
            <h1 className="text-2xl font-light text-primary mb-2 text-center">E-mail odoslaný</h1>
            <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
              Odoslali sme vám odkaz na obnovenie hesla na vašu e-mailovú adresu. Skontrolujte si svoj e-mail a postupujte podľa pokynov.
            </p>
            <button
              onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="w-full text-primary border border-primary/20 rounded-lg py-2 px-4 text-sm hover:bg-primary/5 transition-colors"
            >
              Späť na prihlásenie
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${standalone ? 'max-w-md' : 'flex justify-center'}`}>
      <div className={`${standalone ? 'w-full' : 'w-full max-w-md p-2'}`}>
        <div className="bg-white border border-primary/10 rounded-xl p-6">
          <h1 className="text-2xl font-light text-primary mb-2 text-center">
            {tAuth.has("forgotPasswordTitle") ? tAuth("forgotPasswordTitle") : "Zabudli ste heslo?"}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
            {tAuth.has("forgotPasswordDescription") ? tAuth("forgotPasswordDescription") : "Zadajte svoju e-mailovú adresu a pošleme vám odkaz na obnovenie hesla."}
          </p>
          <form className="space-y-4" action={handleSubmit} data-testid="forgot-password-form">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">E-mail</h3>
              <Input
                label=""
                name="email"
                type="email"
                autoComplete="email"
                required
                data-testid="forgot-password-email-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
            {message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <ErrorMessage error={message} data-testid="forgot-password-error-message" />
              </div>
            )}
            <SubmitButton
              data-testid="forgot-password-button"
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border-0"
            >
              {tAuth.has("sendPasswordReset") ? tAuth("sendPasswordReset") : "Odoslať odkaz na obnovenie"}
            </SubmitButton>
            <div className="text-center mt-2">
              {standalone ? (
                <Link
                  href={`/${countryCode}/prihlasit-sa`}
                  className="text-xs text-primary hover:underline transition-colors"
                >
                  {tAuth.has("backToLogin") ? tAuth("backToLogin") : "Späť na prihlásenie"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.SIGN_IN)}
                  className="text-xs text-primary hover:underline transition-colors"
                >
                  {tAuth.has("backToLogin") ? tAuth("backToLogin") : "Späť na prihlásenie"}
                </button>
              )}
            </div>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 bg-white">alebo</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <div className="text-center">
            {standalone ? (
              <Link
                href="/registrovat-sa"
                className="text-xs text-primary hover:underline transition-colors"
                data-testid="register-from-forgot-password-button"
              >
                {tAuth.has("register") ? tAuth("register") : "Zaregistrovať sa"}
              </Link>
            ) : (
              <button
                onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.REGISTER)}
                className="text-xs text-primary hover:underline transition-colors"
                data-testid="register-from-forgot-password-button"
              >
                {tAuth.has("register") ? tAuth("register") : "Zaregistrovať sa"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 