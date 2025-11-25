'use client'

import { MouseEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { addToCart } from '@lib/data/cart'

export interface ProductGridItem {
  id: string
  name: string
  category: string
  price: string
  image: string
  link: string
  variantId?: string
}

interface ProductGridProps {
  title?: string | React.ReactNode
  products: ProductGridItem[]
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
}

export default function ProductGrid({
  title = 'Odporúčané produkty',
  products,
  showButton = true,
  buttonText = 'Kúpiť teraz',
  buttonLink = '/store'
}: ProductGridProps) {
  const params = useParams<{ countryCode: string }>()
  const countryCode = params?.countryCode

  const [pendingProductId, setPendingProductId] = useState<string | null>(null)
  const [successProductId, setSuccessProductId] = useState<string | null>(null)
  const [errorProductId, setErrorProductId] = useState<string | null>(null)

  useEffect(() => {
    if (!successProductId) return
    const timer = window.setTimeout(() => setSuccessProductId(null), 2500)
    return () => window.clearTimeout(timer)
  }, [successProductId])

  useEffect(() => {
    if (!errorProductId) return
    const timer = window.setTimeout(() => setErrorProductId(null), 3500)
    return () => window.clearTimeout(timer)
  }, [errorProductId])

  const handleAddToCart = useCallback(
    async (
      event: MouseEvent<HTMLButtonElement>,
      product: ProductGridItem
    ) => {
      event.preventDefault()
      event.stopPropagation()

      if (!countryCode || !product.variantId || pendingProductId === product.id) {
        return
      }

      try {
        setErrorProductId(null)
        setSuccessProductId(null)
        setPendingProductId(product.id)

        console.log('[ProductGrid] Adding to cart:', {
          productId: product.id,
          variantId: product.variantId,
          countryCode,
        })

        await addToCart({
          variantId: product.variantId,
          quantity: 1,
          countryCode,
        })

        console.log('[ProductGrid] Successfully added to cart')
        setSuccessProductId(product.id)
        
        // Dispatch custom event pre aktualizáciu košíka v headeri
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart:updated'))
        }
      } catch (error: any) {
        console.error('[ProductGrid] Failed to add to cart:', {
          productId: product.id,
          variantId: product.variantId,
          error: error.message,
          errorDetails: error,
        })
        setErrorProductId(product.id)
      } finally {
        setPendingProductId(null)
      }
    },
    [countryCode, pendingProductId]
  )

  return (
    <section className="pb-11 pb-lg-15">
      <div className="container">
        <h2 className="mb-8 text-center fs-30 fs-md-40">{title}</h2>
        <div className="row">
          {products.length === 0 && (
            <div className="col-12">
              <div className="text-center text-muted py-5">
                Momentálne nemáme v tejto sekcii žiadne produkty. Skúste to prosím neskôr.
              </div>
            </div>
          )}
          {products.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-3 mb-8" data-animate="fadeInUp">
              <div className="card border-0 hover-change-content product">
                <div className="card-img-top position-relative" style={{ height: '350px' }}>
                  <div 
                    className="card-img ratio bg-img-cover-center ratio-1-1"
                    style={{ 
                      backgroundImage: `url('${product.image}')`,
                      width: '100%',
                      height: '350px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="position-absolute pos-fixed-bottom px-4 px-sm-6 pb-5 d-flex w-100 justify-content-center content-change-horizontal">
                    {product.variantId ? (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title={
                          successProductId === product.id
                            ? 'Pridané do košíka'
                            : errorProductId === product.id
                            ? 'Skúste znova'
                            : 'Pridať do košíka'
                        }
                        className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
                        onClick={(event) => handleAddToCart(event, product)}
                        disabled={pendingProductId === product.id}
                        aria-disabled={pendingProductId === product.id}
                      >
                        <i
                          className={
                            pendingProductId === product.id
                              ? 'far fa-spinner fa-spin'
                              : successProductId === product.id
                              ? 'far fa-check'
                              : errorProductId === product.id
                              ? 'far fa-exclamation'
                              : 'far fa-shopping-basket'
                          }
                          aria-hidden="true"
                        ></i>
                        <span className="sr-only" aria-live="polite">
                          {pendingProductId === product.id
                            ? 'Pridávame do košíka'
                            : successProductId === product.id
                            ? 'Produkt bol pridaný do košíka'
                            : errorProductId === product.id
                            ? 'Nastala chyba, skúste to znova'
                            : 'Pridať do košíka'}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={product.link}
                        data-toggle="tooltip"
                        title="Zobraziť detail"
                        className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border opacity-50"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <i className="far fa-eye" aria-hidden="true"></i>
                        <span className="sr-only">Zobraziť detail produktu</span>
                      </Link>
                    )}
                    <a href="#" data-toggle="tooltip" title="Add to favourite" className="add-to-wishlist d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="#" data-toggle="tooltip" title="Add to compare" className="add-to-compare d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border">
                      <i className="far fa-random"></i>
                    </a>
                    <a href="#" data-toggle="tooltip" title="Preview" className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle border">
                      <i className="far fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body px-0 pt-4 pb-0 d-flex align-items-end">
                  <div className="mr-auto">
                    <Link href={product.link} className="text-uppercase text-muted letter-spacing-05 fs-12 d-block font-weight-500">
                      {product.category}
                    </Link>
                    <Link href={product.link} className="font-weight-bold mt-1 d-block">
                      {product.name}
                    </Link>
                  </div>
                  <p className="text-primary mb-0 font-weight-500">{product.price || 'Na dopyt'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showButton && (
          <div className="text-center">
            <Link href={buttonLink} className="btn btn-outline-primary text-uppercase letter-spacing-05">
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

