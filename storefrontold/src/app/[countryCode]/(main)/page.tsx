import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/kategorie_sekcia"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import InfoStepsSection from "@modules/home/components/info-steps-section"
import FavoriteProductsSection from "@modules/home/components/favorite-products-section"
import ScrollingBar from "@modules/home/components/ScrollingBar"
import HomepageAccordion from "@modules/home/components/HomepageAccordion"
import WoodConfiguratorSection from "@modules/home/components/wood-configurator-section"
import InspirationSection from "@modules/home/components/inspiration-section"
import BlogSection from "@modules/home/components/blog-section"

export const metadata: Metadata = {
  title: "Zrubko.sk - Luxusné drevené riešenia pre váš domov",
  description:
    "Objavte našu kolekciu prémiových drevených produktov. Kvalitné drevo na mieru, remeselná dokonalosť a nezabudnuteľný dizajn pre váš domov a záhradu.",
}

// Mapovanie locale na skutočné country codes v backende
const getBackendCountryCode = (locale: string): string => {
  const localeToBackendMap: Record<string, string> = {
    'sk': 'sk',
    'cz': 'sk', // CZ používa SK regióny
    'at': 'sk', // AT používa SK regióny  
    'de': 'sk', // DE používa SK regióny
    'gb': 'gb'  // GB má vlastné regióny ak existujú
  }
  return localeToBackendMap[locale] || 'sk'
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const backendCountryCode = getBackendCountryCode(countryCode)
  const region = await getRegion(backendCountryCode)
  const categories = await listCategories()

  if (!region) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Scrolling Bar */}
      <ScrollingBar />

            {/* Kategórie produktov */}
      <div className="w-full">
        <div className="px-6 mx-auto max-w-8xl">
          <Categories categories={categories} />
        </div>
      </div>

      {/* Wood Configurator */}
      <WoodConfiguratorSection />

      {/* Favorite Products */}
      <FavoriteProductsSection countryCode={countryCode} region={region} />

      {/* Info Steps */}
      <InfoStepsSection />

      {/* Inšpirácia pre váš projekt */}
      <InspirationSection />

      {/* Blog a inšpirácie */}
      <BlogSection />

      {/* FAQ */}
      <div className="py-16 bg-white">
        <HomepageAccordion />
      </div>
    </div>
  )
}
