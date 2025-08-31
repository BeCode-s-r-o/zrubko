"use client"

import { useEffect, useState } from "react"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCart, updateLineItem, deleteLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { useRegion } from "@lib/context/region-context"

interface MiniCartProps {
  isOpen: boolean
  onClose: () => void
  itemCount: number
  onItemCountChange: (count: number) => void
}

export default function MiniCart({ isOpen, onClose, itemCount, onItemCountChange }: MiniCartProps) {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const { currentCountryCode } = useRegion()

  useEffect(() => {
    if (isOpen) {
      fetchCart()
    }
  }, [isOpen])

  // Keyboard support and mobile positioning fix
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scroll

      // Fix for mobile - ensure cart is visible by scrolling to top
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const fetchCart = async () => {
    try {
      const cartData = await retrieveCart()
      setCart(cartData)
      onItemCountChange(cartData?.items?.length || 0)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
  }

  const updateItemQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 1) return

    setLoading(true)
    try {
      await updateLineItem({
        lineId,
        quantity
      })
      await fetchCart()
    } catch (error) {
      console.error('Failed to update item:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    setLoading(true)
    try {
      await deleteLineItem(lineId)
      await fetchCart()
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setLoading(false)
    }
  }

  const subtotal = cart?.total || 0
  const currency = cart?.region?.currency_code || 'EUR'

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Mini Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm md:max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col md:h-full h-[100dvh]`}>
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 flex-shrink-0 cursor-grab active:cursor-grabbing md:cursor-auto"
          onTouchStart={(e) => {
            if (window.innerWidth < 768) {
              setDragStartY(e.touches[0].clientY)
              setIsDragging(true)
            }
          }}
          onTouchMove={(e) => {
            if (isDragging && window.innerWidth < 768) {
              const currentY = e.touches[0].clientY
              const diff = currentY - dragStartY
              if (diff > 100) { // Swipe down by 100px
                onClose()
                setIsDragging(false)
              }
            }
          }}
          onTouchEnd={() => {
            setIsDragging(false)
            setDragStartY(0)
          }}
        >
          {/* Mobile drag handle */}
          <div className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>

          <div className="flex items-center gap-2 md:gap-3">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Košík ({itemCount})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 touch-manipulation z-10"
            aria-label="Zavrieť košík"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 transition-colors bg-gray-50"
             style={{
               maxHeight: 'calc(100dvh - 250px)',
               minHeight: '500px',
               scrollbarWidth: 'thin',
               scrollbarColor: '#d1d5db #f9fafb'
             }}>

          {!cart?.items || cart.items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Váš košík je prázdny
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Pridajte produkty do košíka a pokračujte v nákupe
              </p>
              <LocalizedClientLink href="/categories">
                <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors duration-200 font-medium">
                  Prehľadávať produkty
                </button>
              </LocalizedClientLink>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-4 md:p-6 space-y-1">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex gap-3 md:gap-4 py-3 md:py-4 border-b border-gray-100 last:border-b-0">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.product_title || 'Product'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                      {item.product_title}
                    </h4>
                    {item.variant_title && (
                      <p className="text-xs text-gray-500 mb-2">
                        {item.variant_title}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                        aria-label="Znížiť množstvo"
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                      </button>

                      <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                        aria-label="Zvýšiť množstvo"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {convertToLocale({
                        amount: item.total || 0,
                        currency_code: currency
                      })}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={loading}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-lg border border-red-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                      aria-label="Odstrániť položku"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.items && cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50 flex-shrink-0">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Celkom:</span>
              <span className="text-xl font-bold text-gray-900">
                {convertToLocale({
                  amount: subtotal,
                  currency_code: currency
                })}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6">
              <LocalizedClientLink href="/cart">
                <button
                  onClick={onClose}
                  className="w-full h-12 bg-white border-2 border-primary text-primary py-3 px-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-medium flex items-center justify-center"
                >
                  Zobraziť celý košík
                </button>
              </LocalizedClientLink>

              <LocalizedClientLink href="/checkout">
                <button
                  onClick={onClose}
                  className="w-full h-12 bg-primary text-white py-3 px-4 rounded-xl hover:bg-primary-dark transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Pokračovať k platbe
                </button>
              </LocalizedClientLink>
            </div>

            {/* Free Shipping Notice */}
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-xs text-primary font-medium text-center">
                🚚 Doprava zadarmo pri nákupe nad 200€
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
