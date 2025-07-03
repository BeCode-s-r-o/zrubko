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

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
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
    <>
      
      <Hero />
      <Categories categories={categories} />
      <InfoStepsSection />
      <FavoriteProductsSection countryCode={countryCode} region={region} />
      <div className="">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <ScrollingBar />
    </>
  )
}
