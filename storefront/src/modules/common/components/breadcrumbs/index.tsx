"use client"

import Link from "next/link"

interface BreadcrumbsProps {
  productTitle?: string
  categoryPath?: Array<{ name: string; handle: string }>
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  productTitle,
  categoryPath,
  className = "" 
}) => {
  // Ak nemáme ani kategórie ani názov produktu, neukážeme nič
  if ((!categoryPath || categoryPath.length === 0) && !productTitle) {
    return null
  }

  return (
    <nav className={`flex items-center py-2 mb-2 space-x-2 text-sm relative ${className}`} aria-label="Breadcrumb">
      {/* Domov */}
      <Link 
        href="/"
        className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular"
      >
        Domov
      </Link>

      {/* Kategórie */}
      {categoryPath && categoryPath.length > 0 && categoryPath.map((category, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-[4px] text-ui-fg-muted">/</span>
          <Link 
            href={`/categories/${category.handle}`}
            className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular"
          >
            {category.name}
          </Link>
        </div>
      ))}



      {/* Názov produktu */}
      {productTitle && (
        <div className="flex items-center">
          <span className="mx-[4px] text-ui-fg-muted">/</span>
          <span className="font-medium text-ui-fg-base text-small-regular">
            {productTitle}
          </span>
        </div>
      )}
    </nav>
  )
}

export default Breadcrumbs 