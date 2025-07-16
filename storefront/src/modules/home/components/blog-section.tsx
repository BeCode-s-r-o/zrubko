import { ArrowRight, Calendar, User } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Ako vybrať správny drevený materiál pre váš projekt",
      excerpt: "Praktický návod na výber drevených materiálov podľa typu projektu, prostredia a rozpočtu...",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      author: "Peter Novák",
      date: "15. január 2024",
      category: "Poradenstvo"
    },
    {
      id: 2,
      title: "Trendy v drevených interiéroch 2024",
      excerpt: "Objavte najnovšie trendy v používaní dreva v interiérovom dizajne a ako ich aplikovať...",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      author: "Mária Kováčová",
      date: "10. január 2024",
      category: "Trendy"
    },
    {
      id: 3,
      title: "Údržba drevených podláh počas zimy",
      excerpt: "Tipy a triky na správnu údržbu drevených podláh v chladných mesiacoch...",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      author: "Ján Svoboda",
      date: "5. január 2024",
      category: "Údržba"
    }
  ]

  return (
    <section className="py-20 bg-white w-full">
      <div className="px-6 mx-auto max-w-8xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
            Blog a inšpirácie
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-6"></div>
          <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
            Užitočné články, tipy a inšpirácie pre vaše drevené projekty
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
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
                      {post.date}
                    </div>
                  </div>

                  {/* Read More */}
                  <LocalizedClientLink href={`/blog/${post.id}`}>
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

        {/* View All Button */}
        <div className="text-center">
          <LocalizedClientLink href="/blog">
            <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group mx-auto">
              Zobraziť všetky články
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
} 