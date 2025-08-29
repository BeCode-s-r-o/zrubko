import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { BLOG_MODULE } from "../../../../../modules/blog"
import { PublicBlogPostWithContentResponse } from "../../../../../modules/blog/types"
import { MedusaError } from "@medusajs/framework/utils"

// Define path parameter types for better type safety
type BlogPostParams = {
  slug: string
}

export async function GET(
  req: MedusaRequest<{}, BlogPostParams>,
  res: MedusaResponse
): Promise<void> {
  try {
    // Validate path parameter
    const { slug } = req.params

    if (!slug || typeof slug !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Blog post slug is required and must be a string"
      )
    }

    const blogService = req.scope.resolve(BLOG_MODULE) as any

    // Check if language filtering is requested
    const requestedLanguage = req.query.language as string

    const post = await blogService.findBySlug(slug)

    // If language filtering is requested and post language doesn't match, return 404
    if (requestedLanguage && post && post.language !== requestedLanguage) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Blog post with slug ${slug} not found for language ${requestedLanguage}`)
    }

    if (!post || !post.published_at) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Published blog post with slug ${slug} not found`)
    }

    // Check if post is published
    if (post.status !== 'published') {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Post not found")
    }

    // Return safe fields for public API with full content
    const response: PublicBlogPostWithContentResponse = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content, // Include full content for single post view
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
    }

    res.json(response)
  } catch (error) {
    throw error
  }
}
