import { notFound } from "next/navigation"
import { listCategories } from "@lib/data/categories"
import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CategorySlider from "@modules/categories/components/category-slider"
import ShopSidebar from "@modules/shop/components/shop-sidebar"
import ShopSorting from "@modules/shop/components/shop-sorting"
import ShopPagination from "@modules/shop/components/shop-pagination"
import ProductCardFurnitor from "@modules/shop/components/product-card-furnitor"

export default async function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  // Fetch all categories for sidebar and slider
  const allCategories = await listCategories()

  // Fetch products for this category
  const region = await getRegion(countryCode)
  if (!region) {
    notFound()
  }

  const productsData = await getProductsListWithSort({
    page: pageNumber,
    sortBy: sort,
    countryCode,
    queryParams: {
      limit: 12,
      category_id: [category.id],
    },
  })

  const { response } = productsData
  const products = response.products
  const totalCount = response.count
  const productsPerPage = 12
  const startIndex = (pageNumber - 1) * productsPerPage + 1
  const endIndex = Math.min(pageNumber * productsPerPage, totalCount)

  return (
    <main id="content">
      {/* Page Title */}
      <section className="py-8 page-title border-top">
        <div className="container">
          <h1 className="fs-40 my-1 text-capitalize text-center">{category.name}</h1>
        </div>
      </section>

      {/* Category Slider - Show subcategories or related top-level categories */}
      {(() => {
        // Ak má podkategórie, zobraz ich
        if (category.category_children && category.category_children.length > 0) {
          return (
            <CategorySlider 
              categories={category.category_children} 
              countryCode={countryCode} 
            />
          )
        }
        // Inak zobraz súvisiace top-level kategórie (okrem aktuálnej)
        const relatedCategories = (allCategories || [])
          .filter(cat => 
            !cat.parent_category_id && 
            cat.id !== category.id &&
            cat.handle !== 'odporucane-produkty' &&
            cat.handle !== 'odporucane-produkty-homepage' &&
            cat.handle !== 'najpredavanejsie-produkty'
          )
          .sort((a, b) => (a.rank || 0) - (b.rank || 0))
          .slice(0, 8)
        
        if (relatedCategories.length > 0) {
          return (
            <CategorySlider 
              categories={relatedCategories} 
              countryCode={countryCode} 
            />
          )
        }
        return null
      })()}

      {/* Main Category Section */}
      <section className="pt-13 pb-11 pb-lg-14">
        <div className="container">
          <div className="row overflow-hidden">
            {/* Sidebar */}
            <ShopSidebar categories={allCategories || []} countryCode={countryCode} />

            {/* Products Grid */}
            <div className="col-md-9">
              {/* Sorting and Count */}
              <div className="d-flex mb-6">
                <div className="d-flex align-items-center text-primary">
                  Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} results
                </div>
                <ShopSorting sortBy={sort} page={pageNumber} />
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
                      <p className="fs-18">Nenašli sa žiadne produkty v tejto kategórii.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <ShopPagination 
                sortBy={sort}
                page={pageNumber}
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
