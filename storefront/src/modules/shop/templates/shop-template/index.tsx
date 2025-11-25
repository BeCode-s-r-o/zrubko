import { HttpTypes } from '@medusajs/types'
import CategorySlider from '@modules/shop/components/category-slider'
import ShopSidebar from '@modules/shop/components/shop-sidebar'
import ShopSorting from '@modules/shop/components/shop-sorting'
import ShopPagination from '@modules/shop/components/shop-pagination'
import ProductCardFurnitor from '@modules/shop/components/product-card-furnitor'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

interface ShopTemplateProps {
  products: HttpTypes.StoreProduct[]
  categories: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
  countryCode: string
  sortBy?: SortOptions
  page?: number
  totalCount?: number
}

export default function ShopTemplate({
  products,
  categories,
  region,
  countryCode,
  sortBy = 'created_at',
  page = 1,
  totalCount = 0,
}: ShopTemplateProps) {
  const productsPerPage = 12
  const startIndex = (page - 1) * productsPerPage + 1
  const endIndex = Math.min(page * productsPerPage, totalCount)

  return (
    <main id="content">
      {/* Page Title */}
      <section className="py-8 page-title border-top">
        <div className="container">
          <h1 className="fs-40 my-1 text-capitalize text-center">Shop All</h1>
        </div>
      </section>

      {/* Category Slider */}
      <CategorySlider categories={categories} countryCode={countryCode} />

      {/* Main Shop Section */}
      <section className="pt-13 pb-11 pb-lg-14">
        <div className="container">
          <div className="row overflow-hidden">
            {/* Sidebar */}
            <ShopSidebar categories={categories} countryCode={countryCode} />

            {/* Products Grid */}
            <div className="col-md-9">
              {/* Sorting and Count */}
              <div className="d-flex mb-6">
                <div className="d-flex align-items-center text-primary">
                  Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} results
                </div>
                <ShopSorting sortBy={sortBy} page={page} />
              </div>

              {/* Products Grid */}
              <div className="row">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCardFurnitor 
                      key={product.id} 
                      product={product} 
                      region={region}
                    />
                  ))
                ) : (
                  <div className="col-12">
                    <div className="text-center py-8">
                      <i className="far fa-box-open fs-48 text-muted mb-4"></i>
                      <p className="fs-18">Nenašli sa žiadne produkty.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <ShopPagination 
                sortBy={sortBy}
                page={page}
                totalCount={totalCount}
                productsPerPage={productsPerPage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

