import { Metadata } from "next"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"

export const metadata: Metadata = {
  title: "Najpredávanejšie produkty - Zrubko",
  description: "Objavte naše najpopulárnejšie drevené produkty, ktoré si zákazníci najviac vyberajú.",
}

export default function BestSellingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Najpredávanejšie", isActive: true }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
              Najpredávanejšie produkty
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Objavte produkty, ktoré si zákazníci najviac vyberajú
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-6">
              Najpopulárnejšie drevené riešenia
            </h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto">
              Tieto produkty sú najviac vyhľadávané našimi zákazníkmi. 
              Prezrite si naše najpredávanejšie drevené materiály a riešenia.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-12 mb-8">
              <h3 className="text-2xl font-light text-black mb-4">
                Najpredávanejšie produkty
              </h3>
              <p className="text-black/60 mb-6">
                Prezrite si naše najpopulárnejšie produkty v kategóriách
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <a 
                  href="/categories"
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-medium text-black">Tatranský profil</h4>
                  <p className="text-sm text-black/60">Klasický profil na steny a stropy</p>
                </a>
                <a 
                  href="/categories"
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-medium text-black">Fasádne dosky</h4>
                  <p className="text-sm text-black/60">Obklady vonkajších stien</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 