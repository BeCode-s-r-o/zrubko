import { ShoppingBag } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductsList } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import PrimaryButton from "@modules/layout/components/ui/PrimaryButton"

function FavoriteProductCard({ product, region }: { product: HttpTypes.StoreProduct, region: HttpTypes.StoreRegion }) {
  const { cheapestPrice } = getProductPrice({ product })
  const hasDiscount = cheapestPrice && cheapestPrice.percentage_diff && Number(cheapestPrice.percentage_diff) > 0

  return (
    <LocalizedClientLink href={`/products/${product.handle}`}>
      <div className="relative flex flex-col border border-black/10 rounded-lg p-6 bg-white w-[260px] h-[380px] shadow-sm hover:shadow-md transition-all duration-300 group">
        {/* Discount badge */}
        {cheapestPrice && hasDiscount && (
          <span className="absolute right-4 top-4 bg-[#1a2e1a] text-xs text-white px-3 py-1 rounded-full font-medium shadow-sm z-10">
            -{cheapestPrice.percentage_diff}%
          </span>
        )}
        
        {/* Product image container - fixed height */}
        <div className="relative overflow-hidden rounded-lg mb-4 bg-slate-50 h-36 flex-shrink-0">
          <img
            src={product.thumbnail || "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </div>
        
        {/* Content section - flexible height */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Price section - fixed height */}
            <div className="flex gap-2 items-center mb-3 h-8">
              {cheapestPrice && hasDiscount && (
                <span className="text-sm text-black/40 line-through">{cheapestPrice.original_price}</span>
              )}
              {cheapestPrice && (
                <span className="text-2xl text-[#1a2e1a] font-medium">{cheapestPrice.calculated_price}</span>
              )}
            </div>
            
            {/* Product title - fixed height with line clamping */}
            <h3 className="text-base font-medium text-black group-hover:text-[#1a2e1a] transition-colors duration-200 h-12 flex items-start">
              <span className="line-clamp-2">{product.title}</span>
            </h3>
          </div>
          
          {/* Hover indicator - at bottom */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm text-[#1a2e1a] font-medium">Zobraziť detail →</span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  const { response: { products } } = await getProductsList({ countryCode, queryParams: { limit: 4 } })

  return (
    <section className="py-16 bg-white">
      <div className="content-container">
        <div className="flex flex-col gap-12 items-start md:flex-row">
          {/* Left side: title, description, button */}
          <div className="flex-1 max-w-lg md:sticky md:top-24">
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                Najpredávanejšie<br />produkty
              </h2>
              <div className="w-24 h-px bg-black mb-6"></div>
            </div>
            
            <p className="mb-8 text-lg text-black/60 leading-relaxed font-light">
              Objavte to, čo si zákazníci zamilovali najviac. Viac než 
              <span className="bg-[#1a2e1a]/5 text-black px-3 py-1 rounded-full font-medium mx-2 border border-[#1a2e1a]/10">
                3 500
              </span> 
              predaných kusov len za posledný rok.
            </p>
            
            <LocalizedClientLink href="/boutique">
              <PrimaryButton icon={<ShoppingBag size={20} />}>
                Nakupovať
              </PrimaryButton>
            </LocalizedClientLink>
          </div>
          
          {/* Right side: product cards */}
          <div className="overflow-x-auto flex-1 w-full">
            <div className="flex gap-6 min-w-[700px] md:min-w-0 pb-4">
              {products.map((product) => (
                <FavoriteProductCard key={product.id} product={product} region={region} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FavoriteProductsSection 