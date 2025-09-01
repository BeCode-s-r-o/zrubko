import Image from 'next/image'
import { BlogPostWithContent } from '@/types/blog'
import { renderMarkdown } from '@/lib/util/markdown'

interface BlogPostProps {
  post: BlogPostWithContent
}

export function BlogPost({ post }: BlogPostProps) {

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        {post.cover_image && (
          <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xl text-gray-600">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('sk-SK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-secondary text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-secondary/90 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Excerpt */}
      {post.excerpt && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary p-6 rounded-r-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 17H7v-2h7m3-2H7V9h10m0-4h-3V3h-2v2H7V3H5v2H2v16h16V7h-3V5zM5 21H4V9h1v12zm14-2H6V9h13v10z"/>
              </svg>
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">Súhrn článku</span>
            </div>
            <div
              className="prose prose-lg prose-gray max-w-none prose-headings:text-2xl prose-h1:text-2xl text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={renderMarkdown(post.excerpt)}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg prose-gray max-w-none prose-headings:text-2xl prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg"
        dangerouslySetInnerHTML={renderMarkdown(post.content)}
      />
    </article>
  )
}
