'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

interface ShopPaginationProps {
  sortBy: SortOptions
  page: number
  totalCount: number
  productsPerPage: number
}

export default function ShopPagination({ 
  sortBy, 
  page, 
  totalCount, 
  productsPerPage 
}: ShopPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  const totalPages = Math.ceil(totalCount / productsPerPage)

  if (totalPages <= 1) {
    return null
  }

  const pages: (number | string)[] = []
  
  if (totalPages <= 7) {
    // Show all pages if 7 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (page > 3) {
      pages.push('...')
    }
    
    // Show pages around current page
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (page < totalPages - 2) {
      pages.push('...')
    }
    
    // Show last page
    pages.push(totalPages)
  }

  return (
    <nav className="pt-4 overflow-hidden">
      <ul className="pagination justify-content-center align-items-center mb-0">
        {page > 1 && (
          <li className="page-item fs-12 d-none d-sm-block">
            <Link 
              className="page-link" 
              href={`${pathname}?${createQueryString('page', String(page - 1))}`}
              tabIndex={-1}
            >
              <i className="far fa-angle-double-left"></i>
            </Link>
          </li>
        )}
        
        {pages.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <li key={`ellipsis-${index}`} className="page-item">
                <a className="page-link" href="#">...</a>
              </li>
            )
          }
          
          return (
            <li 
              key={pageNum} 
              className={`page-item ${pageNum === page ? 'active' : ''}`}
              aria-current={pageNum === page ? 'page' : undefined}
            >
              <Link 
                className="page-link" 
                href={`${pathname}?${createQueryString('page', String(pageNum))}`}
              >
                {pageNum}
              </Link>
            </li>
          )
        })}

        {page < totalPages && (
          <li className="page-item fs-12 d-none d-sm-block">
            <Link 
              className="page-link" 
              href={`${pathname}?${createQueryString('page', String(page + 1))}`}
            >
              <i className="far fa-angle-double-right"></i>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

