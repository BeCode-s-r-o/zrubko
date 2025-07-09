import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductVariantSelector from "@modules/products/components/product-variant-selector"
import ProductTabs from "@modules/products/components/product-tabs"
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
      {/* Roztiahnutý hero sekcia na plnú šírku */}
      <div className="bg-gradient-to-br from-accent-light/20 via-white to-accent/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-4 md:pt-6 lg:pt-8">
          <Breadcrumbs 
            productTitle={product.title}
            categoryPath={categoryPath}
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-6 md:pb-8 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12 items-start">
            {/* Väčšia galéria obrázkov - 4 stĺpce z 7 */}
            <div className="lg:col-span-4 space-y-6">
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <ImageGallery images={product?.images || []} product={product} />
              </div>
            </div>
            
            {/* Variant selector - 3 stĺpce z 7 - sticky pozicionovanie */}
            <div className="lg:col-span-3">
              <div className="sticky top-4 lg:top-8">
                <ProductVariantSelector 
                  product={product} 
                  region={region}
                  countryCode={countryCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tenší rozdeľovač */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

      {/* Accordion s technickými parametrami */}
      <div className="bg-gradient-to-br from-white via-accent-light/5 to-accent/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 md:py-16 lg:py-20">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Tenší rozdeľovač */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>

      {/* Roztiahnuté súvisiace produkty */}
      <div className="bg-gradient-to-br from-white via-accent-light/5 to-accent/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 md:py-16 lg:py-20">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
