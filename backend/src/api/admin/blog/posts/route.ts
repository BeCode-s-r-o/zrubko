import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { BLOG_MODULE } from "../../../../modules/blog"
import {
  CreateBlogPostSchema,
  BlogPostQuerySchema,
  BlogPostListResponse,
  BlogPostResponse
} from "../../../../modules/blog/types"
import { createBlogPostWorkflow } from "../../../../workflows/create-blog-post"
import { MedusaError } from "@medusajs/framework/utils"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any

    console.log("API Blog Posts - received query:", req.query)

    // Validate query parameters
    const validatedQuery = BlogPostQuerySchema.parse(req.query)
    console.log("API Blog Posts - validated query:", validatedQuery)

    const filters = {
      q: validatedQuery.q,
      author: validatedQuery.author,
      status: validatedQuery.status,
      language: validatedQuery.language,
      tags: validatedQuery.tags
    }

    console.log("API - calling service with filters:", filters)

    const { posts, count } = await blogService.searchBlogPosts(
      filters,
      {
        skip: validatedQuery.offset,
        take: validatedQuery.limit
      }
    )

    const response: BlogPostListResponse = {
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        cover_image: post.cover_image,
        tags: post.tags ? (Array.isArray(post.tags) ? post.tags : (post.tags as any)?.data || []) : undefined,
        language: post.language || 'sk',
        status: post.status || 'draft',
        published_at: post.published_at ?
          (typeof post.published_at === 'string' ? post.published_at : post.published_at.toISOString()) :
          undefined,
        created_at: post.created_at ?
          (typeof post.created_at === 'string' ? post.created_at : post.created_at.toISOString()) :
          new Date().toISOString(),
        updated_at: post.updated_at ?
          (typeof post.updated_at === 'string' ? post.updated_at : post.updated_at.toISOString()) :
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

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Validate request body
    const validatedData = CreateBlogPostSchema.parse(req.body)

    // Execute workflow
    const { result } = await createBlogPostWorkflow(req.scope).run({
      input: {
        blogPostData: validatedData
      }
    })

    const response: BlogPostResponse = {
      id: result.id,
      title: result.title,
      slug: result.slug,
      content: result.content,
      excerpt: result.excerpt,
      author: result.author,
      cover_image: result.cover_image,
      tags: result.tags ? (Array.isArray(result.tags) ? result.tags : (result.tags as any)?.data || []) : undefined,
      language: result.language || 'sk',
      status: result.status || 'draft',
      published_at: result.published_at ?
        (typeof result.published_at === 'string' ? result.published_at : result.published_at.toISOString()) :
        undefined,
      created_at: result.created_at ?
        (typeof result.created_at === 'string' ? result.created_at : result.created_at.toISOString()) :
        new Date().toISOString(),
      updated_at: result.updated_at ?
        (typeof result.updated_at === 'string' ? result.updated_at : result.updated_at.toISOString()) :
        new Date().toISOString()
    }

    res.status(201).json(response)
  } catch (error) {
    if (error.name === 'ZodError') {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message)
    }
    throw error
  }
}
