import { BLOG_MODULE } from "../modules/blog"
import { createBlogPostWorkflow } from "../workflows/create-blog-post"
import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const samplePosts = [
  {
    title: "Welcome to Our Blog",
    slug: "welcome-to-our-blog",
    content: `# Welcome to Our Blog

We're excited to launch our new blog! This is where we'll be sharing updates, insights, and stories from our team.

## What You Can Expect

- Product updates and announcements
- Behind-the-scenes content
- Industry insights and trends
- Tips and tutorials

Stay tuned for more content coming soon. We hope you'll find our posts helpful and engaging.

Thank you for being part of our journey!`,
    excerpt: "We're excited to launch our new blog! This is where we'll be sharing updates, insights, and stories from our team.",
    author: "Admin Team",
    language: "sk" as const,
    status: "published" as const
  },
  {
    title: "Building Better User Experiences",
    slug: "building-better-user-experiences",
    content: `# Building Better User Experiences

User experience (UX) is at the heart of everything we do. In this post, we'll explore some key principles that guide our design decisions.

## Key Principles

### 1. Simplicity First
We believe that the best interfaces are intuitive and easy to use. Every feature we add goes through rigorous testing to ensure it enhances rather than complicates the user journey.

### 2. Performance Matters
Fast loading times and smooth interactions are crucial. We continuously optimize our platform to deliver the best possible performance.

### 3. Accessibility for All
We're committed to making our platform accessible to users of all abilities. This includes proper contrast ratios, keyboard navigation, and screen reader compatibility.

## Looking Ahead

We're constantly working to improve our platform based on user feedback and emerging best practices. If you have suggestions, we'd love to hear from you!`,
    excerpt: "User experience (UX) is at the heart of everything we do. In this post, we'll explore some key principles that guide our design decisions.",
    author: "Design Team",
    language: "sk" as const,
    status: "published" as const
  },
  {
    title: "The Future of E-commerce Technology",
    slug: "future-of-ecommerce-technology",
    content: `# The Future of E-commerce Technology

E-commerce continues to evolve at a rapid pace. Let's explore some emerging trends that are shaping the future of online retail.

## Emerging Trends

### Artificial Intelligence and Machine Learning
AI is revolutionizing personalization, inventory management, and customer service. From chatbots to recommendation engines, AI is making shopping experiences more tailored and efficient.

### Augmented Reality Shopping
AR technology allows customers to visualize products in their own space before making a purchase, reducing returns and increasing customer satisfaction.

### Voice Commerce
With the rise of smart speakers and voice assistants, voice-activated shopping is becoming increasingly popular.

### Sustainability Focus
Consumers are increasingly conscious of environmental impact, driving demand for sustainable packaging and eco-friendly products.

## Our Commitment

We're committed to staying at the forefront of these technological advances while maintaining our focus on reliability and user experience.

What trends are you most excited about? Let us know in the comments!`,
    excerpt: "E-commerce continues to evolve at a rapid pace. Let's explore some emerging trends that are shaping the future of online retail.",
    author: "Tech Team",
    language: "sk" as const,
    status: "draft" as const
  }
]

// Function to update existing posts with status field
async function updateExistingPosts(container: any) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    const blogService = container.resolve(BLOG_MODULE) as any

    // Get all existing posts
    const { posts } = await blogService.searchBlogPosts({}, { skip: 0, take: 100 })

    logger.info(`Found ${posts.length} existing blog posts to update`)

    for (const post of posts) {
      const status = post.published_at ? "published" : "draft"

      await blogService.updateBlogPosts([{
        selector: { id: post.id },
        data: { status }
      }])

      logger.info(`Updated post ${post.id} to status: ${status}`)
    }

    logger.info("Successfully updated all existing blog posts with status field")
  } catch (error) {
    logger.error("Error updating existing posts:", error)
  }
}

export default async function seedBlog({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("Starting blog seed...")

    // Get the blog service
    const blogService = container.resolve(BLOG_MODULE) as any

    // Check if posts already exist
    const { posts: existingPosts } = await blogService.searchBlogPosts({}, { take: 1 })

    if (existingPosts.length > 0) {
      logger.info("Blog posts already exist, updating status field for existing posts...")
      await updateExistingPosts(container)
      logger.info("Blog posts updated, skipping seed")
      return
    }

    // Create sample posts
    for (const postData of samplePosts) {
      try {
        const { result } = await createBlogPostWorkflow(container).run({
          input: {
            blogPostData: postData
          }
        })

        logger.info(`Created blog post: ${result.title} (${result.slug})`)
      } catch (error) {
        logger.error(`Failed to create blog post "${postData.title}":`, error)
      }
    }

    logger.info("Blog seed completed successfully")
  } catch (error) {
    logger.error("Blog seed failed:", error)
    throw error
  }
}

// This function is called by medusa exec command, no need for direct execution
