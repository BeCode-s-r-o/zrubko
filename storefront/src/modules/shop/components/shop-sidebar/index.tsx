'use client'

import { HttpTypes } from '@medusajs/types'
import { usePathname, useSearchParams } from 'next/navigation'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface ShopSidebarProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}

export default function ShopSidebar({ categories, countryCode }: ShopSidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Filter top-level categories and sort by rank
  // Vylúčime "odporúčané produkty" zo sidebaru
  const topCategories = categories
    .filter(cat => {
      if (!cat.parent_category_id) {
        // Vylúčime odporúčané produkty
        const excludedHandles = ['odporucane-produkty', 'odporucane-produkty-homepage', 'najpredavanejsie-produkty']
        return !excludedHandles.includes(cat.handle || '')
      }
      return false
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .slice(0, 10)

  // Price ranges
  const priceRanges = [
    { label: 'All', min: 0, max: 999999 },
    { label: '$10 - $100', min: 10, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: '$300 - $400', min: 300, max: 400 },
  ]

  // Materials (for filtering)
  const materials = ['Laminate', 'Acrylic', 'Aluminium', 'Cotton', 'Leather', 'Metal']

  // Colors
  const colors = [
    { name: 'Natural Wood', value: '#d0a272' },
    { name: 'Dark Wood', value: '#68412d' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#aa5959' },
    { name: 'Blue', value: '#8db4d2' },
    { name: 'Green', value: '#c2c3a0' },
    { name: 'Pink', value: '#c7857d' },
    { name: 'White', value: '#e3e1e7' },
    { name: 'Purple', value: '#b490b0' },
  ]

  // Tags
  const tags = ['Vintage', 'Awesome', 'Summer', 'Beachwear', 'Sunglasses', 'Winter', 'Shorts', 'Cool', 'Nice']

  return (
    <div className="col-md-3 mb-10 mb-md-0 primary-sidebar sidebar-sticky" id="sidebar">
      <div className="primary-sidebar-inner">
        {/* Categories */}
        <div className="card border-0 mb-7">
          <div className="card-header bg-transparent border-0 p-0">
            <h3 className="card-title fs-20 mb-0">
              Categories
            </h3>
          </div>
          <div className="card-body px-0 pt-4 pb-0">
            <ul className="list-unstyled mb-0">
              {topCategories.length > 0 ? (
                topCategories.map((category) => (
                  <li key={category.id} className="mb-1">
                    <LocalizedClientLink 
                      href={`/categories/${category.handle}`}
                      className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <li className="mb-1 text-muted fs-14">Žiadne kategórie</li>
              )}
            </ul>
          </div>
        </div>

        {/* Price */}
        <div className="card border-0 mb-7">
          <div className="card-header bg-transparent border-0 p-0">
            <h3 className="card-title fs-20 mb-0">
              Price
            </h3>
          </div>
          <div className="card-body px-0 pt-4 pb-0">
            <ul className="list-unstyled mb-0">
              {priceRanges.map((range, index) => (
                <li key={index} className="mb-1">
                  <a 
                    href="#"
                    className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                  >
                    {range.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Material */}
        <div className="card border-0 mb-7">
          <div className="card-header bg-transparent border-0 p-0">
            <h3 className="card-title fs-20 mb-0">
              Material
            </h3>
          </div>
          <div className="card-body px-0 pt-4 pb-0">
            <ul className="list-unstyled mb-0">
              {materials.map((material) => (
                <li key={material} className="mb-1">
                  <a 
                    href="#"
                    className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                  >
                    {material}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colors */}
        <div className="card border-0 widget-color mb-7">
          <div className="card-header bg-transparent border-0 p-0">
            <h3 className="card-title fs-20 mb-0">
              Colors
            </h3>
          </div>
          <div className="card-body px-0 pt-4 pb-0">
            <ul className="list-inline mb-0">
              {colors.map((color) => (
                <li key={color.name} className="list-inline-item">
                  <a 
                    href="#"
                    className="d-block item" 
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="card border-0">
          <div className="card-header bg-transparent border-0 p-0">
            <h3 className="card-title fs-20 mb-0">
              Tags
            </h3>
          </div>
          <div className="card-body px-0 pt-6 pb-0">
            <ul className="list-inline mb-0">
              {tags.map((tag) => (
                <li key={tag} className="list-inline-item mr-2 py-1">
                  <a 
                    href="#"
                    className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

