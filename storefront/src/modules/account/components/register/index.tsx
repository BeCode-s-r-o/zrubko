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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-accent to-accent-dark p-4 rounded-2xl shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-dark via-accent to-amber-600 bg-clip-text text-transparent mb-3">
              Vytvorte si účet
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Zaregistrujte sa a získajte prístup k najkvalitnejším dreveným produktom s výhodnými cenami.
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-6" action={formAction} data-testid="register-page">
            
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Meno
                </label>
                <Input
                  label=""
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Priezvisko
                </label>
                <Input
                  label=""
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                E-mailová adresa
              </label>
              <Input
                label=""
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                Telefónne číslo
              </label>
              <Input
                label=""
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Heslo
              </label>
              <div className="relative">
                <Input
                  label=""
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  data-testid="password-input"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <ErrorMessage error={message} data-testid="register-error" />
              </div>
            )}

            {/* Terms Agreement */}
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vytvorením účtu súhlasíte s našimi{" "}
                  <LocalizedClientLink
                    href="/content/privacy-policy"
                    className="text-accent hover:text-accent-dark font-medium underline decoration-accent/30 hover:decoration-accent"
                  >
                    Podmienkami ochrany súkromia
                  </LocalizedClientLink>{" "}
                  a{" "}
                  <LocalizedClientLink
                    href="/content/terms-of-use"
                    className="text-accent hover:text-accent-dark font-medium underline decoration-accent/30 hover:decoration-accent"
                  >
                    Obchodnými podmienkami
                  </LocalizedClientLink>
                  .
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <SubmitButton 
              className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 flex items-center justify-center gap-2" 
              data-testid="register-button"
            >
              Zaregistrovať sa
              <ArrowRight className="w-5 h-5" />
            </SubmitButton>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Už máte účet?{" "}
                <button
                  onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                  className="text-accent hover:text-accent-dark font-medium underline decoration-accent/30 hover:decoration-accent transition-colors"
                >
                  Prihláste sa
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">💎</div>
            <p className="text-xs text-gray-600 font-medium">Exkluzívne zľavy</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">📦</div>
            <p className="text-xs text-gray-600 font-medium">Sledovanie objednávok</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs text-gray-600 font-medium">Osobné odporúčania</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
