'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import { usePathname } from 'next/navigation'

export default function OsmoMenu() {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  
  // Získanie country code z pathname
  const countryCode = pathname.split('/')[1] || 'sk'

  useEffect(() => {
    async function loadOsmoCategories() {
      try {
        // Načítame všetky kategórie
        const { product_categories } = await sdk.store.category.list({
          fields: '+rank',
          order: 'rank'
        })
        
        // Nájdeme parent kategóriu "OSMO" podľa handle
        const osmoParent = product_categories?.find(
          (cat) => cat.handle === 'osmo' && !cat.parent_category_id
        )
        
        if (osmoParent) {
          // Filtrujeme len kategórie, ktoré majú parent_category_id = OSMO
          const osmoCategories = product_categories?.filter(
            (cat) => cat.parent_category_id === osmoParent.id
          ) || []
          setCategories(osmoCategories)
        } else {
          setCategories([])
        }
      } catch (error) {
        console.error('Error loading OSMO categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOsmoCategories()
  }, [])

  // Mapovanie kategórií na ikony (rovnaké ako v CategoryMenu)
  const categoryIcons: Record<string, string> = {
    'shirts': '/furnitor/images/chair.png',
    'pants': '/furnitor/images/desk.png',
    'sweatshirts': '/furnitor/images/ladder.png',
    'merch': '/furnitor/images/plant.png',
  }

  return (
    <li className="nav-item dropdown-item-shop dropdown py-2 py-xl-5 px-0 px-xl-4">
      <a href={`/${countryCode}/store`} className="nav-link dropdown-toggle p-0" id="osmoDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => e.preventDefault()}>
        OSMO <span className="caret"></span>
      </a>
      <div className="dropdown-menu py-0" aria-labelledby="osmoDropdown" style={{ minWidth: '200px' }}>
        {loading ? (
          <div className="dropdown-item py-2 text-muted">
            Načítavam kategórie...
          </div>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <Link 
              key={category.id}
              href={`/${countryCode}/categories/${category.handle}`}
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
    </li>
  )
}

