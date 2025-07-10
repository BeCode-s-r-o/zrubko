"use client"

import { useCallback, useEffect, useState } from "react"
import { ProductFilters, type FilterSection } from "../../../../types/filters"
import { useFilters } from "@lib/hooks/use-filters"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  availableFilters: FilterSection[]
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ 
  availableFilters, 
  'data-testid': dataTestId 
}: RefinementListProps) => {
  const { 
    filters, 
    sortBy, 
    updateFilter, 
    updateSort, 
    resetFilters, 
    hasActiveFilters 
  } = useFilters()

  const handleSortChange = (name: string, value: SortOptions) => {
    updateSort(value)
  }

  return (
    <div className="w-80 bg-gradient-to-br from-white to-stone-50 border-r border-gray-200 p-8 h-full overflow-y-auto shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Filtre
        </h2>
        <p className="text-sm text-gray-500">Nájdite presne to, čo hľadáte</p>
      </div>

      {/* Sort Section */}
      <div className="mb-8">
        <SortProducts
          sortBy={sortBy}
          setQueryParams={handleSortChange}
          data-testid={dataTestId}
        />
      </div>
      
      {/* Filter Sections */}
      <div className="space-y-8">
        {availableFilters.map(filterSection => (
          <FilterSection
            key={filterSection.key}
            section={filterSection}
            activeValues={filters[filterSection.key] || []}
            onFilterChange={updateFilter}
          />
        ))}
      </div>
      
      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={resetFilters}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-150 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Resetovať filtre
          </button>
        </div>
      )}
    </div>
  )
}

// Component for individual filter section
const FilterSection = ({ 
  section, 
  activeValues, 
  onFilterChange 
}: {
  section: FilterSection
  activeValues: string[]
  onFilterChange: (filterKey: keyof ProductFilters, value: string, checked: boolean) => void
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredOptions = section.options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const shouldShowSearch = section.options.length > 8

  return (
    <div className="mb-8">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-amber-500 flex-1">
          {section.title}
        </h3>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <>
          {/* Search input for sections with many options */}
          {shouldShowSearch && (
            <div className="mb-4">
              <input
                type="text"
                placeholder={`Hľadať v ${section.title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          )}
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div key={option.value} className="relative group">
                <label className="flex items-center cursor-pointer group p-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-150 ease-in-out transform hover:scale-105">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={activeValues.includes(option.value)}
                      onChange={(e) => 
                        onFilterChange(section.key, option.value, e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-150 shadow-md ${
                      activeValues.includes(option.value)
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-transparent shadow-lg shadow-amber-500/25' 
                        : 'bg-white border-gray-300 group-hover:border-amber-400 group-hover:shadow-lg'
                    }`}>
                      {activeValues.includes(option.value) && (
                        <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between flex-1 ml-4">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                      {option.label}
                    </span>
                    {option.count && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RefinementList
