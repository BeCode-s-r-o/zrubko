'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CartCount() {
  const [itemCount, setItemCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('/api/cart', {
          cache: 'no-store',
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart')
        }

        const data = await response.json()
        setItemCount(data.itemCount || 0)
      } catch (error) {
        console.error('[CartCount] Error fetching cart:', error)
        setItemCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()

    // Aktualizuj košík každých 2 sekúnd (pre real-time updates)
    const interval = setInterval(fetchCart, 2000)

    // Počúvaj na custom event pre aktualizáciu košíka
    const handleCartUpdate = () => {
      fetchCart()
      router.refresh()
    }

    window.addEventListener('cart:updated', handleCartUpdate)

    return () => {
      clearInterval(interval)
      window.removeEventListener('cart:updated', handleCartUpdate)
    }
  }, [router])

  if (isLoading) {
    return <span className="position-absolute number">0</span>
  }

  return <span className="position-absolute number">{itemCount}</span>
}

