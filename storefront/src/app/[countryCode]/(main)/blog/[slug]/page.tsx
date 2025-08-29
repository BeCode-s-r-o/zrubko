import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { BlogPost } from '@/components/blog'
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
  const t = await getTranslations({ locale: params.countryCode })

  if (!post) {
    notFound()
  }

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
        </div>
      </main>
    </div>
  )
}
