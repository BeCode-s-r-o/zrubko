import { NextRequest, NextResponse } from 'next/server'
import { storeFetch } from '@lib/util/fetch'

export const dynamic = 'force-dynamic'

// GET /api/blog/[slug] - Fetch individual blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Extract language from query parameters
    const { searchParams } = request.nextUrl
    const language = searchParams.get("language") || "sk"

    // Build backend URL with language parameter for filtering
    const backendUrl = `/store/blog/posts/${slug}${language ? `?language=${language}` : ''}`

    console.log('API Route Debug:', {
      slug,
      language,
      backendUrl
    })

    const response = await storeFetch(backendUrl, {}, language)

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        )
      }
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

