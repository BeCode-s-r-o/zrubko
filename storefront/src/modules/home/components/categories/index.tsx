import { Text } from "@medusajs/ui"
import LightButton from "@modules/layout/components/ui/LightButton"
import { ArrowUpRight } from "lucide-react"
import CategoryCard from "./category-card"

export default function Categories({
  categories,
}: {
  categories: any[]
}) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="py-6 content-container small:py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="mb-2 text-3xl-semi">Kategórie produktov</h2>
          <Text className="text-gray-600 text-description">
            Preskúmajte naše široké spektrum drevených produktov
          </Text>
        </div>
        
        {/* Button - ONLY visible on desktop (lg and above) */}
        <div className="hidden lg:block group">
          <LightButton href="/categories">
            Zobraziť všetky
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </LightButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {/* Mobile/Tablet button - visible below desktop (lg) */}
      <div className="flex justify-center mt-8 lg:hidden group">
        <LightButton href="/categories">
          Zobraziť všetky
          <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </LightButton>
      </div>
    </section>
  )
} 