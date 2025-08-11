import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { getProductsListWithSort } from "@lib/data/products"
import { extractFiltersFromProducts } from "@lib/util/filter-products"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import ClientCategoryFiltering from "@modules/kategorie/components/kategorie_filtrovanie"
import { FilterSection, ProductFilters } from "../../../types/filters"

import PaginatedProducts from "./paginated-products"
import StoreTitle from "../components/store-title"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Get region for product cards
  const region = await getRegion(countryCode)
  if (!region) return null

  // Get all categories for category filter
  const categories = await listCategories()
  console.log("Categories loaded:", categories?.length || 0)

  // Get all products for filtering - increase limit to get more products
  const { response: { products: allProducts } } = await getProductsListWithSort({
    page: 1,
    queryParams: { limit: 1000 },
    countryCode,
  })
  console.log("Products loaded:", allProducts?.length || 0)
  
  // Debug: Check if products have categories
  const productsWithCategories = allProducts?.filter((product: any) => product.categories && product.categories.length > 0) || []
  console.log("Products with categories:", productsWithCategories.length)
  
  // Debug: Log first few products and their categories
  allProducts?.slice(0, 3).forEach((product: any, index: number) => {
    console.log(`Product ${index + 1}:`, product.title, "Categories:", product.categories?.map((cat: any) => cat.name) || [])
    console.log(`Product ${index + 1} full categories:`, product.categories)
  })

  // Extract available filters from all products
  const availableFilters = extractFiltersFromProducts(allProducts)

  // Create category filter using the same structure as homepage
  const categoryOptions = categories?.map((category: any) => {
    // Debug: Check different ways to access category relationship
    const count1 = allProducts.filter((product: any) => 
      product.categories?.some((cat: any) => cat.id === category.id)
    ).length
    
    const count2 = allProducts.filter((product: any) => 
      product.category_id === category.id
    ).length
    
    const count3 = allProducts.filter((product: any) => 
      product.category?.id === category.id
    ).length
    
    // Try using handle instead of id
    const count4 = allProducts.filter((product: any) => 
      product.categories?.some((cat: any) => cat.handle === category.handle)
    ).length
    
    console.log(`Category ${category.name} (${category.id}): count1=${count1}, count2=${count2}, count3=${count3}, count4=${count4}`)
    
    // Use the highest count method
    const count = Math.max(count1, count2, count3, count4)
    
    return {
      value: category.id,
      label: category.name,
      count
    }
  })
  .filter((option: any, index: number, self: any[]) => 
    // Remove duplicates only
    index === self.findIndex((o: any) => o.value === option.value)
  ) || []

  console.log("Category options:", categoryOptions)

  const categoryFilter: FilterSection = {
    key: "category_id" as keyof ProductFilters,
    title: "Kategória",
    options: categoryOptions
  }

  const enhancedFilters: FilterSection[] = [categoryFilter, ...availableFilters]

  return (
    <>
      {/* Breadcrumbs */}
      <div className="px-4 mx-auto mt-2 max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex relative items-center py-2 mb-2 space-x-2 text-sm" aria-label="Breadcrumb">
          <a href="/" className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular">
            Domov
          </a>
          <div className="flex items-center">
            <span className="mx-[4px] text-ui-fg-muted">/</span>
            <span className="font-medium text-ui-fg-base text-small-regular">
              Obchod
            </span>
          </div>
        </nav>
      </div>

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
                availableFilters={enhancedFilters}
                currentCategoryHandle="store"
                searchParams={{ sortBy: sort, page: pageNumber.toString() }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreTemplate
