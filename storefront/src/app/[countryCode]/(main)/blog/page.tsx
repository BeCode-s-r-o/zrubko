import { Metadata } from "next"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Blog - Zrubko.sk",
  description: "Užitočné články, tipy a inšpirácie pre vaše drevené projekty",
}

const blogPosts = [
  {
    id: 1,
    title: "Ako vybrať správny drevený materiál pre váš projekt",
    excerpt: "Praktický návod na výber drevených materiálov podľa typu projektu, prostredia a rozpočtu. Dozviete sa, ktoré drevo je najvhodnejšie pre interiéry, exteriéry a špeciálne aplikácie.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Peter Novák",
    date: "15. január 2024",
    category: "Poradenstvo",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Trendy v drevených interiéroch 2024",
    excerpt: "Objavte najnovšie trendy v používaní dreva v interiérovom dizajne a ako ich aplikovať vo vašom dome. Od prírodných tónov po moderné kombinácie.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Mária Kováčová",
    date: "10. január 2024",
    category: "Trendy",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Údržba drevených podláh počas zimy",
    excerpt: "Tipy a triky na správnu údržbu drevených podláh v chladných mesiacoch. Ako chrániť drevo pred vlhkosťou a teplotnými zmenami.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Ján Svoboda",
    date: "5. január 2024",
    category: "Údržba",
    readTime: "4 min"
  },
  {
    id: 4,
    title: "Výhody cédrového dreva pre sauny",
    excerpt: "Prečo je cédrové drevo ideálne pre stavbu saún? Pozrieme si jeho vlastnosti, výhody a ako správne vybrať materiál pre váš wellness priestor.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Anna Horváthová",
    date: "1. január 2024",
    category: "Wellness",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Drevené fasády - moderné riešenia",
    excerpt: "Súčasné možnosti drevených fasád a ako ich správne navrhnúť. Od tradičných po moderné systémy a ich výhody.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Martin Kováč",
    date: "28. december 2023",
    category: "Exteriér",
    readTime: "8 min"
  },
  {
    id: 6,
    title: "Ekológia a udržateľnosť v drevenom stavebníctve",
    excerpt: "Ako drevo prispieva k udržateľnému stavebníctvu a prečo je ekologickou voľbou pre vaše projekty.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    author: "Eva Novotná",
    date: "20. december 2023",
    category: "Ekológia",
    readTime: "9 min"
  }
]

const categories = [
  "Všetky", "Poradenstvo", "Trendy", "Údržba", "Wellness", "Exteriér", "Ekológia"
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                      <div className="flex items-center gap-1">
                        <Tag size={14} />
                        {post.readTime}
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-16">
            <button className="px-4 py-2 text-black/60 hover:text-primary transition-colors">
              Predchádzajúca
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 text-black/60 hover:text-primary transition-colors">2</button>
            <button className="px-4 py-2 text-black/60 hover:text-primary transition-colors">3</button>
            <button className="px-4 py-2 text-black/60 hover:text-primary transition-colors">
              Ďalšia
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 