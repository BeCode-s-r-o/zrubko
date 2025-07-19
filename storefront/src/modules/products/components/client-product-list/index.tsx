"use client"

import { useMemo, useState, useTransition } from "react"
import { HttpTypes } from "@medusajs/types"
import { ProductFilters } from "../../../../types/filters"
import { filterProducts } from "@lib/util/filter-products"
import { sortProducts } from "@lib/util/sort-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import WoodProductCard from "@modules/products/components/wood-product-card"
import { ClientPagination } from "@modules/products/components/client-pagination"

interface ClientProductListProps {
  allProducts: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  filters: ProductFilters
  sortBy: SortOptions
  productsPerPage?: number
}

export default function ClientProductList({
  allProducts,
  region,
  filters,
  sortBy,
  productsPerPage = 12
}: ClientProductListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isPending, startTransition] = useTransition()

  // Filter and sort products in real-time
  const { filteredProducts, totalPages } = useMemo(() => {
    // Apply filters first
    const filtered = filterProducts(allProducts, filters)
    
    // Then sort the filtered products
    const sorted = sortProducts(filtered, sortBy)
    
    // Calculate pagination
    const total = Math.ceil(sorted.length / productsPerPage)
    
    return {
      filteredProducts: sorted,
      totalPages: total
    }
  }, [allProducts, filters, sortBy, productsPerPage])

  // Get current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, productsPerPage])

  // Reset to page 1 when filters change
  useMemo(() => {
    startTransition(() => {
      setCurrentPage(1)
    })
  }, [filters])

  // Show "no products" message if no products match filters
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 py-16">
        <div className="flex justify-center items-center mb-6 w-24 h-24 bg-gray-100 rounded-full">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Žiadne produkty nenájdené
        </h3>
        <p className="max-w-md text-center text-gray-600">
          Skúste zmeniť alebo resetovať filtre, aby ste našli produkty ktoré hľadáte.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Results summary */}
      <div className="flex justify-between items-center mb-2">
      <p className="text-sm text-gray-600">
  Zobrazené produkty{" "}
  <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span>
  {" – "}
  <span className="font-medium">
    {Math.min(currentPage * productsPerPage, filteredProducts.length)}
  </span>
  {" "}z{" "}
  <span className="font-medium">{filteredProducts.length}</span>
</p>

        
        {/* Loading indicator while filtering */}
        {isPending && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-2 text-sm text-gray-500">Filtrujem...</span>
          </div>
        )}
      </div>

      {/* Product grid */}
      <ul
        className={`grid grid-cols-1 w-full small:grid-cols-2 medium:grid-cols-3 gap-x-6 gap-y-8 mb-12 product-grid-transition ${
          isPending ? 'opacity-70' : 'opacity-100'
        }`}
        data-testid="products-list"
      >
        {currentProducts.map((product, index) => (
          <li 
            key={product.id} 
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <WoodProductCard product={product} region={region} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <ClientPagination
          data-testid="product-pagination"
          page={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      )}
    </>
  )
} 