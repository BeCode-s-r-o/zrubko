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
    <section className="py-16 bg-white">
      <div className="mb-12 text-center content-container">
        <h2 className="mb-4 text-4xl">Prémiové drevo na mieru.</h2>
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
    </section>
  )
}

export default InfoStepsSection 