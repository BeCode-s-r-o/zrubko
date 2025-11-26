import { HttpTypes } from '@medusajs/types'
import { getRegion } from '@lib/data/regions'
import { getProductsList } from '@lib/data/products'
import RelatedProductsSlider from './related-products-slider'

type RelatedProductsV5Props = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

type StoreProductParamsWithTags = HttpTypes.StoreProductParams & {
  tags?: string[]
}

type StoreProductWithTags = HttpTypes.StoreProduct & {
  tags?: { value: string }[]
}

export default async function RelatedProductsV5({
  product,
  countryCode,
}: RelatedProductsV5Props) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Try to get products from collection first
  let products: HttpTypes.StoreProduct[] = []
  
  if (product.collection_id) {
    const queryParams: StoreProductParamsWithTags = {
      region_id: region.id,
      collection_id: [product.collection_id],
      limit: 20,
      is_giftcard: false,
    }
    
    const productWithTags = product as StoreProductWithTags
    if (productWithTags.tags) {
      queryParams.tags = productWithTags.tags
        .map((t) => t.value)
        .filter(Boolean) as string[]
    }
    
    const result = await getProductsList({ queryParams, countryCode })
    products = result.response.products.filter(
      (p) => p.id !== product.id
    )
  }
  
  // If no products from collection, get from all products
  if (products.length === 0) {
    const queryParams: StoreProductParamsWithTags = {
      region_id: region.id,
      limit: 20,
      is_giftcard: false,
    }
    
    const result = await getProductsList({ queryParams, countryCode })
    products = result.response.products.filter(
      (p) => p.id !== product.id
    )
  }

  // Always render the slider, even if empty
  return (
    <RelatedProductsSlider
      products={products}
      region={region}
      countryCode={countryCode}
    />
  )
}

