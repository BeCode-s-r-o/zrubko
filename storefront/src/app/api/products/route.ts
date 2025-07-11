import { NextRequest, NextResponse } from "next/server"
import { getProductsListWithSort } from "@lib/data/products"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')
    const countryCode = searchParams.get('country_code') || 'sk'
    const limit = parseInt(searchParams.get('limit') || '6')

    if (!categoryId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Category ID is required' 
        },
        { status: 400 }
      )
    }

    const queryParams = {
      category_id: [categoryId],
      limit: limit,
    }

    // Fetch products for the category
    const { response: { products } } = await getProductsListWithSort({
      page: 1,
      queryParams,
      countryCode,
    })

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    )
  }
} 