"use client"

import { Flame, Shield, Sparkles } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

interface ShouSugiBanInfoProps {
  category: HttpTypes.StoreProductCategory
}

export default function ShouSugiBanInfo({ category }: ShouSugiBanInfoProps) {
  return (
    <section id="shou-sugi-ban-info" className="py-16 lg:py-24 bg-gradient-to-br from-stone-50/80 via-amber-25/60 to-orange-50/40 relative overflow-hidden">
      {/* Wood rings pattern background */}
      <div className="absolute inset-0" style={{ opacity: 0.5 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wood-rings" patternUnits="userSpaceOnUse" width="300" height="300">
              {/* First tree cross-section - top left */}
              <g transform="translate(50, 50)">
                {/* Outer rings */}
                <ellipse cx="0" cy="0" rx="80" ry="75" stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.2"/>
                <ellipse cx="2" cy="-1" rx="65" ry="62" stroke="#A0522D" strokeWidth="1.2" fill="none" opacity="0.25"/>
                <ellipse cx="1" cy="1" rx="50" ry="48" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="0" rx="35" ry="34" stroke="#CD853F" strokeWidth="0.8" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="-1" rx="22" ry="21" stroke="#A0522D" strokeWidth="0.6" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="12" ry="11" stroke="#8B4513" strokeWidth="0.4" fill="none" opacity="0.2"/>
                {/* Inner core */}
                <circle cx="0" cy="0" r="4" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Second tree cross-section - bottom right */}
              <g transform="translate(220, 180)">
                <ellipse cx="0" cy="0" rx="60" ry="55" stroke="#A0522D" strokeWidth="1.2" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="1" rx="45" ry="42" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.25"/>
                <ellipse cx="1" cy="0" rx="32" ry="30" stroke="#CD853F" strokeWidth="0.8" fill="none" opacity="0.2"/>
                <ellipse cx="0" cy="-1" rx="20" ry="19" stroke="#A0522D" strokeWidth="0.6" fill="none" opacity="0.3"/>
                <ellipse cx="-1" cy="1" rx="12" ry="11" stroke="#8B4513" strokeWidth="0.4" fill="none" opacity="0.25"/>
                <circle cx="0" cy="0" r="5" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Third tree cross-section - top right */}
              <g transform="translate(250, 70)">
                <ellipse cx="0" cy="0" rx="25" ry="24" stroke="#A0522D" strokeWidth="0.8" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="0" rx="18" ry="17" stroke="#8B4513" strokeWidth="0.6" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="-1" rx="12" ry="11" stroke="#CD853F" strokeWidth="0.4" fill="none" opacity="0.2"/>
                <circle cx="0" cy="0" r="6" fill="#6B3410" opacity="0.1"/>
              </g>
              
              {/* Small tree ring - bottom left */}
              <g transform="translate(80, 230)">
                <ellipse cx="0" cy="0" rx="30" ry="28" stroke="#8B4513" strokeWidth="0.9" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="1" rx="21" ry="20" stroke="#A0522D" strokeWidth="0.7" fill="none" opacity="0.25"/>
                <ellipse cx="1" cy="0" rx="14" ry="13" stroke="#CD853F" strokeWidth="0.5" fill="none" opacity="0.2"/>
                <ellipse cx="0" cy="-1" rx="8" ry="7" stroke="#A0522D" strokeWidth="0.3" fill="none" opacity="0.3"/>
                <circle cx="0" cy="0" r="3" fill="#6B3410" opacity="0.15"/>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wood-rings)"/>
        </svg>
      </div>

      <div className="content-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Karty s výhodami */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tradičná technika</h3>
              <p className="text-gray-600 leading-relaxed">
                Japonská technika SHOU SUGI BAN sa používa už viac ako 400 rokov 
                pre svoju výnimočnú odolnosť a jedinečný vzhľad.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prírodná ochrana</h3>
              <p className="text-gray-600 leading-relaxed">
                Opálenie dreva vytvára prirodzenú ochranu proti hmyzu, pleseň a vlhkosti 
                bez potreby chemických prípravkov.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jedinečný vzhľad</h3>
              <p className="text-gray-600 leading-relaxed">
                Každý kus má unikátny vzor prasklín a textúru, ktoré vytvárajú 
                nezameniteľný a elegantný vzhľad vášho projektu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 