import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { HttpTypes } from '@medusajs/types'
import ProductGalleryV5 from '@modules/products/components/product-gallery-v5'
import ProductInfoV5 from '@modules/products/components/product-info-v5'
import ProductTabsV5 from '@modules/products/components/product-tabs-v5'
import ProductBreadcrumbV5 from '@modules/products/components/product-breadcrumb-v5'
import RelatedProductsV5 from '@modules/products/components/related-products-v5'
import FrequentlyBoughtTogetherV5 from '@modules/products/components/frequently-bought-together-v5'
import { getProductsList } from '@lib/data/products'

type ProductTemplateV5Props = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

// Helper function to get previous and next products
async function getAdjacentProducts(
  currentProduct: HttpTypes.StoreProduct,
  countryCode: string,
  regionId: string
) {
  try {
    const { response } = await getProductsList({
      countryCode,
      queryParams: {
        region_id: regionId,
        limit: 100, // Get more products to find adjacent ones
      },
    })

    const products = response.products || []
    const currentIndex = products.findIndex((p) => p.id === currentProduct.id)

    const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null
    const nextProduct =
      currentIndex < products.length - 1 ? products[currentIndex + 1] : null

    return { previousProduct, nextProduct }
  } catch (error) {
    console.error('Error fetching adjacent products:', error)
    return { previousProduct: null, nextProduct: null }
  }
}

const ProductTemplateV5: React.FC<ProductTemplateV5Props> = async ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Get adjacent products for navigation
  const { previousProduct, nextProduct } = await getAdjacentProducts(
    product,
    countryCode,
    region.id
  )

  return (
    <>
      {/* Breadcrumb Navigation */}
      <ProductBreadcrumbV5
        product={product}
        countryCode={countryCode}
        previousProduct={previousProduct}
        nextProduct={nextProduct}
      />

      {/* Main Product Section */}
      <section className="pt-10 pb-lg-15 pb-11">
        <div className="container">
          <div className="row no-gutters">
            {/* Product Gallery */}
            <div className="col-md-7 mb-6 mb-md-0 pr-md-6 pr-lg-9">
              <ProductGalleryV5 images={product?.images || []} />
            </div>

            {/* Product Info */}
            <div className="col-md-5">
              <ProductInfoV5 product={product} region={region} />
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together */}
      <Suspense fallback={null}>
        <FrequentlyBoughtTogetherV5 product={product} countryCode={countryCode} />
      </Suspense>

      {/* Product Tabs (Description, Information, Reviews) */}
      <ProductTabsV5 product={product} />

      {/* Related Products */}
      <section className="pb-11 pb-lg-15">
        <div className="container container-xxl">
          <h2 className="fs-md-40 fs-30 mb-9 text-center">May You Like This</h2>
          <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
            <RelatedProductsV5 product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default ProductTemplateV5

