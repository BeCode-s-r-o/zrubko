"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Vlastné dáta pre karty - môžete ľahko upravovať
const customCardData = [
  {
    id: 1,
    title: "Tatranský profil",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-obklady"
  },
  {
    id: 2,
    title: "Drevené obklady Termodrevo", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-podlahy"
  },
  {
    id: 3,
    title: "Drevené podlahy",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", 
    link: "/categories/terasove-dosky"
  },
  {
    id: 4,
    title: "Drevo do sauny",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevo-do-sauny"
  },
  {
    id: 5,
    title: "Drevené hranoly a lišty",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-hranoly"
  },
  {
    id: 6,
    title: "Tatranský profil soft",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/kvh-hranoly"
  },
  {
    id: 7,
    title: "Drevené podlahy Termodrevo",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/novinky"
  },
  {
    id: 8,
    title: "Terasové dosky",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/najpredavanejsie"
  },
  {
    id: 9,
    title: "KVH hranoly",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-obklady-termodrevo"
  },
  {
    id: 10,
    title: "Novinky",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    link: "/categories/drevene-podlahy-termodrevo"
  }
]

export default function CategoryCard({ category, index }: { category: any; index: number }) {
  // Získa custom dáta pre kartu podľa indexu
  const cardData = customCardData[index] || customCardData[0]
  
  return (
    <LocalizedClientLink
      href={cardData.link}
      className="block w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-full h-full">
        {/* Obrázok */}
        <img
          src={cardData.image}
          alt={cardData.title}
          className="w-full h-full object-cover"
        />
        
        {/* Tmavý overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Názov karty v strede */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white lg:text-xl  sm:text-base font-bold uppercase text-center px-4 leading-tight">
            {cardData.title}
          </h3>
        </div>
      </div>
    </LocalizedClientLink>
  )
}