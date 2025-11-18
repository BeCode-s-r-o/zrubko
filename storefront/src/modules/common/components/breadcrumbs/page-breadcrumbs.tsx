"use client"

import Link from "next/link"

interface PageBreadcrumbsProps {
  items: Array<{
    label: string
    href?: string
    isActive?: boolean
  }>
  className?: string
}

const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({ 
  items,
  className = "" 
}) => {
  // Ak nemáme žiadne položky, neukážeme nič
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav className={`flex px-2 items-center mx-auto max-w-7xl mt-4 mb-4 space-x-2 text-sm relative ${className}`} aria-label="Breadcrumb">
      {/* Domov - vždy prvá položka */}
      <Link 
        href="/"
        className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular"
      >
        Domov
      </Link>

      {/* Ostatné položky */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-[4px] text-ui-fg-muted">/</span>
          
          {item.isActive ? (
            <span className="font-medium text-ui-fg-base underline text-small-regular">
              {item.label}
            </span>
          ) : item.href ? (
            <Link 
              href={item.href}
              className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ui-fg-subtle text-small-regular">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default PageBreadcrumbs

