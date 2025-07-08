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
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-dark via-accent to-amber-600 bg-clip-text text-transparent mb-3">
              Vitajte späť
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prihláste sa do svojho účtu a pokračujte v nákupe kvalitných drevených produktov.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" action={formAction} data-testid="login-page">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                E-mailová adresa
              </label>
              <div className="relative">
                <Input
                  label=""
                  name="email"
                  type="email"
                  title="Zadajte platnú e-mailovú adresu."
                  autoComplete="email"
                  required
                  data-testid="email-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 bg-white/90 placeholder-gray-400"
                />
              </div>
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
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
                <ErrorMessage error={message} data-testid="login-error-message" />
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton 
              data-testid="sign-in-button" 
              className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 flex items-center justify-center gap-2"
            >
              Prihlásiť sa
              <ArrowRight className="w-5 h-5" />
            </SubmitButton>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
                className="text-sm text-gray-600 hover:text-accent transition-colors underline decoration-accent/30 hover:decoration-accent"
              >
                Zabudli ste heslo?
              </button>
            </div>
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
              data-testid="register-button"
            >
              Zaregistrovať sa
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">🌲</div>
            <p className="text-xs text-gray-600 font-medium">Prírodné materiály</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">🚚</div>
            <p className="text-xs text-gray-600 font-medium">Rýchla doprava</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-xs text-gray-600 font-medium">Prémiová kvalita</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
