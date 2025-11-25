'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HttpTypes } from '@medusajs/types'
import { addToCart } from '@lib/data/cart'
import { useParams } from 'next/navigation'

interface ProductCardFurnitorProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function ProductCardFurnitor({ product, region }: ProductCardFurnitorProps) {
  const [isAdding, setIsAdding] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  const thumbnail = product.thumbnail || '/furnitor/images/placeholder.jpg'
  const variant = product.variants?.[0]
  // Get price from calculated_price or prices array
  const price = variant?.calculated_price || variant?.prices?.[0]?.amount
  const category = product.categories?.[0]?.name || 'Product'

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!variant?.id || isAdding) return
    
    setIsAdding(true)
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode
      })
      // Optional: Show success message
      console.log('Product added to cart')
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const formatPrice = (amount: number | undefined | null) => {
    if (!amount || isNaN(amount)) {
      // Try to get price from variant prices
      const variantPrice = variant?.prices?.[0]?.amount
      if (variantPrice && !isNaN(variantPrice)) {
        return new Intl.NumberFormat('sk-SK', {
          style: 'currency',
          currency: region.currency_code || 'EUR',
        }).format(variantPrice / 100)
      }
      return 'Cena na dopyt'
    }
    
    // Check if amount is already in cents or in main currency unit
    const amountToFormat = amount > 1000 ? amount / 100 : amount
    
    return new Intl.NumberFormat('sk-SK', {
      style: 'currency',
      currency: region.currency_code || 'EUR',
    }).format(amountToFormat)
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-8" data-animate="fadeInUp">
      <div className="card border-0 hover-change-content product">
        <div className="card-img-top position-relative">
          <Link href={`/${countryCode}/products/${product.handle}`}>
            <div 
              style={{ backgroundImage: `url('${thumbnail}')` }}
              className="card-img ratio bg-img-cover-center ratio-1-1"
            >
            </div>
          </Link>
          <div className="position-absolute pos-fixed-bottom px-4 px-sm-6 pb-5 d-flex w-100 justify-content-center content-change-horizontal">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              data-toggle="tooltip" 
              title="Add to cart"
              className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
            >
              {isAdding ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="far fa-shopping-basket"></i>
              )}
            </button>
            <a 
              href="#" 
              data-toggle="tooltip" 
              title="Add to favourite"
              className="add-to-wishlist d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
            >
              <i className="far fa-heart"></i>
            </a>
            <a 
              href="#" 
              data-toggle="tooltip" 
              title="Add to compare"
              className="add-to-compare d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
            >
              <i className="far fa-random"></i>
            </a>
            <Link 
              href={`/${countryCode}/products/${product.handle}`}
              data-toggle="tooltip" 
              title="Preview"
              className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle border"
            >
              <i className="far fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-body px-0 pt-4 pb-0 d-flex align-items-end">
          <div className="mr-auto">
            <span className="text-uppercase text-muted letter-spacing-05 fs-12 d-block font-weight-500">
              {category}
            </span>
            <Link 
              href={`/${countryCode}/products/${product.handle}`}
              className="font-weight-bold mt-1 d-block"
            >
              {product.title}
            </Link>
          </div>
          <p className="text-primary mb-0 font-weight-500">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </div>
  )
}


