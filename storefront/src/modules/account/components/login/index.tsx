"use client"

import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"
import { Eye, EyeOff, User, Lock, LogIn, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
  standalone?: boolean
  countryCode?: string
}

const Login = ({ setCurrentView, standalone = false, countryCode }: Props) => {
  const [message, formAction] = useFormState(login, null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const tAuth = useTranslations("auth")
  const tForm = useTranslations("forms")
  const tCommon = useTranslations("common")

  // Handle successful login redirect
  useEffect(() => {
    if (message && typeof message === 'object' && message.success) {
      // Login was successful, redirect to account page
      if (standalone && countryCode) {
        router.push(`/${countryCode}/ucet`)
      }
    }
  }, [message, router, standalone, countryCode])

  return (
    <div className={`w-full ${standalone ? ' bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8' : 'overflow-hidden'}`}>
      {/* Moderný background pattern - only for modal */}
      {!standalone && (
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${standalone ? 'w-full max-w-md' : 'w-full max-w-md mx-auto p-4'}`}>
        <div className="bg-white border border-primary/10 rounded-xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-light text-primary mb-2">
              {tAuth.has("loginTitle") ? tAuth("loginTitle") : "Vitajte späť"}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tAuth.has("loginDescription") ? tAuth("loginDescription") : "Prihláste sa do svojho účtu a pokračujte v nákupe kvalitných drevených produktov."}
            </p>
          </div>
          {/* Login Form */}
          <form className="space-y-4" action={formAction} data-testid="login-page">
            {/* Email Field */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">E-mail</h3>
              <Input
                label=""
                name="email"
                type="email"
                autoComplete="email"
                required
                data-testid="email-input"
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white"
              />
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Heslo</h3>
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
            {message && typeof message === 'string' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <ErrorMessage error={message} data-testid="login-error-message" />
              </div>
            )}
            {/* Submit Button */}
            <SubmitButton
              data-testid="sign-in-button"
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border-0"
            >
              {tAuth.has("signIn") ? tAuth("signIn") : "Prihlásiť sa"}
            </SubmitButton>
            {/* Forgot Password Link */}
            <div className="text-center mt-2">
              {standalone ? (
                <Link
                  href={`/${countryCode}/zabudnute-heslo`}
                  className="text-xs text-primary hover:underline transition-colors"
                >
                  {tAuth.has("forgotPassword") ? tAuth("forgotPassword") : "Zabudli ste heslo?"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
                  className="text-xs text-primary hover:underline transition-colors"
                >
                  {tAuth.has("forgotPassword") ? tAuth("forgotPassword") : "Zabudli ste heslo?"}
                </button>
              )}
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
            {standalone ? (
              <Link
                href={`/${countryCode}/registrovat-sa`}
                className="text-xs text-primary hover:underline transition-colors"
                data-testid="register-button"
              >
                {tAuth.has("register") ? tAuth("register") : "Zaregistrovať sa"}
              </Link>
            ) : (
              <button
                onClick={() => setCurrentView && setCurrentView(LOGIN_VIEW.REGISTER)}
                className="text-xs text-primary hover:underline transition-colors"
                data-testid="register-button"
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

export default Login
