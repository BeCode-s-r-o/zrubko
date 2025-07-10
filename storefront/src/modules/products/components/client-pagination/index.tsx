"use client"

import { clx } from "@medusajs/ui"

interface ClientPaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
  'data-testid'?: string
}

export function ClientPagination({
  page,
  totalPages,
  setPage,
  'data-testid': dataTestid
}: ClientPaginationProps) {
  
  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(
        "px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
        {
          "bg-amber-500 text-white shadow-lg shadow-amber-500/25": isCurrent,
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900": !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="px-3 py-2 text-sm text-gray-500 cursor-default"
    >
      ...
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  // Previous and Next buttons
  const renderNavButtons = () => (
    <>
      <button
        className={clx(
          "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg border",
          {
            "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed": page === 1,
            "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900": page > 1,
          }
        )}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Predchádzajúca
      </button>
      
      <div className="flex gap-1 items-center">
        {renderPageButtons()}
      </div>
      
      <button
        className={clx(
          "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg border",
          {
            "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed": page === totalPages,
            "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900": page < totalPages,
          }
        )}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Nasledujúca
      </button>
    </>
  )

  // Don't render if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Render the component
  return (
    <div className="flex justify-center w-full mt-12">
      <div className="flex gap-2 items-center" data-testid={dataTestid}>
        {renderNavButtons()}
      </div>
    </div>
  )
} 