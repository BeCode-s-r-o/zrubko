import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import { BlogPostForm } from "../../components/blog-post-form"

const EditBlogPostPage = () => {
  // Extract ID from URL since useParams from react-router-dom is not available in Medusa Admin
  const pathname = window.location.pathname
  const pathParts = pathname.split('/').filter(Boolean) // Remove empty strings
  const urlId = pathParts[2] // ['app', 'blog', '01K3RZK4ATY3QZ9BVHFDM500MF', 'edit'] -> index 2
  const finalId = urlId // Use URL extraction

  if (!finalId) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-center px-6 py-4">
          <Heading level="h2">Error: Blog post ID not found</Heading>
          <p className="text-gray-600 mt-2">Unable to determine which blog post to edit.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Edit Blog Post</Heading>
      </div>
      <div className="px-6 py-4">
        <BlogPostForm blogPostId={finalId} />
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  // Don't add label for parameterized routes - they can't be in sidebar
})

export default EditBlogPostPage
