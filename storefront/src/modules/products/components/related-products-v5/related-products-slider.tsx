'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { HttpTypes } from '@medusajs/types'
import { convertToLocale } from '@lib/util/money'

function RelatedProductsSlider({
  products,
  region,
  countryCode,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initSlider = () => {
      if (
        typeof window === 'undefined' ||
        !window.$ ||
        !window.$.fn ||
        !window.$.fn.slick
      ) {
        return
      }

      if (sliderRef.current) {
        const $slider = window.$(sliderRef.current)
        if ($slider.length && !$slider.hasClass('slick-initialized')) {
          $slider.slick({
            slidesToShow: 4,
            autoplay: false,
            dots: false,
            arrows: false,
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          })
        }
      }
    }

    const timer = setTimeout(initSlider, 100)

    return () => {
      clearTimeout(timer)
      if (
        typeof window !== 'undefined' &&
        window.$ &&
        window.$.fn &&
        window.$.fn.slick
      ) {
        if (sliderRef.current) {
          const $slider = window.$(sliderRef.current)
          if ($slider.length && $slider.hasClass('slick-initialized')) {
            $slider.slick('unslick')
          }
        }
      }
    }
  }, [products])

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No related products available.</p>
      </div>
    )
  }

  return (
    <div
      className="slick-slider"
      ref={sliderRef}
      data-slick-options='{"slidesToShow": 4, "autoplay":false,"dots":false,"arrows":false,"responsive":[{"breakpoint": 992,"settings": {"slidesToShow":3}},{"breakpoint": 768,"settings": {"slidesToShow": 2}},{"breakpoint": 576,"settings": {"slidesToShow": 1}}]}'
    >
      {products.map((product) => {
        const variant = product.variants?.[0]
        const price = variant?.calculated_price?.calculated_amount || 0
        const formattedPrice = convertToLocale({
          amount: price / 100,
          currency_code: region.currency_code || 'EUR',
        })
        const category = product.categories?.[0]?.name || product.collection?.title || 'Product'
        const thumbnail = product.thumbnail || '/furnitor/images/placeholder.jpg'

        return (
          <div key={product.id} className="box">
            <div className="card border-0 hover-change-content product">
              <div
                style={{
                  backgroundImage: `url('${thumbnail}')`,
                }}
                className="card-img ratio bg-img-cover-center ratio-1-1"
              ></div>
              <div className="card-img-overlay d-flex py-4 py-sm-5 pl-6 pr-4">
                <div className="d-flex flex-column">
                  <Link
                    href={`/${countryCode}/products/${product.handle}`}
                    className="font-weight-bold mb-1 d-block lh-12"
                  >
                    {product.title}
                  </Link>
                  <Link
                    href={`/${countryCode}/collections/${product.collection?.handle || 'store'}`}
                    className="text-uppercase text-muted letter-spacing-05 fs-12 font-weight-500"
                  >
                    {category}
                  </Link>
                  <p className="mt-auto text-primary mb-0 font-weight-500">
                    {formattedPrice}
                  </p>
                </div>
                <div className="ml-auto d-flex flex-column">
                  <div className="my-auto content-change-vertical">
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to card"
                      className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mb-2 border"
                    >
                      <i className="far fa-shopping-basket"></i>
                    </a>
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to favourite"
                      className="add-to-wishlist d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mb-2 border"
                    >
                      <i className="far fa-heart"></i>
                    </a>
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to compare"
                      className="add-to-compare d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mb-2 border"
                    >
                      <i className="far fa-random"></i>
                    </a>
                    <Link
                      href={`/${countryCode}/products/${product.handle}`}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Preview"
                      className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mb-2 border"
                    >
                      <i className="far fa-eye"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RelatedProductsSlider
