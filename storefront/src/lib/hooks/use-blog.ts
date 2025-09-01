"use client"

import { useState, useEffect } from 'react'
import { BlogPost, BlogPostWithContent, BlogPostListResponse, BlogQueryParams } from '@/types/blog'

// Hook for fetching blog posts list
export function useBlogPosts(params?: BlogQueryParams, countryCode?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)

        const queryParams = new URLSearchParams()

        // Add language filter based on country code
        if (countryCode) {
          queryParams.append('language', countryCode)
        }

        if (params?.q) queryParams.append('q', params.q)
        if (params?.author) queryParams.append('author', params.author)
        if (params?.tags) queryParams.append('tags', params.tags)
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        if (params?.offset) queryParams.append('offset', params.offset.toString())

        const response = await fetch(`/api/blog?${queryParams}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }

        const data = await response.json()

        setPosts(data.posts || [])
        setTotalCount(data.count || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [params?.q, params?.author, params?.tags, params?.limit, params?.offset, countryCode])

  return { posts, loading, error, totalCount }
}

// Hook for fetching individual blog post
export function useBlogPost(slug: string, countryCode?: string) {
  const [post, setPost] = useState<BlogPostWithContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        setLoading(true)
        setError(null)

        // Add country code as query parameter for language filtering
        const queryParams = countryCode ? `?countryCode=${countryCode}` : ''
        const response = await fetch(`/api/blog/${slug}${queryParams}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found')
          }
          throw new Error('Failed to fetch blog post')
        }

        const data: BlogPostWithContent = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, countryCode])

  return { post, loading, error }
}
  