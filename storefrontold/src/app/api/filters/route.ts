import { NextRequest, NextResponse } from "next/server"
import { getProductsListWithSort } from "@lib/data/products"
import { extractFiltersFromProducts } from "@lib/util/filter-products"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    const countryCode = searchParams.get('countryCode') || 'sk'

    const queryParams = categoryId 
      ? { category_id: [categoryId] }
      : {}

    // Fetch all products to extract available filters
    const { response: { products } } = await getProductsListWithSort({
      page: 1,
      queryParams: {
        ...queryParams,
        limit: 100, // Get enough products to extract all filter options
      },
      countryCode,
    })

    // Extract available filters from products
    const availableFilters = extractFiltersFromProducts(products)

    return NextResponse.json({
      success: true,
      data: {
        availableFilters,
        totalProducts: products.length,
      }
    })

  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch filters' 
      },
      { status: 500 }
    )
  }
} 