"use client"

import { HttpTypes } from "@medusajs/types"
import { type FilterSection } from "../../../../types/filters"
import { useFilters } from "@lib/hooks/use-filters"
import RefinementList from "@modules/store/components/refinement-list"
import ClientProductList from "@modules/products/components/client-product-list"
import SortProducts, { SortOptions } from "@modules/store/components/refinement-list/sort-products"

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
  const { filters, sortBy, updateSort } = useFilters()

  // Filter out price-related filters from metadata filters
  const metadataFilters = availableFilters.filter(filter => 
    !filter.key.includes('cena') && !filter.key.includes('price')
  )

  const handleSortChange = (name: string, value: SortOptions) => {
    updateSort(value)
  }

  return (
    <div className="flex flex-col gap-8 items-start lg:flex-row" data-testid="category-container">
      {/* Metadata Filtre na ľavej strane */}
      <aside className="flex-shrink-0 lg:w-80">
        <RefinementList 
          availableFilters={metadataFilters}
          data-testid="metadata-filters" 
        />
      </aside>

      {/* Produkty na pravej strane */}
      <main className="flex-1 min-w-0">
        {/* Header with product count and sort dropdown */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
        
          
          {/* Sort dropdown on the right */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange("sortBy", e.target.value as SortOptions)}
              className="px-3 py-1.5 pr-6 text-sm text-gray-700 bg-white rounded border border-gray-300 appearance-none focus:outline-none focus:border-gray-400"
            >
              <option value="created_at">Odporúčané</option>
              <option value="price_asc">Cena: Nízka → Vysoká</option>
              <option value="price_desc">Cena: Vysoká → Nízka</option>
            </select>
            <div className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

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