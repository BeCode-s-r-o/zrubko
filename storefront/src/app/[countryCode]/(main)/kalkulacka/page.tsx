import { Metadata } from "next"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"

export const metadata: Metadata = {
  title: "Kalkulačka dreva - Zrubko",
  description: "Vypočítajte si potrebné množstvo dreva pre váš projekt pomocou našej kalkulačky.",
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Kalkulačka", isActive: true }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
              Kalkulačka dreva
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Vypočítajte si presné množstvo dreva potrebné pre váš projekt
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-6">
              Kalkulačka bude čoskoro dostupná
            </h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto">
              Pracujeme na vývoji pokročilej kalkulačky, ktorá vám pomôže presne vypočítať 
              potrebné množstvo dreva pre váš projekt. Zatiaľ nás kontaktujte pre individuálny prepočet.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <a 
              href="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group"
            >
              Kontaktovať pre prepočet
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