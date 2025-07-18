import Product from "../product-preview"
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
    <div className="product-page-constraint">
      <div className="flex flex-col items-center mb-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 lg:text-2xl">
        Podobné produkty
      </h2>
      <p className="text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
        Môžu sa Vám páčiť aj tieto produkty.
      </p>

      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            {region && <Product region={region} product={product} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
