"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

interface CategoryExpandableContentProps {
  category: HttpTypes.StoreProductCategory
}

export default function CategoryExpandableContent({ category }: CategoryExpandableContentProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set())
  
  const metadata = category.metadata || {}
  
  const getMetadataString = (key: string): string | undefined => {
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }

  // Získaj bottom_description
  const bottomDescription = getMetadataString('bottom_description')

  // Nájdi všetky bloky (block_X_title a block_X_content)
  const contentBlocks: Array<{ id: number; title: string; content: string }> = []
  
  let blockIndex = 1
  while (true) {
    const title = getMetadataString(`block_${blockIndex}_title`)
    const content = getMetadataString(`block_${blockIndex}_content`)
    
    if (!title || !content) break
    
    contentBlocks.push({
      id: blockIndex,
      title,
      content
    })
    blockIndex++
  }

  // Ak nie sú žiadne metadata, nezobraziť komponent
  if (!bottomDescription && contentBlocks.length === 0) {
    return null
  }

  const toggleBlock = (blockId: number) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }

  return (
    <section id="category-metadata" className="py-16 lg:py-24 bg-gradient-to-br from-white via-stone-50/30 to-amber-50/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(139,69,19,0.1)_1px,_transparent_0)] [background-size:40px_40px]"></div>
      </div>
      
      <div className="content-container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hlavný nadpis sekcie */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Všetko o {category.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Bottom description ako úvodný text */}
            {bottomDescription && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-amber-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="relative">
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                      {bottomDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamické bloky v lepšom dizajne */}
            {contentBlocks.map((block, index) => {
              const isExpanded = expandedBlocks.has(block.id)
              const shortContent = block.content.length > 250 
                ? block.content.substring(0, 250) + "..."
                : block.content
              
              return (
                <div key={block.id} className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100/50 relative overflow-hidden ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600"></div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {block.id}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {block.title}
                      </h3>
                    </div>
                    
                    <div className="text-gray-700 leading-relaxed">
                      <div className="prose prose-lg max-w-none">
                        {isExpanded ? (
                          <div className="whitespace-pre-line text-lg">{block.content}</div>
                        ) : (
                          <div className="text-lg">{shortContent}</div>
                        )}
                      </div>
                    </div>
                    
                    {block.content.length > 250 && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => toggleBlock(block.id)}
                          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          {isExpanded ? "Zobraziť menej" : "Čítať viac"}
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 