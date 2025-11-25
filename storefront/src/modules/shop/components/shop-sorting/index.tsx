'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

interface ShopSortingProps {
  sortBy: SortOptions
  page: number
}

export default function ShopSorting({ sortBy, page }: ShopSortingProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    // Keep page when changing sort
    if (name === 'sortBy') {
      params.set('page', '1')
    }
    return params.toString()
  }

  return (
    <div className="ml-auto">
      <div className="dropdown">
        <a 
          href="#" 
          className="dropdown-toggle fs-14" 
          id="dropdownMenuButton" 
          data-toggle="dropdown"
          aria-haspopup="true" 
          aria-expanded="false"
        >
          {sortBy === 'price_asc' && 'Price low to high'}
          {sortBy === 'price_desc' && 'Price high to low'}
          {sortBy === 'created_at' && 'Default Sorting'}
        </a>
        <div 
          className="dropdown-menu dropdown-menu-right" 
          aria-labelledby="dropdownMenuButton"
        >
          <Link 
            className="dropdown-item text-primary fs-14" 
            href={`${pathname}?${createQueryString('sortBy', 'price_desc')}`}
          >
            Price high to low
          </Link>
          <Link 
            className="dropdown-item text-primary fs-14" 
            href={`${pathname}?${createQueryString('sortBy', 'price_asc')}`}
          >
            Price low to high
          </Link>
          <Link 
            className="dropdown-item text-primary fs-14" 
            href={`${pathname}?${createQueryString('sortBy', 'created_at')}`}
          >
            Random
          </Link>
        </div>
      </div>
    </div>
  )
}

