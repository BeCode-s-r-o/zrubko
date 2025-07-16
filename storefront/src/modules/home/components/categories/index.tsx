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
    <section className="py-16 w-full">
      <div className="px-6 mx-auto max-w-8xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
            Kategórie produktov
          </h2>
          
          <div className="w-24 h-px bg-black mb-6"></div>
          
          <Text className="text-xl text-black/60 leading-relaxed font-light">
            Preskúmajte naše starostlivo kurátorované kolekcie prémiových drevených produktov
          </Text>
        </div>
        
        <div className="hidden lg:block">
          <LightButton href="/categories">
            <span className="flex items-center gap-3">
              <span className="font-medium">Zobraziť všetky</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </LightButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
        {categories.slice(0, 8).map((category) => (
          <div key={category.id} className="group relative flex flex-col h-full">
            <div className="bg-white rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex flex-col h-full">
              <CategoryCard category={category} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center lg:hidden">
        <LightButton href="/categories">
          <span className="flex items-center gap-3">
            <span className="font-medium">Zobraziť všetky kategórie</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </LightButton>
      </div>
      </div>
    </section>
  )
} 