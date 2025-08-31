"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Vlastné dáta pre karty - môžete ľahko upravovať
const customCardData = [
  {
    id: 1,
    title: "Tatranský profil",
    subtitle: "Prémiové obklady",
    description: "Kvalitné profily pre moderné interiéry",
    features: ["Odolné", "Ľahko inštalovateľné", "Široký sortiment"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-obklady",
    badge: "Najobľúbenejšie"
  },
  {
    id: 2,
    title: "Drevené obklady",
    subtitle: "Termodrevo",
    description: "Stabilné a odolné proti vlhkosti",
    features: ["Thermo-ošetrené", "Vonkajšie použitie", "Dlhá životnosť"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-podlahy",
    badge: null
  },
  {
    id: 3,
    title: "Drevené podlahy",
    subtitle: "Masívne a trojvrstvé",
    description: "Prémiové drevené podlahy pre moderný aj tradičný interiér. Vysoká kvalita spracovania a dlhá životnosť.",
    features: ["Masívne drevo", "Trojvrstvé", "Parkety", "Lacquer", "Vodeodolné"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/terasove-dosky",
    badge: "Novinka"
  },
  {
    id: 4,
    title: "Drevo do sauny",
    subtitle: "Špeciálne ošetrené",
    description: "Ideálne pre wellness priestory",
    features: ["Vysoká teplota", "Nízka absorpcia", "Prírodné oleje"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevo-do-sauny",
    badge: null
  },
  {
    id: 5,
    title: "Drevené hranoly",
    subtitle: "Konštrukčné prvky",
    description: "Kvalitné konštrukčné hranoly pre stavbu a rekonštrukciu. Vysoká nosnosť a odolnosť voči poveternostným vplyvom.",
    features: ["Konštrukčné", "Vonkajšie", "Vnútorné", "Vysoká nosnosť", "Odolné"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-hranoly",
    badge: "Odporúčané"
  },
  {
    id: 6,
    title: "Tatranský profil soft",
    subtitle: "Mäkký variant",
    description: "Jemnejšia verzia pre interiér",
    features: ["Mäkký povrch", "Interiér", "Elegantný"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/kvh-hranoly",
    badge: null
  },
  {
    id: 7,
    title: "Podlahy Termodrevo",
    subtitle: "Thermo-ošetrené",
    description: "Stabilné a odolné podlahy",
    features: ["Thermo", "Stabilné", "Odolné"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/novinky",
    badge: "Odporúčané"
  },
  {
    id: 8,
    title: "Terasové dosky",
    subtitle: "Exteriér",
    description: "Kvalitné terasy pre záhradu",
    features: ["Vonkajšie", "Odolné", "Štýlové"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/najpredavanejsie",
    badge: null
  },
  {
    id: 9,
    title: "KVH hranoly",
    subtitle: "Konštrukčné",
    description: "Kvalitné konštrukčné prvky",
    features: ["KVH", "Konštrukčné", "Kvalitné"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-obklady-termodrevo",
    badge: null
  },
  {
    id: 10,
    title: "Novinky",
    subtitle: "Najnovšie produkty",
    description: "Objavte naše najnovšie prírastky",
    features: ["Nové", "Inovatívne", "Trendy"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-podlahy-termodrevo",
    badge: "Novinka"
  }
]

export default function CategoryCard({ category, index }: { category: any; index: number }) {
  // Získa custom dáta pre kartu podľa indexu
  const cardData = customCardData[index] || customCardData[0]

  return (
    <LocalizedClientLink
      href={cardData.link}
      className="group block w-full h-full bg-white rounded-xl border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative w-full flex-1 flex flex-col">
        {/* Badge */}
        {cardData.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-1 text-xs font-normal bg-primary text-white rounded-full shadow-md">
              {cardData.badge}
            </span>
          </div>
        )}

        {/* Obrázok */}
        <div className="aspect-square relative overflow-hidden flex-shrink-0">
          <img
            src={cardData.image}
            alt={cardData.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/api/placeholder/400/400'
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-lg font-normal text-black group-hover:text-primary transition-colors">
              {cardData.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-black/70 font-light leading-relaxed mb-3 line-clamp-2">
            {cardData.description}
          </p>



          {/* Action indicator */}
          <div className="flex items-center justify-between text-xs font-normal mt-4">
            <span className="text-black/60">Preskúmať</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}