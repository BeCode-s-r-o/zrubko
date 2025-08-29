"use client"

import { ArrowRight, Calendar, User } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useBlogPosts } from "@/lib/hooks/use-blog"
import { BlogPost } from "@/types/blog"
import { markdownToPlainText } from "@/lib/utils/markdown"
import { useParams } from "next/navigation"
import { useTranslations } from 'next-intl'

export default function BlogSection() {
  const { countryCode } = useParams() as { countryCode: string }
  const t = useTranslations()

  // Fetch the latest 3 blog posts from the backend
  const { posts, loading, error } = useBlogPosts({
    limit: 3,
    offset: 0
  }, countryCode)

  return (
    <section className="py-20 w-full bg-white">
      <div className="px-6 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-light leading-tight text-black">
            Blog a inšpirácie
          </h2>
          <div className="mx-auto mb-6 w-24 h-px bg-black"></div>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-black/60">
            Užitočné články, tipy a inšpirácie pre vaše drevené projekty
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="group animate-pulse">
                <div className="overflow-hidden bg-white rounded-2xl shadow-lg">
                  <div className="aspect-[3/2] bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4 w-20"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('blog.errorLoading') || 'Nepodarilo sa načítať články.'}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('blog.noPostsFound') || 'Zatiaľ nie sú k dispozícii žiadne články.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: BlogPost) => {
              // Convert excerpt to plain text for better display
              const processedExcerpt = post.excerpt ? markdownToPlainText(post.excerpt) : ''

              return (
                <article key={post.id} className="group">
                  <div className="overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    {/* Image */}
                    {post.cover_image && (
                      <div className="aspect-[3/2] overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Status Badge */}
                      <div className="inline-block px-3 py-1 mb-4 text-sm rounded-full bg-primary/10 text-primary">
                        {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-medium leading-tight text-black transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {processedExcerpt && (
                        <p className="mb-4 font-light leading-relaxed text-black/60">
                          {processedExcerpt.length > 120
                            ? `${processedExcerpt.substring(0, 120)}...`
                            : processedExcerpt
                          }
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex gap-4 items-center mb-4 text-sm text-black/40">
                        <div className="flex gap-1 items-center">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="flex gap-1 items-center">
                          <Calendar size={14} />
                          {new Date(post.published_at).toLocaleDateString('sk-SK')}
                        </div>
                      </div>

                      {/* Read More */}
                      <LocalizedClientLink href={`/blog/${post.slug}`}>
                        <button className="flex gap-2 items-center transition-colors text-primary hover:text-primary-dark group">
                          Čítať viac
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <LocalizedClientLink href="/blog">
            <button className="flex gap-3 items-center px-8 py-4 mx-auto text-white rounded-lg transition-all duration-300 bg-primary hover:bg-primary-dark group">
              Zobraziť všetky články
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
} 