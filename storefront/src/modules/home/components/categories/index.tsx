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
    <section className="py-12 w-full">
      <div className="px-4 mx-auto max-w-8xl">
      <div className="flex flex-col gap-6 justify-between items-start mb-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-3xl font-light leading-tight text-black lg:text-4xl">
            Kategórie produktov
          </h2>
          
          <div className="mb-4 w-20 h-px bg-black"></div>
          
          <Text className="text-lg font-light leading-relaxed text-black/60">
            Preskúmajte naše starostlivo kurátorované kolekcie prémiových drevených produktov
          </Text>
        </div>
        
        <div className="hidden lg:block">
          <LightButton href="/categories">
            <span className="flex gap-3 items-center">
              <span className="font-medium">Zobraziť všetky</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </LightButton>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.slice(0, 10).map((category) => (
          <div key={category.id} className="flex relative flex-col group">
            <div className="flex flex-col h-32 bg-white rounded-lg border shadow-sm transition-all duration-300 border-black/10 hover:border-[#1a2e1a] hover:shadow-lg hover:scale-105 sm:h-36">
              <CategoryCard category={category} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center lg:hidden">
        <LightButton href="/categories">
          <span className="flex gap-3 items-center">
            <span className="font-medium">Zobraziť všetky kategórie</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </LightButton>
      </div>
      </div>
    </section>
  )
} 