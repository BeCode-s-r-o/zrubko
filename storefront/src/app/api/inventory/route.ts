import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(req: NextRequest) {
  try {
    const { skus } = await req.json()

    if (!skus || !Array.isArray(skus)) {
      return NextResponse.json(
        { error: 'SKUs array is required' },
        { status: 400 }
      )
    }

    console.log('Fetching inventory for SKUs:', skus)

    // Use the Medusa SDK to get products with inventory info
    const { products } = await sdk.store.product.list({
      fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata",
      limit: 1000 // Get all products to find our SKUs
    })

    console.log('Products received:', products?.length || 0)

    // Transform the data to match our frontend format
    const inventoryData: { [sku: string]: any } = {}

    // Extract inventory data from products and their variants
    products?.forEach((product: any) => {
      product.variants?.forEach((variant: any) => {
        if (skus.includes(variant.sku)) {
          // Use variant inventory data if available
          const stockedQuantity = variant.inventory_quantity || 0
          const reservedQuantity = 0 // We'll need to calculate this from inventory levels
          const incomingQuantity = 0 // We'll need to get this from inventory levels

          inventoryData[variant.sku] = {
            stocked_quantity: stockedQuantity,
            reserved_quantity: reservedQuantity,
            incoming_quantity: incomingQuantity,
            available_quantity: Math.max(0, stockedQuantity - reservedQuantity),
            is_in_stock: stockedQuantity > 0
          }
        }
      })
    })

    console.log('Inventory data prepared:', inventoryData)

    return NextResponse.json(inventoryData)
  } catch (error) {
    console.error('Inventory API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sku = searchParams.get('sku')

    if (!sku) {
      return NextResponse.json(
        { error: 'SKU parameter is required' },
        { status: 400 }
      )
    }

    // Use the Medusa SDK to get all products and find the one with this SKU
    const { products } = await sdk.store.product.list({
      fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata",
      limit: 1000
    })

    const product = products?.find((p: any) => 
      p.variants?.some((v: any) => v.sku === sku)
    )
    const variant = product?.variants?.find((v: any) => v.sku === sku)

    if (!variant) {
      return NextResponse.json({
        stocked_quantity: 0,
        reserved_quantity: 0,
        incoming_quantity: 0,
        available_quantity: 0,
        is_in_stock: false
      })
    }

    const stockedQuantity = variant.inventory_quantity || 0
    const reservedQuantity = 0
    const incomingQuantity = 0

    return NextResponse.json({
      stocked_quantity: stockedQuantity,
      reserved_quantity: reservedQuantity,
      incoming_quantity: incomingQuantity,
      available_quantity: Math.max(0, stockedQuantity - reservedQuantity),
      is_in_stock: stockedQuantity > 0
    })
  } catch (error) {
    console.error('Inventory API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    )
  }
} 