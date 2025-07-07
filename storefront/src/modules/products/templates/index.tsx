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
      <div className="content-container mt-4 md:mt-12 lg:mt-20">
        <Breadcrumbs 
          productTitle={product.title}
          categoryPath={categoryPath}
        />
      </div>

      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galéria obrázkov */}
          <div className="flex">
            <ImageGallery images={product?.images || []} />
          </div>
          
          {/* Variant selector a objednávka */}
          <div className="flex flex-col gap-y-8">
            <ProductVariantSelector 
              product={product} 
              region={region}
              countryCode={countryCode}
            />
          </div>
        </div>
      </div>

      {/* Súvisiace produkty */}
      <div className="content-container my-16 small:my-32">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
