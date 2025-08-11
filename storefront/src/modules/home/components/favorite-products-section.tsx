import { ShoppingBag } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import PrimaryButton from "@modules/layout/components/ui/PrimaryButton"
import WoodProductCard from "@modules/products/components/wood-product-card"
import ProductCarousel from "./product-carousel"

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  // Fetch all products for now, we can filter by category later
  const { response: { products } } = await getProductsList({ 
    countryCode, 
    queryParams: { 
      limit: 8
    }
  })

  return (
    <section className="py-8 md:py-12 lg:py-20 w-full bg-gradient-to-br from-[#1a2e1a]/5 to-[#1a2e1a]/10">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left side: title, description, button */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="mb-6 text-4xl font-light leading-tight text-[#1a2e1a] lg:text-4xl">
                Najpredávanejšie produkty
              </h2>
              <div className="mb-6 w-24 h-px bg-[#1a2e1a]"></div>
            </div>
            
            <p className="mb-8 text-lg font-light leading-relaxed text-[#1a2e1a]/70">
              Objavte to, čo si zákazníci zamilovali najviac. Viac než 
              <span className="bg-[#1a2e1a]/10 text-[#1a2e1a] px-3 py-1 rounded-full font-medium mx-2 border border-[#1a2e1a]/20">
                3 500
              </span> 
              predaných kusov len za posledný rok.
            </p>
            
            <LocalizedClientLink href="/boutique">
              <PrimaryButton icon={<ShoppingBag size={20} />}>
                Zobraziť všetky
              </PrimaryButton>
            </LocalizedClientLink>
          </div>
          
          {/* Right side: product carousel */}
          <div className="overflow-hidden lg:col-span-2">
            {products && products.length > 0 ? (
              <ProductCarousel products={products} region={region} />
            ) : (
              <div className="flex items-center justify-center h-64 text-[#1a2e1a]/60">
                <p className="text-lg">Momentálne nie sú dostupné žiadne produkty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FavoriteProductsSection 