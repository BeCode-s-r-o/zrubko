'use client'

import { useState, useMemo, useEffect } from 'react'
import { isEqual } from 'lodash'
import { useParams } from 'next/navigation'
import { HttpTypes } from '@medusajs/types'
import { addToCart } from '@lib/data/cart'
import { getProductPrice } from '@lib/util/get-product-price'
import { convertToLocale } from '@lib/util/money'

interface ProductInfoV5Props {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductInfoV5({ product, region }: ProductInfoV5Props) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVariant?.id || isAdding) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart:updated'))
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const { variantPrice, cheapestPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  const selectedPrice = selectedVariant ? variantPrice : cheapestPrice
  const priceAmount = selectedPrice?.calculated_price_number || 0
  const formattedPrice = selectedPrice
    ? selectedPrice.calculated_price
    : convertToLocale({
        amount: priceAmount / 100,
        currency_code: region.currency_code || 'EUR',
      })

  const category = product.categories?.[0]?.name || product.collection?.title || 'Product'
  const inventoryQuantity = selectedVariant?.inventory_quantity || 0

  // Get unique options for color swatches
  const colorOption = product.options?.find((opt) =>
    opt.title?.toLowerCase().includes('color') || opt.title?.toLowerCase().includes('farba')
  )
  const sizeOption = product.options?.find((opt) =>
    opt.title?.toLowerCase().includes('size') || opt.title?.toLowerCase().includes('veľkosť')
  )
  const materialOption = product.options?.find((opt) =>
    opt.title?.toLowerCase().includes('material') || opt.title?.toLowerCase().includes('materiál')
  )

  // Get available values for color option
  const colorValues = useMemo(() => {
    if (!colorOption) return []
    const values = new Set<string>()
    product.variants?.forEach((variant) => {
      const colorValue = variant.options?.find(
        (opt) => opt.option?.title === colorOption.title
      )?.value
      if (colorValue) values.add(colorValue)
    })
    return Array.from(values)
  }, [colorOption, product.variants])

  // Get selected color value for display
  const selectedColorValue = options[colorOption?.title || ''] || (colorValues.length > 0 ? colorValues[0] : '')

  // Get brand name from product type or metadata
  const brandName = product.type?.value || product.metadata?.brand || 'FLOYD'

  return (
    <div>
      <p className="text-muted fs-12 font-weight-500 letter-spacing-05 text-uppercase mb-3">
        {category}
      </p>
      <h2 className="fs-30 fs-lg-40 mb-2">{product.title}</h2>
      <p className="fs-20 text-primary mb-4">{formattedPrice}</p>
      
      {inventoryQuantity > 0 && (
        <p className="mb-4 d-flex text-primary">
          <span className="d-inline-block mr-2 fs-14">
            <i className="far fa-stopwatch"></i>
          </span>
          <span className="fs-15">
            Only <span className="font-weight-600">{inventoryQuantity}</span> Left in Stock
          </span>
        </p>
      )}

      <p className="mb-5">
        {product.description || 'No description available.'}
      </p>

      {/* Product Image - presne ako v HTML */}
      {product.images && product.images.length > 0 && (
        <div className="mb-6">
          <img
            className="border"
            src={product.images[0].url || '/furnitor/images/placeholder.jpg'}
            alt={product.title || 'Image Product'}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      <form onSubmit={handleAddToCart}>
        {/* Color Swatches - presne ako v HTML */}
        {colorOption && colorValues.length > 0 && (
          <div className="form-group shop-swatch mb-6">
            <label className="mb-3">
              <span className="text-primary fs-16 font-weight-bold">Color:</span>{' '}
              <span className="var text-capitalize text-primary">
                {selectedColorValue}
              </span>
            </label>
            <ul className="list-inline d-flex justify-content-start mb-0">
              {colorValues.map((colorValue, index) => {
                const isSelected = options[colorOption.title || ''] === colorValue || (index === 0 && !options[colorOption.title || ''])
                const colorHex = getColorHex(colorValue)
                return (
                  <li
                    key={index}
                    className={`list-inline-item mr-1 ${isSelected ? 'selected' : ''}`}
                  >
                    <a
                      href="#"
                      className="d-block swatches-item"
                      data-var={colorValue}
                      style={{ backgroundColor: colorHex }}
                      onClick={(e) => {
                        e.preventDefault()
                        setOptionValue(colorOption.title || '', colorValue)
                      }}
                    ></a>
                  </li>
                )
              })}
            </ul>
            <select
              name="swatches"
              className="form-select swatches-select d-none"
              aria-label="Default select example"
              value={options[colorOption.title || ''] || ''}
              onChange={(e) => setOptionValue(colorOption.title || '', e.target.value)}
            >
              {colorValues.map((colorValue) => (
                <option key={colorValue} value={colorValue}>
                  {colorValue.charAt(0).toUpperCase() + colorValue.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Size and Material options - presne ako v HTML */}
        <div className="row">
          {sizeOption && (
            <div className="col-sm-6 mb-4 form-group">
              <label className="text-primary fs-16 font-weight-bold mb-3" htmlFor="size">
                Select a Size:{' '}
              </label>
              <select
                name="size"
                className="form-control w-100"
                required
                id="size"
                value={options[sizeOption.title || ''] || ''}
                onChange={(e) => setOptionValue(sizeOption.title || '', e.target.value)}
              >
                <option value="">Choose an option</option>
                {sizeOption.values?.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {materialOption && (
            <div className="col-sm-6 mb-4 form-group">
              <label className="text-primary fs-16 font-weight-bold mb-3" htmlFor="material">
                Material:{' '}
              </label>
              <select
                name="material"
                className="form-control w-100"
                required
                id="material"
                value={options[materialOption.title || ''] || ''}
                onChange={(e) => setOptionValue(materialOption.title || '', e.target.value)}
              >
                <option value="">Choose an option</option>
                {materialOption.values?.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Other options if no material option */}
          {!materialOption && product.options
            ?.filter(
              (opt) =>
                opt.id !== colorOption?.id &&
                opt.id !== sizeOption?.id &&
                opt.title &&
                opt.values &&
                opt.values.length > 0
            )
            .slice(0, 1)
            .map((option) => (
              <div key={option.id} className="col-sm-6 mb-4 form-group">
                <label
                  className="text-primary fs-16 font-weight-bold mb-3"
                  htmlFor={`option-${option.id}`}
                >
                  {option.title}:{' '}
                </label>
                <select
                  name={option.title}
                  className="form-control w-100"
                  required
                  id={`option-${option.id}`}
                  value={options[option.title || ''] || ''}
                  onChange={(e) => setOptionValue(option.title || '', e.target.value)}
                >
                  <option value="">Choose an option</option>
                  {option.values?.map((value) => (
                    <option key={value.id} value={value.value}>
                      {value.value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mb-4"
          disabled={!inStock || !selectedVariant || isAdding}
        >
          add to cart
        </button>

        {/* Payment icons - presne ako v HTML */}
        <ul className="list-inline px-xl-8 mb-4 d-flex align-items-center justify-content-center">
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p1.png" alt="Visa" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p2.png" alt="Mastercard" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p3.png" alt="PayPal" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p4.png" alt="Amex" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p5.png" alt="Discover" />
          </li>
        </ul>
      </form>

      <p className="d-flex text-primary justify-content-center">
        <span className="d-inline-block mr-2 fs-14">
          <i className="far fa-lock"></i>
        </span>
        <span className="fs-15">Guarantee Safe and Secure Checkout</span>
      </p>
    </div>
  )
}

// Helper function to get color hex from color name
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    yellow: '#ffff00',
    brown: '#68412d',
    gray: '#808080',
    grey: '#808080',
    pink: '#ffc0cb',
    orange: '#ffa500',
    purple: '#800080',
    teal: '#9ec8bb',
  }

  const normalized = colorName.toLowerCase().trim()
  return colorMap[normalized] || '#cccccc'
}
