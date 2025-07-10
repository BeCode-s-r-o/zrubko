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
      <div className="relative flex flex-col border border-gold/20 rounded-2xl p-6 bg-white w-[260px] h-[380px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gold/50 group">
        {/* Discount badge */}
        {cheapestPrice && hasDiscount && (
          <span className="absolute right-4 top-4 bg-gradient-to-r from-gold to-gold-dark text-xs text-white px-3 py-1 rounded-full font-bold shadow-md z-10">
            -{cheapestPrice.percentage_diff}%
          </span>
        )}
        
        {/* Product image container - fixed height */}
        <div className="relative overflow-hidden rounded-xl mb-4 bg-champagne/30 h-36 flex-shrink-0">
          <img
            src={product.thumbnail || "/placeholder.png"}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            draggable={false}
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gold bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 rounded-xl" />
        </div>
        
        {/* Content section - flexible height */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Price section - fixed height */}
            <div className="flex gap-2 items-center mb-3 h-8">
              {cheapestPrice && hasDiscount && (
                <span className="text-sm text-gray-500 line-through">{cheapestPrice.original_price}</span>
              )}
              {cheapestPrice && (
                <span className="text-2xl text-gold font-bold">{cheapestPrice.calculated_price}</span>
              )}
            </div>
            
            {/* Product title - fixed height with line clamping */}
            <h3 className="text-base font-semibold text-ebony group-hover:text-gold transition-colors duration-200 h-12 flex items-start">
              <span className="line-clamp-2">{product.title}</span>
            </h3>
          </div>
          
          {/* Hover indicator - at bottom */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm text-gold font-medium">Zobraziť detail →</span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  const { response: { products } } = await getProductsList({ countryCode, queryParams: { limit: 4 } })

  return (
    <section className="relative py-16 bg-cream overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="1.5" fill="#254D32" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col gap-12 items-start content-container md:flex-row">
          {/* Left side: title, description, button */}
          <div className="flex-1 max-w-lg md:sticky md:top-24">
            <div className="mb-6">
              <h2 className="mb-4 text-5xl font-bold bg-gradient-to-r from-ebony to-gold bg-clip-text text-transparent leading-tight">
                Najpredávanejšie<br />produkty
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-mahogany rounded-full mb-6"></div>
            </div>
            
            <p className="mb-8 text-lg text-gray-700 leading-relaxed">
              Objavte to, čo si zákazníci zamilovali najviac. Viac než 
              <span className="bg-gold/20 text-ebony px-3 py-1 rounded-full font-semibold mx-2 border border-gold/40">
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