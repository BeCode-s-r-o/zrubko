import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import CategoryBanner from "@modules/kategorie/components/banner_kategorie"
import { HttpTypes } from "@medusajs/types"
import { getProductsListWithSort } from "@lib/data/products"
import { extractFiltersFromProducts } from "@lib/util/filter-products"
import { getRegion } from "@lib/data/regions"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// Import client components
import CategoryExpandableContent from "@modules/kategorie/components/kategorie_spodny_text"
import ClientCategoryFiltering from "@modules/kategorie/components/kategorie_filtrovanie"

interface CategoryTemplateProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
  searchParams?: {
    sortBy?: SortOptions
    page?: string
  }
}

export default async function CategoryTemplate({
  categories,
  countryCode,
  searchParams,
}: CategoryTemplateProps) {
  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  // Get region for product cards
  const region = await getRegion(countryCode)
  if (!region) notFound()

  // Get all products in category for client-side filtering
  const queryParams = {
    limit: 100,
    category_id: [category.id]
  } as any // Temporary type assertion until we fix the types

  const { response: { products: allProducts } } = await getProductsListWithSort({
    page: 1,
    queryParams,
    countryCode,
  })

  // Extract available filters from all products in category
  const availableFilters = extractFiltersFromProducts(allProducts)

  // Príprava category path pre breadcrumbs
  const categoryPath = categories.map(cat => ({
    name: cat.name,
    handle: cat.handle
  }))

  return (
    <>
      {/* Breadcrumbs */}
      <div className="px-4 mx-auto mt-2 max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs categoryPath={categoryPath} />
      </div>

      {/* Banner */}
      <CategoryBanner category={category} />

      {/* Podkategórie ak existujú */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="px-4 pt-8 pb-8 mx-auto max-w-7xl">
          <div className="mb-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {category.category_children?.map((c) => (
                <LocalizedClientLink 
                  key={c.id} 
                  href={`/categories/${c.handle}`}
                  className="block p-4 rounded-lg border transition-all duration-200 bg-ui-bg-subtle border-ui-border-base hover:border-ui-border-interactive hover:shadow-sm"
                >
                  <h2 className="font-medium text-ui-fg-base">{c.name}</h2>
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Store-like Layout */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          className="flex flex-col py-6 small:flex-row small:items-start"
          data-testid="category-container"
        >
          {/* Right Side - Products */}
          <div className="w-full">
            <Suspense fallback={<SkeletonProductGrid />}>
              <ClientCategoryFiltering
                allProducts={allProducts}
                region={region}
                availableFilters={availableFilters}
                currentCategoryHandle={category.handle}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    
      {/* Metadata sekcia */}
      <CategoryExpandableContent category={category} />
    </>
  )
}
