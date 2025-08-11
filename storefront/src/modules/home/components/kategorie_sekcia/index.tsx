"use client"

import { Text } from "@medusajs/ui"
import LightButton from "@modules/layout/components/ui/LightButton"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import CategoryCard from "./category-card"
import { useState, useRef } from "react"

export default function Categories({
  categories,
}: {
  categories: any[]
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="py-12 w-full">
      <div className=" mx-auto max-w-8xl">
      <div className="flex flex-col gap-6 justify-between items-start mb-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-3xl font-light leading-tight text-black lg:text-4xl">
            Kategórie produktov
          </h2>
          
          <div className="mb-4 w-20 h-px bg-black"></div>
          
          <Text className="text-lg font-light leading-relaxed text-black/60">
            Preskúmajte naše starostlivo kurátorované kolekcie prémiových drevených produktov
          </Text>
        </div>
        
        <div className="hidden lg:block">
          <LightButton href="/categories">
            <span className="flex gap-3 items-center">
              <span className="font-medium">Zobraziť všetky</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </LightButton>
        </div>
      </div>
      
      {/* Mobile/Tablet Scrolling Banner */}
      <div className="lg:hidden mb-8">
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
            aria-label="Posunúť doľava"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-all duration-200"
            aria-label="Posunúť doprava"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrolling Container */}
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth ">
            {categories.slice(0, 6).map((category, index) => (
              <div key={category.id} className="flex-shrink-0 w-64">
                <div className="aspect-square bg-white rounded-lg border shadow-sm transition-all duration-300 border-black/10 hover:border-[#1a2e1a] hover:shadow-lg hover:scale-105">
                  <CategoryCard category={category} index={index} />
                </div>
              </div>
            ))}
          </div>

          {/* View All Button for Mobile */}
          <div className="text-center mt-6">
            <LightButton href="/categories">
              <span className="flex gap-2 items-center justify-center">
                <span className="font-medium">Zobraziť všetky kategórie</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </LightButton>
          </div>
        </div>
      </div>
      
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.slice(0, 10).map((category, index) => (
          <div key={category.id} className="flex relative flex-col group">
            <div className="flex flex-col aspect-square bg-white rounded-lg border shadow-sm transition-all duration-300 border-black/10 hover:border-[#1a2e1a] hover:shadow-lg hover:scale-105">
              <CategoryCard category={category} index={index} />
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
} 