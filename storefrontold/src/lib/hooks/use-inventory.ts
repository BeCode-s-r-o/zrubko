import { useState, useEffect } from 'react'

type InventoryLevel = {
  id: string
  stocked_quantity: number
  reserved_quantity: number
  incoming_quantity: number
  location_id: string
}

type InventoryItem = {
  id: string
  sku: string
  title: string
  inventory_levels: InventoryLevel[]
}

type InventoryData = {
  [sku: string]: {
    stocked_quantity: number
    reserved_quantity: number
    incoming_quantity: number
    available_quantity: number
    is_in_stock: boolean
  }
}

export const useInventory = (variants: Array<{ sku?: string }>) => {
  const [inventoryData, setInventoryData] = useState<InventoryData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInventory = async () => {
      if (!variants.length) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Get unique SKUs from variants
        const skus = variants
          .map(variant => variant.sku)
          .filter(Boolean) as string[]

        if (skus.length === 0) {
          setLoading(false)
          return
        }

        // Fetch inventory data for all SKUs using POST with SKUs array
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skus: skus
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Inventory API error response:', errorText)
          throw new Error(`Failed to fetch inventory data: ${response.status}`)
        }

        const data = await response.json()
        console.log('Inventory data received:', data)
        setInventoryData(data)
      } catch (err) {
        console.error('Error fetching inventory:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch inventory')
        // Set empty data to prevent infinite loading
        setInventoryData({})
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [variants])

  const getInventoryStatus = (sku?: string) => {
    if (!sku || !inventoryData[sku]) {
      return {
        stocked_quantity: 0,
        reserved_quantity: 0,
        incoming_quantity: 0,
        available_quantity: 0,
        is_in_stock: false,
        status: 'unavailable' as const
      }
    }

    const inventory = inventoryData[sku]
    const availableQuantity = inventory.available_quantity

    let status: 'in_stock' | 'available_soon' | 'unavailable'
    
    if (availableQuantity > 0) {
      status = 'in_stock'
    } else if (inventory.incoming_quantity > 0) {
      status = 'available_soon'
    } else {
      status = 'unavailable'
    }

    return {
      ...inventory,
      status
    }
  }

  return {
    inventoryData,
    loading,
    error,
    getInventoryStatus
  }
} 