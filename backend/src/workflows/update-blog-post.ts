import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateBlogPostStep, UpdateBlogPostStepInput } from "./steps/update-blog-post"

export const updateBlogPostWorkflow = createWorkflow(
  "update-blog-post",
  (input: UpdateBlogPostStepInput) => {
    const blogPost = updateBlogPostStep(input)

    return new WorkflowResponse(blogPost)
  }
)
