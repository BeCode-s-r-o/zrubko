"use client"

import Link from "next/link"
import ChevronRight from "@modules/common/icons/chevron-right"
import { useBreadcrumbs } from "@lib/hooks/use-breadcrumbs"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  productTitle?: string
  categoryPath?: Array<{ name: string; handle: string }>
  collectionName?: string
  customBreadcrumbs?: BreadcrumbItem[]
  className?: string
}

// Slovenské preklady pre breadcrumbs
const translations = {
  home: "Domov",
  products: "Produkty",
  categories: "Kategórie",
  collections: "Kolekcie",
  store: "Obchod",
  search: "Vyhľadávanie",
  cart: "Košík",
  account: "Účet",
  contact: "Kontakt",
  checkout: "Pokladňa",
  orders: "Objednávky",
  addresses: "Adresy",
  profile: "Profil",
  results: "Výsledky"
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  productTitle,
  categoryPath,
  collectionName,
  customBreadcrumbs, 
  className = "" 
}) => {
  const breadcrumbs = useBreadcrumbs({
    productTitle,
    categoryPath,
    collectionName,
    customItems: customBreadcrumbs
  })
  
  // Ak nemáme breadcrumbs, neukážeme nič
  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <nav className={`flex items-center py-2 mb-2 space-x-2 text-sm relative ${className}`} aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight 
              className="mx-2 w-4 h-4 text-ui-fg-muted" 
              size="16"
            />
          )}
          {item.isActive ? (
            <span className="font-medium text-ui-fg-base text-small-regular">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs 