import { ShoppingBag, TrendingUp, Star } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductsListWithSort, getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import PrimaryButton from "@modules/layout/components/ui/PrimaryButton"
import WoodProductCard from "@modules/products/components/wood-product-card"
import ProductCarousel from "./product-carousel"

const FavoriteProductsSection = async ({ countryCode, region }: { countryCode: string, region: HttpTypes.StoreRegion }) => {
  let products: HttpTypes.StoreProduct[] = []

  try {
    // Fetch popular products sorted by most recently created (as a proxy for popularity)
          const { response: { products: fetchedProducts } } = await getProductsListWithSort({
          page: 1,
          queryParams: {
            limit: 12
          },
          sortBy: "created_at",
          countryCode
        })
    products = fetchedProducts || []
  } catch (error) {
    console.error('Failed to fetch favorite products:', error)
    // Fallback to basic product fetch
    try {
      const { response: { products: fallbackProducts } } = await getProductsList({
        countryCode,
        queryParams: {
          limit: 12
        }
      })
      products = fallbackProducts || []
    } catch (fallbackError) {
      console.error('Fallback product fetch also failed:', fallbackError)
      products = []
    }
  }

  return (
    <section className="py-8 lg:py-12 w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-5">
          {/* Left side: title, description, button */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-normal mb-4">
                <TrendingUp className="w-4 h-4" />
                Najobľúbenejšie
              </div>

              <h2 className="mb-3 text-xl sm:text-2xl lg:text-3xl font-light leading-tight text-black">
                Obľúbené produkty
              </h2>

              <div className="mb-6 w-20 h-px bg-primary"></div>
            </div>

            <p className="mb-6 text-base sm:text-lg font-light leading-relaxed text-black/70">
              Produkty, ktoré si naši zákazníci vyberajú najčastejšie.
              Kvalita a spoľahlivosť, ktorá osvedčuje.
            </p>

            <div className="flex items-center gap-2 mb-6 text-sm text-black/60">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="font-medium">4.8/5</span>
              <span>na základe 2,847 recenzií</span>
            </div>

            <LocalizedClientLink href="/categories">
              <PrimaryButton icon={<ShoppingBag size={18} />}>
                Prezrieť všetky produkty
              </PrimaryButton>
            </LocalizedClientLink>
          </div>
          
          {/* Right side: product carousel */}
          <div className="overflow-hidden lg:col-span-3">
            {products && products.length > 0 ? (
              <ProductCarousel products={products} region={region} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">
                  Produkty sa načítavajú
                </h3>
                <p className="text-sm text-black/60 max-w-xs">
                  Momentálne nie sú dostupné žiadne produkty. Skúste to neskôr.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FavoriteProductsSection 