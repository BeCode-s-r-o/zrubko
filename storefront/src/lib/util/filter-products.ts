import { HttpTypes } from "@medusajs/types"
import { ProductFilters, FilterSection, FilterOption, ProductMetadata } from "../../types/filters"

/**
 * Filter products based on metadata criteria
 */
export function filterProducts(
  products: HttpTypes.StoreProduct[],
  filters: ProductFilters
): HttpTypes.StoreProduct[] {
  if (!products || !products.length) return []

  // If no filters are active, return all products
  const hasActiveFilters = Object.values(filters).some(
    filterArray => filterArray && filterArray.length > 0
  )
  
  if (!hasActiveFilters) return products

  return products.filter(product => {
    const metadata = product.metadata as ProductMetadata || {}
    
    // Check each filter category
    for (const [filterKey, filterValues] of Object.entries(filters)) {
      if (!filterValues || filterValues.length === 0) continue
      
      const productValue = metadata[filterKey as keyof ProductMetadata]
      
      // If product doesn't have this metadata, exclude it
      if (!productValue) return false
      
      // Check if product value matches any of the filter values
      const normalizedProductValue = normalizeValue(productValue)
      const hasMatch = filterValues.some((filterValue: string) => 
        normalizeValue(filterValue) === normalizedProductValue
      )
      
      if (!hasMatch) return false
    }
    
    return true
  })
}

/**
 * Extract available filter options from products
 */
export function extractFiltersFromProducts(
  products: HttpTypes.StoreProduct[]
): FilterSection[] {
  if (!products || !products.length) return []

  const filterMap = new Map<string, Map<string, number>>()
  
  // Initialize filter categories
  const filterCategories = [
    { key: 'trieda', title: 'Trieda' },
    { key: 'pouzitie', title: 'Použitie' },
    { key: 'typ_dreva', title: 'Typ dreva' },
    { key: 'dlzka_m', title: 'Dĺžka (m)' },
    { key: 'kusov_v_baliku', title: 'Kusov v balíku' },
    { key: 'kalk_plocha_balika_m2', title: 'Plocha balíka (m²)' },
    { key: 'rozmery_mm', title: 'Rozmery (mm)' },
    { key: 'opracovanie_dreva', title: 'Opracovanie dreva' }
  ]

  filterCategories.forEach(category => {
    filterMap.set(category.key, new Map())
  })

  // Count occurrences of each filter value
  products.forEach(product => {
    const metadata = product.metadata as ProductMetadata || {}
    
    filterCategories.forEach(category => {
      const value = metadata[category.key as keyof ProductMetadata]
      if (value) {
        const normalizedValue = normalizeValue(value)
        const categoryMap = filterMap.get(category.key)!
        categoryMap.set(normalizedValue, (categoryMap.get(normalizedValue) || 0) + 1)
      }
    })
  })

  // Convert to FilterSection format
  return filterCategories.map(category => {
    const categoryMap = filterMap.get(category.key)!
    const options: FilterOption[] = Array.from(categoryMap.entries())
      .map(([value, count]) => ({
        value,
        label: formatLabel(category.key, value),
        count
      }))
      .sort((a, b) => {
        // Sort by count descending, then by label ascending
        if (a.count !== b.count) {
          return b.count! - a.count!
        }
        return a.label.localeCompare(b.label, 'sk')
      })

    return {
      key: category.key as keyof ProductFilters,
      title: category.title,
      options
    }
  }).filter(section => section.options.length > 0)
}

/**
 * Normalize values for consistent comparison
 */
function normalizeValue(value: string | number): string {
  return String(value).trim().toLowerCase()
}

/**
 * Format labels for display
 */
function formatLabel(filterKey: string, value: string): string {
  switch (filterKey) {
    case 'trieda':
      return value.toUpperCase()
    case 'pouzitie':
      return value.charAt(0).toUpperCase() + value.slice(1)
    case 'typ_dreva':
      return value.charAt(0).toUpperCase() + value.slice(1)
    case 'dlzka_m':
      return `${value} m`
    case 'cena_m2_s_dph':
      return `${value} €/m²`
    case 'kusov_v_baliku':
      return `${value} ks`
    case 'kalk_plocha_balika_m2':
      return `${value} m²`
    case 'rozmery_mm':
      return `${value} `
    case 'opracovanie_dreva':
      return value.charAt(0).toUpperCase() + value.slice(1)
    default:
      return value
  }
}

/**
 * Create price range filters
 */
export function createPriceRangeFilters(prices: number[]): FilterOption[] {
  if (!prices.length) return []

  const sortedPrices = [...prices].sort((a, b) => a - b)
  const min = sortedPrices[0]
  const max = sortedPrices[sortedPrices.length - 1]
  
  // Create price ranges
  const ranges = [
    { min: 0, max: 50, label: 'Do 50 €' },
    { min: 50, max: 100, label: '50 - 100 €' },
    { min: 100, max: 200, label: '100 - 200 €' },
    { min: 200, max: 500, label: '200 - 500 €' },
    { min: 500, max: Infinity, label: 'Nad 500 €' }
  ]

  return ranges
    .filter(range => {
      // Only include ranges that have products
      return sortedPrices.some(price => price >= range.min && price < range.max)
    })
    .map(range => ({
      value: `${range.min}-${range.max}`,
      label: range.label,
      count: sortedPrices.filter(price => price >= range.min && price < range.max).length
    }))
}

/**
 * Check if a product matches a price range filter
 */
export function matchesPriceRange(price: number, rangeValue: string): boolean {
  const [min, max] = rangeValue.split('-').map(Number)
  return price >= min && (max === Infinity || price < max)
} 