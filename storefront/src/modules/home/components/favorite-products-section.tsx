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
      <div className="relative flex flex-col border rounded-xl p-4 bg-white min-w-[220px] max-w-[260px] shadow-sm hover:shadow-lg transition-shadow duration-200">
        {/* Discount badge */}
        {cheapestPrice && hasDiscount && (
          <span className="absolute right-3 top-3 bg-white text-xs text-orange-600 px-2 py-0.5 rounded-full border border-orange-200 font-bold">
            -{cheapestPrice.percentage_diff}%
          </span>
        )}
        <img
          src={product.thumbnail || "/placeholder.png"}
          alt={product.title}
          className="object-contain mb-2 w-full h-32"
          draggable={false}
        />
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center mb-1">
            {cheapestPrice && hasDiscount && (
              <span className="text-sm text-gray-400 line-through">{cheapestPrice.original_price}</span>
            )}
            {cheapestPrice && (
              <span className="text-xl font-bold text-primary">{cheapestPrice.calculated_price}</span>
            )}
          </div>
          <span className="mb-1 text-sm font-semibold line-clamp-2">{product.title}</span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  const { response: { products } } = await getProductsList({ countryCode, queryParams: { limit: 4 } })

  return (
    <section className="pt-6 pb-2 bg-white">
      <div className="flex flex-col gap-8 items-start content-container md:flex-row">
        {/* Left side: title, description, button */}
        <div className="flex-1 max-w-md md:sticky md:top-24">
          <h2 className="mb-2 text-4xl text-primary">Najpredávanejšie<br />produkty <span className='inline-block align-middle'>🪵</span></h2>
          <p className="mb-4 text-description">
          Objavte to, čo si zákazníci zamilovali najviac.  Viac než <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full ">3 500</span> predaných kusov len za posledný rok.
          </p>
          <LocalizedClientLink href="/boutique">
            <PrimaryButton icon={<ShoppingBag size={20} />}>
              Nakupovať
            </PrimaryButton>
          </LocalizedClientLink>
        </div>
        {/* Right side: product cards */}
        <div className="overflow-x-auto flex-1 w-full">
          <div className="flex gap-4 min-w-[600px] md:min-w-0">
            {products.map((product) => (
              <FavoriteProductCard key={product.id} product={product} region={region} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FavoriteProductsSection 