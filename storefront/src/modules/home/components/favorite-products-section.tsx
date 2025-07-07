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
      <div className="relative flex flex-col border border-gray-100 rounded-2xl p-6 bg-white min-w-[240px] max-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 group">
        {/* Discount badge */}
        {cheapestPrice && hasDiscount && (
          <span className="absolute right-4 top-4 bg-gradient-to-r from-orange-500 to-red-500 text-xs text-white px-3 py-1 rounded-full font-bold shadow-md">
            -{cheapestPrice.percentage_diff}%
          </span>
        )}
        
        {/* Product image container */}
        <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50">
          <img
            src={product.thumbnail || "/placeholder.png"}
            alt={product.title}
            className="object-contain w-full h-36 transition-transform duration-300 group-hover:scale-110"
            draggable={false}
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-opacity duration-300 rounded-xl" />
        </div>
        
        <div className="flex flex-col flex-1">
          {/* Price section */}
          <div className="flex gap-2 items-center mb-3">
            {cheapestPrice && hasDiscount && (
              <span className="text-sm text-gray-400 line-through">{cheapestPrice.original_price}</span>
            )}
            {cheapestPrice && (
              <span className="text-2xl text-black">{cheapestPrice.calculated_price}</span>
            )}
          </div>
          
          {/* Product title */}
          <h3 className="text-base font-semibold line-clamp-2 text-gray-800 group-hover:text-black transition-colors duration-200">
            {product.title}
          </h3>
          
          {/* Hover indicator */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm text-gray-600 font-medium">Zobraziť detail →</span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  const { response: { products } } = await getProductsList({ countryCode, queryParams: { limit: 4 } })

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="1.5" fill="#6B7280" opacity="0.3"/>
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
              <h2 className="mb-4 text-5xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent leading-tight">
                Najpredávanejšie<br />produkty
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-black rounded-full mb-6"></div>
            </div>
            
            <p className="mb-8 text-lg text-gray-700 leading-relaxed">
              Objavte to, čo si zákazníci zamilovali najviac. Viac než 
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold mx-2 border border-gray-200">
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