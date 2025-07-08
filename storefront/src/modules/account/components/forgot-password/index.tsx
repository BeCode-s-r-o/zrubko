"use client"

import { useFormState } from "react-dom"
import { useState } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { Mail, ArrowLeft, Key, CheckCircle } from "lucide-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
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

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(forgotPasswordAction, null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (formData: FormData) => {
    formAction(formData)
    // Po úspešnom odoslaní sa state zmení cez useFormState
    // Pre demo účely nastavíme submitted po chvíli
    setTimeout(() => {
      if (!message) {
        setIsSubmitted(true)
      }
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50/30 relative overflow-hidden">
        {/* Moderný background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        {/* Success Content */}
        <div className="relative z-10 w-full max-w-md mx-auto p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-dark via-accent to-amber-600 bg-clip-text text-transparent mb-4">
              E-mail odoslaný!
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Odoslali sme vám odkaz na obnovenie hesla na vašu e-mailovú adresu. 
              Skontrolujte si svoj e-mail a postupujte podľa pokynov.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Späť na prihlásenie
              </button>
            </div>
            
            {/* Tip */}
            <div className="mt-8 bg-amber-50/50 border border-amber-200/50 rounded-2xl p-4">
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Ak e-mail nevidíte, skontrolujte si aj spam priečinok.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50/30 relative overflow-hidden">
      {/* Moderný background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        {/* Modern Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
          
          {/* Back Button */}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Späť na prihlásenie</span>
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-accent to-accent-dark p-4 rounded-2xl shadow-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-dark via-accent to-amber-600 bg-clip-text text-transparent mb-3">
              Zabudli ste heslo?
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Zadajte svoju e-mailovú adresu a pošleme vám odkaz na obnovenie hesla.
            </p>
          </div>

          {/* Forgot Password Form */}
          <form className="space-y-6" action={handleSubmit} data-testid="forgot-password-form">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                E-mailová adresa
              </label>
              <div className="relative">
                <Input
                  label=""
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  data-testid="forgot-password-email-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
                />
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <ErrorMessage error={message} data-testid="forgot-password-error-message" />
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton 
              data-testid="forgot-password-button" 
              className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 flex items-center justify-center gap-2"
            >
              Odoslať odkaz na obnovenie
              <Mail className="w-5 h-5" />
            </SubmitButton>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white/80">alebo</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Ešte nemáte účet?
            </p>
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="w-full bg-white/90 border-2 border-accent text-accent hover:bg-accent/5 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              data-testid="register-from-forgot-password-button"
            >
              Zaregistrovať sa
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-xs text-gray-600 font-medium">Vaše údaje sú v bezpečí</p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 