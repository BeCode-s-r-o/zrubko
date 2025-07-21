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
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="inline-block px-3 py-1 mb-4 text-sm rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-medium leading-tight text-black transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 font-light leading-relaxed text-black/60">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex gap-4 items-center mb-4 text-sm text-black/40">
                    <div className="flex gap-1 items-center">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                  </div>

                  {/* Read More */}
                  <LocalizedClientLink href={`/blog/${post.id}`}>
                    <button className="flex gap-2 items-center transition-colors text-primary hover:text-primary-dark group">
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