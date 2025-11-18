import React, { Suspense } from "react"

import ProductInfo from "@modules/products/components/product-info"
import ProductImageGallery from "@modules/products/components/product-image-gallery"
import ProductVariantSelector from "@modules/products/components/product-variant-selector"
import ProductDescription from "@modules/products/components/product-description"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  sourceCategory?: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  sourceCategory,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Príprava kategórií pre breadcrumbs s hierarchiou
  const buildCategoryPath = (category: any): Array<{ name: string; handle: string }> => {
    const path: Array<{ name: string; handle: string }> = []
    
    // Pridaj rodičovské kategórie ak existujú
    if (category.parent_category) {
      path.push(...buildCategoryPath(category.parent_category))
    }
    
    // Pridaj aktuálnu kategóriu
    path.push({
      name: category.name,
      handle: category.handle
    })
    
    return path
  }

  // Zober kategóriu na základe sourceCategory alebo prvú kategóriu produktu
  let selectedCategory = product.categories?.[0]
  
  // Ak je zadaný sourceCategory, nájdi tú kategóriu
  if (sourceCategory && product.categories) {
    const sourceCat = product.categories.find(cat => cat.handle === sourceCategory)
    if (sourceCat) {
      selectedCategory = sourceCat
    }
  }
  
  const categoryPath = selectedCategory ? buildCategoryPath(selectedCategory) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-champagne-light via-champagne to-champagne-dark">
      {/* Hero sekcia s rovnakým pozadím ako homepage */}
      <div className="overflow-hidden relative">
        {/* Luxusný pattern pozadie - rovnaký ako na homepage */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10L90 50L50 90L10 50Z' fill='%23D4AF37' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>
        
        <div className="relative z-10">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-4 md:pt-6 lg:pt-8">
            <div className="">
              <Breadcrumbs 
                productTitle={product.title}
                categoryPath={categoryPath}
              />
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-12 md:pb-16 lg:pb-20">
            {/* Mobile Layout: Single Column */}
            <div className="space-y-8 lg:hidden">
              {/* 1. Product Image Gallery */}
              <div className="relative">
                <div className="relative">
                  <div className="p-2">
                    <ProductImageGallery images={product?.images || []} product={product} />
                  </div>
                </div>
              </div>

              {/* 2. Product Info (Title, Price, etc.) */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-ebony/10 to-gold/10"></div>
                <div className="overflow-hidden relative ">
                  <div className="">
                    <ProductInfo product={product} region={region} />
                  </div>
                </div>
              </div>

              {/* 3. Variant Selector */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-mahogany/20 to-gold/20"></div>
                <div className="overflow-hidden relative">
                  <div className="">
                    <ProductVariantSelector 
                      product={product} 
                      region={region}
                      countryCode={countryCode}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Product Description */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-ebony/10 to-gold/10"></div>
                <div className="overflow-hidden relative">
                  <div className="">
                    <ProductDescription product={product} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Two Column Grid */}
            <div className="hidden gap-8 items-start lg:grid lg:grid-cols-7 lg:gap-12">
              {/* Left Column: Image Gallery and Description */}
              <div className="space-y-8 lg:col-span-4">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative">
                    <div className="p-2">
                      <ProductImageGallery images={product?.images || []} product={product} />
                    </div>
                  </div>
                </div>
                
                {/* Product Description */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-ebony/10 to-gold/10"></div>
                  <div className="overflow-hidden relative">
                    <div className="p-2">
                      <ProductDescription product={product} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Product Info and Variant Selector */}
              <div className="space-y-8 lg:col-span-3">
                {/* Product Info */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-ebony/10 to-gold/10"></div>
                  <div className="overflow-hidden relative">
                    <div className="p-2">
                      <ProductInfo product={product} region={region} />
                    </div>
                  </div>
                </div>

                {/* Variant Selector */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br via-transparent rounded-3xl blur-xl from-mahogany/20 to-gold/20"></div>
                  <div className="overflow-hidden relative">
                    <div className="p-2">   
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

      {/* Luxusný rozdeľovač - rovnaký štýl ako na homepage */}
      <div className="h-px bg-gradient-to-r from-transparent to-transparent via-gold/40"></div>

      {/* Súvisiace produkty - presne rovnaký štýl ako featured collections na homepage */}
      <div className="my-12 content-container">
        <div className="p-8 bg-white rounded-3xl border shadow-2xl border-gold/20">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate

