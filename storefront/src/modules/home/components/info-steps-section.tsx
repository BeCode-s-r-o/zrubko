import { Box, Calculator, Truck, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const steps = [
  {
    icon: Box,
    title: "Vyberiete si produkt",
    description: "Široký sortiment kvalitného dreva na mieru. Vyberiete si typ, rozmery aj množstvo.",
    badge: "Výber produktu",
    badgeHref: "/vyber",
  },
  {
    icon: Calculator,
    title: "Vypočítame cenu a dopravu",
    description: "Hneď po výbere vypočítame presnú cenu aj dopravu podľa lokality a objemu.",
    badge: "Cenová kalkulácia",
    badgeHref: "/kalkulacia",
  },
  {
    icon: Truck,
    title: "Dodáme až k vám domov",
    description: "Doručujeme po celom Slovensku – bezpečne, rýchlo a až k vašim dverám.",
    badge: "Doručenie",
    badgeHref: "/dorucenie",
  },
]

const InfoStepsSection = () => {
  return (
    <section className="relative py-16 bg-gray-25 overflow-hidden">
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
              <g transform="translate(220, 200)">
                <ellipse cx="0" cy="0" rx="70" ry="68" stroke="#A0522D" strokeWidth="1.3" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="1" rx="55" ry="53" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.25"/>
                <ellipse cx="-1" cy="0" rx="40" ry="39" stroke="#CD853F" strokeWidth="0.9" fill="none" opacity="0.2"/>
                <ellipse cx="0" cy="-1" rx="28" ry="27" stroke="#A0522D" strokeWidth="0.7" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="0" rx="18" ry="17" stroke="#8B4513" strokeWidth="0.5" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="10" ry="9" stroke="#6B3410" strokeWidth="0.3" fill="none" opacity="0.2"/>
                <circle cx="0" cy="0" r="3" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Third tree cross-section - center */}
              <g transform="translate(150, 120)">
                <ellipse cx="0" cy="0" rx="45" ry="43" stroke="#CD853F" strokeWidth="1" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="-1" rx="32" ry="31" stroke="#A0522D" strokeWidth="0.8" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="22" ry="21" stroke="#8B4513" strokeWidth="0.6" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="0" rx="14" ry="13" stroke="#CD853F" strokeWidth="0.4" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="0" rx="8" ry="7" stroke="#A0522D" strokeWidth="0.3" fill="none" opacity="0.25"/>
                <circle cx="0" cy="0" r="2" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Small tree ring - top right */}
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
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-12 text-center content-container">
          <h2 className="mb-4 text-4xl font-bold">Prémiové drevo na mieru.</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Ponúkame kvalitné drevené profily a materiál pre stavbu, obklady aj interiér.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 content-container md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex relative flex-col items-center p-6 text-center bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              {/* Animated clickable badge in top-left */}
              <LocalizedClientLink
                href={step.badgeHref}
                className="flex absolute top-6 left-6 gap-1 items-center px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full border border-amber-100 shadow-sm transition-transform duration-200 cursor-pointer animate-fadein-slide badge-animate hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95"
                style={{ zIndex: 2 }}
                tabIndex={0}
              >
                <ArrowRight size={14} className="mr-1" />
                {step.badge}
              </LocalizedClientLink>
              <div className="flex justify-center items-center mt-2 mb-6 w-24 h-24 rounded-2xl border border-gray-200">
                <step.icon size={64} strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-base text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoStepsSection 