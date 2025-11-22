'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'

export default function CategoryMenu() {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [loading, setLoading] = useState(true)

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
  const topLevelCategories = categories.filter(cat => {
    if (!cat.parent_category_id) {
      // Vylúčime OSMO a Najpredávanejšie produkty z hlavného menu
      const excludedHandles = ['osmo', 'najpredavanejsie-produkty']
      return !excludedHandles.includes(cat.handle || '')
    }
    return false
  })

  // Mapovanie kategórií na ikony (môžete pridať viac)
  const categoryIcons: Record<string, string> = {
    'shirts': '/furnitor/images/chair.png',
    'pants': '/furnitor/images/desk.png',
    'sweatshirts': '/furnitor/images/ladder.png',
    'merch': '/furnitor/images/plant.png',
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
            <Link 
              key={category.id} 
              href={`/categories/${category.handle}`} 
              className="dropdown-item media align-items-center border-bottom py-2"
            >
              <div className="w-28px mr-3">
                <Image 
                  src={categoryIcons[category.handle || ''] || '/furnitor/images/chair.png'} 
                  alt={category.name} 
                  width={28} 
                  height={28} 
                />
              </div>
              <div className="media-body">{category.name}</div>
            </Link>
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

