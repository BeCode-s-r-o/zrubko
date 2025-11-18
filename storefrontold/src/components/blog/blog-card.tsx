"use client"

import Image from 'next/image'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { BlogPost } from '@/types/blog'
import { useTranslations } from 'next-intl'
import { renderMarkdown } from '@/lib/util/markdown'

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
          <div
            className="prose prose-sm prose-gray max-w-none mb-4 line-clamp-3 prose-headings:text-sm prose-h1:text-sm"
            dangerouslySetInnerHTML={renderMarkdown(post.excerpt)}
          />
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:bg-secondary/90 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <LocalizedClientLink
            href={`/blog/${post.slug}`}
            className="text-primary hover:text-primary/80 font-medium text-base transition-colors"
          >
            {t('readMore') || 'Čítať viac →'}
          </LocalizedClientLink>
        </div>
      </div>
    </article>
  )
}
