import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const query = body.q

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 })
  }

  const endpoint = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT
  const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY
  const index = process.env.NEXT_PUBLIC_INDEX_NAME || "products"

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SEARCH_ENDPOINT env variable' }, { status: 500 })
  }
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SEARCH_API_KEY env variable' }, { status: 500 })
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (apiKey) {
      headers["X-MEILI-API-KEY"] = apiKey
    }

    const res = await fetch(`${endpoint}/indexes/${index}/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({ q: query }),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
