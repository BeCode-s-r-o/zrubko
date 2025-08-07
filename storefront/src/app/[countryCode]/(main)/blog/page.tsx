import { Metadata } from "next"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog - Zrubko.sk",
  description: "Užitočné články, tipy a inšpirácie pre vaše drevené projekty",
}

type Props = {
  params: { countryCode: string }
}

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  publishedAt: string
}

// Helper function to get blog posts from Strapi
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/blogs?populate=cover&sort=publishedAt:desc`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('Strapi blog data:', data)
      
      return data.data?.map((post: any): BlogPost => ({
        id: post.id,
        title: post.attributes.title,
        slug: post.attributes.slug,
        excerpt: post.attributes.excerpt || 'Bez popisu...',
        content: post.attributes.content,
        featuredImage: post.attributes.cover?.data?.attributes?.url 
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${post.attributes.cover.data.attributes.url}`
          : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
        author: post.attributes.author || 'Autor',
        category: post.attributes.category || 'Všeobecné',
        tags: post.attributes.tags || [],
        featured: post.attributes.featured || false,
        publishedAt: post.attributes.publishedAt || post.attributes.createdAt,
      })) || []
    } else {
      console.error('Strapi response error:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error fetching from Strapi:', error)
  }

  // Fallback if Strapi is not available
  return []
}

const categories = [
  "Všetky", "Poradenstvo", "Trendy", "Údržba", "Wellness", "Exteriér", "Ekológia"
]

export default async function BlogPage({ params }: Props) {
  const blogPosts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Blog", isActive: true }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
              Blog a inšpirácie
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Užitočné články, tipy a inšpirácie pre vaše drevené projekty
            </p>
            <div className="mt-8">
              <p className="text-white/60">
                📝 {blogPosts.length} článkov | ✨ Obsah zo Strapi CMS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-8xl">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === "Všetky"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-primary hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    {/* Image */}
                    <div className="aspect-[3/2] overflow-hidden">
                      <Image 
                        src={post.featuredImage}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
                        {post.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-medium text-black mb-3 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-black/60 mb-4 leading-relaxed font-light">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-black/40 mb-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.publishedAt).toLocaleDateString('sk-SK')}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag size={14} />
                            #{post.tags[0]}
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <LocalizedClientLink href={`/blog/${post.slug}`}>
                        <button className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group">
                          Čítať viac
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-black mb-4">Načítavam blogy zo Strapi...</h3>
                <p className="text-black/60 mb-6">
                  Pokiaľ sa blogy nezobrazujú, skontrolujte či je Strapi spustené na porte 1337.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                  <p className="text-sm text-black/70 mb-2">
                    <strong>Strapi URL:</strong> {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}
                  </p>
                  <p className="text-xs text-black/50">
                    Môžete vytvoriť nové blogy v Strapi admin paneli.
                  </p>
                </div>
              </div>
              <LocalizedClientLink href="/">
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Späť na hlavnú stránku
                </button>
              </LocalizedClientLink>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}