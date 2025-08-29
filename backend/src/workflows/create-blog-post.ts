import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createBlogPostStep, CreateBlogPostStepInput } from "./steps/create-blog-post"

export const createBlogPostWorkflow = createWorkflow(
  "create-blog-post",
  (input: CreateBlogPostStepInput) => {
    const blogPost = createBlogPostStep(input)

    return new WorkflowResponse(blogPost)
  }
)
