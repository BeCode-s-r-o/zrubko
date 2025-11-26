import React from 'react'
import ProductGalleryV5Static from '@modules/products/components/product-gallery-v5-static'
import ProductInfoV5Static from '@modules/products/components/product-info-v5-static'
import ProductTabsV5Static from '@modules/products/components/product-tabs-v5-static'
import ProductBreadcrumbV5Static from '@modules/products/components/product-breadcrumb-v5-static'
import RelatedProductsV5Static from '@modules/products/components/related-products-v5-static'
import FrequentlyBoughtTogetherV5Static from '@modules/products/components/frequently-bought-together-v5-static'

// Statická verzia Product Template V5 s dátami z Furnitor témy
const ProductTemplateV5Static: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <ProductBreadcrumbV5Static />

      {/* Main Product Section */}
      <section className="pt-10 pb-lg-15 pb-11">
        <div className="container">
          <div className="row no-gutters">
            {/* Product Gallery */}
            <div className="col-md-7 mb-6 mb-md-0 pr-md-6 pr-lg-9">
              <ProductGalleryV5Static />
            </div>

            {/* Product Info */}
            <div className="col-md-5">
              <ProductInfoV5Static />
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together */}
      <FrequentlyBoughtTogetherV5Static />

      {/* Product Tabs (Description, Information, Reviews) */}
      <ProductTabsV5Static />

      {/* Related Products */}
      <section className="pb-11 pb-lg-15">
        <div className="container container-xxl">
          <h2 className="fs-md-40 fs-30 mb-9 text-center">May You Like This</h2>
          <RelatedProductsV5Static />
        </div>
      </section>
    </>
  )
}

export default ProductTemplateV5Static

