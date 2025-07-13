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
    <div className="min-h-screen bg-gradient-to-b from-champagne-light via-champagne to-champagne-dark">
      {/* Hero sekcia s rovnakým pozadím ako homepage */}
      <div className="relative overflow-hidden">
        {/* Luxusný pattern pozadie - rovnaký ako na homepage */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10L90 50L50 90L10 50Z' fill='%23D4AF37' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="relative z-10">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-4 md:pt-6 lg:pt-8">
            <div className="mb-8">
              <Breadcrumbs 
                productTitle={product.title}
                categoryPath={categoryPath}
              />
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-12 md:pb-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12 items-start">
              {/* Väčšia galéria obrázkov - 4 stĺpce z 7 */}
              <div className="lg:col-span-4 space-y-8">
                {/* Galéria v luxusnom rámčeku */}
                <div className="relative">
                  <div className="relative">
                    <div className="p-2">
                      <ImageGallery images={product?.images || []} product={product} />
                    </div>
                  </div>
                </div>
                
                {/* ProductTabs v luxusnom dizajne */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-ebony/10 via-transparent to-gold/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gold/20 overflow-hidden">
                    <div className="p-8">
                      <ProductTabs product={product} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Variant selector v luxusnom dizajne - 3 stĺpce z 7 */}
              <div className="lg:col-span-3">
                <div className="sticky top-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-mahogany/20 via-transparent to-gold/20 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gold/20 overflow-hidden">
                      <div className="p-8">
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
            </div>
          </div>
        </div>
      </div>

      {/* Luxusný rozdeľovač - rovnaký štýl ako na homepage */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      {/* Súvisiace produkty - presne rovnaký štýl ako featured collections na homepage */}
      {/* Remove the bottom colored section and padding */}
      <div className="content-container my-12">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold/20">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
