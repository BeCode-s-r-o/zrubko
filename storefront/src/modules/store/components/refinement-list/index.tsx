"use client"

import { useCallback, useEffect, useState } from "react"
import { ProductFilters, type FilterSection } from "../../../../types/filters"
import { useFilters } from "@lib/hooks/use-filters"

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
    updateFilter, 
    resetFilters, 
    hasActiveFilters 
  } = useFilters()

  // Check if this is mobile filters (no border, different styling)
  const isMobileFilters = dataTestId === 'mobile-filters'

  return (
    <div className={`bg-white ${isMobileFilters ? '':'border lg:border-r border-gray-200 lg:ml-4 lg:w-64 overflow-y-auto p-4 h-full'} lg:p-6`}>
      {/* Header - Only show on desktop */}
      <div className="hidden pb-4 mb-6 border-b border-gray-200 lg:block">
        <div className="flex gap-2 items-center mb-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="text-lg">
            Filtrovanie
          </h2>
        </div>
      </div>
      
      {/* Filter Sections */}
      <div className="space-y-0">
        {availableFilters.map((filterSection, index) => (
          <div key={filterSection.key}>
            <FilterSection
              section={filterSection}
              activeValues={filters[filterSection.key] || []}
              onFilterChange={updateFilter}
            />
            {index < availableFilters.length - 1 && (
              <div className="my-4 border-b border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="pt-4 mt-6 border-t border-gray-200">
          <button 
            onClick={resetFilters}
            className="px-4 py-2 w-full font-medium text-gray-700 bg-gray-100 rounded transition-colors duration-200 hover:bg-gray-200"
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
  
  return (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">
          {section.title}
        </h3>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {section.options.map((option) => (
            <div key={option.value} className="flex items-center">
              <label className="flex items-center py-1 w-full cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeValues.includes(option.value)}
                  onChange={(e) => 
                    onFilterChange(section.key, option.value, e.target.checked)
                  }
                  className="w-4 h-4 text-gray-600 rounded border-gray-300 focus:ring-gray-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {option.label}
                </span>
                {option.count && (
                  <span className="ml-auto text-xs text-gray-500">
                    ({option.count})
                  </span>
                )}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RefinementList;
