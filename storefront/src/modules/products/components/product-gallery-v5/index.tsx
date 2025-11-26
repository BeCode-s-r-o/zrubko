'use client'

import { useEffect, useRef } from 'react'
import { HttpTypes } from '@medusajs/types'

interface ProductGalleryV5Props {
  images: HttpTypes.StoreProductImage[]
}

export default function ProductGalleryV5({ images }: ProductGalleryV5Props) {
  const sliderForRef = useRef<HTMLDivElement>(null)
  const sliderNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initSliders = () => {
      if (
        typeof window === 'undefined' ||
        !window.$ ||
        !window.$.fn ||
        !window.$.fn.slick
      ) {
        return
      }

      const $ = window.$

      // Initialize main slider
      if (sliderForRef.current) {
        const $sliderFor = $(sliderForRef.current)
        if ($sliderFor.length && !$sliderFor.hasClass('slick-initialized')) {
          $sliderFor.slick({
            slidesToShow: 1,
            autoplay: false,
            dots: false,
            arrows: false,
            asNavFor: sliderNavRef.current || undefined,
          })
        }
      }

      // Initialize navigation slider
      if (sliderNavRef.current) {
        const $sliderNav = $(sliderNavRef.current)
        if ($sliderNav.length && !$sliderNav.hasClass('slick-initialized')) {
          $sliderNav.slick({
            slidesToShow: 4,
            autoplay: false,
            dots: false,
            arrows: false,
            asNavFor: sliderForRef.current || undefined,
            focusOnSelect: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  arrows: false,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 2,
                  arrows: false,
                },
              },
            ],
          })
        }
      }
    }

    // Wait for Slick plugin to load
    const timer = setTimeout(initSliders, 100)

    // Cleanup
    return () => {
      clearTimeout(timer)
      if (
        typeof window !== 'undefined' &&
        window.$ &&
        window.$.fn &&
        window.$.fn.slick
      ) {
        const $ = window.$
        if (sliderForRef.current) {
          const $sliderFor = $(sliderForRef.current)
          if ($sliderFor.length && $sliderFor.hasClass('slick-initialized')) {
            $sliderFor.slick('unslick')
          }
        }
        if (sliderNavRef.current) {
          const $sliderNav = $(sliderNavRef.current)
          if ($sliderNav.length && $sliderNav.hasClass('slick-initialized')) {
            $sliderNav.slick('unslick')
          }
        }
      }
    }
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="galleries position-relative">
        <div className="card p-0 hover-change-image rounded-0 border-0">
          <div className="card-img ratio ratio-1-1 bg-img-cover-center bg-light">
            <div className="d-flex align-items-center justify-content-center h-100">
              <i className="far fa-image fs-48 text-muted"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="galleries position-relative">
      {/* Wishlist and Compare buttons - presne ako v HTML */}
      <div className="position-absolute pos-fixed-top-right pr-4 pt-4 z-index-2">
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
      </div>

      {/* Main slider - presne ako v HTML s data-slick-options */}
      <div
        className="slick-slider slider-for"
        ref={sliderForRef}
        data-slick-options='{"slidesToShow": 1, "autoplay":false,"dots":false,"arrows":false,"asNavFor": ".slider-nav"}'
      >
        {images.map((image, index) => (
          <div key={image.id || index} className="box">
            <div className="card p-0 hover-change-image rounded-0 border-0">
              <a
                href={image.url || '#'}
                className="card-img ratio ratio-1-1 bg-img-cover-center"
                data-gtf-mfp="true"
                data-gallery-id="02"
                style={{
                  backgroundImage: image.url ? `url('${image.url}')` : 'none',
                }}
              ></a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation slider - presne ako v HTML s data-slick-options */}
      {images.length > 1 && (
        <div
          className="slick-slider slider-nav mt-1 mx-n1"
          ref={sliderNavRef}
          data-slick-options='{"slidesToShow": 4, "autoplay":false,"dots":false,"arrows":false,"asNavFor": ".slider-for","focusOnSelect": true,"responsive":[{"breakpoint": 768,"settings": {"slidesToShow": 3,"arrows":false}},{"breakpoint": 576,"settings": {"slidesToShow": 2,"arrows":false}}]}'
        >
          {images.map((image, index) => (
            <div key={image.id || index} className="box px-0">
              <div className="bg-white p-1 h-100 rounded-0">
                {image.url ? (
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="h-100 w-100"
                  />
                ) : (
                  <div className="h-100 w-100 bg-light d-flex align-items-center justify-content-center">
                    <i className="far fa-image text-muted"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
