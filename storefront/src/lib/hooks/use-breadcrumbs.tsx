import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

interface BreadcrumbsConfig {
  productTitle?: string
  categoryPath?: Array<{ name: string; handle: string }>
  collectionName?: string
  customItems?: BreadcrumbItem[]
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

export const useBreadcrumbs = (config?: BreadcrumbsConfig): BreadcrumbItem[] => {
  const pathname = usePathname()
  
  // Ak sú poskytnuté vlastné breadcrumbs
  if (config?.customItems) {
    return config.customItems
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Odstráň country code (sk, en, atď.)
  const filteredSegments = pathSegments.filter(segment => 
    segment.length > 2 || !segment.match(/^[a-z]{2}$/)
  )
  
  // Ak sme na home page
  if (filteredSegments.length === 0) {
    return []
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: translations.home,
      href: "/",
      isActive: false
    }
  ]

  // Špecialné spracovanie pre produkty s kategóriami
  if (config?.categoryPath && config.categoryPath.length > 0) {
    // Pridaj kategórie
    config.categoryPath.forEach((category, index) => {
      const categoryPath = config.categoryPath!
        .slice(0, index + 1)
        .map(cat => cat.handle)
        .join('/')
      
      breadcrumbs.push({
        label: category.name,
        href: `/categories/${categoryPath}`,
        isActive: false
      })
    })
    
    // Pridaj produkt ak je zadaný
    if (config.productTitle) {
      breadcrumbs.push({
        label: config.productTitle,
        href: pathname,
        isActive: true
      })
    }
    
    return breadcrumbs
  }

  // Špecialné spracovanie pre kolekcie
  if (config?.collectionName && filteredSegments[0] === 'collections') {
    breadcrumbs.push({
      label: translations.collections,
      href: '/collections',
      isActive: false
    })
    
    breadcrumbs.push({
      label: config.collectionName,
      href: pathname,
      isActive: true
    })
    
    return breadcrumbs
  }

  // Štandardné spracovanie
  let currentPath = ""
  
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Preskočí UUID-like segmenty (product handles a podobne)
    if (segment.match(/^[a-f0-9-]{36}$/)) {
      return
    }
    
    // Preklad segmentu
    const translatedSegment = translations[segment as keyof typeof translations] || 
                              segment.replace(/-/g, ' ')
                                   .replace(/\b\w/g, l => l.toUpperCase())
    
    const isLast = index === filteredSegments.length - 1
    
    breadcrumbs.push({
      label: translatedSegment,
      href: currentPath,
      isActive: isLast
    })
  })

  return breadcrumbs
} 