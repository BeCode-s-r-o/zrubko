import React from "react"

type Variant = {
  id: string
  size: string
  treatment: string
  material: string
  length: number
  pricePerM2: number
  m2PerPiece: number
  availability: "in_stock" | "available_soon" | "unavailable"
  image: string
}

type Filters = {
  size: string
  treatment: string
  material: string
}

type FilterSectionProps = {
  filters: Filters
  onFilterChange: (filters: Filters) => void
  variants: Variant[]
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  variants,
}) => {
  // Získanie unikátnych hodnôt pre filter možnosti
  const uniqueSizes = Array.from(new Set(variants.map(v => v.size)))
  const uniqueTreatments = Array.from(new Set(variants.map(v => v.treatment)))
  const uniqueMaterials = Array.from(new Set(variants.map(v => v.material)))

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    })
  }

  return (
    <div className="bg-ui-bg-subtle rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtrovať varianty</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filter rozmerov */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Rozmer
          </label>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            className="w-full h-10 px-3 border rounded-lg border-ui-border-base focus:border-ui-border-interactive focus:outline-none bg-ui-bg-base"
          >
            <option value="all">Všetky rozmery</option>
            {uniqueSizes.map(size => (
              <option key={size} value={size}>
                {size} mm
              </option>
            ))}
          </select>
        </div>

        {/* Filter ošetrenia */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Typ ošetrenia
          </label>
          <select
            value={filters.treatment}
            onChange={(e) => handleFilterChange('treatment', e.target.value)}
            className="w-full h-10 px-3 border rounded-lg border-ui-border-base focus:border-ui-border-interactive focus:outline-none bg-ui-bg-base"
          >
            <option value="all">Všetky typy</option>
            {uniqueTreatments.map(treatment => (
              <option key={treatment} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
        </div>

        {/* Filter materiálu */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Materiál
          </label>
          <select
            value={filters.material}
            onChange={(e) => handleFilterChange('material', e.target.value)}
            className="w-full h-10 px-3 border rounded-lg border-ui-border-base focus:border-ui-border-interactive focus:outline-none bg-ui-bg-base"
          >
            <option value="all">Všetky materiály</option>
            {uniqueMaterials.map(material => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset filters tlačidlo */}
      <div className="mt-4">
        <button
          onClick={() => onFilterChange({ size: "all", treatment: "all", material: "all" })}
          className="text-sm text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
        >
          Zmazať všetky filtre
        </button>
      </div>
    </div>
  )
}

export default FilterSection 