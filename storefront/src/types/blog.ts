// Blog types for storefront
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  author: string
  cover_image?: string
  tags?: string[]
  language: string
  status: 'draft' | 'published'
  published_at: string
  created_at: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

export interface BlogPostListResponse {
  posts: BlogPost[]
  count: number
  limit: number
  offset: number
}

export interface BlogPostResponse extends BlogPostWithContent {}

// Query parameters for blog API
export interface BlogQueryParams {
  q?: string
  author?: string
  language?: 'sk' | 'cz' | 'de' | 'gb'
  tags?: string
  limit?: number
  offset?: number
}

// Supported languages
export const SUPPORTED_LANGUAGES = {
  sk: 'Slovenčina',
  cz: 'Čeština',
  de: 'Deutsch',
  gb: 'English'
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

