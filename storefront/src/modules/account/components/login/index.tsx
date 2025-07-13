"use client"

import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"
import { Eye, EyeOff, User, Lock, LogIn, ArrowRight } from "lucide-react"
import { useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full relative overflow-hidden">
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
      {/* Minimalistický card: žiadne gradienty, žiadne extra tiene, menej paddingu, jednoduchý border, menšie zaoblenie */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        <div className="bg-white border border-primary/10 rounded-xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-light text-primary mb-2">Vitajte späť</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prihláste sa do svojho účtu a pokračujte v nákupe kvalitných drevených produktov.
            </p>
          </div>
          {/* Login Form */}
          <form className="space-y-4" action={formAction} data-testid="login-page">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">E-mailová adresa</label>
              <Input
                label=""
                name="email"
                type="email"
                title="Zadajte platnú e-mailovú adresu."
                autoComplete="email"
                required
                data-testid="email-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>
            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Heslo</label>
              <Input
                label=""
                name="password"
                type="password"
                autoComplete="current-password"
                required
                data-testid="password-input"
                className="w-full px-3 py-2 pr-10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
            {/* Error Message */}
            {message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <ErrorMessage error={message} data-testid="login-error-message" />
              </div>
            )}
            {/* Submit Button */}
            <SubmitButton 
              data-testid="sign-in-button" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border-0"
            >
              Prihlásiť sa
            </SubmitButton>
            {/* Forgot Password Link */}
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
                className="text-xs text-primary hover:underline transition-colors"
              >
                Zabudli ste heslo?
              </button>
            </div>
          </form>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 bg-white">alebo</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          {/* Register Link */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="text-xs text-primary hover:underline transition-colors"
              data-testid="register-button"
            >
              Zaregistrovať sa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
