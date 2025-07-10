"use client"

import { HttpTypes } from "@medusajs/types"
import { type FilterSection } from "../../../../types/filters"
import { useFilters } from "@lib/hooks/use-filters"
import RefinementList from "@modules/store/components/refinement-list"
import ClientProductList from "@modules/products/components/client-product-list"

interface ClientCategoryFilteringProps {
  allProducts: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  availableFilters: FilterSection[]
}

export default function ClientCategoryFiltering({
  allProducts,
  region,
  availableFilters,
}: ClientCategoryFilteringProps) {
  const { filters, sortBy } = useFilters()

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start" data-testid="category-container">
      {/* Filtre na ľavej strane */}
      <aside className="lg:w-80 flex-shrink-0">
        <RefinementList 
          availableFilters={availableFilters}
          data-testid="sort-by-container" 
        />
      </aside>

      {/* Produkty na pravej strane */}
      <main className="flex-1 min-w-0">
        <ClientProductList
          allProducts={allProducts}
          region={region}
          filters={filters}
          sortBy={sortBy}
          productsPerPage={12}
        />
      </main>
    </div>
  )
} 