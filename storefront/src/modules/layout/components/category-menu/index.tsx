'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function CategoryMenu() {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const countryCode = params.countryCode as string

  useEffect(() => {
    async function loadCategories() {
      try {
        const { product_categories } = await sdk.store.category.list({
          fields: '+category_children,+rank',
          order: 'rank'
        })
        setCategories(product_categories || [])
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Filtrujeme len top-level kategórie (bez parent_category)
  // Vylúčime "OSMO" a "Najpredávanejšie produkty" - tie majú vlastné menu
  const topLevelCategories = categories
    .filter(cat => {
      if (!cat.parent_category_id) {
        // Vylúčime OSMO a Najpredávanejšie produkty z hlavného menu
        const excludedHandles = ['osmo', 'najpredavanejsie-produkty']
        return !excludedHandles.includes(cat.handle || '')
      }
      return false
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))

  // Mapovanie kategórií na ikony - použijeme metadata.image ak existuje, inak default ikonu
  const getCategoryIcon = (category: HttpTypes.StoreProductCategory) => {
    // Skús najprv metadata.image
    if (category.metadata?.image) {
      return category.metadata.image as string
    }
    
    // Potom skús handle-based mapping
    const categoryIcons: Record<string, string> = {
      'drevene-obklady': '/furnitor/images/chair.png',
      'drevene-podlahy': '/furnitor/images/chair.png',
      'obklady-termodrevo': '/furnitor/images/chair.png',
      'podlahy-termodrevo': '/furnitor/images/chair.png',
      'terasove-dosky': '/furnitor/images/chair.png',
      'drevo-do-sauny': '/furnitor/images/chair.png',
      'drevene-hranoly-a-listy': '/furnitor/images/chair.png',
      'kvh-hranoly': '/furnitor/images/chair.png',
      'odporucane-produkty': '/furnitor/images/chair.png',
      'shirts': '/furnitor/images/chair.png',
      'pants': '/furnitor/images/desk.png',
      'sweatshirts': '/furnitor/images/ladder.png',
      'merch': '/furnitor/images/plant.png',
    }
    
    return categoryIcons[category.handle || ''] || '/furnitor/images/chair.png'
  }

  return (
    <div className="dropdown no-caret">
      <a 
        href="#" 
        className="btn dropdown-toggle btn-primary d-flex w-100 text-left align-items-center px-0 px-xl-4 border-0 shadow-none" 
        id="dropdownMenuButton1" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"
      >
        <div className="toggle-bar">
          <span className="toggle-icon text-white"></span>
        </div>
        <div className="pl-5">{loading ? 'Načítavam...' : 'Kategórie'}</div>
      </a>
      <div className="dropdown-menu w-100 py-0" aria-labelledby="dropdownMenuButton1">
        {loading ? (
          <div className="dropdown-item py-2 text-muted">
            Načítavam kategórie...
          </div>
        ) : topLevelCategories.length > 0 ? (
          topLevelCategories.map((category) => (
            <LocalizedClientLink 
              key={category.id} 
              href={`/categories/${category.handle}`} 
              className="dropdown-item media align-items-center border-bottom py-2"
            >
              <div className="w-28px mr-3">
                <Image 
                  src={getCategoryIcon(category)} 
                  alt={category.name} 
                  width={28} 
                  height={28} 
                />
              </div>
              <div className="media-body">{category.name}</div>
            </LocalizedClientLink>
          ))
        ) : (
          <div className="dropdown-item py-2 text-muted">
            Žiadne kategórie
          </div>
        )}
      </div>
    </div>
  )
}

