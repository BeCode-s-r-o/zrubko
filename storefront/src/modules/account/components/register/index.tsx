"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { Eye, EyeOff, User, Mail, Phone, Lock, Star, ArrowRight, Shield } from "lucide-react"
import { useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md p-2">
        <div className="bg-white border border-primary/10 rounded-xl p-6">
          <h1 className="text-2xl font-light text-primary mb-2 text-center">Vytvorte si účet</h1>
          <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
            Zaregistrujte sa a získajte prístup k naším exkluzívnym ponukám.
          </p>
          <form className="space-y-4" action={formAction} data-testid="register-page">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Meno</label>
                <Input
                  label=""
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Priezvisko</label>
                <Input
                  label=""
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">E-mailová adresa</label>
              <Input
                label=""
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Telefónne číslo</label>
              <Input
                label=""
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Heslo</label>
              <Input
                label=""
                name="password"
                required
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
                className="w-full px-3 py-2 pr-10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white placeholder-gray-400"
              />
            </div>
            {message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <ErrorMessage error={message} data-testid="register-error" />
              </div>
            )}
            <SubmitButton 
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border-0" 
              data-testid="register-button"
            >
              Zaregistrovať sa
            </SubmitButton>
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Už máte účet?{' '}
                <button
                  onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                  className="text-primary hover:underline transition-colors"
                >
                  Prihlásiť sa
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
