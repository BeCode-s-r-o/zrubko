import { Metadata } from "next"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"

export const metadata: Metadata = {
  title: "Poradca výberu - Zrubko",
  description: "Potrebujete poradiť s výberom drevených produktov? Naši odborníci vám pomôžu nájsť najvhodnejšie riešenie.",
}

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Poradca", isActive: true }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
              Poradca výberu
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Odborné poradenstvo pre výber najvhodnejších drevených produktov
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-6">
              Odborné poradenstvo
            </h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto">
              Naši skúsení poradcovia vám pomôžu vybrať najvhodnejšie drevené riešenia 
              pre váš projekt. Kontaktujte nás pre individuálne poradenstvo.
            </p>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-light text-black mb-4">
                Technické poradenstvo
              </h3>
              <p className="text-black/60 mb-4">
                Pomôžeme vám vybrať správne materiály a riešenia pre váš projekt.
              </p>
              <ul className="text-sm text-black/60 space-y-2">
                <li>• Výber vhodných drevených materiálov</li>
                <li>• Technické špecifikácie</li>
                <li>• Montážne návody</li>
                <li>• Údržba a ochrana dreva</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-light text-black mb-4">
                Projektové poradenstvo
              </h3>
              <p className="text-black/60 mb-4">
                Komplexné riešenia pre vaše drevené projekty.
              </p>
              <ul className="text-sm text-black/60 space-y-2">
                <li>• Návrh riešení</li>
                <li>• Kalkulácie materiálov</li>
                <li>• Realizačné plány</li>
                <li>• Kontrola kvality</li>
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group"
            >
              Kontaktovať poradcu
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 