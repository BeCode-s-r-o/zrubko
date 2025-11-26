'use client'

import Link from 'next/link'
import { HttpTypes } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface ProductBreadcrumbV5Props {
  product: HttpTypes.StoreProduct
  countryCode: string
  previousProduct?: HttpTypes.StoreProduct | null
  nextProduct?: HttpTypes.StoreProduct | null
}

export default function ProductBreadcrumbV5({
  product,
  countryCode,
  previousProduct,
  nextProduct,
}: ProductBreadcrumbV5Props) {
  const category = product.categories?.[0]?.name || product.collection?.title || 'Shop'

  return (
    <section className="bg-color-3">
      <div className="container">
        <nav
          aria-label="breadcrumb"
          className="d-flex align-items-center justify-content-between"
        >
          <ol className="breadcrumb py-3 mr-6">
            <li className="breadcrumb-item">
              <LocalizedClientLink href="/">Home</LocalizedClientLink>
            </li>
            <li className="breadcrumb-item">
              <LocalizedClientLink href={`/${countryCode}/store`}> Shop </LocalizedClientLink>
            </li>
            {product.collection && (
              <li className="breadcrumb-item">
                <LocalizedClientLink href={`/${countryCode}/collections/${product.collection.handle}`}>
                  {product.collection.title}
                </LocalizedClientLink>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>

          <div className="navigation d-flex align-items-center">
            {/* Previous Product */}
            {previousProduct && (
              <div className="dropdown no-caret product-dropdown">
                <a
                  className="fs-14 pr-3 py-3 d-block dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  rel="prev"
                >
                  <i className="far fa-arrow-left"></i>
                </a>
                <div className="dropdown-menu w-215px p-2 border-0 dropdown-menu-right rounded-0">
                  <Link
                    href={`/${countryCode}/products/${previousProduct.handle}`}
                    className="media align-items-center"
                  >
                    <div className="w-60px mr-2">
                      {previousProduct.thumbnail ? (
                        <img
                          src={previousProduct.thumbnail}
                          alt={previousProduct.title || 'Previous product'}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="w-60px h-60px bg-light d-flex align-items-center justify-content-center">
                          <i className="far fa-image text-muted"></i>
                        </div>
                      )}
                    </div>
                    <div className="media-body">
                      <p className="font-weight-bold text-primary mb-0 lh-11 mb-1">
                        {previousProduct.title}
                      </p>
                      <p className="text-primary mb-0 lh-1 fs-14">
                        {previousProduct.variants?.[0]?.calculated_price?.calculated_amount
                          ? new Intl.NumberFormat('sk-SK', {
                              style: 'currency',
                              currency:
                                previousProduct.variants[0].calculated_price.currency_code || 'EUR',
                            }).format(
                              previousProduct.variants[0].calculated_price.calculated_amount / 100
                            )
                          : 'Price on request'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Next Product */}
            {nextProduct && (
              <div className="dropdown no-caret product-dropdown">
                <a
                  className="fs-14 py-3 d-block dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  rel="next"
                >
                  <i className="far fa-arrow-right"></i>
                </a>
                <div className="dropdown-menu w-215px p-2 border-0 dropdown-menu-right rounded-0">
                  <Link
                    href={`/${countryCode}/products/${nextProduct.handle}`}
                    className="media align-items-center"
                  >
                    <div className="w-60px mr-2">
                      {nextProduct.thumbnail ? (
                        <img
                          src={nextProduct.thumbnail}
                          alt={nextProduct.title || 'Next product'}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="w-60px h-60px bg-light d-flex align-items-center justify-content-center">
                          <i className="far fa-image text-muted"></i>
                        </div>
                      )}
                    </div>
                    <div className="media-body">
                      <p className="font-weight-bold text-primary mb-0 lh-11 mb-1">
                        {nextProduct.title}
                      </p>
                      <p className="text-primary mb-0 lh-1 fs-14">
                        {nextProduct.variants?.[0]?.calculated_price?.calculated_amount
                          ? new Intl.NumberFormat('sk-SK', {
                              style: 'currency',
                              currency:
                                nextProduct.variants[0].calculated_price.currency_code || 'EUR',
                            }).format(
                              nextProduct.variants[0].calculated_price.calculated_amount / 100
                            )
                          : 'Price on request'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </section>
  )
}

