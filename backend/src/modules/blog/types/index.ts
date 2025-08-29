import { z } from "zod"

// Language options
export const SUPPORTED_LANGUAGES = {
  sk: "Slovenčina",
  cz: "Čeština",
  de: "Deutsch",
  gb: "English"
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// Validation schemas
export const CreateBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string()
    .min(1, "Slug is required")
    .max(100, "Slug too long")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  author: z.string().min(1, "Author is required").max(100, "Author name too long"),
  cover_image: z.string().url("Must be a valid URL").optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  language: z.enum(["sk", "cz", "de", "gb"]).default("sk"),
  status: z.enum(["draft", "published"]).default("draft")
})

export const UpdateBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  slug: z.string()
    .min(1, "Slug is required")
    .max(100, "Slug too long")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .optional(),
  content: z.string().min(1, "Content is required").optional(),
  excerpt: z.string().max(500, "Excerpt too long").optional().nullable(),
  author: z.string().min(1, "Author is required").max(100, "Author name too long").optional(),
  cover_image: z.string().url("Must be a valid URL").optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  language: z.enum(["sk", "cz", "de", "gb"]).optional(),
  status: z.enum(["draft", "published"]).optional()
})

export const BlogPostQuerySchema = z.object({
  q: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  language: z.enum(["sk", "cz", "de", "gb"]).optional(),
  tags: z.string().optional(), // Comma-separated tags for filtering
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0)
})

// Types
export type CreateBlogPostDTO = z.infer<typeof CreateBlogPostSchema>
export type UpdateBlogPostDTO = z.infer<typeof UpdateBlogPostSchema>
export type BlogPostQuery = z.infer<typeof BlogPostQuerySchema>

// Response types for API
export interface BlogPostResponse {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  cover_image?: string
  tags?: string[]
  language: string
  status: "draft" | "published"
  published_at?: string
  created_at: string
  updated_at: string
}

export interface PublicBlogPostResponse {
  id: string
  title: string
  slug: string
  excerpt?: string
  author: string
  cover_image?: string
  tags?: string[]
  language: string
  status: "draft" | "published"
  published_at: string
  created_at: string
}

export interface PublicBlogPostWithContentResponse extends PublicBlogPostResponse {
  content: string
}

export interface BlogPostListResponse {
  posts: BlogPostResponse[]
  count: number
  limit: number
  offset: number
}

export interface PublicBlogPostListResponse {
  posts: PublicBlogPostResponse[]
  count: number
  limit: number
  offset: number
}
