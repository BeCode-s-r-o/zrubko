import { Text } from "@medusajs/ui"
import CategoryCard from "@modules/home/components/kategorie_sekcia/category-card"

export default function CategoriesPage({
  categories,
}: {
  categories: any[]
}) {
  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 py-16">
        <div className="flex justify-center items-center mb-6 w-24 h-24 bg-gray-100 rounded-full">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Žiadne kategórie nenájdené
        </h3>
        <p className="max-w-md text-center text-gray-600">
          Momentálne nemáme žiadne kategórie produktov.
        </p>
      </div>
    )
  }

  return (
    <section className="py-12 w-full">
      <div className="px-4 mx-auto max-w-8xl">
        <div className="flex flex-col gap-6 justify-between items-start mb-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-light leading-tight text-black lg:text-4xl">
              Všetky kategórie produktov
            </h1>
            
            <div className="mb-4 w-20 h-px bg-black"></div>
            
            <Text className="text-lg font-light leading-relaxed text-black/60">
              Preskúmajte naše starostlivo kurátorované kolekcie prémiových drevených produktov
            </Text>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <div key={category.id} className="flex relative flex-col group">
              <div className="flex flex-col h-32 bg-white rounded-lg border shadow-sm transition-all duration-300 border-black/10 hover:border-[#1a2e1a] hover:shadow-lg hover:scale-105 sm:h-36">
                <CategoryCard category={category} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 