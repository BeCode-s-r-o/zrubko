'use client'

import { useEffect, useRef } from 'react'

// Statické produkty z Furnitor témy - presne ako v HTML
const FURNITOR_RELATED_PRODUCTS = [
  {
    id: '1',
    image: '/furnitor/images/product-16.jpg',
    title: 'Bow Chair',
    category: 'chair',
    price: '$1390.00',
  },
  {
    id: '2',
    image: '/furnitor/images/product-04.jpg',
    title: 'Piper Bar',
    category: 'table',
    price: '$1390.00',
  },
  {
    id: '3',
    image: '/furnitor/images/product-06.jpg',
    title: 'Golden Clock',
    category: 'decor',
    price: '$1390.00',
  },
  {
    id: '4',
    image: '/furnitor/images/product-05.jpg',
    title: 'Piper Bar',
    category: 'Table',
    price: '$1390.00',
  },
]

export default function RelatedProductsV5Static() {
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

      const $ = window.$

      if (sliderRef.current) {
        const $slider = $(sliderRef.current)
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
        const $ = window.$
        if (sliderRef.current) {
          const $slider = $(sliderRef.current)
          if ($slider.length && $slider.hasClass('slick-initialized')) {
            $slider.slick('unslick')
          }
        }
      }
    }
  }, [])

  return (
    <div
      className="slick-slider"
      ref={sliderRef}
      data-slick-options='{"slidesToShow": 4, "autoplay":false,"dots":false,"arrows":false,"responsive":[{"breakpoint": 992,"settings": {"slidesToShow":3}},{"breakpoint": 768,"settings": {"slidesToShow": 2}},{"breakpoint": 576,"settings": {"slidesToShow": 1}}]}'
    >
      {FURNITOR_RELATED_PRODUCTS.map((product) => (
        <div key={product.id} className="box">
          <div className="card border-0 hover-change-content product">
            <div
              style={{ backgroundImage: `url('${product.image}')` }}
              className="card-img ratio bg-img-cover-center ratio-1-1"
            ></div>
            <div className="card-img-overlay d-flex py-4 py-sm-5 pl-6 pr-4">
              <div className="d-flex flex-column">
                <a href="#" className="font-weight-bold mb-1 d-block lh-12">
                  {product.title}
                </a>
                <a
                  href="#"
                  className="text-uppercase text-muted letter-spacing-05 fs-12 font-weight-500"
                >
                  {product.category}
                </a>
                <p className="mt-auto text-primary mb-0 font-weight-500">{product.price}</p>
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
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Preview"
                    className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mb-2 border"
                  >
                    <i className="far fa-eye"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

