import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import { BlogPostList } from "./components/blog-post-list.js"

const BlogPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Blog Posts</Heading>
      </div>
      <div className="px-6 py-4">
        <BlogPostList />
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Blog",
})

export default BlogPage
