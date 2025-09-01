import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { BlogPost, BlogPostNavigation } from '@/components/blog'
import { storeFetch } from '@/lib/util/fetch'
import { markdownToHtml } from '@/lib/utils/markdown'

interface BlogPostPageProps {
  params: {
    countryCode: string
    slug: string
  }
}

async function fetchBlogPost(slug: string, countryCode: string) {
  try {
    // Direct backend call with language parameter and cache busting
    const timestamp = Date.now()
    const response = await storeFetch(`/store/blog/posts/${slug}?language=${countryCode}&_t=${timestamp}`, {}, countryCode)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch blog post')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function fetchAllBlogPosts(countryCode: string) {
  try {
    const response = await storeFetch(`/store/blog/posts?language=${countryCode}&limit=100`, {}, countryCode)

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }

    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug, params.countryCode)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Zrubko'
    }
  }

  return {
    title: `${post.title} | Blog | Zrubko`,
    description: post.excerpt || `Read ${post.title} on our blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  }
}

// Force revalidation for blog posts to ensure fresh data
export const revalidate = 0

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPost(params.slug, params.countryCode)
  const allPosts = await fetchAllBlogPosts(params.countryCode)
  const t = await getTranslations({ locale: params.countryCode })

  if (!post) {
    notFound()
  }

  // Find current post index and determine previous/next posts
  const sortedPosts = allPosts.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  const currentIndex = sortedPosts.findIndex((p: any) => p.slug === params.slug)
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  // Convert markdown to HTML for rendering
  const processedPost = {
    ...post,
    content: typeof post.content === 'string' ? await markdownToHtml(post.content) : String(post.content || ''),
    excerpt: typeof post.excerpt === 'string' ? await markdownToHtml(post.excerpt) : String(post.excerpt || '')
  }

  return (
    <div className="page-wrapper">
      <main className="main py-12">
        <div className="container mx-auto px-4">
          <BlogPost post={processedPost} />
          <BlogPostNavigation
            previousPost={previousPost}
            nextPost={nextPost}
            countryCode={params.countryCode}
            translations={t}
          />
        </div>
      </main>
    </div>
  )
}
