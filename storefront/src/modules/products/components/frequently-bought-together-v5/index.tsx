import { HttpTypes } from '@medusajs/types'
import { getProductsList } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import FrequentlyBoughtTogetherSlider from './frequently-bought-together-slider'

type FrequentlyBoughtTogetherV5Props = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function FrequentlyBoughtTogetherV5({
  product,
  countryCode,
}: FrequentlyBoughtTogetherV5Props) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Get related products from the same collection, or from all products if collection is empty
  let relatedProducts = []
  
  if (product.collection_id) {
    const { response } = await getProductsList({
      countryCode,
      queryParams: {
        region_id: region.id,
        collection_id: [product.collection_id],
        limit: 20,
        is_giftcard: false,
      },
    })
    relatedProducts = response.products.filter((p) => p.id !== product.id).slice(0, 3)
  }
  
  // If no products from collection, get from all products
  if (relatedProducts.length === 0) {
    const { response } = await getProductsList({
      countryCode,
      queryParams: {
        region_id: region.id,
        limit: 20,
        is_giftcard: false,
      },
    })
    relatedProducts = response.products.filter((p) => p.id !== product.id).slice(0, 3)
  }

  // Always show the section, even if no products
  return (
    <section className="pb-11 pb-lg-14">
      <div className="container">
        <h2 className="fs-md-40 fs-30 mb-9 text-center">Frequently Bought Together</h2>
        {relatedProducts.length > 0 ? (
          <FrequentlyBoughtTogetherSlider
            products={relatedProducts}
            mainProduct={product}
            region={region}
            countryCode={countryCode}
          />
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No related products available.</p>
          </div>
        )}
      </div>
    </section>
  )
}

