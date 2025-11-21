import { NextRequest, NextResponse } from 'next/server'
import { storeFetch } from '@lib/util/fetch'

export const dynamic = 'force-dynamic'

// GET /api/blog - Fetch blog posts list
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const query = searchParams.get('q') || ''
    const author = searchParams.get('author') || ''
    const language = searchParams.get('language') || 'sk'
    const tags = searchParams.get('tags') || ''
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query string for backend API
    const params = new URLSearchParams({
      ...(query && { q: query }),
      ...(author && { author }),
      ...(language && { language }),
      ...(tags && { tags }),
      limit: limit.toString(),
      offset: offset.toString()
    })

    console.log('Blog List API Debug:', {
      language,
      params: params.toString()
    })

    const response = await storeFetch(`/store/blog/posts?${params}`, {}, language)

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

