import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import { BlogPostForm } from "../components/blog-post-form.js"

const CreateBlogPostPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Create Blog Post</Heading>
      </div>
      <div className="px-6 py-4">
        <BlogPostForm />
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  // Don't add label - this is a sub-route, not a main menu item
})

export default CreateBlogPostPage
