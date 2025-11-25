'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { HttpTypes } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface CategorySliderProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}

export default function CategorySlider({ categories, countryCode }: CategorySliderProps) {
  useEffect(() => {
    const initSlider = () => {
      if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.slick) {
        const $slider = window.$('.category-slick-slider')
        if ($slider.length && !$slider.hasClass('slick-initialized')) {
          $slider.slick({
            slidesToShow: 4,
            autoplay: true,
            dots: true,
            arrows: false,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          })
        }
      }
    }

    // Počkaj na načítanie Slick pluginu
    const timer = setTimeout(initSlider, 100)

    return () => {
      clearTimeout(timer)
      if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.slick) {
        const $slider = window.$('.category-slick-slider')
        if ($slider.length && $slider.hasClass('slick-initialized')) {
          $slider.slick('unslick')
        }
      }
    }
  }, [])

  // Filter top-level categories, sort by rank, and limit to reasonable number
  // Vylúčime "odporúčané produkty" z category slidera
  const displayCategories = categories
    .filter(cat => {
      if (!cat.parent_category_id) {
        // Vylúčime odporúčané produkty
        const excludedHandles = ['odporucane-produkty', 'odporucane-produkty-homepage', 'najpredavanejsie-produkty']
        return !excludedHandles.includes(cat.handle || '')
      }
      return false
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .slice(0, 8)

  // Don't render slider if no categories
  if (displayCategories.length === 0) {
    return null
  }

  return (
    <div className="pt-6">
      <div className="container-fluid">
        <div 
          className="category-slick-slider slick-slider"
          data-slick-options='{"slidesToShow": 4, "autoplay":true,"dots":true,"arrows":false,"responsive":[{"breakpoint": 1200,"settings": {"slidesToShow":4}},{"breakpoint": 992,"settings": {"slidesToShow":3}},{"breakpoint": 768,"settings": {"slidesToShow": 2}},{"breakpoint": 576,"settings": {"slidesToShow": 1}}]}'
        >
          {displayCategories.map((category, index) => (
            <div key={category.id} className="box" data-animate="fadeInUp">
              <div className="card border-0">
                <Image 
                  src={category.metadata?.image as string || `/furnitor/images/c_0${(index % 4) + 7}.jpg`}
                  alt={category.name || 'Category'}
                  width={400}
                  height={500}
                  className="card-img"
                  style={{ objectFit: 'cover', height: '500px' }}
                />
                <div className="card-img-overlay d-inline-flex flex-column px-6 py-4">
                  <h3 className="card-title fs-30 text-white">{category.name}</h3>
                  <div className="mt-auto">
                    <LocalizedClientLink 
                      href={`/categories/${category.handle}`}
                      className="text-uppercase fs-14 letter-spacing-05 border-bottom border-light-dark border-hover-primary font-weight-bold text-white"
                    >
                      Shop Now
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

