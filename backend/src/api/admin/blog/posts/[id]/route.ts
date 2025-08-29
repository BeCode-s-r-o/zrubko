import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { BLOG_MODULE } from "../../../../../modules/blog"
import {
  UpdateBlogPostSchema,
  BlogPostResponse,
  UpdateBlogPostDTO
} from "../../../../../modules/blog/types"
import { updateBlogPostWorkflow } from "../../../../../workflows/update-blog-post"
import { MedusaError } from "@medusajs/framework/utils"

// Define path parameter types for better type safety
type BlogPostParams = {
  id: string
}

// Define request body types for PATCH method
type UpdateBlogPostBody = UpdateBlogPostDTO

export async function GET(
  req: MedusaRequest<{}, BlogPostParams>,
  res: MedusaResponse
): Promise<void> {
  try {
    // Validate path parameter
    const { id } = req.params

    if (!id || typeof id !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Blog post ID is required and must be a string"
      )
    }

    const blogService = req.scope.resolve(BLOG_MODULE) as any

    console.log("GET Blog Post - ID:", id)
    console.log("GET Blog Post - req.params:", req.params)

    const post = await blogService.retrieveBlogPost(id)
    console.log("GET Blog Post - retrieved post:", post ? "found" : "not found")
    console.log("GET Blog Post - post.tags:", post?.tags)
    console.log("GET Blog Post - typeof post.tags:", typeof post?.tags)

    if (!post) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Blog post with id ${id} not found`)
    }

    console.log("GET Blog Post - processing tags for response:")
    console.log("GET Blog Post - post.tags value:", post.tags)
    console.log("GET Blog Post - post.tags type:", typeof post.tags)
    console.log("GET Blog Post - Array.isArray(post.tags):", Array.isArray(post.tags))

    const response: BlogPostResponse = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      cover_image: post.cover_image,
      tags: post.tags ? (Array.isArray(post.tags) ? post.tags : post.tags) : undefined,
      language: post.language || 'sk',
      status: post.status || 'draft',
      published_at: post.published_at ?
        (typeof post.published_at === 'string' ? post.published_at : post.published_at.toISOString()) :
        undefined,
      created_at: typeof post.created_at === 'string' ? post.created_at : post.created_at.toISOString(),
      updated_at: typeof post.updated_at === 'string' ? post.updated_at : post.updated_at.toISOString()
    }

    res.json(response)
  } catch (error) {
    throw error
  }
}

export async function PATCH(
  req: MedusaRequest<UpdateBlogPostBody, BlogPostParams>,
  res: MedusaResponse
): Promise<void> {
  try {
    // Validate path parameter
    const { id } = req.params

    if (!id || typeof id !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Blog post ID is required and must be a string"
      )
    }

    // Validate request body using Zod schema
    const validatedData = UpdateBlogPostSchema.parse(req.body)

    // Execute workflow
    const { result } = await updateBlogPostWorkflow(req.scope).run({
      input: {
        id,
        blogPostData: validatedData
      }
    })

    // result is an array from updateBlogPosts, so we need to access the first element
    const updatedPost = Array.isArray(result) ? result[0] : result

    const response: BlogPostResponse = {
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      content: updatedPost.content,
      excerpt: updatedPost.excerpt,
      author: updatedPost.author,
      cover_image: updatedPost.cover_image,
      tags: updatedPost.tags ? (Array.isArray(updatedPost.tags) ? updatedPost.tags : Object.values(updatedPost.tags || {}).filter((tag): tag is string => typeof tag === 'string')) : undefined,
      language: updatedPost.language || 'sk',
      status: updatedPost.status || 'draft',
      published_at: updatedPost.published_at ?
        (typeof updatedPost.published_at === 'string' ? updatedPost.published_at : updatedPost.published_at.toISOString()) :
        undefined,
      created_at: updatedPost.created_at ?
        (typeof updatedPost.created_at === 'string' ? updatedPost.created_at : updatedPost.created_at.toISOString()) :
        new Date().toISOString(),
      updated_at: updatedPost.updated_at ?
        (typeof updatedPost.updated_at === 'string' ? updatedPost.updated_at : updatedPost.updated_at.toISOString()) :
        new Date().toISOString()
    }

    res.json(response)
  } catch (error) {
    if (error.name === 'ZodError') {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message)
    }
    throw error
  }
}

export async function DELETE(
  req: MedusaRequest<{}, BlogPostParams>,
  res: MedusaResponse
): Promise<void> {
  try {
    // Validate path parameter
    const { id } = req.params

    if (!id || typeof id !== 'string') {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Blog post ID is required and must be a string"
      )
    }

    const blogService = req.scope.resolve(BLOG_MODULE) as any

    await blogService.deleteBlogPosts(id)

    res.status(204).send()
  } catch (error) {
    throw error
  }
}
