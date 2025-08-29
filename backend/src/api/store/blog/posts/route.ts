import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { BLOG_MODULE } from "../../../../modules/blog"
import {
  BlogPostQuerySchema,
  PublicBlogPostListResponse
} from "../../../../modules/blog/types"
import { MedusaError } from "@medusajs/framework/utils"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any

    // Validate query parameters
    const validatedQuery = BlogPostQuerySchema.parse(req.query)

    const filters = {
      q: validatedQuery.q,
      author: validatedQuery.author,
      published: true, // Only show published posts in storefront
      language: validatedQuery.language,
      tags: validatedQuery.tags
    }

    const { posts, count } = await blogService.searchBlogPosts(
      filters,
      {
        skip: validatedQuery.offset,
        take: validatedQuery.limit
      }
    )

    // Only return safe fields for public API
    const response: PublicBlogPostListResponse = {
      posts: posts
        .filter(post => post.status === 'published') // Only return published posts
        .map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          author: post.author,
          cover_image: post.cover_image,
          tags: post.tags ? (Array.isArray(post.tags) ? post.tags : (post.tags as any)?.data || []) : undefined,
          language: post.language || 'sk',
          status: post.status || 'draft',
          published_at: post.published_at ? (typeof post.published_at === 'string' ? post.published_at : post.published_at.toISOString()) : post.published_at,
          created_at: post.created_at ?
            (typeof post.created_at === 'string' ? post.created_at : post.created_at.toISOString()) :
            new Date().toISOString()
        })),
      count,
      limit: validatedQuery.limit,
      offset: validatedQuery.offset
    }

    res.json(response)
  } catch (error) {
    if (error.name === 'ZodError') {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message)
    }
    throw error
  }
}
