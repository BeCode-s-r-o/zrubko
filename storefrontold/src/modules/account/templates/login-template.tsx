"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import ForgotPassword from "@modules/account/components/forgot-password"
import AccountBreadcrumbs from "@modules/common/components/breadcrumbs/account-breadcrumbs"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  const getCurrentPageName = () => {
    switch (currentView) {
      case "sign-in":
        return "Prihlásiť sa"
      case "register":
        return "Registrovať sa"
      case "forgot-password":
        return "Zabudnuté heslo"
      default:
        return "Prihlásiť sa"
    }
  }

  return (
    <div className="w-full">
      {/* Dynamic Breadcrumbs */}
      <div className="px-6">
        <AccountBreadcrumbs currentPage={getCurrentPageName()} />
      </div>
      
      {/* Content */}
      <div className="flex justify-start w-full">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : currentView === "register" ? (
          <Register setCurrentView={setCurrentView} />
        ) : (
          <ForgotPassword setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
