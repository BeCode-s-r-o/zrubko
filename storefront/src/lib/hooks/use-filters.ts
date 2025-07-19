"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ProductFilters } from "../../types/filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface UseFiltersReturn {
  filters: ProductFilters
  sortBy: SortOptions
  updateFilter: (filterKey: keyof ProductFilters, value: string, checked: boolean) => void
  updateSort: (sortBy: SortOptions) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

export function useFilters(): UseFiltersReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Parse initial filters from URL
  const parseFiltersFromUrl = useCallback((): ProductFilters => {
    const filters: ProductFilters = {}
    
    const filterKeys: (keyof ProductFilters)[] = [
      'trieda', 'pouzitie', 'typ_dreva', 'dlzka_m',
      'kusov_v_baliku', 'kalk_plocha_balika_m2', 'rozmery_mm', 'opracovanie_dreva'
    ]

    filterKeys.forEach(key => {
      const values = searchParams.getAll(key)
      if (values.length > 0) {
        filters[key] = values
      }
    })

    return filters
  }, [searchParams])

  // State
  const [filters, setFilters] = useState<ProductFilters>(parseFiltersFromUrl)
  const [sortBy, setSortBy] = useState<SortOptions>(
    (searchParams.get('sortBy') as SortOptions) || 'created_at'
  )

  // Update state when URL changes (browser back/forward)
  useEffect(() => {
    setFilters(parseFiltersFromUrl())
    setSortBy((searchParams.get('sortBy') as SortOptions) || 'created_at')
  }, [parseFiltersFromUrl, searchParams])

  // Create URL query string
  const createQueryString = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      
      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key) // Remove existing values
        
        if (value === null) {
          // Skip null values (effectively removes the parameter)
          return
        }
        
        if (Array.isArray(value)) {
          // Add multiple values for the same key
          value.forEach(v => params.append(key, v))
        } else {
          params.set(key, value)
        }
      })
      
      return params.toString()
    },
    [searchParams]
  )

  // Update URL without page refresh
  const updateUrl = useCallback((queryString: string) => {
    const url = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(url, { scroll: false })
  }, [pathname, router])

  // Update filter
  const updateFilter = useCallback((filterKey: keyof ProductFilters, value: string, checked: boolean) => {
    const currentValues = filters[filterKey] || []
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value)
    
    const newFilters = {
      ...filters,
      [filterKey]: newValues
    }
    
    // Remove empty arrays
    if (newValues.length === 0) {
      delete newFilters[filterKey]
    }
    
    setFilters(newFilters)
    
    const query = createQueryString({
      [filterKey]: newValues.length > 0 ? newValues : null
    })
    updateUrl(query)
  }, [filters, createQueryString, updateUrl])

  // Update sort
  const updateSort = useCallback((newSortBy: SortOptions) => {
    setSortBy(newSortBy)
    
    const query = createQueryString({ sortBy: newSortBy })
    updateUrl(query)
  }, [createQueryString, updateUrl])

  // Reset all filters
  const resetFilters = useCallback(() => {
    const filterKeys = Object.keys(filters)
    const resetUpdates = filterKeys.reduce((acc, key) => {
      acc[key] = null
      return acc
    }, {} as Record<string, null>)
    
    setFilters({})
    
    const query = createQueryString(resetUpdates)
    updateUrl(query)
  }, [filters, createQueryString, updateUrl])

  // Check if has active filters
  const hasActiveFilters = Object.values(filters).some(
    filterArray => filterArray && filterArray.length > 0
  )

  return {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    resetFilters,
    hasActiveFilters
  }
} 