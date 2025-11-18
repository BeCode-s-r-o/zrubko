/**
 * Strapi API Client
 * Handles communication with Strapi CMS
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

export interface BlogPost {
  id: number
  attributes: {
    title: string
    slug: string
    excerpt?: string
    content: string
    featured_image?: {
      data?: {
        attributes: {
          url: string
          alternativeText?: string
        }
      }
    }
    author: string
    category: string
    tags?: string[]
    meta_title?: string
    meta_description?: string
    featured: boolean
    view_count: number
    publishedAt: string
    updatedAt: string
    related_products?: {
      data: Array<{
        id: number
        attributes: any
      }>
    }
  }
}

export interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    type: string
    meta_title?: string
    meta_description?: string
  }
}

export interface Page {
  id: number
  attributes: {
    title: string
    slug: string
    content: string
    template: string
    meta_title?: string
    meta_description?: string
    show_in_menu: boolean
    menu_order: number
  }
}

class StrapiClient {
  private baseURL: string
  private apiToken: string

  constructor() {
    this.baseURL = STRAPI_URL
    this.apiToken = STRAPI_API_TOKEN
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Strapi API request failed:', error)
      throw error
    }
  }

  // Blog Posts
  async getBlogPosts(page = 1, pageSize = 10, filters?: any) {
    const params = new URLSearchParams({
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'populate': 'featured_image,related_products',
      'sort': 'publishedAt:desc',
      ...filters,
    })

    const response = await this.request(`/blogs?${params}`)
    return response
  }

  async getBlogPost(slug: string) {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
      'populate': 'featured_image,related_products',
    })

    const response = await this.request(`/blogs?${params}`)
    return response.data?.[0] || null
  }

  async getFeaturedBlogPosts(limit = 3) {
    const params = new URLSearchParams({
      'filters[featured][$eq]': 'true',
      'pagination[pageSize]': limit.toString(),
      'populate': 'featured_image',
      'sort': 'publishedAt:desc',
    })

    const response = await this.request(`/blogs?${params}`)
    return response
  }

  // Categories
  async getCategories(type = 'blog') {
    const params = new URLSearchParams({
      'filters[type][$eq]': type,
      'sort': 'name:asc',
    })

    const response = await this.request(`/categories?${params}`)
    return response
  }

  async getBlogsByCategory(categorySlug: string, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      'filters[category][$eq]': categorySlug,
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'populate': 'featured_image',
      'sort': 'publishedAt:desc',
    })

    const response = await this.request(`/blogs?${params}`)
    return response
  }

  // Pages
  async getPage(slug: string) {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
    })

    const response = await this.request(`/pages?${params}`)
    return response.data?.[0] || null
  }

  async getMenuPages() {
    const params = new URLSearchParams({
      'filters[show_in_menu][$eq]': 'true',
      'sort': 'menu_order:asc',
    })

    const response = await this.request(`/pages?${params}`)
    return response
  }

  // Search
  async searchContent(query: string, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][content][$containsi]': query,
      'filters[$or][2][excerpt][$containsi]': query,
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'populate': 'featured_image',
      'sort': 'publishedAt:desc',
    })

    const response = await this.request(`/blogs?${params}`)
    return response
  }
}

export const strapiClient = new StrapiClient()

// Helper functions
export const formatBlogPost = (post: BlogPost) => {
  return {
    id: post.id,
    title: post.attributes.title,
    slug: post.attributes.slug,
    excerpt: post.attributes.excerpt,
    content: post.attributes.content,
    featuredImage: post.attributes.featured_image?.data?.attributes?.url 
      ? `${STRAPI_URL}${post.attributes.featured_image.data.attributes.url}`
      : null,
    author: post.attributes.author,
    category: post.attributes.category,
    tags: post.attributes.tags || [],
    featured: post.attributes.featured,
    publishedAt: post.attributes.publishedAt,
    updatedAt: post.attributes.updatedAt,
    relatedProducts: post.attributes.related_products?.data || [],
  }
}

export const formatPage = (page: Page) => {
  return {
    id: page.id,
    title: page.attributes.title,
    slug: page.attributes.slug,
    content: page.attributes.content,
    template: page.attributes.template,
    metaTitle: page.attributes.meta_title,
    metaDescription: page.attributes.meta_description,
  }
}
