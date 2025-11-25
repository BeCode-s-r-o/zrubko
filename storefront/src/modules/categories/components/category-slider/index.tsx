'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HttpTypes } from '@medusajs/types'

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
  }, [categories])

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="pt-6">
      <div className="container-fluid">
        <div 
          className="category-slick-slider slick-slider"
          data-slick-options='{"slidesToShow": 4, "autoplay":true,"dots":true,"arrows":false,"responsive":[{"breakpoint": 1200,"settings": {"slidesToShow":4}},{"breakpoint": 992,"settings": {"slidesToShow":3}},{"breakpoint": 768,"settings": {"slidesToShow": 2}},{"breakpoint": 576,"settings": {"slidesToShow": 1}}]}'
        >
          {categories.map((category, index) => (
            <div key={category.id} className="box" data-animate="fadeInUp">
              <div className="card border-0">
                <div 
                  style={{ 
                    backgroundImage: `url('${category.metadata?.image || `/furnitor/images/c_0${(index % 4) + 7}.jpg`}')`,
                    height: '500px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  className="card-img"
                />
                <div className="card-img-overlay d-inline-flex flex-column px-6 py-4">
                  <h3 className="card-title fs-30 text-white">{category.name}</h3>
                  <div className="mt-auto">
                    <Link 
                      href={`/${countryCode}/categories/${category.handle}`}
                      className="text-uppercase fs-14 letter-spacing-05 border-bottom border-light-dark border-hover-primary font-weight-bold text-white"
                    >
                      Shop Now
                    </Link>
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

