import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import CategoryBanner from "@modules/categories/components/category-banner"
import ShouSugiBanInfo from "@modules/categories/components/shou-sugi-ban-info"
import { HttpTypes } from "@medusajs/types"

// Import the client component
import CategoryExpandableContent from "@modules/categories/components/category-expandable-content"

export default function CategoryTemplate({
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

  // Príprava category path pre breadcrumbs
  const categoryPath = categories.map(cat => ({
    name: cat.name,
    handle: cat.handle
  }))

  return (
    <>
      <div className="content-container mt-4 md:mt-12 lg:mt-20">
        <Breadcrumbs categoryPath={categoryPath} />
      </div>
      
      {/* Banner */}
      <CategoryBanner category={category} />

      {/* Podkategórie ak existujú */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="content-container pt-16 pb-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-ui-fg-base">Podkategórie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.category_children?.map((c) => (
                <LocalizedClientLink 
                  key={c.id} 
                  href={`/categories/${c.handle}`}
                  className="p-4 bg-ui-bg-subtle rounded-lg border border-ui-border-base hover:border-ui-border-interactive hover:shadow-sm transition-all duration-200 block"
                >
                  <h3 className="font-medium text-ui-fg-base">{c.name}</h3>
                  {c.description && (
                    <p className="text-sm text-ui-fg-subtle mt-1 line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hlavný obsah s filtrami a produktmi */}
      <div className={`content-container ${category.category_children && category.category_children.length > 0 ? 'pb-32' : 'pt-32 pb-32'}`}>
        <div className="flex flex-col lg:flex-row gap-8 items-start" data-testid="category-container">
          {/* Filtre na ľavej strane */}
          <aside className="lg:w-80 flex-shrink-0">
            <RefinementList sortBy={sort} data-testid="sort-by-container" />
          </aside>

          {/* Produkty na pravej strane */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </main>
        </div>
      </div>
    
      {/* Metadata sekcia - NAD ikonkami */}
      <CategoryExpandableContent category={category} />
      
      {/* SHOU SUGI BAN informácie - ikonky */}
      <ShouSugiBanInfo category={category} />
    </>
  )
}
