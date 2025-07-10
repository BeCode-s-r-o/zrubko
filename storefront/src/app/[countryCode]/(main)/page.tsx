import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/categories"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import InfoStepsSection from "@modules/home/components/info-steps-section"
import FavoriteProductsSection from "@modules/home/components/favorite-products-section"
import ScrollingBar from "@modules/home/components/ScrollingBar"
import HomepageAccordion from "@modules/home/components/HomepageAccordion"
import WoodConfiguratorSection from "@modules/home/components/wood-configurator-section"

export const metadata: Metadata = {
  title: "Zrubko.sk - Luxusné drevené riešenia pre váš domov",
  description:
    "Objavte našu kolekciu prémiových drevených produktov. Kvalitné drevo na mieru, remeselná dokonalosť a nezabudnuteľný dizajn pre váš domov a záhradu.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const categories = await listCategories()

  if (!collections || !region) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-champagne-light via-champagne to-champagne-dark">
      {/* Hero Section s luxusným pozadím */}
      <Hero />
      
      {/* Scrolling Bar s elegantným dizajnom */}
      <ScrollingBar />
      
      {/* Categories s vylepšeným rozostupom */}
      <div className="py-20 bg-gradient-to-br from-champagne to-champagne-light">
        <Categories categories={categories} />
      </div>
      
      {/* Info Steps s luxusným pozadím */}
      <InfoStepsSection />
      
      {/* Wood Configurator s tieňmi */}
      <div className="relative">
        <WoodConfiguratorSection />
      </div>
      
      {/* Favorite Products s gradientom */}
      <div className="bg-gradient-to-r from-champagne-light via-champagne to-gold/10">
        <FavoriteProductsSection countryCode={countryCode} region={region} />
      </div>
      
      {/* Featured Collections s luxusným rámovaním */}
      <div className="py-20 bg-gradient-to-br from-ebony/5 via-champagne to-gold/10 relative overflow-hidden">
        {/* Luxusný pattern pozadie */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10L90 50L50 90L10 50Z' fill='%23D4AF37' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="content-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-ebony via-ebony-light to-gold bg-clip-text text-transparent mb-6 leading-tight">
              Naše Exkluzívne Kolekcie
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold via-mahogany to-ebony rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-ebony-light max-w-3xl mx-auto leading-relaxed">
              Objavte naše starostlivo kurátorované kolekcie prémiových drevených produktov, 
              vytvorené s láskou k detailu a rešpektom k prírode
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gold/20">
            <ul className="flex flex-col gap-x-6">
              <FeaturedProducts collections={collections} region={region} />
            </ul>
          </div>
        </div>
      </div>
      
      {/* FAQ s elegantným pozadím */}
      <div className="bg-gradient-to-b from-champagne-dark to-champagne py-20">
        <HomepageAccordion />
      </div>
    </div>
  )
}
