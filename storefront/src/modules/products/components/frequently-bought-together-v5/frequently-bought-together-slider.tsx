'use client'

import { useState } from 'react'
import { HttpTypes } from '@medusajs/types'
import { convertToLocale } from '@lib/util/money'

interface FrequentlyBoughtTogetherSliderProps {
  products: HttpTypes.StoreProduct[]
  mainProduct: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

export default function FrequentlyBoughtTogetherSlider({
  products,
  mainProduct,
  region,
  countryCode,
}: FrequentlyBoughtTogetherSliderProps) {
  // V HTML sú len 3 produkty (nie hlavný), takže použijeme len related products
  const displayProducts = products.slice(0, 3)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  // Calculate total price
  const totalPrice = Array.from(selectedProducts).reduce((total, productId) => {
    const product = displayProducts.find((p) => p.id === productId)
    if (product) {
      const variant = product.variants?.[0]
      const price = variant?.calculated_price?.calculated_amount || 0
      return total + price / 100
    }
    return total
  }, 0)

  const formattedTotalPrice = convertToLocale({
    amount: totalPrice,
    currency_code: region.currency_code || 'EUR',
  })

  return (
    <form>
      <div className="row frequently-bought-together align-items-center mb-4 mb-lg-7">
        {/* Products with checkboxes - presne ako v HTML (3 produkty) */}
        {displayProducts.map((product, index) => {
          const isSelected = selectedProducts.has(product.id)
          
          return (
            <div key={product.id} className="col-sm-6 col-lg-3 item mb-6 mb-lg-0">
              <div className="form-check position-relative pl-0">
                <input
                  className="form-check-input position-absolute pos-fixed-center"
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleProduct(product.id)}
                  name="product[]"
                  id={`item-${index + 1}`}
                />
                <label
                  className="form-check-label position-relative z-index-2"
                  htmlFor={`item-${index + 1}`}
                >
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title || 'Product'}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
                      <i className="far fa-image fs-48 text-muted"></i>
                    </div>
                  )}
                  <span className="icon position-absolute pos-fixed-top-right z-index-3 rounded-circle bg-primary p-1 fs-12 text-white mt-3 mr-6 d-flex align-items-center justify-content-center">
                    <i className="far fa-plus"></i>
                  </span>
                </label>
              </div>
            </div>
          )
        })}

        {/* Total Price and Add Button - 4th column */}
        <div className="col-sm-6 col-lg-3 item mb-6 mb-sm-0">
          <div className="pl-lg-5">
            <p className="text-primary mb-3">
              Total price: <span className="font-weight-bold">{formattedTotalPrice}</span>
            </p>
            <button type="submit" className="btn btn-primary">
              Add Selected Items
            </button>
          </div>
        </div>
      </div>

      {/* Product Variants List - presne ako v HTML */}
      <ul className="list-unstyled list-bought-together mb-0">
        {/* Products Variants */}
        {displayProducts.map((product, index) => {
          const isLast = index === displayProducts.length - 1
          
          return (
            <li key={product.id} className="form-group d-flex align-items-center mb-0 flex-wrap">
              <label htmlFor={`item${index === 0 ? '1' : index + 1}`} className={`mb-0 ${index === 0 ? 'text-primary font-weight-500' : ''}`}>
                <span className="fs-12 text-primary d-inline-block mr-2">
                  <i className="fas fa-scrubber"></i>
                </span>
                {index === 0 ? 'This item:' : product.title}
              </label>
              <select
                id={`item${index === 0 ? '1' : index + 1}`}
                className={`form-control form-control-sm fs-16 border-0 ${index === 0 ? 'pl-sm-0' : ''} ${isLast ? 'py-0' : ''} pr-2`}
              >
                {product.variants?.map((v, vIdx) => {
                  const vPrice = v?.calculated_price?.calculated_amount || 0
                  const vFormattedPrice = convertToLocale({
                    amount: vPrice / 100,
                    currency_code: region.currency_code || 'EUR',
                  })
                  
                  // Build variant name from options
                  const optionParts = v.options?.map((opt) => opt.value).filter(Boolean) || []
                  const variantName = optionParts.length > 0 
                    ? optionParts.join(' / ') 
                    : v.title || v.sku || 'Variant'
                  
                  return (
                    <option key={v.id} value={v.id}>
                      {variantName} - {vFormattedPrice}
                    </option>
                  )
                }) || (
                  <option>
                    {product.title} - {product.variants?.[0]?.calculated_price?.calculated_amount
                      ? convertToLocale({
                          amount: product.variants[0].calculated_price.calculated_amount / 100,
                          currency_code: region.currency_code || 'EUR',
                        })
                      : 'N/A'}
                  </option>
                )}
              </select>
            </li>
          )
        })}
      </ul>
    </form>
  )
}
