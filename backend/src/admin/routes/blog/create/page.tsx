import { defineRouteConfig } from "@medusajs/admin-sdk"
import { BlogPostForm } from "../components/blog-post-form"

const CreateBlogPostPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Blog Post</h1>
      </div>
      <div>
        <BlogPostForm />
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  // Don't add label - this is a sub-route, not a main menu item
})

export default CreateBlogPostPage
