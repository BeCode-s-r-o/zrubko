import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductVariantSelector from "@modules/products/components/product-variant-selector"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Príprava kategórií pre breadcrumbs
  const categoryPath = product.categories?.map(category => ({
    name: category.name,
    handle: category.handle
  })) || []

  return (
    <>
      {/* Moderný hero sekcia s gradientom - širšie rozloženie */}
      <div className="bg-gradient-to-br from-accent-light/20 via-white to-accent/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8">
          <Breadcrumbs 
            productTitle={product.title}
            categoryPath={categoryPath}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Galéria obrázkov - 2 stĺpce z 5 */}
            <div className="lg:col-span-2">
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <ImageGallery images={product?.images || []} />
              </div>
            </div>
            
            {/* Variant selector a objednávka - 3 stĺpce z 5 */}
            <div className="lg:col-span-3">
              <ProductVariantSelector 
                product={product} 
                region={region}
                countryCode={countryCode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tenší rozdeľovač */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

      {/* Súvisiace produkty s menšími medzerami */}
      <div className="bg-gradient-to-br from-white via-accent-light/5 to-accent/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
