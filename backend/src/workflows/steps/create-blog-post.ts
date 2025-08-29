import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { BLOG_MODULE } from "../../modules/blog"
import { CreateBlogPostDTO } from "../../modules/blog/types"
import BlogModuleService from "../../modules/blog/service"

export interface CreateBlogPostStepInput {
  blogPostData: CreateBlogPostDTO
}

export const createBlogPostStep = createStep(
  "create-blog-post",
  async ({ blogPostData }: CreateBlogPostStepInput, { container }) => {
    const blogService = container.resolve(BLOG_MODULE) as InstanceType<typeof BlogModuleService>

    // Generate excerpt if not provided
    const processedData = {
      ...blogPostData,
      excerpt: blogPostData.excerpt || blogPostData.content.substring(0, 200) + "...",
      published_at: blogPostData.status === "published" ? new Date() : null,
      tags: blogPostData.tags ? { data: blogPostData.tags } : null
    }

    const blogPost = await blogService.createBlogPosts(processedData)

    return new StepResponse(blogPost, {
      blogPostId: blogPost.id
    })
  },
  async ({ blogPostId }: { blogPostId: string }, { container }) => {
    const blogService = container.resolve(BLOG_MODULE) as InstanceType<typeof BlogModuleService>
    await blogService.deleteBlogPosts(blogPostId)
  }
)
