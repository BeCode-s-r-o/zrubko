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
    <section className="py-20 lg:py-24 w-full bg-white">
      <div className="px-6 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-8 text-4xl lg:text-5xl font-light leading-tight text-black">
            Blog a inšpirácie
          </h2>
          <div className="mx-auto mb-8 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <p className="mx-auto max-w-3xl text-xl lg:text-2xl font-light leading-relaxed text-black/60">
            Užitočné články, tipy a inšpirácie pre vaše drevené projekty
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-10 mb-16 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="group animate-pulse">
                <div className="overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-8">
                    <div className="h-5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full mb-6 w-24"></div>
                    <div className="h-7 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    <div className="flex gap-6 mb-6">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-5 bg-primary/20 rounded w-28"></div>
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
          <div className="grid grid-cols-1 gap-10 mb-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: BlogPost, index: number) => {
              // Convert excerpt to plain text for better display
              const processedExcerpt = post.excerpt ? markdownToPlainText(post.excerpt) : ''

              return (
                <article key={post.id} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 animate-in fade-in-50 duration-700">
                    {/* Image */}
                    {post.cover_image && (
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      {/* Status Badge */}
                      <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20">
                        {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
                      </div>

                      {/* Title */}
                      <h3 className="mb-4 text-xl lg:text-2xl font-medium leading-tight text-black transition-colors duration-300 group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {processedExcerpt && (
                        <p className="mb-6 font-light leading-relaxed text-black/70 text-base line-clamp-3">
                          {processedExcerpt.length > 150
                            ? `${processedExcerpt.substring(0, 150)}...`
                            : processedExcerpt
                          }
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex gap-6 items-center mb-6 text-sm text-black/50">
                        <div className="flex gap-2 items-center">
                          <User size={16} className="text-primary/60" />
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Calendar size={16} className="text-primary/60" />
                          <span className="font-medium">{new Date(post.published_at).toLocaleDateString('sk-SK')}</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <LocalizedClientLink href={`/blog/${post.slug}`}>
                        <button className="flex gap-3 items-center px-6 py-3 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark transition-all duration-300 hover:shadow-lg group-hover:shadow-primary/30">
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
            <button className="flex gap-3 items-center px-10 py-4 mx-auto text-white rounded-2xl transition-all duration-500 bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:scale-105 group font-medium">
              Zobraziť všetky články
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
} 