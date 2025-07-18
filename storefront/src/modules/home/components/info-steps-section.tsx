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
    <section className="py-16 bg-white w-full">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
            Prémiové drevo na mieru
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-6"></div>
          <p className="mx-auto max-w-2xl text-xl text-black/60 leading-relaxed font-light">
            Ponúkame kvalitné drevené profily a materiál pre stavbu, obklady aj interiér
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex relative flex-col items-center p-8 text-center bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <LocalizedClientLink
                href={step.badgeHref}
                className="flex absolute top-6 left-6 gap-1 items-center px-3 py-1 text-xs font-medium text-white bg-[#1a2e1a] rounded-full hover:bg-[#2d4a2d] transition-all duration-300 cursor-pointer"
                style={{ zIndex: 2 }}
                tabIndex={0}
              >
                <ArrowRight size={14} className="mr-1" />
                {step.badge}
              </LocalizedClientLink>
              
              <div className="flex justify-center items-center mt-2 mb-6 w-24 h-24 rounded-lg bg-[#1a2e1a]/5 border border-[#1a2e1a]/10">
                <step.icon size={40} strokeWidth={1.5} className="text-[#1a2e1a]" />
              </div>
              
              <h3 className="mb-4 text-xl font-medium text-black">{step.title}</h3>
              <p className="text-base text-black/60 font-light leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoStepsSection 