import Image from 'next/image'
import { BlogPostWithContent } from '@/types/blog'

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

        <div className="flex items-center gap-2 text-xl text-gray-600 mb-4">
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
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-xl px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Excerpt */}
      {post.excerpt && (
        <div
          className="text-xl text-gray-700 mb-8 italic border-l-4 border-blue-500 pl-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none text-base"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
