import WoodProductCard from "../wood-product-card"
import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Define related products logic based on collection
  const queryParams: any = {}

  queryParams.limit = 4
  
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="">
      <div className="">
        {/* Header */}
        <div className="mb-6 text-center">
          <h4 className="mb-4 text-3xl text-gray-900">
            Podobné produkty
          </h4>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Môžu sa Vám páčiť aj tieto produkty.
          </p>
        </div>

        {/* 4 wider cards grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl transition-all duration-300 overflow-hidden min-h-[600px]">
              <WoodProductCard product={product} region={region} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
