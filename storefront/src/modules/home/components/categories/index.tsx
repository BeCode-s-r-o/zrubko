import { Text } from "@medusajs/ui"
import LightButton from "@modules/layout/components/ui/LightButton"
import { ArrowUpRight, Crown } from "lucide-react"
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
    <section className="py-20 content-container relative overflow-hidden">
      {/* Luxusný background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10L70 40L40 70L10 40Z' fill='%23D4AF37' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div className="max-w-2xl">
            {/* Prémiový badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-gold/10 to-gold/20 backdrop-blur-sm rounded-full border border-gold/30">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-ebony tracking-wide">PRÉMIOVÉ KATEGÓRIE</span>
            </div>
            
            <h2 className="text-5xl font-bold bg-gradient-to-r from-ebony via-ebony-light to-mahogany bg-clip-text text-transparent mb-6 leading-tight">
              Kategórie luxusných produktov
            </h2>
            
            {/* Dekoratívna čiara */}
            <div className="w-24 h-1 bg-gradient-to-r from-gold via-mahogany to-ebony rounded-full mb-6"></div>
            
            <Text className="text-xl text-ebony-light leading-relaxed">
              Preskúmajte naše starostlivo kurátorované kolekcie prémiových drevených produktov, 
              vytvorené s láskou k detailu a rešpektom k prírode
            </Text>
          </div>
          
          {/* Desktop button s luxusným dizajnom */}
          <div className="hidden lg:block">
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-mahogany to-gold rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-white rounded-2xl px-8 py-4 border border-gold/30 shadow-lg">
                <LightButton href="/categories">
                  <span className="flex items-center gap-3">
                    <span className="font-semibold">Zobraziť všetky</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </LightButton>
              </div>
            </div>
          </div>
        </div>
        
        {/* Kategórie grid s vylepšeným rozostupom a zarovnaním */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {categories.map((category, index) => {
                         // Definovanie rôznych odznakov pre kategórie
             const getBadge = (idx: number) => {
               if (idx === 0) return { type: 'bestseller', text: 'Bestseller' }
               if (idx === 1) return { type: 'popular', text: 'Populárne' }
               if (idx === 2) return { type: 'premium', text: 'Premium' }
               if (idx === 3) return { type: 'trending', text: 'Trending' }
               return null
             }
            
            const badge = getBadge(index)
            
            return (
              <div key={category.id} className="group relative flex flex-col h-full">
                {/* Badge na miesto čísel */}
                {badge && (
                  <div className="absolute -top-2 -right-2 z-20">
                                         <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                       badge.type === 'bestseller' ? 'bg-gradient-to-r from-gold to-gold-dark' :
                       badge.type === 'popular' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                       badge.type === 'premium' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                       'bg-gradient-to-r from-green-500 to-green-600'
                     }`}>
                       <span>{badge.text}</span>
                     </div>
                  </div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-mahogany/20 to-gold/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Category card s luxusným rámom a flex grow pre zarovnanie */}
                <div className="relative bg-white rounded-2xl p-6 border border-gold/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-gold/40 flex-1 flex flex-col h-full">
                  <CategoryCard category={category} />
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Mobile/Tablet button s rovnakým luxusným štýlom */}
        <div className="flex justify-center lg:hidden">
          <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold via-mahogany to-gold rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-white rounded-2xl px-8 py-4 border border-gold/30 shadow-lg">
              <LightButton href="/categories">
                <span className="flex items-center gap-3">
                  <span className="font-semibold">Zobraziť všetky kategórie</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </LightButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 