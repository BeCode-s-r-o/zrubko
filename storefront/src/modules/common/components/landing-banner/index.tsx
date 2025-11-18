"use client"

import React from "react"

interface LandingBannerProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundColor?: string
  textColor?: string
  className?: string
  overlay?: "dark" | "light" | "none"
}

const LandingBanner: React.FC<LandingBannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = "from-primary to-primary-dark",
  textColor = "text-white",
  className = "",
  overlay = "none"
}) => {
  const getOverlayClass = () => {
    switch (overlay) {
      case "dark":
        return "bg-black/50"
      case "light":
        return "bg-white/30"
      default:
        return ""
    }
  }

  return (
    <section className={`flex overflow-hidden relative items-center py-20 min-h-[350px] ${className}`}>
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
      )}
      
      {/* Gradient Background (if no image or as overlay) */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-br ${backgroundColor}`}></div>
      
      {/* Overlay */}
      {overlay !== "none" && (
        <div className={`absolute inset-0 z-[15] ${getOverlayClass()}`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-20 px-6 mx-auto w-full max-w-8xl">
        <div className={`text-center ${textColor}`}>
          <h1 className="mb-6 text-5xl  font-bold  lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-4xl text-xl leading-relaxed lg:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default LandingBanner

