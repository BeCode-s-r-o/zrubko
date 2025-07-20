"use client"

import { HttpTypes } from "@medusajs/types"
import { type FilterSection } from "../../../../types/filters"
import { useFilters } from "@lib/hooks/use-filters"
import RefinementList from "@modules/store/components/refinement-list"
import ClientProductList from "@modules/products/components/client-product-list"
import SortProducts, { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { useState, useEffect } from "react"

interface ClientCategoryFilteringProps {
  allProducts: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  availableFilters: FilterSection[]
  currentCategoryHandle?: string
}

export default function ClientCategoryFiltering({
  allProducts,
  region,
  availableFilters,
  currentCategoryHandle,
}: ClientCategoryFilteringProps) {
  const { filters, sortBy, updateSort } = useFilters()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Filter out price-related filters from metadata filters
  const metadataFilters = availableFilters.filter(filter => 
    !filter.key.includes('cena') && !filter.key.includes('price')
  )

  const handleSortChange = (name: string, value: SortOptions) => {
    updateSort(value)
  }

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileFiltersOpen])

  return (
    <>
      <div className="flex flex-col gap-8 items-start lg:flex-row" data-testid="category-container">
        {/* Mobile Filter Button - Only visible on small screens */}
        <div className="w-full lg:hidden">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex gap-2 items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-colors duration-200 hover:bg-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-medium">Filtrovanie</span>
            </button>
            
            {/* Sort dropdown on mobile */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange("sortBy", e.target.value as SortOptions)}
                className="px-3 py-2 pr-8 text-sm text-gray-700 bg-white rounded border border-gray-300 appearance-none focus:outline-none focus:border-gray-400"
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
        </div>

        {/* Desktop Metadata Filtre na ľavej strane - Hidden on mobile */}
        <aside className="hidden flex-shrink-0 lg:block lg:w-80">
          <RefinementList 
            availableFilters={metadataFilters}
            data-testid="metadata-filters" 
          />
        </aside>

        {/* Produkty na pravej strane */}
        <main className="flex-1 w-full min-w-0 lg:w-auto">
          {/* Desktop Header with product count and sort dropdown - Hidden on mobile */}
          <div className="hidden justify-between items-center pb-4 mb-6 border-b border-gray-200 lg:flex">
            <div className="text-gray-700">

            </div>
            
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
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            sourceCategory={currentCategoryHandle}
          />
        </main>
      </div>

      {/* Mobile Full-Screen Filter Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          
          {/* Filter Panel */}
          <div className="absolute inset-y-0 left-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out transform">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Filtrovanie</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 text-gray-500 transition-colors duration-200 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="overflow-y-auto h-full">
              <RefinementList 
                availableFilters={metadataFilters}
                data-testid="mobile-filters" 
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
} 