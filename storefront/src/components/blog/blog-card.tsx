"use client"

import Image from 'next/image'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { BlogPost } from '@/types/blog'
import { useTranslations } from 'next-intl'

interface BlogCardProps {
  post: BlogPost
  showExcerpt?: boolean
}

export function BlogCard({ post, showExcerpt = true }: BlogCardProps) {
  const t = useTranslations('blog')

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.cover_image && (
        <div className="relative h-48 w-full">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 text-xl text-gray-600 mb-2">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString('sk-SK')}
          </time>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <LocalizedClientLink href={`/blog/${post.slug}`}>
            {post.title}
          </LocalizedClientLink>
        </h2>

        {showExcerpt && post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-700 text-xl px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <LocalizedClientLink
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-base"
          >
            {t('readMore') || 'Read more →'}
          </LocalizedClientLink>
        </div>
      </div>
    </article>
  )
}
