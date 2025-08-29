"use client"

import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { useBlogPosts } from '@/lib/hooks/use-blog'
import { BlogCard, BlogGridSkeleton } from '@/components/blog'
import { BlogPost } from '@/types/blog'
import { markdownToPlainText } from '@/lib/utils/markdown'

interface BlogGridClientProps {
  searchParams: { [key: string]: string | string[] | undefined }
  countryCode: string
}

export function BlogGridClient({ searchParams, countryCode }: BlogGridClientProps) {
  const t = useTranslations('blog')
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined
  const author = typeof searchParams.author === 'string' ? searchParams.author : undefined
  const tags = typeof searchParams.tags === 'string' ? searchParams.tags : undefined
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 12
  const offset = typeof searchParams.offset === 'string' ? parseInt(searchParams.offset) : 0

  const { posts, loading, error, totalCount } = useBlogPosts({
    q,
    author,
    tags,
    limit,
    offset
  }, countryCode)

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('errorLoading') || 'Error loading blog posts'}
        </h2>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (loading) {
    return <BlogGridSkeleton />
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('noPostsFound') || 'No blog posts found'}
        </h2>
        <p className="text-gray-600">
          {t('checkBackLater') || 'Check back later for new content.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: BlogPost) => {
          // Convert excerpt to plain text for blog cards
          const processedPost = {
            ...post,
            excerpt: post.excerpt ? markdownToPlainText(post.excerpt) : undefined
          }
          return <BlogCard key={post.id} post={processedPost} />
        })}
      </div>

      {totalCount > posts.length && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('showingPosts', { current: posts.length, total: totalCount }) ||
             `Showing ${posts.length} of ${totalCount} posts`}
          </p>
          {/* TODO: Add pagination component */}
        </div>
      )}
    </div>
  )
}
