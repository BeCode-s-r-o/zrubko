import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { BLOG_MODULE } from "../../modules/blog"
import { UpdateBlogPostDTO } from "../../modules/blog/types"
import BlogModuleService from "../../modules/blog/service"

export interface UpdateBlogPostStepInput {
  id: string
  blogPostData: UpdateBlogPostDTO
}

export const updateBlogPostStep = createStep(
  "update-blog-post",
  async ({ id, blogPostData }: UpdateBlogPostStepInput, { container }) => {
    const blogService = container.resolve(BLOG_MODULE) as InstanceType<typeof BlogModuleService>

  // Get original post for rollback
  const originalPost = await blogService.retrieveBlogPostSafe(id)

    // Process update data
    const processedData = {
      ...blogPostData,
      published_at: blogPostData.status === "published" ? new Date() : null,
      tags: blogPostData.tags ? { data: blogPostData.tags } : null
    }

    const updatedPost = await blogService.updateBlogPosts([{
      selector: { id },
      data: processedData
    }])

    return new StepResponse(updatedPost, {
      originalPost: {
        title: originalPost.title,
        slug: originalPost.slug,
        content: originalPost.content,
        excerpt: originalPost.excerpt,
        author: originalPost.author,
        published_at: originalPost.published_at
      }
    })
  },
  async ({ originalPost }: { originalPost: any }, { container }) => {
    const blogService = container.resolve(BLOG_MODULE) as InstanceType<typeof BlogModuleService>
    await blogService.updateBlogPosts([{
      selector: { id: originalPost.id },
      data: originalPost
    }])
  }
)
